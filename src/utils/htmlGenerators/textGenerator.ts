
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
  
  // Format the content with the appropriate styles
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
  
  // Format text according to the style settings
  let textStyle = '';
  
  // Apply font family
  if (block.style?.fontFamily) {
    const fontFamilyMap = {
      'sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'serif': 'Georgia, Cambria, "Times New Roman", Times, serif',
      'mono': 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
    };
    
    textStyle += `font-family: ${fontFamilyMap[block.style.fontFamily]};`;
  }
  
  // Apply font size
  if (block.style?.fontSize) {
    const fontSizeMap = {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem'
    };
    
    textStyle += `font-size: ${fontSizeMap[block.style.fontSize]};`;
  }
  
  // Apply font style
  if (block.style?.fontStyle === 'italic') {
    textStyle += 'font-style: italic;';
  }
  
  // Apply text decoration
  if (block.style?.textDecoration === 'underline') {
    textStyle += 'text-decoration: underline;';
  }
  
  // Get content wrapper style
  let contentWrapperStyle = '';
  
  // Apply text alignment
  if (block.style?.textAlign) {
    contentWrapperStyle += `text-align: ${block.style.textAlign};`;
  }
  
  // Get content wrapper classes
  const contentWrapperClasses = ['text-block-content'];
  
  // Include the heading in the HTML output
  const headingHtml = block.heading ? 
    `<h2 style="margin-bottom: 0.75rem; font-weight: 600; font-size: 1.5rem; line-height: 1.2; ${headingStyle}">${block.heading}</h2>` : '';
  
  return `
    <div class="text-block" style="${blockStyles}">
      ${headingHtml}
      <div class="${contentWrapperClasses.join(' ')}" style="${contentWrapperStyle} line-height: 1.6;">
        ${content}
      </div>
    </div>
  `;
};
