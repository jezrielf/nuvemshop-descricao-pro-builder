
import React from 'react';
import { GalleryBlock as GalleryBlockType } from '@/types/editor';
import BlockWrapper from '../BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import GalleryPreview from './components/GalleryPreview';
import GalleryImageForm from './components/GalleryImageForm';
import GallerySettings from './components/GallerySettings';
import { useGalleryUpload } from '@/hooks/useGalleryUpload';

interface GalleryBlockProps {
  block: GalleryBlockType;
  isPreview?: boolean;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  const { uploading, uploadProgress, handleFileChange } = useGalleryUpload();
  
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
    
    // Trocar posições
    [newImages[currentIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[currentIndex]];
    
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
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, imageId: string) => {
    try {
      const result = await handleFileChange(e, imageId);
      if (result) {
        // Atualizar a imagem da galeria com URL e alt retornados
        handleUpdateImage(imageId, 'src', result.url);
        handleUpdateImage(imageId, 'alt', result.alt || 'Imagem da galeria');
        console.log("Upload concluído, imagem atualizada:", result);
      }
    } catch (error) {
      console.error("Erro ao processar upload:", error);
    }
  };
  
  const handleSelectImageFromLibrary = (imageId: string, imageUrl: string, alt: string) => {
    console.log("Selecionada imagem da biblioteca:", { imageId, imageUrl, alt });
    // Atualizar a imagem específica na galeria
    const updatedImages = block.images.map(image => {
      if (image.id === imageId) {
        return { ...image, src: imageUrl, alt: alt || 'Imagem da galeria' };
      }
      return image;
    });
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  // Modo de pré-visualização
  if (isPreview) {
    return <GalleryPreview block={block} />;
  }
  
  // Modo de edição
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="space-y-4">
          <GallerySettings 
            imageFit={imageFitValue}
            onImageFitChange={handleImageFitChange}
          />
          
          {block.images && block.images.map((image, index) => (
            <GalleryImageForm
              key={image.id}
              image={image}
              index={index}
              totalImages={block.images.length}
              imageObjectFit={imageObjectFit}
              uploading={!!uploading[image.id]}
              uploadProgress={uploadProgress[image.id] || 0}
              onUpdateImage={handleUpdateImage}
              onRemoveImage={handleRemoveImage}
              onMoveImage={handleMoveImage}
              onFileChange={handleFileUpload}
              onSelectImageFromLibrary={handleSelectImageFromLibrary}
            />
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
