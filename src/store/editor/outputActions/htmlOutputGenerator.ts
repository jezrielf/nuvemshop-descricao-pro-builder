
import { EditorState } from '../types';
import { Block } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

/**
 * Generates the complete HTML output for the product description
 * with exact same styling that will be exported to Nuvemshop
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
  
  // Generate HTML for each block with standard styling
  let blocksHtml = '';
  
  for (let i = 0; i < visibleBlocks.length; i++) {
    const block = visibleBlocks[i];
    try {
      // Generate block HTML with all inline styles
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
  
  // Add CSS reset and responsive styles to ensure consistent rendering
  const cssReset = `
    <style>
      .nuvemshop-product-description * {
        box-sizing: border-box;
      }
      .nuvemshop-product-description img {
        max-width: 100%;
        height: auto;
      }
      @media (max-width: 768px) {
        .nuvemshop-product-description [class*="-container"] > [class*="-item"] {
          width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
      }
    </style>
  `;
  
  // Add a wrapper for the preview that uses standard styling
  return `<div class="nuvemshop-product-description">${cssReset}${blocksHtml}</div>`;
}
