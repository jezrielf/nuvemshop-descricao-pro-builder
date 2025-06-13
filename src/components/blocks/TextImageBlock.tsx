import React, { useState } from 'react';
import { TextImageBlock as TextImageBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';
import { useImageUpload } from './image/hooks/useImageUpload';
import { useImageUploadFallback } from './image/hooks/useImageUploadFallback';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { deepClone } from '@/utils/deepClone';

interface TextImageBlockProps {
  block: TextImageBlockType;
  isPreview?: boolean;
}

const TextImageBlock: React.FC<TextImageBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [useFallback, setUseFallback] = useState(false);
  
  const handleUpdateImageSrc = (src: string) => {
    // Create deep copy of current image and update src
    const currentImage = deepClone(block.image);
    updateBlock(block.id, { image: { ...currentImage, src } });
  };
  
  const handleUpdateImageAlt = (alt: string) => {
    // Create deep copy of current image and update alt
    const currentImage = deepClone(block.image);
    updateBlock(block.id, { image: { ...currentImage, alt } });
  };
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleUpdateContent = (content: string) => {
    updateBlock(block.id, { content });
  };
  
  const handleImageFitChange = (value: string) => {
    // Create deep copy of current style and update imageFit
    const currentStyle = deepClone(block.style || {});
    updateBlock(block.id, { 
      style: {
        ...currentStyle, 
        imageFit: value as 'contain' | 'cover'
      }
    });
  };
  
  const handleSelectFromLibrary = (imageUrl: string, alt: string) => {
    // Create deep copy of current image and update both src and alt
    const currentImage = deepClone(block.image);
    updateBlock(block.id, { 
      image: {
        ...currentImage,
        src: imageUrl,
        alt: alt
      }
    });
  };

  // Upload padrão para o Supabase
  const { uploading: standardUploading, uploadProgress: standardProgress, handleFileChange: standardFileChange } = useImageUpload({
    onSuccess: (url, alt) => {
      updateBlock(block.id, { 
        image: {
          src: url,
          alt: alt
        }
      });
    }
  });
  
  // Fallback upload usando Base64
  const { uploading: fallbackUploading, uploadProgress: fallbackProgress, handleFileChange: fallbackFileChange } = useImageUploadFallback({
    onSuccess: (url, alt) => {
      updateBlock(block.id, { 
        image: {
          src: url,
          alt: alt
        }
      });
    }
  });
  
  // Handle file change with error handling
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // Tente o upload padrão primeiro
      if (!useFallback) {
        const result = await standardFileChange(e);
        
        // Se falhar, mudar para o método alternativo
        if (!result) {
          setUseFallback(true);
          toast({
            title: "Usando método alternativo",
            description: "Não foi possível fazer upload para o servidor. Usando método alternativo.",
          });
          
          // Tente novamente com o fallback
          await fallbackFileChange(e);
        }
      } else {
        // Já está usando o fallback
        await fallbackFileChange(e);
      }
    } catch (error) {
      console.error('Erro no upload de imagem:', error);
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao fazer upload da imagem. Use a URL direta ou escolha da biblioteca.",
        variant: "destructive",
      });
    }
  };
  
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-3">{block.heading}</h2>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
          </div>
          <div className="w-full md:w-1/2">
            {block.image.src ? (
              <img
                src={block.image.src}
                alt={block.image.alt || "Imagem do produto"}
                className={`w-full h-auto ${imageObjectFit} rounded-md`}
              />
            ) : (
              <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md">
                <Image className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Texto</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1">Título</label>
                <Input
                  value={block.heading}
                  onChange={(e) => handleUpdateHeading(e.target.value)}
                  placeholder="Título da seção"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1">Conteúdo</label>
                <Textarea
                  value={block.content}
                  onChange={(e) => handleUpdateContent(e.target.value)}
                  placeholder="Conteúdo da seção"
                  rows={6}
                />
                <div className="mt-1 text-xs text-gray-500">
                  Você pode usar HTML básico para formatação.
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Imagem</h3>
              <div>
                <Select value={imageFitValue} onValueChange={handleImageFitChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Escolha o tipo de preenchimento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contain">Conter (mostrar imagem inteira)</SelectItem>
                    <SelectItem value="cover">Cobrir (preencher todo o espaço)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {block.image.src ? (
              <img
                src={block.image.src}
                alt={block.image.alt || "Imagem do produto"}
                className={`w-full h-auto max-h-48 ${imageObjectFit} rounded-md mb-2`}
              />
            ) : (
              <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md mb-2">
                <Image className="h-12 w-12 text-gray-400" />
              </div>
            )}
            
            <div className="space-y-3">
              <div className="flex space-x-2 mb-2">
                <ImageLibrary onSelectImage={handleSelectFromLibrary} />
                
                <div className="relative">
                  <input
                    type="file"
                    id={`image-upload-${block.id}`}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button className="h-9 px-4 py-2 bg-white border border-gray-200 text-sm rounded-md hover:bg-gray-100 flex items-center justify-center">
                    <Image className="h-4 w-4 mr-2" />
                    Upload
                  </button>
                </div>
              </div>
              
              {(useFallback ? fallbackUploading : standardUploading) && (
                <div className="space-y-2">
                  <Progress value={useFallback ? fallbackProgress : standardProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">Enviando... {useFallback ? fallbackProgress : standardProgress}%</p>
                </div>
              )}
              
              <div>
                <label className="block text-xs mb-1">URL da Imagem</label>
                <Input
                  value={block.image.src}
                  onChange={(e) => handleUpdateImageSrc(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1">Texto Alternativo</label>
                <Input
                  value={block.image.alt}
                  onChange={(e) => handleUpdateImageAlt(e.target.value)}
                  placeholder="Descrição da imagem"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextImageBlock;
