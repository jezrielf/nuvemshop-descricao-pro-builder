
import { TextBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateTextHtml = (block: TextBlock): string => {
  // Get properly formatted style attributes
  const blockStyles = getStylesFromBlock(block);
  
  return `
    <div class="text-block" style="${blockStyles}">
      <div style="line-height: 1.6;">${block.content}</div>
    </div>
  `;
};
