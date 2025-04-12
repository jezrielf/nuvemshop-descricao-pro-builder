
import { BlockType, ColumnLayout, Block } from '@/types/editor';
import {
  createHeroBlock,
  createTextBlock,
  createFeaturesBlock,
  createBenefitsBlock,
  createSpecificationsBlock,
  createImageBlock,
  createGalleryBlock,
  createImageTextBlock,
  createTextImageBlock,
  createFAQBlock,
  createCTABlock
} from './blocks';

export const createBlock = (type: BlockType, columns: ColumnLayout = 1): Block => {
  switch (type) {
    case 'hero':
      return createHeroBlock(columns);
      
    case 'text':
      return createTextBlock(columns);
      
    case 'features':
      return createFeaturesBlock(columns);
      
    case 'benefits':
      return createBenefitsBlock(columns);
      
    case 'specifications':
      return createSpecificationsBlock(columns);
      
    case 'image':
      return createImageBlock(columns);
      
    case 'gallery':
      return createGalleryBlock(columns);
      
    case 'imageText':
      return createImageTextBlock(columns);
      
    case 'textImage':
      return createTextImageBlock(columns);
      
    case 'faq':
      return createFAQBlock(columns);
      
    case 'cta':
      return createCTABlock(columns);
      
    default:
      // Fallback to text block if type is not recognized
      console.warn(`Unrecognized block type: ${type}, defaulting to text block`);
      return createTextBlock(columns);
  }
};
