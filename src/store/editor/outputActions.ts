
import { Block } from '@/types/editor';
import { EditorState } from './types';
import { generateBlockHtml } from '@/utils/htmlGenerators';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    const description = get().description;
    
    // Check if description exists and has blocks
    if (!description || !description.blocks || description.blocks.length === 0) {
      return '<div style="padding: 20px; text-align: center; color: #666;">Nenhum conteúdo adicionado</div>';
    }

    // Generate HTML for each visible block
    const blocksHtml = description.blocks
      .filter(block => {
        // Filter only visible blocks
        return block && typeof block === 'object' && 'visible' in block && block.visible;
      })
      .map((block, index, visibleBlocks) => {
        try {
          console.log(`Generating HTML for block ${block.id} of type ${block.type}`);
          
          // Log style for debugging
          if (block.style) {
            console.log(`Block style:`, JSON.stringify(block.style));
          }
          
          // Generate block HTML with styles applied
          const html = generateBlockHtml(block);
          
          // Apply block spacing - wrap in a div with appropriate margin
          let blockSpacingStyle = '';
          if (block.style?.blockSpacing === 'none') {
            blockSpacingStyle = 'margin-bottom: 0;';
          } else if (block.style?.blockSpacing) {
            const spacingMap = {
              'xs': '0.5rem',
              'sm': '1rem',
              'md': '1.5rem',
              'lg': '2rem',
              'xl': '3rem'
            };
            blockSpacingStyle = `margin-bottom: ${spacingMap[block.style.blockSpacing]};`;
          } else if (index < visibleBlocks.length - 1) {
            // Default spacing for blocks without explicit setting
            blockSpacingStyle = 'margin-bottom: 1.5rem;';
          }
          
          // Add one consistent wrapper for all blocks to ensure proper styling
          const wrappedHtml = `
            <div class="product-description-block" style="${blockSpacingStyle}" id="product-block-${block.id}">
              ${html}
            </div>
          `;
          
          // Log generated HTML for debugging (first 100 chars)
          if (wrappedHtml) {
            console.log(`Generated HTML preview: ${wrappedHtml.substring(0, 100)}...`);
          } else {
            console.warn(`No HTML generated for block ${block.id}`);
          }
          
          return wrappedHtml;
        } catch (error) {
          console.error(`Error generating HTML for block ${block.id}:`, error);
          return `<div style="padding: 20px; border: 1px solid #f00; color: #f00;">Erro ao gerar HTML para o bloco ${block.id}</div>`;
        }
      })
      .join('\n\n');

    // Include global responsive styles
    const globalStyles = `
      <style>
        /* Global styles for all product blocks */
        .product-description {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* Responsive grid adjustments */
        @media (max-width: 768px) {
          .grid.md\\:grid-cols-2, 
          .grid.md\\:grid-cols-3, 
          .grid.md\\:grid-cols-4 {
            grid-template-columns: 1fr !important;
          }
        }
      </style>
    `;

    // Wrap all blocks in a container div with global styles
    const finalHtml = `
      <div class="product-description">
        ${globalStyles}
        ${blocksHtml}
      </div>
    `;
    
    return finalHtml;
  }
});
