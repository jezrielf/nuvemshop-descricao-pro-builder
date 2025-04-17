
import { Block } from '@/types/editor/blocks';
import { BlockBase } from '@/types/editor/base';

/**
 * Ensures a block from any source is properly typed according to the blocks/index.ts type definitions
 * This helps resolve inconsistencies between types from different modules
 */
export function ensureBlockType(block: BlockBase | Block): Block {
  // Clone the block to avoid reference issues
  const typedBlock = { ...block } as Block;
  
  // Handle special cases for specific block types
  if (typedBlock.type === 'video' && (typedBlock as any).autoplay === undefined) {
    (typedBlock as any).autoplay = true; // Set default value if missing
  }
  
  if (typedBlock.type === 'benefits') {
    // Make sure all benefits have an icon
    const benefitsBlock = typedBlock as any;
    if (benefitsBlock.benefits) {
      benefitsBlock.benefits = benefitsBlock.benefits.map((benefit: any) => ({
        ...benefit,
        icon: benefit.icon || '✓' // Set default icon if missing
      }));
    }
  }
  
  if (typedBlock.type === 'features') {
    // Make sure all features have an icon
    const featuresBlock = typedBlock as any;
    if (featuresBlock.features) {
      featuresBlock.features = featuresBlock.features.map((feature: any) => ({
        ...feature,
        icon: feature.icon || '✓' // Set default icon if missing
      }));
    }
  }
  
  return typedBlock as Block;
}

/**
 * Convert an array of blocks to ensure they're all properly typed
 */
export function ensureBlocksArray(blocks: (BlockBase | Block)[]): Block[] {
  return blocks.map(ensureBlockType);
}
