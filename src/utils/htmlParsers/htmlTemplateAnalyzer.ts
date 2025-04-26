
import { Template, ProductCategory, Block, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Function to convert HTML to a template
export const analyzeHtmlToTemplate = (html: string, category: ProductCategory): Template => {
  // Create a parser to extract content from the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Extract blocks from the HTML content
  const blocks: Block[] = [];
  
  // Example logic - extract paragraphs into text blocks
  const paragraphs = doc.querySelectorAll('p');
  paragraphs.forEach((p) => {
    if (p.textContent?.trim()) {
      blocks.push({
        id: uuidv4(),
        type: 'text',
        title: 'Texto',
        content: p.innerHTML,
        style: {
          textAlign: 'left',
          fontSize: 'base',
          fontWeight: 'normal',
          textColor: '',
          backgroundColor: ''
        }
      });
    }
  });
  
  // Extract images
  const images = doc.querySelectorAll('img');
  images.forEach((img) => {
    blocks.push({
      id: uuidv4(),
      type: 'image',
      title: 'Imagem',
      src: img.src,
      alt: img.alt || '',
      style: {
        textAlign: 'center',
        fontSize: 'base',
        fontWeight: 'normal',
        textColor: '',
        backgroundColor: ''
      }
    });
  });
  
  return {
    id: uuidv4(),
    name: 'Template importado de HTML',
    description: 'Template automaticamente gerado a partir do código HTML',
    category,
    blocks,
    thumbnailUrl: '/templates/imported.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

// Alias for backward compatibility
export const analyzeHtmlForTemplate = analyzeHtmlToTemplate;

// Function to customize block types in a template
export const customizeBlockTypes = (
  template: Template, 
  blockTypeMap: Record<string, BlockType>
): Template => {
  const updatedTemplate = { ...template };
  
  updatedTemplate.blocks = template.blocks.map(block => {
    if (blockTypeMap[block.id]) {
      // Change the block type while preserving common properties
      return {
        ...block,
        type: blockTypeMap[block.id]
      };
    }
    return block;
  });
  
  return {
    ...template,
    blocks: updatedTemplate.blocks,
    thumbnailUrl: template.thumbnailUrl,
    updatedAt: new Date().toISOString()
  };
};
