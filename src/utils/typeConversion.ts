import { Block, BlockType } from '@/types/editor';

// Ensures that the given block has all the required properties for its type
export function ensureBlockType(block: any): Block {
  // Validate basic block properties
  if (!block.id || !block.type || !block.title) {
    console.warn('Block is missing required properties:', block);
  }

  // Make sure basic properties have default values
  const ensuredBlock = {
    ...block,
    id: block.id || `generated-${Date.now()}`,
    title: block.title || 'Block',
    columns: block.columns || 'full',
    visible: block.visible !== undefined ? block.visible : true,
    style: block.style || {}
  };

  return ensuredBlock as Block;
}

// Convert from one block type to another
export function convertBlockType(block: Block, newType: BlockType): Block {
  return {
    ...block,
    type: newType,
    // Reset type-specific properties
    // We keep common properties like id, title, columns, visible, style
  };
}
