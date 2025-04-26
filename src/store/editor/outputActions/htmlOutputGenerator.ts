
import { EditorState } from '../types';
import { Block } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';
import { getStylesFromBlock } from '@/utils/styleConverter';

/**
 * Extrai as fontes Google utilizadas nos blocos para incluir no HTML
 */
const extractGoogleFonts = (blocks: Block[]): string[] => {
  const googleFonts: Set<string> = new Set();
  const googleFontRegex = /['"]([^'"]+)['"]/;
  
  blocks.forEach(block => {
    if (block.style?.fontFamily) {
      // Verifica se é uma fonte do Google (contém aspas e não é uma fonte do sistema)
      if (
        block.style.fontFamily.includes('\'') && 
        !block.style.fontFamily.includes('Arial') &&
        !block.style.fontFamily.includes('Verdana') &&
        !block.style.fontFamily.includes('Helvetica') &&
        !block.style.fontFamily.includes('Tahoma') &&
        !block.style.fontFamily.includes('Times') &&
        !block.style.fontFamily.includes('Courier') &&
        !block.style.fontFamily.includes('Georgia')
      ) {
        // Extrair o nome da fonte das aspas
        const match = block.style.fontFamily.match(googleFontRegex);
        if (match && match[1]) {
          googleFonts.add(match[1]);
        }
      }
    }
  });
  
  return Array.from(googleFonts);
};

/**
 * Gera os links para as fontes do Google
 */
const generateGoogleFontLinks = (fonts: string[]): string => {
  if (fonts.length === 0) return '';
  
  // Substitui espaços por + para o formato de URL do Google Fonts
  const formattedFonts = fonts.map(font => font.replace(/\s+/g, '+')).join('|');
  
  return `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${formattedFonts}:wght@400;500;600;700&display=swap">`;
};

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
  
  // Extract Google Fonts
  const googleFonts = extractGoogleFonts(visibleBlocks);
  const fontLinks = generateGoogleFontLinks(googleFonts);
  
  // Generate HTML for each block with standard styling
  let blocksHtml = '';
  
  for (let i = 0; i < visibleBlocks.length; i++) {
    const block = visibleBlocks[i];
    try {
      // Generate block HTML with all inline styles
      const blockHtml = generateBlockHtml(block);
      
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
          #product-block-${block.id} h1, 
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
      
      /* Estilos de coluna para garantir compatibilidade na Nuvemshop */
      @media (min-width: 769px) {
        .nuvemshop-product-description .ns-column-half {
          width: 48% !important;
          display: inline-block !important;
          vertical-align: top;
          margin: 0 1% !important;
        }
        .nuvemshop-product-description .ns-column-third {
          width: 31.33% !important;
          display: inline-block !important;
          vertical-align: top;
          margin: 0 1% !important;
        }
        .nuvemshop-product-description .ns-column-quarter {
          width: 23% !important;
          display: inline-block !important;
          vertical-align: top;
          margin: 0 1% !important;
        }
        .nuvemshop-product-description .ns-column-two-thirds {
          width: 64.66% !important;
          display: inline-block !important;
          vertical-align: top;
          margin: 0 1% !important;
        }
        .nuvemshop-product-description .ns-column-three-quarters {
          width: 73% !important;
          display: inline-block !important;
          vertical-align: top;
          margin: 0 1% !important;
        }
        .nuvemshop-product-description .ns-row {
          display: block;
          width: 100%;
          clear: both;
          content: "";
        }
        .nuvemshop-product-description .ns-row:after {
          clear: both;
          content: "";
          display: table;
        }
      }
      
      /* Estilos responsivos para mobile */
      @media (max-width: 768px) {
        .nuvemshop-product-description [class*="ns-column"] {
          width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          display: block !important;
        }
      }
    </style>
  `;
  
  // Add a comment at the beginning to identify this as a description generated by our editor
  const generatedComment = `<!-- Descrição gerada pelo Editor de Descrições - Editado em: ${new Date().toISOString()} -->`;
  
  // Add a wrapper for the description that uses standard styling
  return `${generatedComment}
${fontLinks}
<div class="nuvemshop-product-description">${cssReset}${blocksHtml}</div>`;
}
