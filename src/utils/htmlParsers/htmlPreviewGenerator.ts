
import { Template } from "@/types/editor";
import { generateBlockHtml } from "../htmlGenerators";

/**
 * Generates an HTML preview for a template by rendering all its blocks
 */
export const generateTemplatePreview = (template: Template): string => {
  if (!template || !template.blocks || template.blocks.length === 0) {
    return '<div class="empty-template">Este template não contém blocos.</div>';
  }

  let htmlOutput = '';
  
  // Generate HTML for each block in the template
  template.blocks.forEach(block => {
    try {
      const blockHtml = generateBlockHtml(block);
      htmlOutput += blockHtml;
    } catch (error) {
      console.error(`Error generating HTML for block ${block.id}:`, error);
      htmlOutput += `<div class="error-block">Erro ao renderizar bloco: ${block.type}</div>`;
    }
  });

  return `<div class="template-preview">${htmlOutput}</div>`;
};
