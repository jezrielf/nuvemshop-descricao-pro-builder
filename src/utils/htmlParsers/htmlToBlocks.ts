
import { Block, TextBlock, ColumnLayout } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { analyzeDocument } from './analyzers/documentAnalyzer';

/**
 * Utility function to convert HTML content to editor blocks
 * @param htmlContent HTML content string to parse
 * @param preserveStructure If true, preserves existing block structure
 * @returns Array of editor blocks
 */
export const parseHtmlToBlocks = (htmlContent: string, preserveStructure: boolean = false): Block[] => {
  if (!htmlContent.trim()) {
    return [];
  }

  try {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Remove any script tags
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    // If we need to preserve structure (modified description)
    if (preserveStructure) {
      const blocks: Block[] = [];
      const existingBlocks = doc.querySelectorAll('.nuvemshop-product-description > div[id^="product-block-"]');
      
      existingBlocks.forEach(blockElement => {
        const textBlock: TextBlock = {
          id: uuidv4(),
          type: 'text',
          title: 'Bloco de texto',
          content: blockElement.innerHTML,
          heading: blockElement.querySelector('h1, h2, h3, h4, h5, h6')?.textContent || 'Texto',
          columns: 'full' as ColumnLayout,
          visible: true,
          style: {}
        };
        blocks.push(textBlock);
      });
      
      return blocks;
    }
    
    // For new descriptions, analyze the document structure
    const blocks: Block[] = [];
    analyzeDocument(doc, blocks);
    
    if (blocks.length === 0) {
      // If no blocks were created, create a single text block
      const textBlock: TextBlock = {
        id: uuidv4(),
        type: 'text',
        title: 'Descrição do Produto',
        content: htmlContent,
        heading: 'Descrição',
        columns: 'full' as ColumnLayout,
        visible: true,
        style: {}
      };
      blocks.push(textBlock);
    }
    
    return blocks;
  } catch (error) {
    console.error('Error parsing HTML to blocks:', error);
    // Em caso de erro, retorna um bloco de texto com o conteúdo original
    const errorBlock: TextBlock = {
      id: uuidv4(),
      type: 'text',
      title: 'Descrição do Produto',
      content: htmlContent,
      heading: 'Descrição',
      columns: 'full' as ColumnLayout,
      visible: true,
      style: {}
    };
    return [errorBlock];
  }
};
