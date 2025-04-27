import { BlockBase, BlockType } from '@/types/editor/base';

export function validateBaseBlock(block: any): boolean {
  if (!block || typeof block !== 'object') {
    console.error('Block is not an object:', block);
    return false;
  }
  
  const requiredProperties = ['id', 'type', 'title', 'visible', 'columns', 'style'];
  
  const missingProps = requiredProperties.filter(prop => !(prop in block));
  if (missingProps.length > 0) {
    console.error(`Block is missing required properties: ${missingProps.join(', ')}`, block);
    return false;
  }
  
  // Style should be an object
  if (!block.style || typeof block.style !== 'object') {
    console.error('Block style is not an object:', block.style);
    return false;
  }
  
  return true;
}

export function validateBlockByType(block: any): boolean {
  if (!validateBaseBlock(block)) {
    return false;
  }
  
  const type = block.type as BlockType;
  
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
      return 'image' in block && 'content' in block;
    case 'textImage':
      return 'image' in block && 'content' in block;
    case 'faq':
      return 'questions' in block && Array.isArray(block.questions);
    case 'cta':
      return 'heading' in block && 'content' in block && 'buttonText' in block;
    case 'video':
      return 'videoUrl' in block;
    case 'videoText':
      return 'videoUrl' in block && 'content' in block;
    case 'textVideo':
      return 'videoUrl' in block && 'content' in block;
    default:
      console.error(`Unknown block type: ${type}`);
      return false;
  }
}

export function ensureValidBlock(block: any, expectedType: BlockType): any {
  if (!block || typeof block !== 'object' || block.type !== expectedType) {
    console.error(`Invalid block type: expected ${expectedType}, got ${block?.type}`);
    throw new Error(`Invalid block type: expected ${expectedType}, got ${block?.type}`);
  }
  
  if (!validateBlockByType(block)) {
    console.error(`Block of type ${expectedType} is missing required properties`);
    throw new Error(`Block of type ${expectedType} is missing required properties`);
  }
  
  return block;
}
