
import { Block } from '@/types/editor';
import { EditorState } from './types';
import { generateBlockHtml } from '@/utils/htmlGenerators';

export const createOutputActions = (get: () => EditorState) => ({
  getHtmlOutput: () => {
    const description = get().description;
    
    // Check if description exists and has blocks before trying to map over them
    if (!description || !description.blocks || description.blocks.length === 0) {
      return '';
    }

    // Generate HTML for each visible block type with styles applied
    const blocksHtml = description.blocks
      .filter(block => {
        // Make sure the block is valid and has the visible property
        return block && typeof block === 'object' && 'visible' in block && block.visible;
      })
      .map(block => {
        console.log(`Generating HTML for block ${block.id} of type ${block.type}`);
        // Generate HTML with styles applied
        const html = generateBlockHtml(block);
        console.log(`Generated HTML: ${html.substring(0, 100)}...`);
        return html;
      })
      .join('');

    return blocksHtml;
  }
});
