
import React from 'react';
import { GalleryBlock as GalleryBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface GalleryBlockProps {
  block: GalleryBlockType;
  isPreview?: boolean;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  if (isPreview) {
    return (
      <BlockWrapper block={block} isEditing={false}>
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-4">
          {block.images?.map((image) => (
            <div key={image.id} className="relative aspect-square">
              <img 
                src={image.src} 
                alt={image.alt || ''} 
                className="w-full h-full object-cover rounded-md" 
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={true}>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Configurações da Galeria</h3>
        <p className="text-sm text-gray-500">
          Configure a galeria adicionando e organizando imagens.
        </p>
        {/* Editor de galeria será implementado aqui */}
      </div>
    </BlockWrapper>
  );
};

export default GalleryBlock;
