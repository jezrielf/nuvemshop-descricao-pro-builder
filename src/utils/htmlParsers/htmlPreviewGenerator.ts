
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
      
      // Add the same wrapper divs and styling that will be used in the export
      const marginStyle = block.style?.blockSpacing === 'none' 
        ? 'margin-bottom: 0;' 
        : (index < template.blocks.length - 1 ? 'margin-bottom: 1.5rem;' : '');
      
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
