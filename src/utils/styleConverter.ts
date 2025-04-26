
import { Block } from '@/types/editor';

/**
 * Converte as propriedades de estilo de um bloco para uma string CSS
 */
export const getStylesFromBlock = (block: Block): string => {
  if (!block || !block.style) {
    return '';
  }

  const { style } = block;
  const styleProps = [];

  // Cor de fundo ou gradiente
  if (style.backgroundGradient) {
    styleProps.push(`background: ${style.backgroundGradient}`);
  } else if (style.backgroundColor) {
    styleProps.push(`background-color: ${style.backgroundColor}`);
  }
  
  // Imagem de fundo
  if (style.backgroundImage) {
    styleProps.push(`background-image: url(${style.backgroundImage})`);
    styleProps.push('background-size: cover');
    styleProps.push('background-position: center');
  }

  // Cor do texto
  if (style.textColor) {
    styleProps.push(`color: ${style.textColor}`);
  }

  // Espaçamento
  if (style.padding) {
    styleProps.push(`padding: ${style.padding}`);
  }
  if (style.margin) {
    styleProps.push(`margin: ${style.margin}`);
  }

  // Bordas
  if (style.borderRadius) {
    styleProps.push(`border-radius: ${style.borderRadius}`);
  }
  if (style.borderWidth) {
    styleProps.push(`border-width: ${style.borderWidth}`);
  }
  if (style.borderColor) {
    styleProps.push(`border-color: ${style.borderColor}`);
  }
  if (style.borderStyle) {
    styleProps.push(`border-style: ${style.borderStyle}`);
  }

  // Sombras
  if (style.boxShadow) {
    styleProps.push(`box-shadow: ${style.boxShadow}`);
  }

  // Tipografia
  if (style.fontFamily) {
    styleProps.push(`font-family: ${style.fontFamily}`);
  }
  if (style.textAlign) {
    styleProps.push(`text-align: ${style.textAlign}`);
  }
  if (style.fontSize) {
    styleProps.push(`font-size: ${style.fontSize}`);
  }
  if (style.fontWeight) {
    styleProps.push(`font-weight: ${style.fontWeight}`);
  }
  if (style.lineHeight) {
    styleProps.push(`line-height: ${style.lineHeight}`);
  }

  // Imagem
  if (style.imageFit) {
    styleProps.push(`object-fit: ${style.imageFit}`);
  }
  if (style.imagePosition) {
    styleProps.push(`object-position: ${style.imagePosition}`);
  }

  return styleProps.join('; ');
};

export default getStylesFromBlock;
