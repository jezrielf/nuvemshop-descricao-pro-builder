
import { TextBlock } from '@/types/editor/blocks/text';
import { getStylesFromBlock } from '../styleConverter';

export const generateTextHtml = (block: TextBlock): string => {
  // Get properly formatted style attributes
  const blockStyles = getStylesFromBlock(block);
  
  // Apply heading color and weight to headings if defined
  let content = block.content;
  if (block.style?.headingColor || block.style?.headingWeight) {
    const headingColor = block.style?.headingColor ? `color: ${block.style.headingColor};` : '';
    
    let headingWeight = '';
    if (block.style?.headingWeight) {
      const fontWeightMap = {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700'
      };
      headingWeight = `font-weight: ${fontWeightMap[block.style.headingWeight]};`;
    }
    
    const headingStyle = headingColor + headingWeight;
    
    if (headingStyle) {
      content = content.replace(
        /(<h[1-6][^>]*>)(.*?)(<\/h[1-6]>)/g, 
        `$1<span style="${headingStyle}">$2</span>$3`
      );
    }
  }
  
  return `
    <div class="text-block" style="${blockStyles}">
      <div style="line-height: 1.6;">${content}</div>
    </div>
  `;
};
