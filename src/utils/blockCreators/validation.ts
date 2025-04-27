
import { BlockBase, BlockType } from '@/types/editor/base';

export function validateBaseBlock(block: any): boolean {
  if (!block || typeof block !== 'object') {
    console.error('Block is not an object:', block);
    return false;
  }
  
  const requiredProperties = ['id', 'type', 'title', 'visible'];
  
  const missingProps = requiredProperties.filter(prop => !(prop in block));
  if (missingProps.length > 0) {
    console.error(`Block is missing required properties: ${missingProps.join(', ')}`, block);
    return false;
  }
  
  // Add missing properties with defaults
  if (!('columns' in block)) {
    console.warn(`Block missing 'columns', adding default 'full' value`);
    block.columns = 'full';
  }
  
  // Make sure style is an object
  if (!block.style || typeof block.style !== 'object') {
    console.warn(`Block missing 'style', adding default empty object`);
    block.style = {};
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
      try {
        const valid = 'videoUrl' in block && 'content' in block;
        // Auto-fix missing properties
        if (!valid) {
          if (!('videoUrl' in block)) block.videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
          if (!('content' in block)) block.content = '<p>Adicione o texto aqui.</p>';
          if (!('heading' in block)) block.heading = 'Título da Seção';
          if (!('aspectRatio' in block)) block.aspectRatio = '16:9';
          if (!('autoplay' in block)) block.autoplay = false;
          if (!('muteAudio' in block)) block.muteAudio = true;
        }
        return true;
      } catch (error) {
        console.error('Error validating videoText block:', error);
        return false;
      }
    case 'textVideo':
      try {
        const valid = 'videoUrl' in block && 'content' in block;
        // Auto-fix missing properties
        if (!valid) {
          if (!('videoUrl' in block)) block.videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
          if (!('content' in block)) block.content = '<p>Adicione o texto aqui.</p>';
          if (!('heading' in block)) block.heading = 'Título da Seção';
          if (!('aspectRatio' in block)) block.aspectRatio = '16:9';
          if (!('autoplay' in block)) block.autoplay = false;
          if (!('muteAudio' in block)) block.muteAudio = true;
        }
        return true;
      } catch (error) {
        console.error('Error validating textVideo block:', error);
        return false;
      }
    default:
      console.error(`Unknown block type: ${type}`);
      return false;
  }
}

export function ensureValidBlock(block: any, expectedType: BlockType): any {
  try {
    if (!block || typeof block !== 'object' || block.type !== expectedType) {
      console.error(`Invalid block type: expected ${expectedType}, got ${block?.type}`);
      throw new Error(`Invalid block type: expected ${expectedType}, got ${block?.type}`);
    }
    
    // Try to fix missing properties based on the type
    if (expectedType === 'videoText' || expectedType === 'textVideo') {
      if (!block.videoUrl) block.videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      if (!block.content) block.content = '<p>Adicione o texto aqui.</p>';
      if (!block.heading) block.heading = 'Título da Seção';
      if (!block.aspectRatio) block.aspectRatio = '16:9';
      if (block.autoplay === undefined) block.autoplay = false;
      if (block.muteAudio === undefined) block.muteAudio = true;
      if (!block.style) block.style = { headingColor: '#333333' };
    }
    
    if (!validateBlockByType(block)) {
      console.error(`Block of type ${expectedType} is missing required properties`);
      throw new Error(`Block of type ${expectedType} is missing required properties`);
    }
    
    return block;
  } catch (error) {
    console.error('Error ensuring valid block:', error);
    throw error;
  }
}
