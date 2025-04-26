
import { Block, BlockType, ColumnLayout, BlockStyle } from "@/types/editor";

// Helper function to convert potentially invalid blocks to valid ones
export const convertBlock = (block: any): Block => {
  // If it's already a valid block, return as-is
  if (isValidBlock(block)) {
    return block;
  }

  // Create a new valid block with the same data
  const validBlock: any = {
    id: block.id || generateId(),
    type: sanitizeBlockType(block.type),
    title: block.title || '',
    columns: block.columns || 'single',
    visible: block.visible !== undefined ? block.visible : true,
    style: block.style || undefined
  };

  // Add other fields based on block type
  switch (validBlock.type) {
    case 'hero':
      return {
        ...validBlock,
        heading: block.heading || '',
        subheading: block.subheading || '',
        buttonText: block.buttonText || '',
        buttonUrl: block.buttonUrl || '',
        backgroundImage: block.backgroundImage || null,
        // Add safe image property
        image: {
          src: block.image?.src || '',
          alt: block.image?.alt || ''
        }
      } as Block;
    // Handle other block types...
    default:
      return validBlock as Block;
  }
};

// Helper to generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Check if a block is valid
const isValidBlock = (block: any): boolean => {
  return (
    block &&
    typeof block === 'object' &&
    typeof block.id === 'string' &&
    typeof block.type === 'string'
  );
};

// Ensure the block type is valid
const sanitizeBlockType = (type: string): BlockType => {
  const validTypes: BlockType[] = [
    'text',
    'image',
    'hero',
    'features',
    'benefits',
    'specifications',
    'gallery',
    'imageText',
    'textImage',
    'faq',
    'cta',
    'video',
    'videoText',
    'textVideo'
  ];
  
  if (validTypes.includes(type as BlockType)) {
    return type as BlockType;
  }
  
  // Default to text if type is invalid
  return 'text';
};
