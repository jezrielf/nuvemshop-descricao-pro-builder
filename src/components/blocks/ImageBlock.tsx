
import React, { useState } from 'react';
import { ImageBlock as ImageBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Image, X, Loader2 } from 'lucide-react';
import ImageLibrary from '../ImageLibrary/ImageLibrary';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';

interface ImageBlockProps {
  block: ImageBlockType;
  isPreview?: boolean;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const isEditing = selectedBlockId === block.id && !isPreview;
  const { toast } = useToast();
  const auth = useAuth();
  
  const handleUpdateSrc = (src: string) => {
    updateBlock(block.id, { src });
  };
  
  const handleUpdateAlt = (alt: string) => {
    updateBlock(block.id, { alt });
  };
  
  const handleUpdateCaption = (caption: string) => {
    updateBlock(block.id, { caption });
  };
  
  const handleSelectFromLibrary = (imageUrl: string, alt: string) => {
    updateBlock(block.id, { 
      src: imageUrl,
      alt: alt 
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !auth.user) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Por favor, selecione uma imagem nos formatos JPG, PNG ou GIF.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    setUploading(true);
    setUploadProgress(0);
    
    try {
      // Create a unique file name to avoid conflicts
      const fileExt = file.name.split('.').pop();
      const fileAlt = file.name.split('.')[0] || 'image';
      const fileName = `${Date.now()}_${fileAlt}.${fileExt}`;
      const filePath = `${auth.user.id}/${fileName}`;
      
      // Set up progress tracking with an interval
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = Math.min(prev + 10, 95); // Increment but cap at 95%
          return newProgress;
        });
      }, 100);
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      // Clear the interval after upload completes
      clearInterval(progressInterval);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Upload complete - set to 100%
      setUploadProgress(100);
      
      // Get the public URL
      const { data: fileUrl } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      // Update the block with the image URL
      updateBlock(block.id, { 
        src: fileUrl.publicUrl,
        alt: fileAlt
      });
      
      toast({
        title: "Upload concluído",
        description: "Sua imagem foi enviada com sucesso.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar sua imagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setImageFile(null);
      
      // Reset the file input
      e.target.value = '';
    }
  };
  
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="max-w-2xl mx-auto">
          {block.src ? (
            <>
              <img 
                src={block.src} 
                alt={block.alt || 'Imagem do produto'} 
                className="w-full h-auto rounded-md"
              />
              {block.caption && (
                <p className="text-sm text-gray-500 text-center mt-2">{block.caption}</p>
              )}
            </>
          ) : (
            <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
              <span className="text-gray-400">Imagem</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">URL da Imagem</label>
            <div className="flex gap-2">
              <Input
                value={block.src || ''}
                onChange={(e) => handleUpdateSrc(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <ImageLibrary 
                onSelectImage={handleSelectFromLibrary}
                trigger={
                  <Button variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                }
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Texto Alternativo</label>
            <Input
              value={block.alt || ''}
              onChange={(e) => handleUpdateAlt(e.target.value)}
              placeholder="Descrição da imagem"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Legenda (opcional)</label>
            <Input
              value={block.caption || ''}
              onChange={(e) => handleUpdateCaption(e.target.value)}
              placeholder="Legenda da imagem"
            />
          </div>
          
          <div className="pt-2">
            {block.src ? (
              <div className="bg-gray-50 p-2 rounded-md">
                <img
                  src={block.src}
                  alt={block.alt || 'Imagem do produto'}
                  className="w-full h-auto max-h-64 object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-md relative">
                {uploading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div className="w-3/4 max-w-xs">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-center mt-1 text-muted-foreground">Enviando... {uploadProgress}%</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      id={`imageUpload-${block.id}`}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor={`imageUpload-${block.id}`} 
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                    >
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-gray-500 block">Clique para fazer upload</span>
                      <span className="text-xs text-gray-400 mt-2">ou insira uma URL acima</span>
                    </label>
                  </div>
                )}
              </div>
            )}
            
            {block.src && (
              <div className="mt-2 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUpdateSrc('')}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remover imagem
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default ImageBlock;
