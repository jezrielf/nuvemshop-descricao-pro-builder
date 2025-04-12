
import { EditorState } from '../types';
import { generateWrappedBlockHtml } from './htmlGenerationUtils';
import { generateInlineStyles } from './styleUtils';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    const description = get().description;
    
    // Check if description exists and has blocks
    if (!description || !description.blocks || description.blocks.length === 0) {
      return '<div style="padding: 20px; text-align: center; color: #666;">Nenhum conteúdo adicionado</div>';
    }

    // Filter only visible blocks
    const visibleBlocks = description.blocks.filter(block => {
      return block && typeof block === 'object' && 'visible' in block && block.visible;
    });

    // Generate HTML for each visible block
    const blocksHtml = visibleBlocks
      .map((block, index) => generateWrappedBlockHtml(block, index, visibleBlocks.length))
      .join('\n\n');

    // Get inline styles
    const inlineStyles = generateInlineStyles();

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
