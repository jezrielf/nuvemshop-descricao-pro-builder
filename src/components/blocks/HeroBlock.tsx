
import React from 'react';
import { HeroBlock as HeroBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface HeroBlockProps {
  block: HeroBlockType;
  isPreview?: boolean;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdate = (updates: Partial<HeroBlockType>) => {
    updateBlock(block.id, updates);
  };
  
  // Versão de visualização
  if (isPreview) {
    return (
      <div className="w-full p-8 bg-gray-100 text-center">
        <h1 className="text-3xl font-bold mb-4">{block.heading}</h1>
        <p className="text-lg mb-6">{block.subheading}</p>
        {block.buttonText && (
          <div>
            <button className="bg-brand-blue text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
              {block.buttonText}
            </button>
          </div>
        )}
      </div>
    );
  }
  
  // Versão de edição
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      {isEditing ? (
        <div className="space-y-4 p-4 border rounded-md bg-gray-50">
          <div>
            <Label htmlFor="heading">Título</Label>
            <Input
              id="heading"
              value={block.heading}
              onChange={(e) => handleUpdate({ heading: e.target.value })}
              placeholder="Título principal"
            />
          </div>
          
          <div>
            <Label htmlFor="subheading">Subtítulo</Label>
            <Textarea
              id="subheading"
              value={block.subheading}
              onChange={(e) => handleUpdate({ subheading: e.target.value })}
              placeholder="Adicione um subtítulo"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="buttonText">Texto do Botão</Label>
              <Input
                id="buttonText"
                value={block.buttonText || ''}
                onChange={(e) => handleUpdate({ buttonText: e.target.value })}
                placeholder="Comprar Agora"
              />
            </div>
            
            <div>
              <Label htmlFor="buttonUrl">URL do Botão</Label>
              <Input
                id="buttonUrl"
                value={block.buttonUrl || ''}
                onChange={(e) => handleUpdate({ buttonUrl: e.target.value })}
                placeholder="#"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 border rounded-md">
          <h1 className="text-xl font-semibold">{block.heading}</h1>
          <p className="text-gray-600 mt-2">{block.subheading}</p>
          {block.buttonText && (
            <div className="mt-3">
              <Button size="sm" variant="outline">
                {block.buttonText}
              </Button>
            </div>
          )}
        </div>
      )}
    </BlockWrapper>
  );
};

export default HeroBlock;
