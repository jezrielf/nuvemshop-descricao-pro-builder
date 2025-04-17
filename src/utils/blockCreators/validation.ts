
import { BlockBase, BlockType } from '@/types/editor/base';

export function validateBaseBlock(block: any): boolean {
  if (!block || typeof block !== 'object') {
    console.warn('Invalid block: not an object', block);
    return false;
  }
  
  // Check only critical base properties
  const criticalProperties = ['id', 'type'];
  const hasAllCritical = criticalProperties.every(prop => prop in block);
  
  if (!hasAllCritical) {
    console.warn('Block missing critical properties:', block);
    return false;
  }
  
  // Ensure type is a valid BlockType
  const validBlockTypes = [
    'hero', 'text', 'features', 'benefits', 'specifications', 
    'image', 'gallery', 'imageText', 'textImage', 'faq', 'cta', 'video'
  ];
  
  if (!validBlockTypes.includes(block.type)) {
    console.warn(`Invalid block type: ${block.type}`, block);
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
        // Less strict validation for hero block
        return true;
      case 'text':
        // Ensure at least content exists, heading can be added
        return 'content' in block;
      case 'features':
        // Ensure features array exists, even if empty
        return 'features' in block && Array.isArray(block.features);
      case 'benefits':
        // Ensure benefits array exists, even if empty
        return 'benefits' in block && Array.isArray(block.benefits);
      case 'specifications':
        // Ensure specs array exists, even if empty
        return 'specs' in block && Array.isArray(block.specs);
      case 'image':
        // Ensure src and alt exist, but don't be too strict
        return 'src' in block || 'imageUrl' in block;
      case 'gallery':
        // Ensure images array exists, even if empty
        return 'images' in block && Array.isArray(block.images);
      case 'imageText':
        // Ensure image and content exist
        return 'image' in block && 'content' in block && typeof block.image === 'object';
      case 'textImage':
        // Ensure image and content exist
        return 'image' in block && 'content' in block && typeof block.image === 'object';
      case 'faq':
        // Ensure questions array exists, even if empty
        return 'questions' in block && Array.isArray(block.questions);
      case 'cta':
        // Less strict validation for CTA
        return 'heading' in block || 'content' in block;
      case 'video':
        // Ensure videoUrl exists
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
    console.error(`Invalid block: not an object`, block);
    throw new Error(`Invalid block: not an object`);
  }
  
  if (block.type !== expectedType) {
    console.error(`Invalid block type: expected ${expectedType}, got ${block?.type}`, block);
    throw new Error(`Invalid block type: expected ${expectedType}, got ${block?.type}`);
  }
  
  if (!validateBlockByType(block)) {
    console.warn(`Block of type ${expectedType} is missing required properties:`, block);
    // Don't throw error, let the calling code handle this situation
  }
  
  return block;
}
