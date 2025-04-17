
import { Block } from '@/types/editor';
import { ensureBlockType } from './typeConversion';

/**
 * Parses template blocks to ensure they have all required properties
 * for their specific block type.
 */
export function parseTemplateBlocks(blocks: any[]): Block[] {
  if (!Array.isArray(blocks)) {
    console.warn('Invalid blocks data provided:', blocks);
    return [];
  }
  
  try {
    return blocks.map(block => {
      // Make a deep clone to avoid reference issues
      const blockCopy = JSON.parse(JSON.stringify(block));
      return ensureBlockType(blockCopy);
    });
  } catch (error) {
    console.error('Error parsing template blocks:', error);
    return [];
  }
}

/**
 * Converts blocks to ensure they conform to the Block type
 * Used when adding blocks to templates or when loading templates
 */
export function convertBlocks(blocks: any[]): Block[] {
  if (!Array.isArray(blocks)) {
    console.warn('Invalid blocks data provided to convertBlocks:', blocks);
    return [];
  }
  
  try {
    // Deep clone the blocks to avoid reference issues
    const blocksCopy = JSON.parse(JSON.stringify(blocks));
    return parseTemplateBlocks(blocksCopy);
  } catch (error) {
    console.error('Error converting blocks:', error);
    return [];
  }
}
