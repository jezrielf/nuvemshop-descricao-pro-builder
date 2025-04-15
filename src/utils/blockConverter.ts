
import { Block } from '@/types/editor';
import { ensureBlockType } from './typeConversion';

/**
 * Parses template blocks to ensure they have all required properties
 * for their specific block type.
 */
export function parseTemplateBlocks(blocks: any[]): Block[] {
  return blocks.map(block => ensureBlockType(block));
}

/**
 * Converts blocks to ensure they conform to the Block type
 * Used when adding blocks to templates or when loading templates
 */
export function convertBlocks(blocks: any[]): Block[] {
  return parseTemplateBlocks(blocks);
}
