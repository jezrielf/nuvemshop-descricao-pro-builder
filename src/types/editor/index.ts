
// Re-export from base
export * from './base';

// Re-export from blocks directory - this will be our canonical source for Block types
export * from './blocks';

// Add explicit exports for all block types
export { Block } from './blocks';
export { TextBlock } from './blocks/text';
export { HeroBlock } from './blocks/hero';
export { ImageBlock } from './blocks/image';
export { VideoBlock } from './blocks/video';
export { CTABlock } from './blocks/cta';
export { FAQBlock } from './blocks/faq';
export { GalleryBlock } from './blocks/gallery';
export { FeaturesBlock } from './blocks/features';
export { BenefitsBlock } from './blocks/benefits';
export { ImageTextBlock } from './blocks/imageText';
export { TextImageBlock } from './blocks/textImage';
export { TextVideoBlock } from './blocks/textVideo';
export { VideoTextBlock } from './blocks/videoText';
export { CarouselBlock } from './blocks/carousel';
export { SpecificationsBlock } from './blocks/specifications';

// Export base types explicitly by name to ensure they're available
export { Template, ProductDescription, BlockType, ColumnLayout, BlockStyle, BlockBase, BlockSpacing } from './base';

// Also export any utility types from other editor-related type files
export * from './products';
