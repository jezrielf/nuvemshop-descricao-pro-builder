
import { BlockBase, Block } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Helper to check if a block has a specific property
const hasProperty = <T extends BlockBase, K extends keyof any>(
  block: T,
  property: K
): block is T & Record<K, unknown> => {
  return property in block;
};

// Convert between different block structures or formats
export const convertBlock = (block: any): Block => {
  // If the block already has an id and type, it might be valid
  if (!block.id) {
    block.id = uuidv4();
  }
  
  if (!block.type) {
    block.type = 'text'; // Default to text block
  }
  
  // Ensure block has required base properties
  const baseBlock: BlockBase = {
    id: block.id,
    type: block.type,
    title: block.title || 'Block',
    columns: block.columns || 'full',
    visible: block.visible !== undefined ? block.visible : true,
    style: block.style || {}
  };
  
  switch (block.type) {
    case 'hero':
      return {
        ...baseBlock,
        heading: block.heading || 'Hero Title',
        subheading: block.subheading || 'Subheading Text',
        backgroundImage: block.backgroundImage || '',
        buttonText: block.buttonText || '',
        buttonUrl: block.buttonUrl || '',
        ...(hasProperty(block, 'image') && {
          image: {
            src: block.image?.src || '',
            alt: block.image?.alt || ''
          }
        })
      };
      
    case 'text':
      return {
        ...baseBlock,
        content: block.content || ''
      };
      
    case 'video':
      return {
        ...baseBlock,
        videoUrl: block.videoUrl || '',
        aspectRatio: block.aspectRatio || '16:9',
        autoplay: block.autoplay || false,
        muteAudio: block.muteAudio || false,
        description: block.description || '',
        caption: block.caption || '',
        heading: block.heading || ''
      };
      
    case 'videoText':
      return {
        ...baseBlock,
        videoUrl: block.videoUrl || '',
        aspectRatio: block.aspectRatio || '16:9',
        autoplay: block.autoplay || false,
        muteAudio: block.muteAudio || false,
        heading: block.heading || '',
        content: block.content || ''
      };
      
    case 'textVideo':
      return {
        ...baseBlock,
        videoUrl: block.videoUrl || '',
        aspectRatio: block.aspectRatio || '16:9',
        autoplay: block.autoplay || false,
        muteAudio: block.muteAudio || false,
        heading: block.heading || '',
        content: block.content || ''
      };
      
    // Add other block type conversions here
    default:
      return block as Block;
  }
};

// Convert multiple blocks at once
export const convertBlocks = (blocks: any[]): Block[] => {
  return blocks.map(block => convertBlock(block));
};
