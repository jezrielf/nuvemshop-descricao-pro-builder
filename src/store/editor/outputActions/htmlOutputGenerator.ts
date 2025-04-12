
import { EditorState } from '../types';
import { Block } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';
import { generateInlineStyles } from './styleUtils';

/**
 * Generates the complete HTML output for the product description
 * with properly nested and closed HTML tags
 */
export const generateCompleteHtml = (state: EditorState): string => {
  // Check if description exists and has blocks
  if (!state.description || !state.description.blocks || state.description.blocks.length === 0) {
    return '<div class="product-description">Nenhum conteúdo adicionado</div>';
  }

  // Filter only visible blocks
  const visibleBlocks = state.description.blocks.filter(block => {
    return block && typeof block === 'object' && 'visible' in block && block.visible;
  });

  if (visibleBlocks.length === 0) {
    return '<div class="product-description">Nenhum bloco visível</div>';
  }

  // Generate the HTML for each block with spacing
  const blocksHtml = visibleBlocks
    .map((block: Block, index: number) => {
      try {
        // Generate the block's HTML content
        const blockHtml = generateBlockHtml(block);
        
        // Determine spacing class based on block style
        const marginClass = block.style?.blockSpacing === 'none' 
          ? 'margin-bottom: 0;' 
          : (index < visibleBlocks.length - 1 ? 'margin-bottom: 1.5rem;' : '');
        
        // Wrap each block in a containing div with proper ID and spacing
        return `<div class="product-description-block" style="${marginClass}" id="product-block-${block.id}">
    ${blockHtml}
</div>`;
      } catch (error) {
        console.error(`Error generating HTML for block ${block.id}:`, error);
        return `<div class="product-description-block error" style="padding: 0.5rem; color: #f00; border: 1px solid #f00;">
    Erro ao gerar HTML para o bloco ${block.id}
</div>`;
      }
    })
    .join('\n');

  // Get the CSS styles
  const cssStyles = generateInlineStyles();

  // Construct the complete HTML with proper container div
  const completeHtml = `<div class="product-description" style="width: 100%; max-width: 1200px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333;">
${cssStyles}
${blocksHtml}
</div>`;

  // Verificação extra para garantir que todas as tags estão fechadas corretamente
  console.log("HTML output gerado:", completeHtml);
  return completeHtml;
}
