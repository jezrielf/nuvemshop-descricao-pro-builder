
import { EditorState } from '../types';
import { Block } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';
import { getStylesFromBlock } from '@/utils/styleConverter';

/**
 * Generates the complete HTML output for the product description
 * with exact same styling that will be exported to Nuvemshop
 */
export const generateCompleteHtml = (state: EditorState, productTitle?: string): string => {
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
  
  // Add product title as primary H1 if provided
  if (productTitle) {
    blocksHtml += `<h1 class="product-title" style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1.5rem; color: #333;">${productTitle}</h1>\n`;
  }
  
  // Process blocks and ensure no other H1 tags are used (convert to H2)
  for (let i = 0; i < visibleBlocks.length; i++) {
    const block = visibleBlocks[i];
    try {
      // Generate block HTML with all inline styles
      let blockHtml = generateBlockHtml(block);
      
      // Convert any H1 tags to H2 tags to maintain heading hierarchy
      if (productTitle) {
        blockHtml = blockHtml.replace(/<h1([^>]*)>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>');
      }
      
      // Determine spacing based on block style
      let marginBottom = '1.5rem';
      if (block.style?.blockSpacing === 'none') {
        marginBottom = '0';
      } else if (block.style?.blockSpacing === 'xs' || block.style?.blockSpacing === 'small') {
        marginBottom = '0.75rem';
      } else if (block.style?.blockSpacing === 'md' || block.style?.blockSpacing === 'large') {
        marginBottom = '2.25rem';
      } else if (block.style?.blockSpacing === 'lg' || block.style?.blockSpacing === 'xl' || block.style?.blockSpacing === 'extra-large') {
        marginBottom = '3rem';
      }
      
      // Apply spacing only if not the last block
      const marginStyle = i < visibleBlocks.length - 1 ? `margin-bottom: ${marginBottom};` : '';
      
      // Get all custom styles from block
      const blockStyles = getStylesFromBlock(block);
      
      // Combine all styles
      const combinedStyles = [
        blockStyles,
        marginStyle
      ].filter(Boolean).join('; ');
      
      // Add CSS for heading colors and weights if specified
      const headingStyles = block.style?.headingColor || block.style?.headingWeight ? 
        `<style>
          #product-block-${block.id} h2, 
          #product-block-${block.id} h3, 
          #product-block-${block.id} h4, 
          #product-block-${block.id} h5, 
          #product-block-${block.id} h6 {
            ${block.style?.headingColor ? `color: ${block.style.headingColor};` : ''}
            ${block.style?.headingWeight ? `font-weight: ${
              block.style.headingWeight === 'normal' ? '400' : 
              block.style.headingWeight === 'medium' ? '500' : 
              block.style.headingWeight === 'semibold' ? '600' : 
              '700'
            };` : ''}
          }
        </style>` : '';
      
      // Add block HTML with metadata in attributes for later parsing
      blocksHtml += `${headingStyles}<div 
        style="${combinedStyles}" 
        id="product-block-${block.id}" 
        data-block-type="${block.type}" 
        data-block-columns="${block.columns}"
      >\n`;
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
  
  // Add schema.org structured data for products
  const structuredData = productTitle ? 
  `<script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "${productTitle}"
    }
  </script>` : '';
  
  // Add a comment at the beginning to identify this as a description generated by our editor
  const generatedComment = `<!-- Descrição gerada pelo Editor de Descrições - Editado em: ${new Date().toISOString()} -->`;
  
  // Add a wrapper for the description that uses standard styling
  return `${generatedComment}\n${structuredData}\n<div class="nuvemshop-product-description">${cssReset}${blocksHtml}</div>`;
}
