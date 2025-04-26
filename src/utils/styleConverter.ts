
import { BlockStyle, BlockSpacing } from '@/types/editor';

// Convert block style object to CSS string
export const getStylesFromBlock = (block: any): string | null => {
  if (!block || !block.style) return null;

  const style = block.style as BlockStyle;
  let styles = '';

  // Background styles
  if (style.backgroundColor) styles += `background-color:${style.backgroundColor};`;
  if (style.backgroundImage) styles += `background-image:url(${style.backgroundImage});`;
  if (style.backgroundPosition) styles += `background-position:${style.backgroundPosition};`;
  if (style.backgroundSize) styles += `background-size:${style.backgroundSize};`;

  // Text styles
  if (style.textColor) styles += `color:${style.textColor};`;
  if (style.fontFamily) styles += `font-family:${style.fontFamily};`;
  if (style.fontSize) styles += `font-size:${style.fontSize};`;
  if (style.fontWeight) styles += `font-weight:${style.fontWeight};`;
  if (style.fontStyle) styles += `font-style:${style.fontStyle};`;
  if (style.textDecoration) styles += `text-decoration:${style.textDecoration};`;
  if (style.textAlign) styles += `text-align:${style.textAlign};`;

  // Border styles
  if (style.hasBorder) {
    styles += `border-style:solid;`;
    if (style.borderWidth) styles += `border-width:${style.borderWidth};`;
    if (style.borderColor) styles += `border-color:${style.borderColor};`;
  }
  if (style.borderRadius) styles += `border-radius:${style.borderRadius};`;

  // Shadow
  if (style.hasShadow) {
    styles += `box-shadow:${style.boxShadow || '0 4px 8px rgba(0,0,0,0.1)'};`;
  }

  // Spacing
  if (style.padding) styles += `padding:${style.padding};`;
  if (style.margin) styles += `margin:${style.margin};`;
  if (style.lineHeight) styles += `line-height:${style.lineHeight};`;

  return styles || null;
};

// Convert a block style object to class names (for Tailwind)
export const generateStyleClasses = (block: any): string => {
  if (!block || !block.style) return '';

  const style = block.style as BlockStyle;
  const classes: string[] = [];

  // Background styles
  if (style.backgroundColor) {
    if (style.backgroundColor.startsWith('#')) {
      classes.push('bg-custom'); // Custom color to be handled with inline style
    } else {
      classes.push(`bg-${style.backgroundColor}`);
    }
  }

  // Text styles
  if (style.textColor) {
    if (style.textColor.startsWith('#')) {
      classes.push('text-custom'); // Custom color to be handled with inline style
    } else {
      classes.push(`text-${style.textColor}`);
    }
  }

  if (style.fontFamily) classes.push(`font-${style.fontFamily}`);
  if (style.fontSize) classes.push(`text-${style.fontSize}`);
  if (style.fontWeight) classes.push(`font-${style.fontWeight}`);
  if (style.fontStyle === 'italic') classes.push('italic');
  if (style.textDecoration === 'underline') classes.push('underline');
  if (style.textAlign) classes.push(`text-${style.textAlign}`);

  // Border styles
  if (style.hasBorder) {
    classes.push('border');
    if (style.borderColor && !style.borderColor.startsWith('#')) {
      classes.push(`border-${style.borderColor}`);
    }
    if (style.borderWidth) {
      const width = style.borderWidth.replace('px', '');
      classes.push(`border-${width}`);
    }
  }
  if (style.borderRadius) classes.push(`rounded-${style.borderRadius}`);

  // Shadow
  if (style.hasShadow) classes.push('shadow');

  // Spacing based on block spacing or individual padding/margin
  addSpacingClasses(classes, style);

  return classes.join(' ');
};

// Helper function to add appropriate spacing classes
const addSpacingClasses = (classes: string[], style: BlockStyle): void => {
  if (style.blockSpacing) {
    switch (style.blockSpacing) {
      case 'xs':
        classes.push('p-1 my-1');
        break;
      case 'sm':
        classes.push('p-2 my-2');
        break;
      case 'md':
        classes.push('p-4 my-4');
        break;
      case 'lg':
        classes.push('p-6 my-6');
        break;
      case 'xl':
        classes.push('p-8 my-8');
        break;
      default:
        break;
    }
  } else {
    // Handle individual padding and margin
    if (style.padding) {
      const paddingValue = parseInt(style.padding);
      if (paddingValue <= 4) classes.push('p-1');
      else if (paddingValue <= 8) classes.push('p-2');
      else if (paddingValue <= 16) classes.push('p-4');
      else if (paddingValue <= 24) classes.push('p-6');
      else classes.push('p-8');
    }
    
    if (style.margin) {
      const marginValue = parseInt(style.margin);
      if (marginValue <= 4) classes.push('m-1');
      else if (marginValue <= 8) classes.push('m-2');
      else if (marginValue <= 16) classes.push('m-4');
      else if (marginValue <= 24) classes.push('m-6');
      else classes.push('m-8');
    }
  }
};
