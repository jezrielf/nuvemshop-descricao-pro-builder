
import { Block, ProductDescription } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

export const createOutputActions = (get: any) => ({
  getHtmlOutput: (productTitle?: string) => {
    try {
      const { description } = get();
      
      console.log('getHtmlOutput chamado:', { 
        productTitle, 
        hasDescription: !!description, 
        blocksCount: description?.blocks?.length || 0 
      });
      
      if (!description) {
        console.warn('Nenhuma descrição ativa encontrada');
        return '<p>Nenhuma descrição ativa</p>';
      }
      
      if (!description.blocks || description.blocks.length === 0) {
        console.warn('Nenhum bloco encontrado na descrição');
        return '<p>Nenhum bloco para exibir</p>';
      }
      
      // Generate HTML for visible blocks only
      const visibleBlocks = description.blocks.filter((block: Block) => block.visible !== false);
      
      if (visibleBlocks.length === 0) {
        console.warn('Nenhum bloco visível encontrado');
        return '<p>Nenhum bloco visível para exibir</p>';
      }
      
      console.log(`Gerando HTML para ${visibleBlocks.length} blocos visíveis`);
      
      const blocksHtml = visibleBlocks
        .map((block: Block, index: number) => {
          try {
            console.log(`Processando bloco ${index + 1}: ${block.type} (${block.id})`);
            const html = generateBlockHtml(block);
            console.log(`HTML gerado para bloco ${block.type}:`, html.substring(0, 100) + '...');
            return html;
          } catch (blockError) {
            console.error(`Erro ao gerar HTML para bloco ${block.type}:`, blockError);
            return `<div class="error-block">Erro no bloco ${block.type}</div>`;
          }
        })
        .filter((html: string) => html.trim() !== '')
        .join('\n\n');
      
      if (!blocksHtml.trim()) {
        console.warn('Nenhum HTML válido gerado dos blocos');
        return '<p>Erro ao gerar conteúdo dos blocos</p>';
      }
      
      console.log(`HTML final gerado com sucesso (${blocksHtml.length} caracteres)`);
      return blocksHtml;
    } catch (error) {
      console.error('Erro geral em getHtmlOutput:', error);
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
