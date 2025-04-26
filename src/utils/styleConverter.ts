
import { BlockStyle } from '@/types/editor';

// Convert BlockStyle to CSS inline style object
export const blockStyleToCssObject = (style?: BlockStyle): React.CSSProperties => {
  if (!style) return {};
  
  const cssStyle: React.CSSProperties = {};
  
  // Background properties
  if (style.backgroundColor) {
    cssStyle.backgroundColor = style.backgroundColor;
  }
  
  if (style.backgroundImage) {
    cssStyle.backgroundImage = `url(${style.backgroundImage})`;
  }
  
  if (style.backgroundPosition) {
    cssStyle.backgroundPosition = style.backgroundPosition;
  }
  
  if (style.backgroundSize) {
    cssStyle.backgroundSize = style.backgroundSize;
  }
  
  // Text properties
  if (style.textColor) {
    cssStyle.color = style.textColor;
  }
  
  if (style.fontFamily) {
    cssStyle.fontFamily = style.fontFamily;
  }
  
  if (style.fontSize) {
    cssStyle.fontSize = style.fontSize;
  }
  
  if (style.fontWeight) {
    cssStyle.fontWeight = style.fontWeight;
  }
  
  if (style.fontStyle) {
    cssStyle.fontStyle = style.fontStyle;
  }
  
  if (style.textDecoration) {
    cssStyle.textDecoration = style.textDecoration;
  }
  
  if (style.textAlign) {
    cssStyle.textAlign = style.textAlign;
  }
  
  if (style.lineHeight) {
    cssStyle.lineHeight = style.lineHeight;
  }
  
  // Border properties
  if (style.borderRadius) {
    cssStyle.borderRadius = style.borderRadius;
  }
  
  if (style.borderWidth && style.hasBorder) {
    cssStyle.borderWidth = style.borderWidth;
  }
  
  if (style.borderColor && style.hasBorder) {
    cssStyle.borderColor = style.borderColor;
  }
  
  // Shadow
  if (style.boxShadow && style.hasShadow) {
    cssStyle.boxShadow = style.boxShadow;
  }
  
  // Spacing
  if (style.padding) {
    cssStyle.padding = style.padding;
  }
  
  if (style.margin) {
    cssStyle.margin = style.margin;
  }
  
  return cssStyle;
};

// Convert spacing value to Tailwind classes
export const getSpacingClasses = (style?: BlockStyle): string => {
  if (!style || !style.blockSpacing) return '';
  
  let paddingClasses = '';
  
  // Map the blockSpacing values to Tailwind classes
  switch (style.blockSpacing) {
    case 'none':
      paddingClasses = 'py-0';
      break;
      
    case 'xs':
      paddingClasses = 'py-2';
      break;
      
    case 'sm':
      paddingClasses = 'py-4';
      break;
      
    case 'md':
      paddingClasses = 'py-8';
      break;
      
    case 'lg':
      paddingClasses = 'py-12';
      break;
      
    case 'xl':
      paddingClasses = 'py-16';
      break;
      
    default:
      paddingClasses = 'py-4';
  }
  
  return paddingClasses;
};

// Get responsive container class based on columns value
export const getContainerClass = (columns: string | number): string => {
  switch (columns) {
    case 'full':
    case 1:
      return 'w-full';
    case '2col':
    case 2:
      return 'max-w-screen-md mx-auto';
    case '3col':
    case 3:
      return 'max-w-screen-lg mx-auto';
    case '4col':
    case 4:
      return 'max-w-screen-xl mx-auto';
    case '1/2':
      return 'w-1/2';
    case '1/3':
      return 'w-1/3';
    case '2/3':
      return 'w-2/3';
    case '1/4':
      return 'w-1/4';
    case '3/4':
      return 'w-3/4';
    default:
      return 'w-full';
  }
};
