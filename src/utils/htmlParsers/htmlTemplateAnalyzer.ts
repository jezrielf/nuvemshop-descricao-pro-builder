
import { Template, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

/**
 * Analyzes HTML content and converts it into a template structure
 */
export const analyzeHtmlToTemplate = async (htmlContent: string): Promise<Template> => {
  // Create a basic template structure
  const template: Template = {
    id: uuidv4(),
    name: 'Template importado',
    description: 'Template criado a partir de HTML importado',
    category: 'other',
    blocks: [],
    thumbnailUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  try {
    // Create a DOM parser to work with the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Try to extract title from the HTML
    const titleElement = doc.querySelector('h1, h2, h3');
    if (titleElement && titleElement.textContent) {
      template.name = titleElement.textContent.trim();
    }
    
    // Extract main sections/blocks based on common HTML patterns
    const sections = doc.querySelectorAll('section, div[class*="section"], div[class*="block"], .product-description > div');
    
    if (sections.length > 0) {
      // Process each section into blocks
      Array.from(sections).forEach((section, index) => {
        // Determine block type based on content
        let blockType: BlockType = 'text';
        
        if (index === 0 && section.querySelector('h1, h2')) {
          blockType = 'hero';
        } else if (section.querySelectorAll('img').length > 1) {
          blockType = 'gallery';
        } else if (section.querySelector('img') && section.querySelector('p')) {
          if (section.querySelector('img')!.compareDocumentPosition(section.querySelector('p')!) & Node.DOCUMENT_POSITION_FOLLOWING) {
            blockType = 'imageText';
          } else {
            blockType = 'textImage';
          }
        } else if (section.querySelectorAll('li').length > 3) {
          blockType = 'features';
        } else if (section.querySelectorAll('h3, h4').length > 1) {
          blockType = 'faq';
        }
        
        // Create basic block structure
        const block = {
          id: uuidv4(),
          type: blockType,
          title: `Bloco ${index + 1}`,
          visible: true,
          columns: 'full' as const,
          content: section.innerHTML || ''
        };
        
        template.blocks.push(block);
      });
    } else {
      // If no clear sections, treat the whole content as a single text block
      template.blocks.push({
        id: uuidv4(),
        type: 'text' as BlockType,
        title: 'Conteúdo',
        visible: true,
        columns: 'full' as const,
        content: htmlContent
      });
    }
    
    // If no blocks were created, create at least one empty block
    if (template.blocks.length === 0) {
      template.blocks.push({
        id: uuidv4(),
        type: 'text' as BlockType,
        title: 'Conteúdo',
        visible: true,
        columns: 'full' as const,
        content: ''
      });
    }
    
    // Try to extract a thumbnail from the first image
    const firstImage = doc.querySelector('img');
    if (firstImage && firstImage.src) {
      template.thumbnailUrl = firstImage.src;
    }
    
    return template;
  } catch (error) {
    console.error('Error analyzing HTML:', error);
    
    // Return a basic template if analysis fails
    template.blocks.push({
      id: uuidv4(),
      type: 'text' as BlockType,
      title: 'Conteúdo',
      visible: true,
      columns: 'full' as const,
      content: htmlContent
    });
    
    return template;
  }
};
