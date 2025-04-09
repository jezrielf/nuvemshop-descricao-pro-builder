
import React from 'react';
import { CTABlock as CTABlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CTABlockProps {
  block: CTABlockType;
  isPreview?: boolean;
}

const CTABlock: React.FC<CTABlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleUpdateContent = (content: string) => {
    updateBlock(block.id, { content });
  };
  
  const handleUpdateButtonText = (buttonText: string) => {
    updateBlock(block.id, { buttonText });
  };
  
  const handleUpdateButtonUrl = (buttonUrl: string) => {
    updateBlock(block.id, { buttonUrl });
  };
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-3">{block.heading}</h2>
          <div className="mb-6 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: block.content }} />
          <Button size="lg" className="font-medium">
            {block.buttonText}
          </Button>
        </div>
      </div>
    );
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Título</label>
            <Input
              value={block.heading}
              onChange={(e) => handleUpdateHeading(e.target.value)}
              placeholder="Digite o título da chamada"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Conteúdo</label>
            <Textarea
              value={block.content}
              onChange={(e) => handleUpdateContent(e.target.value)}
              placeholder="Digite o conteúdo da chamada"
              rows={3}
            />
            <div className="mt-1 text-xs text-gray-500">
              Você pode usar HTML básico para formatação.
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Texto do Botão</label>
            <Input
              value={block.buttonText}
              onChange={(e) => handleUpdateButtonText(e.target.value)}
              placeholder="Ex: Comprar Agora"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">URL do Botão (opcional)</label>
            <Input
              value={block.buttonUrl || ''}
              onChange={(e) => handleUpdateButtonUrl(e.target.value)}
              placeholder="https://exemplo.com/produto"
            />
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default CTABlock;
