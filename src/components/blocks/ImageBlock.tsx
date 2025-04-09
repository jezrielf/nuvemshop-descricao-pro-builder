
import React from 'react';
import { ImageBlock as ImageBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from 'lucide-react';

interface ImageBlockProps {
  block: ImageBlockType;
  isPreview?: boolean;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateSrc = (src: string) => {
    updateBlock(block.id, { src });
  };
  
  const handleUpdateAlt = (alt: string) => {
    updateBlock(block.id, { alt });
  };
  
  const handleUpdateCaption = (caption: string) => {
    updateBlock(block.id, { caption });
  };
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <figure className="text-center">
          {block.src ? (
            <img
              src={block.src}
              alt={block.alt || "Imagem do produto"}
              className="mx-auto max-w-full h-auto object-contain rounded-md"
            />
          ) : (
            <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
          )}
          {block.caption && (
            <figcaption className="mt-2 text-sm text-gray-600">{block.caption}</figcaption>
          )}
        </figure>
      </div>
    );
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="mb-4">
          {block.src ? (
            <img
              src={block.src}
              alt={block.alt || "Imagem do produto"}
              className="mx-auto max-w-full h-auto object-contain rounded-md mb-4"
            />
          ) : (
            <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md mb-4">
              <Image className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">URL da Imagem</label>
              <Input
                value={block.src}
                onChange={(e) => handleUpdateSrc(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Texto Alternativo</label>
              <Input
                value={block.alt}
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
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default ImageBlock;
