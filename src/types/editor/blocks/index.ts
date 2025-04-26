
import { VideoBlock } from './video';
import { VideoTextBlock } from './videoText';
import { TextVideoBlock } from './textVideo';
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
import { CarouselBlock } from './carousel';

export type Block = 
  | VideoBlock
  | VideoTextBlock
  | TextVideoBlock
  | HeroBlock
  | TextBlock
  | FeaturesBlock
  | BenefitsBlock
  | SpecificationsBlock
  | ImageBlock
  | GalleryBlock
  | ImageTextBlock
  | TextImageBlock
  | FAQBlock
  | CTABlock
  | CarouselBlock;

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
export * from './videoText';
export * from './textVideo';
export * from './carousel';
