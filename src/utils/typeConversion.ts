
import { Block, BlockType } from '@/types/editor';

/**
 * Ensures a block object is properly typed with all required properties
 */
export function ensureBlockType(block: any): Block {
  if (!block || typeof block !== 'object') {
    console.error('Invalid block object provided:', block);
    throw new Error('Invalid block object');
  }
  
  if (!block.type || !block.id || block.visible === undefined) {
    console.error('Block missing required properties:', block);
    throw new Error('Block missing required properties');
  }
  
  // Ensure style exists
  if (!block.style) {
    block.style = {};
  }
  
  // Ensure columns exists
  if (!block.columns) {
    block.columns = 'full';
  }
  
  return block as Block;
}
