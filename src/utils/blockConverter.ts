
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
  return blocks.map(block => ensureBlockType(block));
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
