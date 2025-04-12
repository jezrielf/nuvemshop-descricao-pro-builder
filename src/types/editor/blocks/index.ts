
import { TextBlock } from './text';
import { HeroBlock } from './hero';
import { FeaturesBlock } from './features';
import { BenefitsBlock } from './benefits';
import { ImageBlock } from './image';
import { GalleryBlock } from './gallery';
import { ImageTextBlock } from './imageText';
import { TextImageBlock } from './textImage';
import { FAQBlock } from './faq';
import { CTABlock } from './cta';
import { SpecificationsBlock } from './specifications';
import { AIBlock } from '../blocks/ai';

// Update the Block type to include AIBlock
export type Block =
  | TextBlock
  | HeroBlock
  | FeaturesBlock
  | BenefitsBlock
  | ImageBlock
  | GalleryBlock
  | ImageTextBlock
  | TextImageBlock
  | FAQBlock
  | CTABlock
  | SpecificationsBlock
  | AIBlock;
  
// Update BlockType to include 'ai'
export type BlockType =
  | 'text'
  | 'hero'
  | 'features'
  | 'benefits'
  | 'image'
  | 'gallery'
  | 'imageText'
  | 'textImage'
  | 'faq'
  | 'cta'
  | 'specifications'
  | 'ai';
