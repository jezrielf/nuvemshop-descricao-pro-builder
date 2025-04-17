
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
  createCTABlock,
  createVideoBlock
} from './blocks';
import { ensureValidBlock } from './validation';

export const createBlock = (type: BlockType, columns: ColumnLayout = 'full'): Block => {
  try {
    let block: Block;
    
    switch (type) {
      case 'hero':
        block = createHeroBlock(columns);
        break;
        
      case 'text':
        block = createTextBlock(columns);
        break;
        
      case 'features':
        block = createFeaturesBlock(columns);
        break;
        
      case 'benefits':
        block = createBenefitsBlock(columns);
        break;
        
      case 'specifications':
        block = createSpecificationsBlock(columns);
        break;
        
      case 'image':
        block = createImageBlock(columns);
        break;
        
      case 'gallery':
        block = createGalleryBlock(columns);
        break;
        
      case 'imageText':
        block = createImageTextBlock(columns);
        break;
        
      case 'textImage':
        block = createTextImageBlock(columns);
        break;
        
      case 'faq':
        block = createFAQBlock(columns);
        break;
        
      case 'cta':
        block = createCTABlock(columns);
        break;
        
      case 'video':
        block = createVideoBlock(columns);
        break;
        
      default:
        // Provide a more detailed error message
        throw new Error(`Unrecognized block type: ${type}`);
    }
    
    // Validate the created block to ensure it has all required properties
    return ensureValidBlock(block, type);
  } catch (error) {
    console.error(`Error creating block of type ${type}:`, error);
    // Fallback to a text block with error information
    return createTextBlock(columns);
  }
};
