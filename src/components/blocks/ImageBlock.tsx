
import React from 'react';
import { ImageBlock as ImageBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Image } from 'lucide-react';
import ImageLibrary from '../ImageLibrary/ImageLibrary';

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
  
  const handleSelectFromLibrary = (imageUrl: string, alt: string) => {
    updateBlock(block.id, { 
      src: imageUrl,
      alt: alt 
    });
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
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <span className="text-gray-500 block">Adicione uma URL de imagem</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default ImageBlock;
