
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
import { generateVideoTextBlockHtml } from './videoTextGenerator';
import { generateTextVideoBlockHtml } from './textVideoGenerator';

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
  videoText: generateVideoTextBlockHtml,
  textVideo: generateTextVideoBlockHtml
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
    return generator(block);
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
  generateVideoTextBlockHtml,
  generateTextVideoBlockHtml
};
