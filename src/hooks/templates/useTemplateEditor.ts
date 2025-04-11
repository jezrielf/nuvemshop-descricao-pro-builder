
import { useState, useCallback } from 'react';
import { Template, BlockType } from '@/types/editor';
import { ProductCategory } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

export function useTemplateEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<Template> | null>({
    name: '',
    category: 'other' as ProductCategory,
    blocks: []
  });

  const handleAddBlock = useCallback((blockType: BlockType) => {
    const block = createBlock(blockType, 1);
    if (block) {
      if (editedTemplate) {
        setEditedTemplate({
          ...editedTemplate,
          blocks: [...editedTemplate.blocks, block]
        });
      } else if (newTemplate) {
        setNewTemplate({
          ...newTemplate,
          blocks: [...(newTemplate.blocks || []), block]
        });
      }
    }
  }, [editedTemplate, newTemplate]);

  const handleRemoveBlock = useCallback((blockId: string) => {
    if (editedTemplate) {
      setEditedTemplate({
        ...editedTemplate,
        blocks: editedTemplate.blocks.filter(block => block.id !== blockId)
      });
    } else if (newTemplate && newTemplate.blocks) {
      setNewTemplate({
        ...newTemplate,
        blocks: newTemplate.blocks.filter(block => block.id !== blockId)
      });
    }
  }, [editedTemplate, newTemplate]);

  return {
    selectedTemplate,
    setSelectedTemplate,
    editedTemplate,
    setEditedTemplate,
    newTemplate,
    setNewTemplate,
    handleAddBlock,
    handleRemoveBlock
  };
}
