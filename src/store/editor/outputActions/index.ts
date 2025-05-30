
import { Block, ProductDescription } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

export const createOutputActions = (get: any) => ({
  getHtmlOutput: (productTitle?: string) => {
    try {
      const { blocks, description } = get();
      
      console.log('getHtmlOutput chamado com:', { productTitle, hasDescription: !!description, blocksCount: blocks?.length || 0 });
      
      if (!description) {
        console.warn('Nenhuma descrição ativa encontrada');
        return '<p>Nenhuma descrição ativa</p>';
      }
      
      // Use the provided product title or fall back to description name
      const title = productTitle || description.name || 'Produto';
      console.log('Título usado para geração HTML:', title);
      
      // Generate HTML for all blocks
      const blocksHtml = blocks
        .map((block: Block) => {
          try {
            const html = generateBlockHtml(block);
            console.log(`HTML gerado para bloco ${block.type} (${block.id}):`, html.substring(0, 50) + '...');
            return html;
          } catch (blockError) {
            console.error(`Erro ao gerar HTML para bloco ${block.type}:`, blockError);
            return '';
          }
        })
        .filter((html: string) => html.trim() !== '')
        .join('\n\n');
      
      if (!blocksHtml.trim()) {
        console.warn('Nenhum HTML gerado dos blocos');
        return `<h1>${title}</h1>\n<p>Descrição em branco</p>`;
      }
      
      console.log(`HTML final gerado (${blocksHtml.length} caracteres)`);
      return blocksHtml;
    } catch (error) {
      console.error('Erro em getHtmlOutput:', error);
      return '<p>Erro ao gerar descrição</p>';
    }
  },
  
  getPlainTextOutput: () => {
    try {
      const { blocks, description } = get();
      
      if (!description) {
        return 'Nenhuma descrição ativa';
      }
      
      // Extract plain text from all blocks
      const blocksText = blocks
        .map((block: Block) => {
          try {
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
          } catch (blockError) {
            console.error(`Erro ao extrair texto do bloco ${block.type}:`, blockError);
            return '';
          }
        })
        .filter((text: string) => text.trim() !== '')
        .join('\n\n');
      
      return blocksText || 'Descrição em branco';
    } catch (error) {
      console.error('Erro em getPlainTextOutput:', error);
      return 'Erro ao extrair texto da descrição';
    }
  }
});
