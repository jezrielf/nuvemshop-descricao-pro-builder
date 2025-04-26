
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

// Re-export from blocks directory - this will be our canonical source for Block types
export * from './blocks';

// Define a generic Block type that combines all specific block types
export type Block = 
  | import('./blocks').HeroBlock
  | import('./blocks').TextBlock
  | import('./blocks').FeaturesBlock
  | import('./blocks').BenefitsBlock
  | import('./blocks').SpecificationsBlock
  | import('./blocks').ImageBlock
  | import('./blocks').GalleryBlock
  | import('./blocks').ImageTextBlock
  | import('./blocks').TextImageBlock
  | import('./blocks').FAQBlock
  | import('./blocks').CTABlock
  | import('./blocks').VideoBlock;
