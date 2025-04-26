
import { Block, BlockType } from '@/types/editor';
import { generateHeroHtml } from './heroGenerator';
import { generateTextHtml } from './textGenerator';
import { generateBenefitsBlockHtml } from './benefitsGenerator';
import { generateFeaturesBlockHtml } from './featuresGenerator';
import { generateSpecificationsBlockHtml } from './specificationsGenerator';
import { generateImageHtml } from './imageGenerator';
import { generateGalleryBlockHtml } from './galleryGenerator';
import { generateImageTextHtml } from './imageTextGenerator';
import { generateTextImageHtml } from './textImageGenerator';
import { generateFAQHtml } from './faqGenerator';
import { generateCTAHtml } from './ctaGenerator';
import { generateVideoBlockHtml } from './videoGenerator';
import { generateTextVideoBlockHtml } from './textVideoGenerator';
import { generateVideoTextBlockHtml } from './videoTextGenerator';
import { generateCarouselBlockHtml } from './carouselGenerator';

// Map block types to their respective HTML generator functions
const blockGenerators: Record<BlockType, (block: any) => string> = {
  hero: generateHeroHtml,
  text: generateTextHtml,
  benefits: generateBenefitsBlockHtml,
  features: generateFeaturesBlockHtml,
  specifications: generateSpecificationsBlockHtml,
  image: generateImageHtml,
  gallery: generateGalleryBlockHtml,
  imageText: generateImageTextHtml,
  textImage: generateTextImageHtml,
  faq: generateFAQHtml,
  cta: generateCTAHtml,
  video: generateVideoBlockHtml,
  textVideo: generateTextVideoBlockHtml,
  videoText: generateVideoTextBlockHtml,
  carousel: generateCarouselBlockHtml
};

// Função para garantir o layout de colunas correto na Nuvemshop
const addColumnStyles = (html: string, columns: string): string => {
  // Se não tiver colunas ou for coluna completa, retorna o HTML sem alterações
  if (!columns || columns === 'full' || columns === '1') {
    return html;
  }

  // Adicionar os estilos CSS específicos baseados no número de colunas
  let columnStyle = '';
  let columnClass = '';

  switch (columns) {
    case '2':
    case '1/2':
      columnStyle = 'width: 48%; display: inline-block; margin: 0 1%;';
      columnClass = 'ns-column-half';
      break;
    case '3':
    case '1/3':
      columnStyle = 'width: 31.33%; display: inline-block; margin: 0 1%;';
      columnClass = 'ns-column-third';
      break;
    case '4':
    case '1/4':
      columnStyle = 'width: 23%; display: inline-block; margin: 0 1%;';
      columnClass = 'ns-column-quarter';
      break;
    case '2/3':
      columnStyle = 'width: 64.66%; display: inline-block; margin: 0 1%;';
      columnClass = 'ns-column-two-thirds';
      break;
    case '3/4':
      columnStyle = 'width: 73%; display: inline-block; margin: 0 1%;';
      columnClass = 'ns-column-three-quarters';
      break;
    default:
      return html;
  }

  // Se o bloco já tiver classes de coluna ns-column-*, não adicionar novamente
  if (html.includes('ns-column-')) {
    return html;
  }

  // Envolve o HTML em um div com os estilos de coluna
  return `<div class="${columnClass}" style="${columnStyle}">${html}</div>`;
};

// Generate HTML for a specific block based on its type
export const generateBlockHtml = (block: Block): string => {
  try {
    // Check if the block type is supported
    if (!block || !block.type || !(block.type in blockGenerators)) {
      console.error(`Unsupported block type: ${block?.type}`);
      return `<div class="error-block">Tipo de bloco não suportado: ${block?.type || 'indefinido'}</div>`;
    }
    
    // Check if the block is visible
    if (block.visible === false) {
      return ''; // Return empty string for invisible blocks
    }
    
    // Generate HTML using the appropriate generator
    const generator = blockGenerators[block.type as BlockType];
    const blockHtml = generator(block);
    
    // Para blocos que já incluem classes de coluna, como videoText e textVideo, não adicionar novamente
    if (block.type === 'videoText' || block.type === 'textVideo' || block.type === 'carousel') {
      return blockHtml;
    }
    
    // Garantir que as colunas sejam aplicadas corretamente para os outros tipos de blocos
    return addColumnStyles(blockHtml, block.columns.toString());
  } catch (error) {
    console.error(`Error generating HTML for block ${block?.id}:`, error);
    return `<div class="error-block">Erro ao gerar HTML para o bloco: ${error instanceof Error ? error.message : 'Erro desconhecido'}</div>`;
  }
};

// Export all generators for use in other modules
export {
  generateHeroHtml,
  generateTextHtml,
  generateBenefitsBlockHtml,
  generateFeaturesBlockHtml,
  generateSpecificationsBlockHtml,
  generateImageHtml,
  generateGalleryBlockHtml,
  generateImageTextHtml,
  generateTextImageHtml,
  generateFAQHtml,
  generateCTAHtml,
  generateVideoBlockHtml,
  generateTextVideoBlockHtml,
  generateVideoTextBlockHtml,
  generateCarouselBlockHtml
};
