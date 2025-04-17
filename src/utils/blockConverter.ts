
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
  
  return blocks.map(block => {
    // Make a deep clone to avoid reference issues
    const blockCopy = JSON.parse(JSON.stringify(block));
    return ensureBlockType(blockCopy);
  });
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
  
  return parseTemplateBlocks(blocks);
}
