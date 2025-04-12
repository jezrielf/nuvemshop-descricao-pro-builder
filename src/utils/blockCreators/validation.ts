
import { Block, BlockType, ColumnLayout } from '@/types/editor';

/**
 * Validates that a block has the required base properties
 */
export const validateBaseBlock = (block: any): boolean => {
  return (
    block &&
    typeof block === 'object' &&
    'id' in block &&
    'type' in block &&
    'title' in block &&
    'columns' in block &&
    'visible' in block
  );
};

/**
 * Validates that a block has all required properties for its specific type
 */
export const validateBlockByType = (block: any): boolean => {
  if (!validateBaseBlock(block)) return false;

  const type = block.type as BlockType;
  
  switch (type) {
    case 'hero':
      return 'heading' in block && 'subheading' in block;
    case 'text':
      return 'heading' in block && 'content' in block;
    case 'features':
      return 'heading' in block && 'features' in block && Array.isArray(block.features);
    case 'benefits':
      return 'heading' in block && 'benefits' in block && Array.isArray(block.benefits);
    case 'specifications':
      return 'heading' in block && 'specs' in block && Array.isArray(block.specs);
    case 'image':
      return 'src' in block && 'alt' in block;
    case 'gallery':
      return 'images' in block && Array.isArray(block.images);
    case 'imageText':
      return 'image' in block && 'heading' in block && 'content' in block;
    case 'textImage':
      return 'image' in block && 'heading' in block && 'content' in block;
    case 'faq':
      return 'heading' in block && 'questions' in block && Array.isArray(block.questions);
    case 'cta':
      return 'heading' in block && 'content' in block && 'buttonText' in block;
    case 'video':
      return 'videoUrl' in block && 'autoplay' in block;
    default:
      return false;
  }
};

/**
 * Validates and ensures a block has valid data
 * Returns the validated block or throws an error if validation fails
 */
export const ensureValidBlock = (block: any, type: BlockType): Block => {
  if (!validateBlockByType(block)) {
    throw new Error(`Invalid block of type: ${type}. Missing required properties.`);
  }
  
  return block as Block;
};
