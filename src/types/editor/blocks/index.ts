
import { HeroBlock } from './hero';
import { TextBlock } from './text';
import { FeaturesBlock } from './features';
import { BenefitsBlock } from './benefits';
import { SpecificationsBlock } from './specifications';
import { ImageBlock } from './image';
import { GalleryBlock } from './gallery';
import { ImageTextBlock } from './imageText';
import { TextImageBlock } from './textImage';
import { FAQBlock } from './faq';
import { CTABlock } from './cta';
import { VideoBlock } from './video';

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
  | HeroBlock 
  | FeaturesBlock 
  | BenefitsBlock 
  | SpecificationsBlock 
  | TextBlock 
  | ImageBlock 
  | GalleryBlock
  | ImageTextBlock
  | TextImageBlock
  | FAQBlock
  | CTABlock
  | VideoBlock;

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
