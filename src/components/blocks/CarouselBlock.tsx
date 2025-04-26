import React from 'react';
import { CarouselBlock as CarouselBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';

interface CarouselBlockProps {
  block: CarouselBlockType;
  isPreview?: boolean;
}

const CarouselBlock: React.FC<CarouselBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  if (isPreview) {
    return (
      <BlockWrapper block={block} isEditing={false}>
        <div className="carousel-container relative">
          {block.images && block.images.length > 0 && (
            <div className="carousel-track flex overflow-x-auto snap-x">
              {block.images.map((image) => (
                <div key={image.id} className="carousel-item w-full flex-shrink-0 snap-center">
                  <img 
                    src={image.src} 
                    alt={image.alt || ''} 
                    className="w-full h-auto object-cover aspect-video" 
                  />
                  {image.caption && (
                    <div className="text-center p-2 text-sm text-gray-600">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={true}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Configurações do Carrossel</h3>
        <p className="text-sm text-gray-500">
          Configure o carrossel adicionando e organizando imagens.
        </p>
        {/* Editor de carrosel será implementado aqui */}
      </div>
    </BlockWrapper>
  );
};

export default CarouselBlock;
