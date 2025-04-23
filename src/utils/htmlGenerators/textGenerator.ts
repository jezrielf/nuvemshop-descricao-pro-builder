
import { TextBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateTextHtml = (block: TextBlock): string => {
  // Get properly formatted style attributes
  const blockStyles = getStylesFromBlock(block);
  
  // Generate heading with appropriate styling
  let headingStyle = '';
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
    
    headingStyle = headingColor + headingWeight;
  }
  
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
  
  // Include the heading in the HTML output
  const headingHtml = block.heading ? 
    `<h2 style="margin-bottom: 0.75rem; font-weight: 600; font-size: 1.5rem; line-height: 1.2; ${headingStyle}">${block.heading}</h2>` : '';
  
  return `
    <div class="text-block" style="${blockStyles}">
      ${headingHtml}
      <div style="line-height: 1.6;">${content}</div>
    </div>
  `;
};
