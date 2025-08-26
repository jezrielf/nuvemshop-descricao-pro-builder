
import { TextBlock } from '@/types/editor';
import { getStylesFromBlock } from '../styleConverter';

export const generateTextHtml = (block: TextBlock): string => {
  // Reduced logging for better performance
  
  try {
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
        headingWeight = `font-weight: ${fontWeightMap[block.style.headingWeight] || '600'};`;
      }
      
      headingStyle = headingColor + headingWeight;
    }
    
    // Format the content with the appropriate styles
    let content = block.content || '';
    
    // Apply heading color and weight to headings if defined
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
        headingWeight = `font-weight: ${fontWeightMap[block.style.headingWeight] || '600'};`;
      }
      
      const headingStyleForContent = headingColor + headingWeight;
      
      if (headingStyleForContent) {
        content = content.replace(
          /(<h[1-6][^>]*>)(.*?)(<\/h[1-6]>)/g, 
          `$1<span style="${headingStyleForContent}">$2</span>$3`
        );
      }
    }
    
    // Ensure line breaks are properly formatted in HTML output
    content = content.replace(/\n/g, '<br>');
    
    // Format text according to the style settings
    let textStyle = '';
    
    // Apply font family
    if (block.style?.fontFamily) {
      const fontFamilyMap = {
        'sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        'serif': 'Georgia, Cambria, "Times New Roman", Times, serif',
        'mono': 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
      };
      
      textStyle += `font-family: ${fontFamilyMap[block.style.fontFamily] || fontFamilyMap.sans};`;
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
      
      textStyle += `font-size: ${fontSizeMap[block.style.fontSize] || fontSizeMap.base};`;
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
    
    // Include the heading in the HTML output
    const headingHtml = block.heading ? 
      `<h2 style="margin-bottom: 0.75rem; font-weight: 600; font-size: 1.5rem; line-height: 1.2; ${headingStyle}">${block.heading}</h2>` : '';
    
    const finalHtml = `
      <div class="text-block" style="${blockStyles}">
        ${headingHtml}
        <div class="text-block-content" style="${contentWrapperStyle} line-height: 1.6; ${textStyle}">
          ${content}
        </div>
      </div>
    `;
    
    // HTML generated successfully
    
    return finalHtml;
  } catch (error) {
    console.error('generateTextHtml: Erro ao gerar HTML:', error);
    return `<div class="error-block">Erro ao gerar bloco de texto: ${error instanceof Error ? error.message : 'Erro desconhecido'}</div>`;
  }
};
