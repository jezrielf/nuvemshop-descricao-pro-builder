
import { useState, useCallback } from 'react';
import { Template, Block, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '@/utils/blockCreators';

export function useTemplateEditor() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<Template> | null>({
    name: '',
    category: 'supplements',
    blocks: []
  });

  const handleAddBlock = useCallback((type: BlockType) => {
    if (editedTemplate) {
      // Add block to edited template
      const newBlock = createBlock(type);
      setEditedTemplate({
        ...editedTemplate,
        blocks: [...editedTemplate.blocks, newBlock]
      });
    } else if (newTemplate) {
      // Add block to new template
      const newBlock = createBlock(type);
      setNewTemplate({
        ...newTemplate,
        blocks: [...(newTemplate.blocks || []), newBlock]
      });
    }
  }, [editedTemplate, newTemplate]);

  const handleRemoveBlock = useCallback((blockId: string) => {
    if (editedTemplate) {
      // Remove block from edited template
      setEditedTemplate({
        ...editedTemplate,
        blocks: editedTemplate.blocks.filter(block => block.id !== blockId)
      });
    } else if (newTemplate) {
      // Remove block from new template
      setNewTemplate({
        ...newTemplate,
        blocks: (newTemplate.blocks || []).filter(block => block.id !== blockId)
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
