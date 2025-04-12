
import { Block, BlockType, ColumnLayout } from '@/types/editor';
import { createTextBlock } from './textBlock';
import { createHeroBlock } from './heroBlock';
import { createFeaturesBlock } from './featuresBlock';
import { createBenefitsBlock } from './benefitsBlock';
import { createImageBlock } from './imageBlock';
import { createGalleryBlock } from './galleryBlock';
import { createImageTextBlock } from './imageTextBlock';
import { createTextImageBlock } from './textImageBlock';
import { createFAQBlock } from './faqBlock';
import { createCTABlock } from './ctaBlock';
import { createSpecificationsBlock } from './specificationsBlock';
import { createAIBlock } from './aiBlock';

// Create blocks based on type
export const createBlock = (type: BlockType, columns: number = 1): Block => {
  const columnLayout = columns as ColumnLayout;
  
  switch (type) {
    case 'text':
      return createTextBlock(columnLayout);
    case 'hero':
      return createHeroBlock(columnLayout);
    case 'features':
      return createFeaturesBlock(columnLayout);
    case 'benefits':
      return createBenefitsBlock(columnLayout);
    case 'image':
      return createImageBlock(columnLayout);
    case 'gallery':
      return createGalleryBlock(columnLayout);
    case 'imageText':
      return createImageTextBlock(columnLayout);
    case 'textImage':
      return createTextImageBlock(columnLayout);
    case 'faq':
      return createFAQBlock(columnLayout);
    case 'cta':
      return createCTABlock(columnLayout);
    case 'specifications':
      return createSpecificationsBlock(columnLayout);
    case 'ai':
      return createAIBlock(columnLayout);
    default:
      return createTextBlock(columnLayout);
  }
};
