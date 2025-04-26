
import { BlockBase, BlockStyle } from '@/types/editor';
import { cn } from '@/lib/utils';

interface StyleClasses {
  container: string;
  heading: string;
  text: string;
}

export function generateStyleClasses(block: BlockBase): StyleClasses {
  const style = block.style || {};
  
  // Base container styles
  const containerClasses = getContainerClasses(style);
  
  // Heading styles
  const headingClasses = getHeadingClasses(style);
  
  // Text styles
  const textClasses = getTextClasses(style);
  
  return {
    container: containerClasses,
    heading: headingClasses,
    text: textClasses
  };
}

function getContainerClasses(style: BlockStyle): string {
  // Background color
  const bgColor = style.backgroundColor ? `bg-[${style.backgroundColor}]` : '';
  
  // Text color
  const textColor = style.textColor ? `text-[${style.textColor}]` : '';
  
  // Font family
  const fontFamily = getFontFamilyClass(style.fontFamily);
  
  // Text alignment
  const textAlign = getTextAlignClass(style.textAlign);
  
  // Spacing
  const padding = getPaddingClass(style.padding);
  const margin = getMarginClass(style.margin);
  
  // Border
  const border = getBorderClasses(style);
  
  // Shadow
  const shadow = getShadowClass(style);
  
  // Block spacing
  const blockSpacing = style.blockSpacing ? getBlockSpacingClass(style.blockSpacing) : '';
  
  return cn(
    bgColor,
    textColor,
    fontFamily,
    textAlign,
    padding,
    margin,
    border,
    shadow,
    blockSpacing
  );
}

function getHeadingClasses(style: BlockStyle): string {
  // Heading color
  const headingColor = style.headingColor ? `text-[${style.headingColor}]` : '';
  
  // Font weight for headings
  const fontWeight = style.headingWeight ? getFontWeightClass(style.headingWeight) : '';
  
  return cn(
    headingColor,
    fontWeight
  );
}

function getTextClasses(style: BlockStyle): string {
  // Font size
  const fontSize = getFontSizeClass(style.fontSize);
  
  // Font weight
  const fontWeight = getFontWeightClass(style.fontWeight);
  
  // Font style
  const fontStyle = style.fontStyle === 'italic' ? 'italic' : '';
  
  // Text decoration
  const textDecoration = getTextDecorationClass(style.textDecoration);
  
  return cn(
    fontSize,
    fontWeight,
    fontStyle,
    textDecoration
  );
}

function getBlockSpacingClass(blockSpacing: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'): string {
  switch (blockSpacing) {
    case 'none': return 'p-0';
    case 'xs': return 'p-2 my-2';
    case 'sm': return 'p-3 my-3';
    case 'md': return 'p-4 my-4';
    case 'lg': return 'p-6 my-6';
    case 'xl': return 'p-8 my-8';
    default: return '';
  }
}

function getBorderClasses(style: BlockStyle): string {
  if (!style.hasBorder) return '';
  
  const width = style.borderWidth || '1px';
  const color = style.borderColor || '#e2e8f0';
  const radius = style.borderRadius || '0px';
  
  // Convert to Tailwind classes when possible, or use inline styles
  const borderWidth = getBorderWidthClass(width);
  const borderRadius = getBorderRadiusClass(radius);
  
  return cn(
    borderWidth,
    borderRadius,
    `border-[${color}]`
  );
}

function getShadowClass(style: BlockStyle): string {
  if (!style.hasShadow) return '';
  
  switch (style.boxShadow) {
    case 'sm': return 'shadow-sm';
    case 'md': return 'shadow';
    case 'lg': return 'shadow-md';
    case 'xl': return 'shadow-lg';
    default: return 'shadow';
  }
}

function getFontFamilyClass(fontFamily?: string): string {
  if (!fontFamily) return '';
  
  switch (fontFamily.toLowerCase()) {
    case 'sans': return 'font-sans';
    case 'serif': return 'font-serif';
    case 'mono': return 'font-mono';
    default: return `font-${fontFamily.toLowerCase()}`;
  }
}

function getTextAlignClass(textAlign?: string): string {
  if (!textAlign) return '';
  
  switch (textAlign) {
    case 'left': return 'text-left';
    case 'center': return 'text-center';
    case 'right': return 'text-right';
    case 'justify': return 'text-justify';
    default: return '';
  }
}

function getFontSizeClass(fontSize?: string): string {
  if (!fontSize) return '';
  
  switch (fontSize) {
    case 'xs': return 'text-xs';
    case 'sm': return 'text-sm';
    case 'base': return 'text-base';
    case 'lg': return 'text-lg';
    case 'xl': return 'text-xl';
    case '2xl': return 'text-2xl';
    case '3xl': return 'text-3xl';
    default: return '';
  }
}

function getFontWeightClass(fontWeight?: string): string {
  if (!fontWeight) return '';
  
  switch (fontWeight) {
    case 'thin': return 'font-thin';
    case 'light': return 'font-light';
    case 'normal': return 'font-normal';
    case 'medium': return 'font-medium';
    case 'semibold': return 'font-semibold';
    case 'bold': return 'font-bold';
    case 'extrabold': return 'font-extrabold';
    case 'black': return 'font-black';
    default: return '';
  }
}

function getTextDecorationClass(textDecoration?: string): string {
  if (!textDecoration) return '';
  
  switch (textDecoration) {
    case 'underline': return 'underline';
    case 'line-through': return 'line-through';
    case 'no-underline': return 'no-underline';
    default: return '';
  }
}

function getPaddingClass(padding?: string): string {
  if (!padding) return '';
  
  switch (padding) {
    case 'none': return 'p-0';
    case 'sm': return 'p-2';
    case 'md': return 'p-4';
    case 'lg': return 'p-6';
    case 'xl': return 'p-8';
    default: return '';
  }
}

function getMarginClass(margin?: string): string {
  if (!margin) return '';
  
  switch (margin) {
    case 'none': return 'm-0';
    case 'sm': return 'm-2';
    case 'md': return 'm-4';
    case 'lg': return 'm-6';
    case 'xl': return 'm-8';
    default: return '';
  }
}

function getBorderWidthClass(width: string): string {
  switch (width) {
    case '0px': return 'border-0';
    case '1px': return 'border';
    case '2px': return 'border-2';
    case '4px': return 'border-4';
    case '8px': return 'border-8';
    default: return 'border';
  }
}

function getBorderRadiusClass(radius: string): string {
  switch (radius) {
    case '0px': return 'rounded-none';
    case '4px': return 'rounded';
    case '8px': return 'rounded-md';
    case '12px': return 'rounded-lg';
    case '16px': return 'rounded-xl';
    case '9999px': return 'rounded-full';
    default: return '';
  }
}
