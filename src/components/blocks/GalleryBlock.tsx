
import React from 'react';
import { GalleryBlock as GalleryBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, PlusCircle, Image } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import ImageLibrary from '@/components/ImageLibrary/ImageLibrary';

interface GalleryBlockProps {
  block: GalleryBlockType;
  isPreview?: boolean;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateHeading = (heading?: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleAddImage = () => {
    const newImage = {
      id: uuidv4(),
      src: 'https://via.placeholder.com/300x200',
      alt: 'Nova imagem',
      caption: 'Legenda da imagem'
    };
    
    updateBlock(block.id, {
      images: [...(block.images || []), newImage]
    });
  };
  
  const handleUpdateImage = (imageId: string, field: 'src' | 'alt' | 'caption', value: string) => {
    const updatedImages = block.images.map(img => {
      if (img.id === imageId) {
        return { ...img, [field]: value };
      }
      return img;
    });
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  const handleRemoveImage = (imageId: string) => {
    const updatedImages = block.images.filter(img => img.id !== imageId);
    updateBlock(block.id, { images: updatedImages });
  };
  
  const handleSelectFromLibrary = (imageId: string, imageUrl: string, alt: string) => {
    const updatedImages = block.images.map(img => {
      if (img.id === imageId) {
        return { 
          ...img,
          src: imageUrl,
          alt: alt 
        };
      }
      return img;
    });
    
    updateBlock(block.id, { images: updatedImages });
  };
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        {block.heading && <h2 className="text-2xl font-bold mb-4">{block.heading}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {block.images && block.images.map(image => (
            <div key={image.id} className="relative">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-56 object-cover rounded-md"
              />
              {image.caption && (
                <p className="text-sm text-gray-600 mt-1">{image.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Título da Galeria (opcional)</label>
          <Input
            value={block.heading || ''}
            onChange={(e) => handleUpdateHeading(e.target.value)}
            placeholder="Digite o título da galeria"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Imagens da Galeria</h3>
          
          {block.images && block.images.map(image => (
            <div key={image.id} className="p-3 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <div>
                  {image.src ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-md">
                      <Image className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-2 mb-2">
                  <ImageLibrary onSelectImage={(imageUrl, alt) => handleSelectFromLibrary(image.id, imageUrl, alt)} />
                </div>
                
                <div>
                  <label className="block text-xs mb-1">URL da Imagem</label>
                  <Input
                    value={image.src}
                    onChange={(e) => handleUpdateImage(image.id, 'src', e.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
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
