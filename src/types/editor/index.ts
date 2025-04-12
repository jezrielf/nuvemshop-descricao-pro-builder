// Re-export block types in a safer way to avoid ambiguity
export * from './blocks/text';
export * from './blocks/hero';
export * from './blocks/features';
export * from './blocks/benefits';
export * from './blocks/image';
export * from './blocks/gallery';
export * from './blocks/imageText';
export * from './blocks/textImage';
export * from './blocks/faq';
export * from './blocks/cta';
export * from './blocks/specifications';

// We'll handle the AI block re-export carefully
export type { AIBlock } from './blocks/ai';

// Handle the conflicting BlockType exports differently
// Don't re-export BlockType from './base' directly
// Instead, import and export with a different name
import type { BlockType as BaseBlockType } from './base';
export type { BaseBlockType };

// Import BlockType from './blocks' and export it both as BlocksType and BlockType
// This maintains backward compatibility with existing code
import type { BlockType } from './blocks';
export type { BlockType };  // Re-export with original name for compatibility
export type { BlockType as BlocksType };  // Also export as BlocksType

// Re-export Block from './blocks'
export type { Block } from './blocks';

// Other exports from base that don't conflict
export type {
  ColumnLayout,
  TextAlign,
  SpacingSize,
  FontSize,
  BlockSpacing,
  FontWeight,
  FontStyle,
  TextDecoration,
  ImageFit,
  BlockStyle,
  BlockBase,
  ProductCategory,
  ProductDescription,
  Template
} from './base';
