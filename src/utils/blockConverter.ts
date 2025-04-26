
import { Block, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { ensureBlockType } from './typeConversion';

// Helper function to rename keys in an object
const renameKeys = (
  obj: Record<string, any>,
  keyMap: Record<string, string>
): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = keyMap[key] || key;
    acc[newKey] = obj[key];
    return acc;
  }, {} as Record<string, any>);
};

// Convert a block from one type to another
export const convertBlock = (
  block: Block,
  targetType: BlockType
): Block => {
  if (block.type === targetType) {
    return block;
  }

  const baseBlock = {
    id: block.id || uuidv4(),
    type: targetType,
    title: block.title,
    columns: block.columns,
    visible: block.visible,
    style: { ...block.style },
  };

  // Convert between image and text block types
  if (
    (block.type === 'imageText' && targetType === 'textImage') ||
    (block.type === 'textImage' && targetType === 'imageText')
  ) {
    // These blocks have the same structure, just swapping positions
    return {
      ...baseBlock,
      imageSrc: (block as any).imageSrc,
      heading: (block as any).heading,
      content: (block as any).content,
    } as Block;
  }

  // Handle video conversions
  if (
    (block.type === 'video' || block.type === 'videoText' || block.type === 'textVideo') &&
    (targetType === 'video' || targetType === 'videoText' || targetType === 'textVideo')
  ) {
    // These blocks share video properties
    const converted: any = {
      ...baseBlock,
      videoUrl: (block as any).videoUrl || '',
      aspectRatio: (block as any).aspectRatio || '16:9',
      autoplay: (block as any).autoplay !== undefined ? (block as any).autoplay : false,
      muteAudio: (block as any).muteAudio !== undefined ? (block as any).muteAudio : true,
    };

    // Add text properties if target is videoText or textVideo
    if (targetType === 'videoText' || targetType === 'textVideo') {
      converted.heading = (block as any).heading || 'Título da Seção';
      converted.content = (block as any).content || '<p>Adicione o texto aqui para descrever seu vídeo ou produto.</p>';
    }

    return converted as Block;
  }

  // Default: create a new block of the target type
  return ensureBlockType(baseBlock);
};

// Convert an array of blocks, ensuring they all have proper structure
export const convertBlocks = (blocks: any[]): Block[] => {
  if (!Array.isArray(blocks)) {
    console.warn('convertBlocks: Not an array', blocks);
    return [];
  }
  
  return blocks.map(block => ensureBlockType(block));
};

export default { convertBlock, convertBlocks };
