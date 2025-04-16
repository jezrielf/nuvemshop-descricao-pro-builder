
import { Block, BlockType } from '@/types/editor';
import { generateHeroHtml } from './heroGenerator';
import { generateTextHtml } from './textGenerator';
import { generateBenefitsHtml } from './benefitsGenerator';
import { generateFeaturesHtml } from './featuresGenerator';
import { generateSpecificationsHtml } from './specificationsGenerator';
import { generateImageHtml } from './imageGenerator';
import { generateGalleryHtml } from './galleryGenerator';
import { generateImageTextHtml } from './imageTextGenerator';
import { generateTextImageHtml } from './textImageGenerator';
import { generateFAQHtml } from './faqGenerator';
import { generateCTAHtml } from './ctaGenerator';
import { generateVideoHtml } from './videoGenerator';

// Map block types to their respective HTML generator functions
const blockGenerators: Record<BlockType, (block: any) => string> = {
  hero: generateHeroHtml,
  text: generateTextHtml,
  benefits: generateBenefitsHtml,
  features: generateFeaturesHtml,
  specifications: generateSpecificationsHtml,
  image: generateImageHtml,
  gallery: generateGalleryHtml,
  imageText: generateImageTextHtml,
  textImage: generateTextImageHtml,
  faq: generateFAQHtml,
  cta: generateCTAHtml,
  video: generateVideoHtml
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
  generateBenefitsHtml,
  generateFeaturesHtml,
  generateSpecificationsHtml,
  generateImageHtml,
  generateGalleryHtml,
  generateImageTextHtml,
  generateTextImageHtml,
  generateFAQHtml,
  generateCTAHtml,
  generateVideoHtml
};
