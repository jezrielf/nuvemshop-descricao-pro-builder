
import React from 'react';
import { TextBlock as TextBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editorStore';
import { Textarea } from '@/components/ui/textarea';

interface TextBlockProps {
  block: TextBlockType;
  isPreview?: boolean;
}

export const TextBlock: React.FC<TextBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdate = (content: string) => {
    updateBlock(block.id, { content });
  };
  
  // Versão de visualização
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div dangerouslySetInnerHTML={{ __html: block.content }} />
      </div>
    );
  }
  
  // Versão de edição
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      {isEditing ? (
        <div className="p-4 border rounded-md bg-gray-50">
          <Textarea
            value={block.content}
            onChange={(e) => handleUpdate(e.target.value)}
            placeholder="Digite o conteúdo textual aqui..."
            rows={6}
            className="w-full"
          />
          <div className="mt-2 text-xs text-gray-500">
            Dica: Você pode usar HTML básico como &lt;b&gt;, &lt;i&gt;, &lt;a&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;br&gt;.
          </div>
        </div>
      ) : (
        <div className="p-4 border rounded-md">
          <div dangerouslySetInnerHTML={{ __html: block.content }} />
        </div>
      )}
    </BlockWrapper>
  );
};

export default TextBlock;
