
// Re-export block types explicitly to avoid ambiguity
export * from './base';
export * from './blocks';

// Re-export block specific types
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
export * from './blocks/ai';

// Uniquely name the BlockType exports to prevent conflicts
export type { BlockType as EditorBaseBlockType } from './base';
export type { BlockType as EditorUnionBlockType } from './blocks';
