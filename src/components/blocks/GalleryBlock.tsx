
import React from 'react';
import { GalleryBlock as GalleryBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, PlusCircle, Image, MoveLeft, MoveRight } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GalleryBlockProps {
  block: GalleryBlockType;
  isPreview?: boolean;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
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
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-32 ${imageObjectFit} mb-3 rounded-md`}
                />
              ) : (
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center mb-3 rounded-md">
                  <Image className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
              <div className="space-y-3">
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
