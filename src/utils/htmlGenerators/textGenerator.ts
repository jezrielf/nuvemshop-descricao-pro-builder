
import { TextBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateTextHtml = (block: TextBlock): string => {
  const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
  
  return `
    <div${blockStyleAttr} class="text-block">
      <div style="line-height:1.6;">${block.content}</div>
    </div>
  `;
};
