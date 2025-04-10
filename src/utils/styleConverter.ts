
import { Block, BlockStyle, SpacingSize } from '@/types/editor';

// Function to convert the styles defined to proper inline CSS
export const getStylesFromBlock = (block: Block): string => {
  if (!block.style) return '';
  
  const style = block.style;
  const styles: Record<string, string> = {};
  
  // Colors
  if (style.backgroundColor) styles['background-color'] = style.backgroundColor;
  if (style.textColor) styles['color'] = style.textColor;
  if (style.headingColor) styles['--heading-color'] = style.headingColor;
  
  // Typography
  if (style.fontFamily) {
    switch (style.fontFamily) {
      case 'sans':
        styles['font-family'] = "'Inter', system-ui, sans-serif";
        break;
      case 'serif':
        styles['font-family'] = "'Georgia', serif";
        break;
      case 'mono':
        styles['font-family'] = "'Consolas', monospace";
        break;
    }
  }
  
  // Font size
  if (style.fontSize) {
    const fontSizeMap: Record<string, string> = {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    };
    styles['font-size'] = fontSizeMap[style.fontSize] || '1rem';
  }
  
  // Text alignment
  if (style.textAlign) styles['text-align'] = style.textAlign;
  
  // Spacing
  if (style.padding) {
    const paddingMap: Record<SpacingSize, string> = {
      'xs': '0.5rem',
      'sm': '1rem',
      'md': '1.5rem',
      'lg': '2rem',
      'xl': '3rem'
    };
    styles['padding'] = paddingMap[style.padding];
  }
  
  if (style.margin) {
    const marginMap: Record<SpacingSize, string> = {
      'xs': '0.5rem',
      'sm': '1rem',
      'md': '1.5rem',
      'lg': '2rem',
      'xl': '3rem'
    };
    styles['margin'] = marginMap[style.margin];
  }
  
  // Border
  if (style.hasBorder) {
    styles['border'] = `1px solid ${style.borderColor || '#e5e7eb'}`;
    
    // Border radius
    if (style.borderRadius) {
      const radiusMap: Record<SpacingSize, string> = {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem'
      };
      styles['border-radius'] = radiusMap[style.borderRadius];
    }
  }
  
  // Shadow
  if (style.hasShadow) {
    styles['box-shadow'] = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  }
  
  // Log the styles being applied
  console.log(`Style conversion for block ${block.id}:`, styles);
  
  // Convert to inline style string with proper format
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
};
