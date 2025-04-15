
import { Block as IndexBlock } from '@/types/editor/blocks';
import { Block as BaseBlock } from '@/types/editor/base';
import { ensureBlockType } from './typeConversion';

/**
 * Converts blocks between different module import types
 */
export function convertBlocks<T extends IndexBlock[] | BaseBlock[]>(blocks: T): any[] {
  return blocks.map(block => ({
    ...block
  }));
}

/**
 * Safely parse Template blocks to ensure they match the expected type
 */
export function parseTemplateBlocks(blocks: any[]): IndexBlock[] {
  return blocks.map(ensureBlockType);
}
