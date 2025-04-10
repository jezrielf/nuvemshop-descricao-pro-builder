
import { BlockBase } from '@/types/editor';

// Map spacing values to Tailwind classes
const spacingMap = {
  xs: '2',
  sm: '4',
  md: '6',
  lg: '8',
  xl: '12'
};

// Generate CSS classes based on block style options
export const getStyleClasses = (block: BlockBase): string => {
  if (!block.style) return '';
  
  const classes = [];
  
  // Background
  if (block.style.backgroundColor) {
    // Use bracket notation for custom colors
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
  
  // Log the generated classes for debugging
  console.log(`Style classes for block ${block.id}:`, classes.join(' '));
  
  return classes.join(' ');
};
