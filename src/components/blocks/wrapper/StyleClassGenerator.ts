
import { BlockBase } from '@/types/editor';

// Map spacing values to Tailwind classes
const spacingMap = {
  xs: '2',
  sm: '4',
  md: '6',
  lg: '8',
  xl: '12'
};

// Generate CSS classes based on block style options - for preview reference only
export const getStyleClasses = (block: BlockBase): string => {
  if (!block.style) return '';
  
  const classes = [];
  
  // Background
  if (block.style.backgroundColor) {
    classes.push(`bg-[${block.style.backgroundColor}]`);
  }
  
  // Text color
  if (block.style.textColor) {
    classes.push(`text-[${block.style.textColor}]`);
  }
  
  // Font family
  if (block.style.fontFamily) {
    switch (block.style.fontFamily) {
      case 'sans':
        classes.push('font-sans');
        break;
      case 'serif':
        classes.push('font-serif');
        break;
      case 'mono':
        classes.push('font-mono');
        break;
    }
  }
  
  // Font size
  if (block.style.fontSize) {
    classes.push(`text-${block.style.fontSize}`);
  }
  
  // Text formatting options
  if (block.style.fontWeight) {
    const fontWeightMap = {
      'normal': 'font-normal',
      'medium': 'font-medium',
      'semibold': 'font-semibold',
      'bold': 'font-bold'
    };
    classes.push(fontWeightMap[block.style.fontWeight]);
  }
  
  if (block.style.fontStyle === 'italic') {
    classes.push('italic');
  }
  
  if (block.style.textDecoration === 'underline') {
    classes.push('underline');
  }
  
  // Text alignment
  if (block.style.textAlign) {
    classes.push(`text-${block.style.textAlign}`);
  }
  
  // Padding
  if (block.style.padding) {
    classes.push(`p-${spacingMap[block.style.padding]}`);
  }
  
  // Margin
  if (block.style.margin) {
    classes.push(`m-${spacingMap[block.style.margin]}`);
  }
  
  // Block spacing
  if (block.style.blockSpacing && block.style.blockSpacing !== 'none') {
    classes.push(`mb-${spacingMap[block.style.blockSpacing]}`);
  } else if (block.style.blockSpacing === 'none') {
    classes.push('mb-0');
  }
  
  // Border
  if (block.style.hasBorder) {
    classes.push('border');
    
    if (block.style.borderColor) {
      classes.push(`border-[${block.style.borderColor}]`);
    }
    
    // Border radius (only apply if has border)
    if (block.style.borderRadius) {
      const radiusMap = {
        'xs': 'rounded-sm',
        'sm': 'rounded-md',
        'md': 'rounded-lg',
        'lg': 'rounded-xl',
        'xl': 'rounded-2xl'
      };
      classes.push(radiusMap[block.style.borderRadius] || 'rounded');
    }
  }
  
  // Shadow
  if (block.style.hasShadow) {
    classes.push('shadow-md');
  }
  
  return classes.join(' ');
};
