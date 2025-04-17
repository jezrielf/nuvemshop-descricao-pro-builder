
import { BlockBase } from '../base';

// Re-export all block type interfaces
export * from './hero';
export * from './text';
export * from './features';
export * from './benefits';
export * from './specifications';
export * from './image';
export * from './gallery';
export * from './imageText';
export * from './textImage';
export * from './faq';
export * from './cta';
export * from './video';

export type Block = 
  | import('./hero').HeroBlock 
  | import('./text').TextBlock
  | import('./features').FeaturesBlock 
  | import('./benefits').BenefitsBlock 
  | import('./specifications').SpecificationsBlock 
  | import('./image').ImageBlock 
  | import('./gallery').GalleryBlock
  | import('./imageText').ImageTextBlock
  | import('./textImage').TextImageBlock
  | import('./faq').FAQBlock
  | import('./cta').CTABlock
  | import('./video').VideoBlock;

// Define BlockType as a union of all possible block type literals
export type BlockType = 
  | 'hero'
  | 'text'
  | 'features'
  | 'benefits'
  | 'specifications'
  | 'image'
  | 'gallery'
  | 'imageText'
  | 'textImage'
  | 'faq'
  | 'cta'
  | 'video';
