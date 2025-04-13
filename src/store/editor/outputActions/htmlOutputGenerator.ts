
import { EditorState } from '../types';
import { Block } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

/**
 * Generates the complete HTML output for the product description
 * without wrapper divs that can cause conflicts in Nuvemshop
 */
export const generateCompleteHtml = (state: EditorState): string => {
  // Check if description exists and has blocks
  if (!state.description || !state.description.blocks || state.description.blocks.length === 0) {
    return '<div>Nenhum conteúdo adicionado</div>';
  }

  // Filter only visible blocks
  const visibleBlocks = state.description.blocks.filter(block => {
    return block && typeof block === 'object' && 'visible' in block && block.visible;
  });

  if (visibleBlocks.length === 0) {
    return '<div>Nenhum bloco visível</div>';
  }
  
  // Generate HTML for each block
  let blocksHtml = '';
  
  for (let i = 0; i < visibleBlocks.length; i++) {
    const block = visibleBlocks[i];
    try {
      // Generate block HTML
      const blockHtml = generateBlockHtml(block);
      
      // Determine spacing based on block style
      const marginClass = block.style?.blockSpacing === 'none' 
        ? 'margin-bottom: 0;' 
        : (i < visibleBlocks.length - 1 ? 'margin-bottom: 1.5rem;' : '');
      
      // Add block HTML with simplified wrapper
      blocksHtml += `<div style="${marginClass}" id="product-block-${block.id}">\n`;
      blocksHtml += blockHtml + '\n';
      blocksHtml += '</div>\n';
    } catch (error) {
      console.error(`Error generating HTML for block ${block.id}:`, error);
      blocksHtml += `<div style="padding: 0.5rem; color: #f00; border: 1px solid #f00;">\n`;
      blocksHtml += `Erro ao gerar HTML para o bloco ${block.id}\n`;
      blocksHtml += '</div>\n';
    }
  }

  console.log("HTML output gerado com " + visibleBlocks.length + " blocos visíveis");
  
  // Return blocks HTML directly without the problematic wrapper
  return blocksHtml;
}
