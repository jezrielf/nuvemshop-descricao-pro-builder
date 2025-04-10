
import { BlockBase } from '@/types/editor';

// Mapeia valores de espaçamento para classes Tailwind
const spacingMap = {
  xs: '2',
  sm: '4',
  md: '6',
  lg: '8',
  xl: '12'
};

// Gera classes CSS baseadas nas opções de estilo do bloco
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
    classes.push(`font-${block.style.fontFamily}`);
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
  }
  
  // Border radius
  if (block.style.borderRadius) {
    classes.push(`rounded-${block.style.borderRadius === 'xs' ? 'sm' : 
                          block.style.borderRadius === 'sm' ? 'md' : 
                          block.style.borderRadius === 'md' ? 'lg' : 
                          block.style.borderRadius === 'lg' ? 'xl' : 
                          '2xl'}`);
  }
  
  // Shadow
  if (block.style.hasShadow) {
    classes.push('shadow-md');
  }
  
  // Log the generated classes for debugging
  console.log(`Style classes for block ${block.id}:`, classes.join(' '));
  
  return classes.join(' ');
};
