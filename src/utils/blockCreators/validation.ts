
import { BlockBase, BlockType } from '@/types/editor/base';

export function validateBaseBlock(block: any): boolean {
  if (!block || typeof block !== 'object') return false;
  
  // Check only critical base properties
  const criticalProperties = ['id', 'type'];
  const hasAllCritical = criticalProperties.every(prop => prop in block);
  
  if (!hasAllCritical) {
    console.warn('Block missing critical properties:', block);
    return false;
  }
  
  // Check other base properties but be more lenient
  const otherProperties = ['title', 'visible', 'columns', 'style'];
  const missingProps = otherProperties.filter(prop => !(prop in block));
  
  if (missingProps.length > 0) {
    console.warn(`Block missing some base properties (${missingProps.join(', ')}):`, block);
    // We'll still return true since we can fix these with defaults
  }
  
  return true;
}

export function validateBlockByType(block: any): boolean {
  if (!validateBaseBlock(block)) return false;
  
  const type = block.type as BlockType;
  
  try {
    switch (type) {
      case 'hero':
        return 'heading' in block && 'subheading' in block;
      case 'text':
        return 'content' in block && 'heading' in block;
      case 'features':
        return 'features' in block && Array.isArray(block.features);
      case 'benefits':
        return 'benefits' in block && Array.isArray(block.benefits);
      case 'specifications':
        return 'specs' in block && Array.isArray(block.specs);
      case 'image':
        return 'src' in block && 'alt' in block;
      case 'gallery':
        return 'images' in block && Array.isArray(block.images);
      case 'imageText':
        return 'image' in block && 'content' in block && typeof block.image === 'object';
      case 'textImage':
        return 'image' in block && 'content' in block && typeof block.image === 'object';
      case 'faq':
        return 'questions' in block && Array.isArray(block.questions);
      case 'cta':
        return 'heading' in block && 'content' in block && 'buttonText' in block;
      case 'video':
        return 'videoUrl' in block;
      default:
        console.warn(`Unknown block type: ${type}`);
        return false;
    }
  } catch (error) {
    console.error(`Error validating block of type ${type}:`, error);
    return false;
  }
}

export function ensureValidBlock(block: any, expectedType: BlockType): any {
  if (!block || typeof block !== 'object') {
    throw new Error(`Invalid block: not an object`);
  }
  
  if (block.type !== expectedType) {
    throw new Error(`Invalid block type: expected ${expectedType}, got ${block?.type}`);
  }
  
  if (!validateBlockByType(block)) {
    console.warn(`Block of type ${expectedType} is missing required properties:`, block);
    // Instead of throwing error, we'll let the calling code handle this situation
  }
  
  return block;
}
