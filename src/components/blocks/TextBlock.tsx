
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
  const { updateBlock, selectedBlockId, description } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  // Ensure the block has all required properties and fix if needed
  React.useEffect(() => {
    if (block && block.id) {
      // Check for missing properties and provide defaults if needed
      const updates: Partial<TextBlockType> = {};
      let hasUpdates = false;
      
      if (!block.heading) {
        updates.heading = description?.name ? description.name.replace('Descrição: ', '') : 'Título do Texto';
        hasUpdates = true;
      }
      
      if (!block.content) {
        updates.content = '<p>Insira o conteúdo aqui.</p>';
        hasUpdates = true;
      }
      
      if (!block.style || typeof block.style !== 'object') {
        updates.style = {};
        hasUpdates = true;
      }
      
      // Apply updates if any property was missing
      if (hasUpdates) {
        console.log(`Corrigindo propriedades ausentes no bloco de texto ${block.id}:`, updates);
        updateBlock(block.id, updates);
      }
    }
  }, [block?.id, block.heading, block.content, block.style, description, updateBlock]);
  
  // Safely get the block title or use fallback
  const blockTitle = block.heading || (description?.name ? description.name.replace('Descrição: ', '') : 'Título do Texto');
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleUpdateContent = (rawContent: string) => {
    // Convert line breaks to <br> tags and wrap in paragraph if needed
    let content = rawContent;
    
    // If content contains line breaks, convert them to <br> tags
    if (content.includes('\n')) {
      content = content.replace(/\n/g, '<br>');
    }
    
    // Wrap plain text in paragraph tags if it doesn't contain HTML
    if (!content.includes('<') && content.trim()) {
      content = `<p>${content}</p>`;
    } else if (content.trim() && !content.startsWith('<')) {
      content = `<p>${content}</p>`;
    }
    
    updateBlock(block.id, { content });
  };
  
  // Convert HTML to plain text for editing, preserving line breaks
  const getPlainTextContent = (html: string) => {
    if (!html) return '';
    const temp = document.createElement('div');
    temp.innerHTML = html;
    // Convert <br> tags back to line breaks for editing
    const textWithBreaks = temp.innerHTML.replace(/<br\s*\/?>/gi, '\n');
    temp.innerHTML = textWithBreaks;
    return temp.innerText;
  };
  
  // Handler for AI-generated content
  const handleGeneratedContent = (content: string) => {
    const formattedContent = content.startsWith('<') ? content : `<p>${content}</p>`;
    updateBlock(block.id, { content: formattedContent });
  };

  const handleGeneratedHeading = (heading: string) => {
    handleUpdateHeading(heading);
  };
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">{blockTitle}</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: sanitizeHtmlContent(block.content || '<p>Conteúdo não disponível</p>') }} 
            className="prose max-w-none" 
          />
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
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Título</label>
              <AIContentGenerator 
                onGeneratedContent={handleGeneratedHeading}
                type="title"
                placeholder="Descreva seu produto para gerar um título atrativo"
              />
            </div>
            <Input
              value={block.heading || blockTitle}
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
              value={getPlainTextContent(block.content || '')}
              onChange={(e) => handleUpdateContent(e.target.value)}
              placeholder="Digite o conteúdo do bloco de texto"
              rows={8}
            />
            <div className="mt-1 text-xs text-gray-500">
              Digite seu texto normalmente. Pressione Enter para quebras de linha.
            </div>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextBlock;
