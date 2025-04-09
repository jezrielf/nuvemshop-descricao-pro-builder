
import React from 'react';
import { TextImageBlock as TextImageBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Image } from 'lucide-react';

interface TextImageBlockProps {
  block: TextImageBlockType;
  isPreview?: boolean;
}

const TextImageBlock: React.FC<TextImageBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateImageSrc = (src: string) => {
    updateBlock(block.id, { image: { ...block.image, src } });
  };
  
  const handleUpdateImageAlt = (alt: string) => {
    updateBlock(block.id, { image: { ...block.image, alt } });
  };
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleUpdateContent = (content: string) => {
    updateBlock(block.id, { content });
  };
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-3">{block.heading}</h2>
            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: block.content }} />
          </div>
          <div className="md:w-1/2">
            {block.image.src ? (
              <img
                src={block.image.src}
                alt={block.image.alt || "Imagem do produto"}
                className="w-full h-auto object-cover rounded-md"
              />
            ) : (
              <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md">
                <Image className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Texto</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1">Título</label>
                <Input
                  value={block.heading}
                  onChange={(e) => handleUpdateHeading(e.target.value)}
                  placeholder="Título da seção"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1">Conteúdo</label>
                <Textarea
                  value={block.content}
                  onChange={(e) => handleUpdateContent(e.target.value)}
                  placeholder="Conteúdo da seção"
                  rows={6}
                />
                <div className="mt-1 text-xs text-gray-500">
                  Você pode usar HTML básico para formatação.
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Imagem</h3>
            {block.image.src ? (
              <img
                src={block.image.src}
                alt={block.image.alt || "Imagem do produto"}
                className="w-full h-auto max-h-48 object-contain rounded-md mb-2"
              />
            ) : (
              <div className="bg-gray-100 aspect-video flex items-center justify-center rounded-md mb-2">
                <Image className="h-12 w-12 text-gray-400" />
              </div>
            )}
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs mb-1">URL da Imagem</label>
                <Input
                  value={block.image.src}
                  onChange={(e) => handleUpdateImageSrc(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              
              <div>
                <label className="block text-xs mb-1">Texto Alternativo</label>
                <Input
                  value={block.image.alt}
                  onChange={(e) => handleUpdateImageAlt(e.target.value)}
                  placeholder="Descrição da imagem"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextImageBlock;
