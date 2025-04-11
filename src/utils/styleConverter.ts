
import { BlockStyle, Block } from '@/types/editor';

// Converte um objeto de estilo em uma string CSS para uso inline
export const getStylesFromBlock = (block: Block): string => {
  if (!block || !block.style) return '';
  
  const style: BlockStyle = block.style;
  const styleProps: string[] = [];
  
  // Background styles
  if (style.backgroundColor) styleProps.push(`background-color: ${style.backgroundColor}`);
  if (style.backgroundImage) styleProps.push(`background-image: url(${style.backgroundImage})`);
  if (style.backgroundPosition) styleProps.push(`background-position: ${style.backgroundPosition}`);
  if (style.backgroundSize) styleProps.push(`background-size: ${style.backgroundSize}`);
  
  // Typography styles
  if (style.fontFamily) styleProps.push(`font-family: ${style.fontFamily}`);
  if (style.fontSize) styleProps.push(`font-size: ${style.fontSize}`);
  if (style.fontWeight) styleProps.push(`font-weight: ${style.fontWeight}`);
  if (style.textColor) styleProps.push(`color: ${style.textColor}`);
  if (style.textAlign) styleProps.push(`text-align: ${style.textAlign}`);
  if (style.lineHeight) styleProps.push(`line-height: ${style.lineHeight}`);
  
  // Spacing styles
  if (style.padding) styleProps.push(`padding: ${style.padding}`);
  if (style.margin) styleProps.push(`margin: ${style.margin}`);
  
  // Border and layout styles
  if (style.borderRadius) styleProps.push(`border-radius: ${style.borderRadius}`);
  if (style.borderWidth && style.borderColor) {
    styleProps.push(`border: ${style.borderWidth} solid ${style.borderColor}`);
  } else if (style.borderWidth) {
    styleProps.push(`border-width: ${style.borderWidth}`);
  } else if (style.borderColor) {
    styleProps.push(`border-color: ${style.borderColor}`);
  }
  
  // Box shadow (if present)
  if (style.boxShadow) styleProps.push(`box-shadow: ${style.boxShadow}`);
  
  // Responsive padding for block spacing
  // We handle this in the block-specific generators
  
  return styleProps.join('; ');
};

// Esta função gera classes de espaçamento específicas para controle do espaçamento entre blocos
export const getBlockSpacingClass = (block: Block): string => {
  if (!block || !block.style) return 'mb-8'; // Espaçamento padrão
  
  const { blockSpacing } = block.style;
  
  switch (blockSpacing) {
    case 'none':
      return 'mb-0';
    case 'small':
      return 'mb-4';
    case 'medium':
      return 'mb-8';
    case 'large':
      return 'mb-12';
    case 'extra-large':
      return 'mb-16';
    default:
      return 'mb-8'; // Valor padrão médio
  }
};
