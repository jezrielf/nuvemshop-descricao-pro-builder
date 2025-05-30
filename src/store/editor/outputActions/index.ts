
import { Block, ProductDescription } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

export const createOutputActions = (get: any) => ({
  getHtmlOutput: (productTitle?: string) => {
    const { blocks, description } = get();
    
    if (!description) {
      return '<p>Nenhuma descrição ativa</p>';
    }
    
    // Use the provided product title or fall back to description name
    const title = productTitle || description.name || 'Produto';
    
    // Generate HTML for all blocks
    const blocksHtml = blocks
      .map((block: Block) => generateBlockHtml(block))
      .filter((html: string) => html.trim() !== '')
      .join('\n\n');
    
    if (!blocksHtml.trim()) {
      return `<h1>${title}</h1>\n<p>Descrição em branco</p>`;
    }
    
    return blocksHtml;
  },
  
  getPlainTextOutput: () => {
    const { blocks, description } = get();
    
    if (!description) {
      return 'Nenhuma descrição ativa';
    }
    
    // Extract plain text from all blocks
    const blocksText = blocks
      .map((block: Block) => {
        // Extract text content from each block type
        if (block.type === 'text') {
          const heading = (block as any).heading || '';
          const content = (block as any).content || '';
          // Remove HTML tags for plain text
          const plainContent = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
          return heading ? `${heading}\n${plainContent}` : plainContent;
        }
        // Add other block types as needed
        return '';
      })
      .filter((text: string) => text.trim() !== '')
      .join('\n\n');
    
    return blocksText || 'Descrição em branco';
  }
});
