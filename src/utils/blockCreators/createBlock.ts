
import { Block, BlockType, ColumnLayout } from '@/types/editor';
import * as blockCreators from './blocks';

export const createBlock = (type: BlockType, columns: ColumnLayout): Block => {
  switch (type) {
    case 'hero':
      return blockCreators.createHeroBlock(columns);
    case 'text':
      return blockCreators.createTextBlock(columns);
    case 'features':
      return blockCreators.createFeaturesBlock(columns);
    case 'benefits':
      return blockCreators.createBenefitsBlock(columns);
    case 'specifications':
      return blockCreators.createSpecificationsBlock(columns);
    case 'image':
      return blockCreators.createImageBlock(columns);
    case 'gallery':
      return blockCreators.createGalleryBlock(columns);
    case 'imageText':
      return blockCreators.createImageTextBlock(columns);
    case 'textImage':
      return blockCreators.createTextImageBlock(columns);
    case 'faq':
      return blockCreators.createFAQBlock(columns);
    case 'cta':
      return blockCreators.createCTABlock(columns);
    case 'video':
      return blockCreators.createVideoBlock(columns);
    case 'videoText':
      return blockCreators.createVideoTextBlock(columns);
    case 'textVideo':
      return blockCreators.createTextVideoBlock(columns);
    case 'carousel':
      return blockCreators.createCarouselBlock(columns);
    default:
      throw new Error(`Unsupported block type: ${type}`);
  }
};
