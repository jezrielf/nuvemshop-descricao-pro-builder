
import { Block } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

// Map for block spacing values
export const spacingMap = {
  'xs': '0.5rem',
  'sm': '1rem',
  'md': '1.5rem',
  'lg': '2rem',
  'xl': '3rem'
};

// Function to get spacing style based on block configuration
export const getBlockSpacingStyle = (block: Block, index: number, visibleBlocksLength: number): string => {
  let blockSpacingStyle = '';
  
  if (block.style?.blockSpacing === 'none') {
    blockSpacingStyle = 'margin-bottom: 0;';
  } else if (block.style?.blockSpacing) {
    blockSpacingStyle = `margin-bottom: ${spacingMap[block.style.blockSpacing]};`;
  } else if (index < visibleBlocksLength - 1) {
    // Default spacing for blocks without explicit setting
    blockSpacingStyle = 'margin-bottom: 1.5rem;';
  }
  
  return blockSpacingStyle;
};

// Generate HTML for a single block with proper wrapping
export const generateWrappedBlockHtml = (block: Block, index: number, visibleBlocksLength: number): string => {
  try {
    console.log(`Generating HTML for block ${block.id} of type ${block.type}`);
    
    // Log style for debugging
    if (block.style) {
      console.log(`Block style:`, JSON.stringify(block.style));
    }
    
    // Generate block HTML with styles applied
    const html = generateBlockHtml(block);
    
    // Apply block spacing
    const blockSpacingStyle = getBlockSpacingStyle(block, index, visibleBlocksLength);
    
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
};
