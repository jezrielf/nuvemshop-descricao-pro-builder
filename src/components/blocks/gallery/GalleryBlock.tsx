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
import { deepClone } from '@/utils/deepClone';

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
    
    // Create deep copy of current images to prevent reference sharing
    const currentImages = deepClone(block.images || []);
    updateBlock(block.id, {
      images: [...currentImages, newImage]
    });
  };
  
  const handleUpdateImage = (imageId: string, field: 'src' | 'alt' | 'caption', value: string) => {
    // Create deep copy of current images to prevent reference sharing
    const currentImages = deepClone(block.images || []);
    
    const updatedImages = currentImages.map(image => {
      if (image.id === imageId) {
        return { ...image, [field]: value };
      }
      return image;
    });
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const handleRemoveImage = (imageId: string) => {
    // Create deep copy and filter to prevent reference sharing
    const currentImages = deepClone(block.images || []);
    const updatedImages = currentImages.filter(image => image.id !== imageId);
    updateBlock(block.id, { images: updatedImages });
  };
  
  const handleMoveImage = (imageId: string, direction: 'left' | 'right') => {
    // Create deep copy of current images to prevent reference sharing
    const currentImages = deepClone(block.images || []);
    const currentIndex = currentImages.findIndex(img => img.id === imageId);
    
    if (
      (direction === 'left' && currentIndex <= 0) || 
      (direction === 'right' && currentIndex >= currentImages.length - 1)
    ) {
      return;
    }
    
    const newImages = [...currentImages];
    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    
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
    
    // Create deep copy of current images to prevent reference sharing
    const currentImages = deepClone(block.images || []);
    const updatedImages = currentImages.map(image => {
      if (image.id === imageId) {
        return { ...image, src: imageUrl, alt: alt || 'Imagem da galeria' };
      }
      return image;
    });
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const imageFitValue = block.style?.imageFit || 'contain';
  const imageObjectFit = imageFitValue === 'cover' ? 'object-cover' : 'object-contain';
  
  if (isPreview) {
    return <GalleryPreview block={block} />;
  }
  
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
