
// Re-export from base
export * from './base';

// Re-export from blocks directory - this will be our canonical source for Block types
export * from './blocks';

// Add explicit exports for all block types
export { type Block } from './blocks';
export { type TextBlock } from './blocks/text';
export { type HeroBlock } from './blocks/hero';
export { type ImageBlock } from './blocks/image';
export { type VideoBlock } from './blocks/video';
export { type CTABlock } from './blocks/cta';
export { type FAQBlock } from './blocks/faq';
export { type GalleryBlock } from './blocks/gallery';
export { type FeaturesBlock } from './blocks/features';
export { type BenefitsBlock } from './blocks/benefits';
export { type ImageTextBlock } from './blocks/imageText';
export { type TextImageBlock } from './blocks/textImage';
export { type TextVideoBlock } from './blocks/textVideo';
export { type VideoTextBlock } from './blocks/videoText';
export { type CarouselBlock } from './blocks/carousel';
export { type SpecificationsBlock } from './blocks/specifications';

// Explicitly export base types to ensure they're available
export { 
  type Template, 
  type ProductDescription, 
  type BlockType, 
  type ColumnLayout, 
  type BlockStyle, 
  type BlockBase, 
  type BlockSpacing 
} from './base';

// Also export any utility types from other editor-related type files
export * from './products';
