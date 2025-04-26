
import { Block } from '@/types/editor';

/**
 * Ensures that a block object conforms to the Block type
 * This is useful when dealing with blocks that might come from external sources or JSON
 */
export function ensureBlockType(block: any): Block {
  if (!block) {
    throw new Error('Cannot convert null or undefined to Block type');
  }
  
  // Basic validation to ensure it has the minimum required properties
  if (!block.id || !block.type) {
    throw new Error('Invalid block: missing required properties');
  }
  
  return block as Block;
}
