
import React from 'react';
import { TextBlock as TextBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AIContentGenerator from '../AIGenerator/AIContentGenerator';

interface TextBlockProps {
  block: TextBlockType;
  isPreview?: boolean;
}

const TextBlock: React.FC<TextBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleUpdateContent = (content: string) => {
    updateBlock(block.id, { content });
  };
  
  // Handler para conteúdo gerado por IA
  const handleGeneratedContent = (content: string) => {
    handleUpdateContent(content);
  };

  // Handler para título gerado por IA
  const handleGeneratedHeading = (heading: string) => {
    handleUpdateHeading(heading);
  };
  
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{block.heading}</h2>
          <div dangerouslySetInnerHTML={{ __html: block.content }} className="prose max-w-none" />
        </div>
      </div>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Título</label>
              <AIContentGenerator 
                onGeneratedContent={handleGeneratedHeading}
                type="title"
                placeholder="Descreva seu produto para gerar um título atrativo"
              />
            </div>
            <Input
              value={block.heading}
              onChange={(e) => handleUpdateHeading(e.target.value)}
              placeholder="Digite o título do bloco de texto"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Conteúdo</label>
              <AIContentGenerator 
                onGeneratedContent={handleGeneratedContent}
                type="description"
                placeholder="Descreva seu produto para gerar uma descrição persuasiva"
              />
            </div>
            <Textarea
              value={block.content}
              onChange={(e) => handleUpdateContent(e.target.value)}
              placeholder="Digite o conteúdo do bloco de texto"
              rows={8}
            />
            <div className="mt-1 text-xs text-gray-500">
              Você pode usar HTML básico para formatação como &lt;b&gt;negrito&lt;/b&gt;, &lt;i&gt;itálico&lt;/i&gt;, &lt;br&gt; para quebra de linha, etc.
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextBlock;
