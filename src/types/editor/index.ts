
// Re-export from base
export type { 
  BlockBase,
  BlockStyle,
  ProductDescription,
  Template,
  ProductCategory,
  ColumnLayout,
  BlockSpacing,
  BlockType
} from './base';

// Re-export from blocks directory
export * from './blocks';

// Re-export from products.ts
export * from './products';

// Explicitly re-export all block types
export type {
  VideoBlock,
  HeroBlock,
  TextBlock,
  FeaturesBlock,
  BenefitsBlock,
  SpecificationsBlock,
  ImageBlock,
  GalleryBlock,
  ImageTextBlock, 
  TextImageBlock,
  FAQBlock,
  CTABlock,
} from './blocks';
