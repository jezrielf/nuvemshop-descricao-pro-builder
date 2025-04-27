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

// More robust generateBlockHtml function
export const generateBlockHtml = (block: Block): string => {
  try {
    if (!block || !block.type || !(block.type in blockGenerators)) {
      console.error(`Invalid block or unsupported type: ${block?.type}`);
      return `<div class="error-block p-4 bg-red-50 text-red-600 rounded">
        Tipo de bloco não suportado: ${block?.type || 'indefinido'}
      </div>`;
    }
    
    // Only render if block is visible
    if (block.visible === false) {
      return '';
    }
    
    // Validate block before generating HTML
    if (!validateBlock(block)) {
      console.error(`Invalid block structure:`, block);
      return `<div class="error-block p-4 bg-yellow-50 text-yellow-600 rounded">
        Bloco com estrutura inválida
      </div>`;
    }
    
    const generator = blockGenerators[block.type as BlockType];
    const html = generator(block);
    
    if (!html) {
      console.error(`Empty HTML generated for block:`, block);
      return `<div class="error-block p-4 bg-yellow-50 text-yellow-600 rounded">
        Erro ao gerar HTML do bloco
      </div>`;
    }
    
    return html;
  } catch (error) {
    console.error(`Error generating HTML for block ${block?.id}:`, error);
    return `<div class="error-block p-4 bg-red-50 text-red-600 rounded">
      Erro ao gerar HTML do bloco: ${error instanceof Error ? error.message : 'Erro desconhecido'}
    </div>`;
  }
};

// Helper function to validate block structure
function validateBlock(block: any): boolean {
  const requiredFields = ['id', 'type', 'title', 'columns'];
  return requiredFields.every(field => field in block);
}

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
