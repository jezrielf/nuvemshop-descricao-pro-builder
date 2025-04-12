
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
          
          // Add one consistent wrapper for all blocks to ensure proper styling and closure
          const wrappedHtml = `
            <div class="product-description-block" style="${blockSpacingStyle}" id="product-block-${block.id}">
              ${html}
            </div>
          `;
          
          // Log generated HTML for debugging
          if (wrappedHtml) {
            console.log(`Generated HTML preview for block ${block.id}`);
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

    // Complete inline CSS - no JavaScript
    const inlineStyles = `
      <style>
        /* Reset básico */
        .product-description div, .product-description p, .product-description h1, 
        .product-description h2, .product-description h3, .product-description h4,
        .product-description h5, .product-description h6, .product-description ul, 
        .product-description ol, .product-description li, .product-description table,
        .product-description tr, .product-description td, .product-description th {
          margin: 0;
          padding: 0;
          border: 0;
          font-size: 100%;
          font: inherit;
          vertical-align: baseline;
          box-sizing: border-box;
        }
        
        /* Estilos básicos */
        .product-description {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        .product-description h1 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        
        .product-description h2 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 12px;
        }
        
        .product-description h3 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .product-description p {
          margin-bottom: 15px;
        }
        
        .product-description img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 0 auto;
        }
        
        /* Grid system */
        .grid {
          display: flex;
          flex-wrap: wrap;
          margin: -10px;
        }
        
        .grid > * {
          padding: 10px;
          flex: 0 0 100%;
        }
        
        @media (min-width: 768px) {
          .md\\:grid-cols-2 > * {
            flex: 0 0 50%;
          }
          
          .md\\:grid-cols-3 > * {
            flex: 0 0 33.333333%;
          }
          
          .md\\:grid-cols-4 > * {
            flex: 0 0 25%;
          }
        }
        
        /* FAQ estilos com CSS puro (sem JavaScript) */
        .faq-item {
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          margin-bottom: 10px;
          overflow: hidden;
        }
        
        .faq-question {
          padding: 15px;
          background-color: #f9fafb;
          font-weight: 500;
          cursor: pointer;
          position: relative;
        }
        
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background-color: white;
        }
        
        .faq-answer-content {
          padding: 15px;
        }
        
        .faq-toggle:checked ~ .faq-answer {
          max-height: 1000px;
        }
        
        .faq-toggle:checked + .faq-question .faq-icon {
          transform: rotate(45deg);
        }
      </style>
    `;

    // Wrap all blocks in a container div with global styles
    const finalHtml = `
      <div class="product-description" style="width: 100%; max-width: 1200px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #333;">
        ${inlineStyles}
        ${blocksHtml}
      </div>
    `;
    
    return finalHtml;
  }
});
