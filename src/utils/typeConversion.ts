import { Block, ProductDescription } from '@/types/editor';

/**
 * Ensures a block is properly typed
 * This helps when blocks might not have the correct type information
 */
export function ensureBlockType(block: any): Block {
  // If the block already looks like a Block, return it
  if (block && block.type && block.id && typeof block.visible === 'boolean') {
    return block as Block;
  }
  
  // Otherwise, try to convert it
  console.warn('Block is not properly typed:', block);
  return {
    ...block,
    id: block.id || 'unknown-id',
    type: block.type || 'text',
    visible: block.visible ?? true,
    columns: block.columns || 'full',
    style: block.style || {},
  } as Block;
}

/**
 * Ensures a product description is properly typed
 */
export function ensureProductDescription(description: any): ProductDescription {
  if (!description) {
    throw new Error('Description is null or undefined');
  }
  
  return {
    ...description,
    id: description.id || 'unknown-id',
    name: description.name || 'Untitled Description',
    blocks: Array.isArray(description.blocks) ? description.blocks : [],
    createdAt: description.createdAt || new Date().toISOString(),
    updatedAt: description.updatedAt || new Date().toISOString(),
    category: description.category || undefined,
  };
}
