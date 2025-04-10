
import { Block, BlockStyle, SpacingSize } from '@/types/editor';

// Function to convert the styles defined to inline CSS
export const getStylesFromBlock = (block: Block): string => {
  if (!block.style) return '';
  
  const style = block.style;
  const styles: Record<string, string> = {};
  
  // Cores
  if (style.backgroundColor) styles.backgroundColor = style.backgroundColor;
  if (style.textColor) styles.color = style.textColor;
  
  // Tipografia
  if (style.fontFamily) {
    switch (style.fontFamily) {
      case 'sans':
        styles.fontFamily = "'Inter', system-ui, sans-serif";
        break;
      case 'serif':
        styles.fontFamily = "'Georgia', serif";
        break;
      case 'mono':
        styles.fontFamily = "'Consolas', monospace";
        break;
    }
  }
  
  // Tamanho da fonte
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
    styles.fontSize = fontSizeMap[style.fontSize];
  }
  
  // Alinhamento
  if (style.textAlign) styles.textAlign = style.textAlign;
  
  // Espaçamento
  if (style.padding) {
    const paddingMap: Record<SpacingSize, string> = {
      'xs': '0.5rem',
      'sm': '1rem',
      'md': '1.5rem',
      'lg': '2rem',
      'xl': '3rem'
    };
    styles.padding = paddingMap[style.padding];
  }
  
  if (style.margin) {
    const marginMap: Record<SpacingSize, string> = {
      'xs': '0.5rem',
      'sm': '1rem',
      'md': '1.5rem',
      'lg': '2rem',
      'xl': '3rem'
    };
    styles.margin = marginMap[style.margin];
  }
  
  // Borda
  if (style.hasBorder) {
    styles.border = `1px solid ${style.borderColor || '#e5e7eb'}`;
  }
  
  // Border radius
  if (style.borderRadius) {
    const radiusMap: Record<SpacingSize, string> = {
      'xs': '0.125rem',
      'sm': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem'
    };
    styles.borderRadius = radiusMap[style.borderRadius];
  }
  
  // Sombra
  if (style.hasShadow) {
    styles.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  }
  
  // Log the styles being applied
  console.log(`Style conversion for block ${block.id}:`, styles);
  
  // Converte para string de estilo inline
  return Object.entries(styles)
    .map(([key, value]) => `${key}:${value}`)
    .join(';');
};
