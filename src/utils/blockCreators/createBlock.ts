
import { v4 as uuidv4 } from 'uuid';
import { Block, BlockType, ColumnLayout } from '@/types/editor';
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
  createCTABlock,
  createVideoBlock
} from './blocks';

export const createBlock = (type: BlockType, columns: ColumnLayout): Block => {
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
    case 'video':
      return createVideoBlock(columns);
    default:
      // For unknown types, return a text block as fallback
      return createTextBlock(columns);
  }
};
