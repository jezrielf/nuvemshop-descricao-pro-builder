
import { Template, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Function to analyze HTML and convert to a template
export const analyzeHtmlToTemplate = async (htmlContent: string): Promise<Template> => {
  console.log('Analyzing HTML content...', htmlContent.substring(0, 100));
  
  // Create a basic template structure
  const template: Template = {
    id: uuidv4(),
    name: 'Template importado',
    description: 'Template gerado a partir de HTML importado',
    category: 'other',
    blocks: [],
    thumbnailUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  try {
    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Extract title if exists
    const titleElement = doc.querySelector('h1, h2, h3');
    if (titleElement) {
      template.name = titleElement.textContent?.trim() || template.name;
    }
    
    // Process the HTML content and convert to blocks
    const blocks = await processHTML(doc.body);
    
    if (blocks.length > 0) {
      template.blocks = blocks;
    } else {
      // Fallback: If no structured blocks were created, create a single text block with the HTML
      template.blocks = [{
        id: uuidv4(),
        type: 'text',
        content: htmlContent,
        visible: true
      }];
    }
    
    return template;
  } catch (error) {
    console.error('Error analyzing HTML:', error);
    
    // Fallback: Return a template with the raw HTML in a text block
    template.blocks = [{
      id: uuidv4(),
      type: 'text',
      content: htmlContent,
      visible: true
    }];
    
    return template;
  }
};

// Process HTML and convert to blocks
async function processHTML(bodyElement: HTMLElement): Promise<any[]> {
  const blocks: any[] = [];
  
  try {
    // Process direct children of the body
    for (const element of Array.from(bodyElement.children)) {
      // Handle different element types
      if (element.tagName === 'H1' || element.tagName === 'H2' || element.tagName === 'H3') {
        // Create a hero block for headings
        blocks.push({
          id: uuidv4(),
          type: 'hero',
          title: element.textContent?.trim() || '',
          content: '',
          imageUrl: '',
          visible: true
        });
      }
      else if (element.tagName === 'P') {
        // Create text blocks for paragraphs
        blocks.push({
          id: uuidv4(),
          type: 'text',
          content: element.innerHTML,
          visible: true
        });
      }
      else if (element.tagName === 'UL' || element.tagName === 'OL') {
        // Create a benefits block for lists
        const items = Array.from(element.querySelectorAll('li'))
          .map(li => ({ id: uuidv4(), text: li.textContent?.trim() || '' }));
        
        blocks.push({
          id: uuidv4(),
          type: 'benefits',
          title: 'Benefícios',
          items,
          visible: true
        });
      }
      else if (element.tagName === 'IMG') {
        // Create image blocks for images
        blocks.push({
          id: uuidv4(),
          type: 'image',
          src: element.getAttribute('src') || '',
          alt: element.getAttribute('alt') || '',
          caption: '',
          visible: true
        });
      }
      else if (element.tagName === 'TABLE') {
        // Create a specifications block for tables
        const rows = Array.from(element.querySelectorAll('tr'))
          .map(row => {
            const cells = Array.from(row.querySelectorAll('td, th'));
            return cells.length >= 2 ? 
              { id: uuidv4(), name: cells[0].textContent?.trim() || '', value: cells[1].textContent?.trim() || '' } :
              null;
          })
          .filter(Boolean);
        
        if (rows.length > 0) {
          blocks.push({
            id: uuidv4(),
            type: 'specifications',
            title: 'Especificações',
            specs: rows,
            visible: true
          });
        }
      }
      else if (element.tagName === 'DIV') {
        // Try to identify structure in divs
        const childBlocks = await processHTML(element as HTMLElement);
        blocks.push(...childBlocks);
      }
    }
  } catch (error) {
    console.error('Error processing HTML into blocks:', error);
  }
  
  return blocks;
}
