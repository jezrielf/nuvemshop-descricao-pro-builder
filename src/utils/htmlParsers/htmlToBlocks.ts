
import { Block, TextBlock } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

/**
 * Utility function to convert HTML content to editor blocks
 * @param htmlContent HTML content string to parse
 * @returns Array of editor blocks
 */
export const parseHtmlToBlocks = (htmlContent: string): Block[] => {
  if (!htmlContent.trim()) {
    return [];
  }

  try {
    // For now, we'll implement a simple parser that creates a single text block
    // In a more robust implementation, this would analyze the HTML structure
    // and create appropriate blocks for different types of content
    
    // Create a basic text block with the HTML content
    const textBlock: TextBlock = {
      id: uuidv4(),
      type: 'text',
      title: 'Descrição Importada',
      content: htmlContent,
      heading: 'Descrição do Produto',
      columns: 1,
      visible: true
    };

    return [textBlock];
  } catch (error) {
    console.error('Error parsing HTML to blocks:', error);
    return [];
  }
};
