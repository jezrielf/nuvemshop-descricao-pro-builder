
import { EditorState } from '../types';
import { Block } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

/**
 * Generates the complete HTML output for the product description
 * with properly nested and closed HTML tags
 */
export const generateCompleteHtml = (state: EditorState): string => {
  // Check if description exists and has blocks
  if (!state.description || !state.description.blocks || state.description.blocks.length === 0) {
    return '<div class="product-description" style="width:100%;max-width:1200px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#333;">Nenhum conteúdo adicionado</div>';
  }

  // Filter only visible blocks
  const visibleBlocks = state.description.blocks.filter(block => {
    return block && typeof block === 'object' && 'visible' in block && block.visible;
  });

  if (visibleBlocks.length === 0) {
    return '<div class="product-description" style="width:100%;max-width:1200px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#333;">Nenhum bloco visível</div>';
  }
  
  // Generate HTML for each block
  let blocksHtml = '';
  
  for (let i = 0; i < visibleBlocks.length; i++) {
    const block = visibleBlocks[i];
    try {
      // Generate block HTML
      const blockHtml = generateBlockHtml(block);
      
      // Determine spacing class based on block style
      const marginClass = block.style?.blockSpacing === 'none' 
        ? 'margin-bottom: 0;' 
        : (i < visibleBlocks.length - 1 ? 'margin-bottom: 1.5rem;' : '');
      
      // Add block HTML with proper wrapper
      blocksHtml += `<div class="product-description-block" style="${marginClass}" id="product-block-${block.id}">\n`;
      blocksHtml += blockHtml + '\n';
      blocksHtml += '</div>\n';
    } catch (error) {
      console.error(`Error generating HTML for block ${block.id}:`, error);
      blocksHtml += `<div class="product-description-block error" style="padding: 0.5rem; color: #f00; border: 1px solid #f00;">\n`;
      blocksHtml += `Erro ao gerar HTML para o bloco ${block.id}\n`;
      blocksHtml += '</div>\n';
    }
  }

  // Base styles for the product description container with all styles inline
  const baseStyles = `width:100%;max-width:1200px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#333;`;
  
  // Construct the complete HTML with proper container div and inline styles
  const completeHtml = `<div class="product-description" style="${baseStyles}">\n${blocksHtml}</div>`;

  console.log("HTML output gerado com " + visibleBlocks.length + " blocos visíveis");
  
  // Verificação extra para garantir que todas as tags estão balanceadas
  const openTags = (completeHtml.match(/<div/g) || []).length;
  const closeTags = (completeHtml.match(/<\/div>/g) || []).length;
  
  if (openTags !== closeTags) {
    console.error(`HTML mal formado: ${openTags} tags <div> abertas e ${closeTags} tags </div> fechadas`);
  } else {
    console.log(`HTML bem formado: ${openTags} tags <div> abertas e ${closeTags} tags </div> fechadas`);
  }
  
  return completeHtml;
}
