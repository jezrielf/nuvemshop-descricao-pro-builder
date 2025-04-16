
import { Template, ProductCategory, TextBlock, Block, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '../blockCreators/createBlock';
import { analyzeDocument } from './analyzers/documentAnalyzer';
import { sanitizeHtmlContent } from './analyzers/utils';

export const analyzeHtmlForTemplate = (htmlInput: string, category: ProductCategory): Template => {
  const parsedBlocks = [];
  let doc: Document;

  try {
    const parser = new DOMParser();
    doc = parser.parseFromString(htmlInput, 'text/html');
  
    const scripts = doc.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    analyzeDocument(doc, parsedBlocks);

    if (parsedBlocks.length === 0) {
      const textBlock = createBlock('text', 1) as TextBlock;
      textBlock.content = sanitizeHtmlContent(htmlInput);
      parsedBlocks.push(textBlock);
    }
  } catch (error) {
    console.error('Error parsing HTML:', error);
    const textBlock = createBlock('text', 1) as TextBlock;
    textBlock.content = sanitizeHtmlContent(htmlInput);
    parsedBlocks.push(textBlock);
  }

  return {
    id: uuidv4(),
    name: 'Template from HTML',
    category,
    blocks: parsedBlocks,
    thumbnail: '/placeholder.svg' // Add default thumbnail
  };
};

// New function to allow user to customize block types
export const customizeBlockTypes = (
  template: Template, 
  blockTypeMap: Record<string, BlockType>
): Template => {
  const updatedBlocks = template.blocks.map(block => {
    // If this block ID is in the map, change its type
    if (blockTypeMap[block.id]) {
      const newType = blockTypeMap[block.id];
      
      // Only change if the type is different
      if (newType !== block.type) {
        // Create a new block of the desired type
        const newBlock = createBlock(newType, block.columns);
        
        // Copy over common properties
        newBlock.id = block.id;
        newBlock.title = block.title;
        newBlock.visible = block.visible;
        newBlock.style = block.style;
        
        // Transfer content based on block types
        if ('content' in block && 'content' in newBlock) {
          (newBlock as any).content = (block as any).content;
        }
        
        if ('heading' in block && 'heading' in newBlock) {
          (newBlock as any).heading = (block as any).heading;
        }
        
        if ('image' in block && 'image' in newBlock) {
          (newBlock as any).image = (block as any).image;
        }
        
        return newBlock;
      }
    }
    return block;
  });
  
  return {
    ...template,
    blocks: updatedBlocks as Block[],
    thumbnail: template.thumbnail
  };
};
