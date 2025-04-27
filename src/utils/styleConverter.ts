import { BlockStyle, Block, BlockSpacing } from '@/types/editor';

// Converte um objeto de estilo em uma string CSS para uso inline
export const getStylesFromBlock = (block: Block): string => {
  if (!block || !block.style) return '';
  
  const style: BlockStyle = block.style;
  const styleProps: string[] = [];
  
  // Background styles
  if (style.backgroundGradient) {
    styleProps.push(`background: ${style.backgroundGradient}`);
  } else if (style.backgroundColor) {
    styleProps.push(`background-color: ${style.backgroundColor}`);
  }
  
  if (style.backgroundImage) styleProps.push(`background-image: url(${style.backgroundImage})`);
  if (style.backgroundPosition) styleProps.push(`background-position: ${style.backgroundPosition}`);
  if (style.backgroundSize) styleProps.push(`background-size: ${style.backgroundSize}`);
  
  // Typography styles
  if (style.fontFamily) {
    styleProps.push(`font-family: ${style.fontFamily}`);
  }
  
  if (style.fontSize) {
    const fontSizeMap = {
      'xs': '0.75rem',
      'sm': '0.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem'
    };
    styleProps.push(`font-size: ${fontSizeMap[style.fontSize]}`);
  }
  
  if (style.fontWeight) {
    const fontWeightMap = {
      'normal': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700'
    };
    styleProps.push(`font-weight: ${fontWeightMap[style.fontWeight]}`);
  }
  
  if (style.fontStyle === 'italic') styleProps.push('font-style: italic');
  if (style.textDecoration === 'underline') styleProps.push('text-decoration: underline');
  if (style.textColor) styleProps.push(`color: ${style.textColor}`);
  if (style.textAlign) styleProps.push(`text-align: ${style.textAlign}`);
  if (style.lineHeight) styleProps.push(`line-height: ${style.lineHeight}`);
  
  // Heading color style - for internal wrapper to apply to all h tags
  if (style.headingColor) {
    styleProps.push(`--heading-color: ${style.headingColor}`); // CSS variable for heading color
  }
  
  // Heading weight style - for internal wrapper to apply to all h tags
  if (style.headingWeight) {
    const headingWeightMap = {
      'normal': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700'
    };
    styleProps.push(`--heading-weight: ${headingWeightMap[style.headingWeight]}`); // CSS variable for heading weight
  }
  
  // Spacing styles
  if (style.padding) {
    const paddingMap = {
      'xs': '0.5rem',
      'sm': '1rem',
      'md': '1.5rem',
      'lg': '2rem',
      'xl': '3rem'
    };
    styleProps.push(`padding: ${paddingMap[style.padding]}`);
  }
  
  if (style.margin) {
    const marginMap = {
      'xs': '0.5rem',
      'sm': '1rem',
      'md': '1.5rem',
      'lg': '2rem',
      'xl': '3rem'
    };
    styleProps.push(`margin: ${marginMap[style.margin]}`);
  }
  
  // Border styles
  if (style.borderRadius) {
    const borderRadiusMap = {
      'xs': '0.125rem',
      'sm': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '1rem'
    };
    styleProps.push(`border-radius: ${borderRadiusMap[style.borderRadius]}`);
  }
  
  // Handle border settings
  if (style.hasBorder) {
    const borderWidth = '1px';
    const borderColor = style.borderColor || '#e5e7eb';
    styleProps.push(`border: ${borderWidth} solid ${borderColor}`);
  }
  
  // Handle shadow settings
  if (style.hasShadow) {
    styleProps.push('box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)');
  }
  
  return styleProps.join('; ');
};

// Esta função gera classes de espaçamento específicas para controle do espaçamento entre blocos
export const getBlockSpacingClass = (block: Block): string => {
  if (!block || !block.style) return 'mb-8'; // Espaçamento padrão
  
  const { blockSpacing } = block.style;
  
  if (!blockSpacing) return 'mb-8'; // Valor padrão se não especificado
  
  // Mapeamento de valores para classes Tailwind
  switch (blockSpacing) {
    case 'none':
      return 'mb-0';
    case 'xs':
    case 'small':
      return 'mb-4';
    case 'sm':
    case 'medium':
      return 'mb-8';
    case 'md':
    case 'large':
      return 'mb-12';
    case 'lg':
    case 'xl':
    case 'extra-large':
      return 'mb-16';
    default:
      return 'mb-8'; // Valor padrão médio
  }
};
