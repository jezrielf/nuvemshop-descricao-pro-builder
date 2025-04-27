
import { 
  Block, 
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
  VideoBlock,
  VideoTextBlock,
  TextVideoBlock
} from '@/types/editor';

// Type guards for each block type
export function isHeroBlock(block: any): block is HeroBlock {
  return block?.type === 'hero';
}

export function isTextBlock(block: any): block is TextBlock {
  return block?.type === 'text';
}

export function isFeaturesBlock(block: any): block is FeaturesBlock {
  return block?.type === 'features';
}

export function isBenefitsBlock(block: any): block is BenefitsBlock {
  return block?.type === 'benefits';
}

export function isSpecificationsBlock(block: any): block is SpecificationsBlock {
  return block?.type === 'specifications';
}

export function isImageBlock(block: any): block is ImageBlock {
  return block?.type === 'image';
}

export function isGalleryBlock(block: any): block is GalleryBlock {
  return block?.type === 'gallery';
}

export function isImageTextBlock(block: any): block is ImageTextBlock {
  return block?.type === 'imageText';
}

export function isTextImageBlock(block: any): block is TextImageBlock {
  return block?.type === 'textImage';
}

export function isFAQBlock(block: any): block is FAQBlock {
  return block?.type === 'faq';
}

export function isCTABlock(block: any): block is CTABlock {
  return block?.type === 'cta';
}

export function isVideoBlock(block: any): block is VideoBlock {
  return block?.type === 'video';
}

export function isVideoTextBlock(block: any): block is VideoTextBlock {
  return block?.type === 'videoText';
}

export function isTextVideoBlock(block: any): block is TextVideoBlock {
  return block?.type === 'textVideo';
}

// Generic typed block casting function
export function getTypedBlock<T extends Block>(block: Block, typeGuard: (block: any) => block is T): T {
  if (!typeGuard(block)) {
    console.warn(`Block with ID ${block.id} does not match expected type. Using as-is.`);
    
    // For video blocks, ensure they have the required properties
    if (block.type === 'videoText' || block.type === 'textVideo') {
      if (!block.videoUrl) {
        (block as any).videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
      }
      if (!block.content) {
        (block as any).content = '<p>Adicione o texto aqui.</p>';
      }
    }
  }
  return block as T;
}
