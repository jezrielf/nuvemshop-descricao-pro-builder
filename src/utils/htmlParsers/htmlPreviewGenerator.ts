
import { Template } from "@/types/editor";
import { generateBlockHtml } from "../htmlGenerators";

/**
 * Generates an HTML preview for a template by rendering all its blocks
 * Ensures the output is identical to what will be exported to Nuvemshop
 */
export const generateTemplatePreview = (template: Template): string => {
  if (!template || !template.blocks || template.blocks.length === 0) {
    return '<div class="empty-template">Este template não contém blocos.</div>';
  }

  let htmlOutput = '';
  
  // Generate HTML for each block in the template
  template.blocks.forEach((block, index) => {
    try {
      const blockHtml = generateBlockHtml(block);
      
      // Apply spacing based on block style
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
      const marginStyle = index < template.blocks.length - 1 ? `margin-bottom: ${marginBottom};` : '';
      
      htmlOutput += `<div style="${marginStyle}" id="product-block-${block.id}">\n`;
      htmlOutput += blockHtml;
      htmlOutput += '</div>\n';
    } catch (error) {
      console.error(`Error generating HTML for block ${block.id}:`, error);
      htmlOutput += `<div class="error-block">Erro ao renderizar bloco: ${block.type}</div>`;
    }
  });

  return `<div class="nuvemshop-product-description">${htmlOutput}</div>`;
};
