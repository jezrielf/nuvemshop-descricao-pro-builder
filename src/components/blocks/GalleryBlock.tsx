
import React, { useState } from 'react';
import { GalleryBlock as GalleryBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, PlusCircle, Image, MoveLeft, MoveRight, Upload, Loader2, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ImageLibrary from '../ImageLibrary/ImageLibrary';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';

interface GalleryBlockProps {
  block: GalleryBlockType;
  isPreview?: boolean;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { toast } = useToast();
  const auth = useAuth();
  
  const handleAddImage = () => {
    const newImage = {
      id: uuidv4(),
      src: '',
      alt: 'Imagem da galeria',
      caption: ''
    };
    
    updateBlock(block.id, {
      images: [...(block.images || []), newImage]
    });
  };
  
  const handleUpdateImage = (imageId: string, field: 'src' | 'alt' | 'caption', value: string) => {
    const updatedImages = block.images.map(image => {
      if (image.id === imageId) {
        return { ...image, [field]: value };
      }
      return image;
    });
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const handleRemoveImage = (imageId: string) => {
    const updatedImages = block.images.filter(image => image.id !== imageId);
    updateBlock(block.id, { images: updatedImages });
  };
  
  const handleMoveImage = (imageId: string, direction: 'left' | 'right') => {
    const currentIndex = block.images.findIndex(img => img.id === imageId);
    if (
      (direction === 'left' && currentIndex <= 0) || 
      (direction === 'right' && currentIndex >= block.images.length - 1)
    ) {
      return;
    }
    
    const newImages = [...block.images];
    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    
    const temp = newImages[currentIndex];
    newImages[currentIndex] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    
    updateBlock(block.id, { images: newImages });
  };
  
  const handleImageFitChange = (value: string) => {
    const currentStyle = block.style || {};
    updateBlock(block.id, { 
      style: {
        ...currentStyle, 
        imageFit: value as 'contain' | 'cover'
      }
    });
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
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
    
    setUploading(prev => ({ ...prev, [imageId]: true }));
    setUploadProgress(prev => ({ ...prev, [imageId]: 0 }));
    
    try {
      // Create a unique file name to avoid conflicts
      const fileExt = file.name.split('.').pop();
      const fileAlt = file.name.split('.')[0] || 'gallery-image';
      const fileName = `${Date.now()}_${fileAlt}.${fileExt}`;
      const filePath = `${auth.user.id}/${fileName}`;
      
      // Upload the file with progress tracking
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(prev => ({ 
              ...prev, 
              [imageId]: Math.round(percent)
            }));
          },
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL
      const { data: fileUrl } = supabase
        .storage
        .from('user-images')
        .getPublicUrl(filePath);
      
      // Update the gallery image
      handleUpdateImage(imageId, 'src', fileUrl.publicUrl);
      handleUpdateImage(imageId, 'alt', fileAlt);
      
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
      setUploading(prev => {
        const newState = { ...prev };
        delete newState[imageId];
        return newState;
      });
      
      setUploadProgress(prev => {
        const newState = { ...prev };
        delete newState[imageId];
        return newState;
      });
      
      // Reset the file input
      e.target.value = '';
    }
  };
  
  const handleSelectImageFromLibrary = (imageId: string, imageUrl: string, alt: string) => {
    // Update the specific image in the gallery
    const updatedImages = block.images.map(image => {
      if (image.id === imageId) {
        return { ...image, src: imageUrl, alt: alt };
      }
      return image;
    });
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className={`grid grid-cols-1 gap-4 ${block.columns > 1 ? `md:grid-cols-${block.columns}` : ''}`}>
          {block.images && block.images.map(image => (
            <figure key={image.id} className="text-center">
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-auto ${imageObjectFit} rounded-md`}
                />
              ) : (
                <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
              )}
              {image.caption && (
                <figcaption className="mt-2 text-sm text-gray-600">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    );
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Imagens da Galeria</h3>
            <div>
              <label className="text-xs mr-2">Preenchimento da Imagem:</label>
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
          
          {block.images && block.images.map((image, index) => (
            <div key={image.id} className="p-3 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Imagem {index + 1}</span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveImage(image.id, 'left')}
                    disabled={index === 0}
                  >
                    <MoveLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveImage(image.id, 'right')}
                    disabled={index === block.images.length - 1}
                  >
                    <MoveRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {image.src ? (
                <div className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-32 ${imageObjectFit} mb-3 rounded-md`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUpdateImage(image.id, 'src', '')}
                    className="absolute top-1 right-1 bg-white/80 hover:bg-white/90 h-8 w-8 p-0 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center mb-3 rounded-md relative">
                  {uploading[image.id] ? (
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                      <div className="w-3/4 max-w-xs">
                        <Progress value={uploadProgress[image.id] || 0} className="h-2" />
                        <p className="text-xs text-center mt-1 text-muted-foreground">
                          Enviando... {uploadProgress[image.id] || 0}%
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id={`galleryImageUpload-${image.id}`}
                        className="hidden"
                        onChange={(e) => handleFileChange(e, image.id)}
                      />
                      <label 
                        htmlFor={`galleryImageUpload-${image.id}`} 
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                      >
                        <Upload className="h-6 w-6 text-gray-400 mb-1" />
                        <span className="text-sm text-gray-500 block">Clique para fazer upload</span>
                      </label>
                    </>
                  )}
                </div>
              )}
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1">URL da Imagem</label>
                  <div className="flex gap-2">
                    <Input
                      value={image.src}
                      onChange={(e) => handleUpdateImage(image.id, 'src', e.target.value)}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                    <ImageLibrary 
                      onSelectImage={(url, alt) => handleSelectImageFromLibrary(image.id, url, alt)}
                      trigger={
                        <Button variant="outline" size="icon">
                          <Image className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs mb-1">Texto Alternativo</label>
                  <Input
                    value={image.alt}
                    onChange={(e) => handleUpdateImage(image.id, 'alt', e.target.value)}
                    placeholder="Descrição da imagem"
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1">Legenda (opcional)</label>
                  <Input
                    value={image.caption || ''}
                    onChange={(e) => handleUpdateImage(image.id, 'caption', e.target.value)}
                    placeholder="Legenda da imagem"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={handleAddImage}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Adicionar Imagem
          </Button>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default GalleryBlock;
