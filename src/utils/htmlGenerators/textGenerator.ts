
import { TextBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateTextHtml = (block: TextBlock): string => {
  // Get properly formatted style attributes
  const blockStyles = getStylesFromBlock(block);
  
  // Apply heading color to headings if defined
  let content = block.content;
  if (block.style?.headingColor) {
    content = content.replace(
      /(<h[1-6][^>]*>)(.*?)(<\/h[1-6]>)/g, 
      `$1<span style="color: ${block.style.headingColor}">$2</span>$3`
    );
  }
  
  return `
    <div class="text-block" style="${blockStyles}">
      <div style="line-height: 1.6;">${content}</div>
    </div>
  `;
};
