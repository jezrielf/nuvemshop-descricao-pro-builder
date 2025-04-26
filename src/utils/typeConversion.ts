
import { Block } from '@/types/editor';

/**
 * Ensures a block conforms to the Block type.
 * Useful when working with blocks from APIs or unknown sources.
 */
export const ensureBlockType = (block: any): Block => {
  if (!block || typeof block !== 'object' || !block.type) {
    throw new Error('Invalid block: Missing required properties');
  }
  
  return block as Block;
};
