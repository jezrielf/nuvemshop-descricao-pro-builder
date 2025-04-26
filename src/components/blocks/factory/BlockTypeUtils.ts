
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
} from '@/types/editor/blocks';

// Type guard for HeroBlock
export function isHeroBlock(block: Block): block is HeroBlock {
  return block.type === 'hero';
}

// Type guard for TextBlock
export function isTextBlock(block: Block): block is TextBlock {
  return block.type === 'text';
}

// Type guard for FeaturesBlock
export function isFeaturesBlock(block: Block): block is FeaturesBlock {
  return block.type === 'features';
}

// Type guard for BenefitsBlock
export function isBenefitsBlock(block: Block): block is BenefitsBlock {
  return block.type === 'benefits';
}

// Type guard for SpecificationsBlock
export function isSpecificationsBlock(block: Block): block is SpecificationsBlock {
  return block.type === 'specifications';
}

// Type guard for ImageBlock
export function isImageBlock(block: Block): block is ImageBlock {
  return block.type === 'image';
}

// Type guard for GalleryBlock
export function isGalleryBlock(block: Block): block is GalleryBlock {
  return block.type === 'gallery';
}

// Type guard for ImageTextBlock
export function isImageTextBlock(block: Block): block is ImageTextBlock {
  return block.type === 'imageText';
}

// Type guard for TextImageBlock
export function isTextImageBlock(block: Block): block is TextImageBlock {
  return block.type === 'textImage';
}

// Type guard for FAQBlock
export function isFAQBlock(block: Block): block is FAQBlock {
  return block.type === 'faq';
}

// Type guard for CTABlock
export function isCTABlock(block: Block): block is CTABlock {
  return block.type === 'cta';
}

// Type guard for VideoBlock
export function isVideoBlock(block: Block): block is VideoBlock {
  return block.type === 'video';
}

// Type guard for VideoTextBlock
export function isVideoTextBlock(block: Block): block is VideoTextBlock {
  return block.type === 'videoText';
}

// Type guard for TextVideoBlock
export function isTextVideoBlock(block: Block): block is TextVideoBlock {
  return block.type === 'textVideo';
}

// Helper function to ensure type safety when rendering blocks
export function getTypedBlock<T extends Block>(block: Block, typeGuard: (block: Block) => block is T): T {
  if (typeGuard(block)) {
    return block;
  }
  
  // If the type doesn't match, warn in the console but still return the block cast as the expected type
  // This is to prevent runtime errors, but may lead to undefined behavior if the block is missing required properties
  console.warn(`Block with id ${block.id} is not of expected type ${block.type}`);
  return block as unknown as T;
}
