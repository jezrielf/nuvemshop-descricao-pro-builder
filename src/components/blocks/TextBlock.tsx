
import React from 'react';
import { TextBlock as TextBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AIContentGenerator from '../AIGenerator/AIContentGenerator';
import { sanitizeHtmlContent } from '@/utils/htmlParsers/analyzers/utils';

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
  
  const handleUpdateContent = (rawContent: string) => {
    // Wrap plain text in paragraph tags if it doesn't contain HTML
    const content = !rawContent.includes('<') 
      ? `<p>${rawContent}</p>` 
      : rawContent;
    updateBlock(block.id, { content });
  };
  
  // Convert HTML to plain text for editing
  const getPlainTextContent = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.innerText;
  };
  
  // Handler for AI-generated content
  const handleGeneratedContent = (content: string) => {
    const formattedContent = content.startsWith('<') ? content : `<p>${content}</p>`;
    handleUpdateContent(formattedContent);
  };

  const handleGeneratedHeading = (heading: string) => {
    handleUpdateHeading(heading);
  };
  
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{block.heading}</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(block.content) }} 
            className="prose max-w-none" 
          />
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
              value={getPlainTextContent(block.content)}
              onChange={(e) => handleUpdateContent(e.target.value)}
              placeholder="Digite o conteúdo do bloco de texto"
              rows={8}
            />
            <div className="mt-1 text-xs text-gray-500">
              Digite seu texto normalmente. A formatação será aplicada automaticamente.
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextBlock;
