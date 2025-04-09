
import { Block, BlockType } from '@/types/editor';
import { generateHeroHtml } from './heroGenerator';
import { generateTextHtml } from './textGenerator';
import { generateFeaturesHtml } from './featuresGenerator';
import { generateBenefitsHtml } from './benefitsGenerator';
import { generateSpecificationsHtml } from './specificationsGenerator';
import { generateImageHtml } from './imageGenerator';
import { generateGalleryHtml } from './galleryGenerator';
import { generateImageTextHtml } from './imageTextGenerator';
import { generateTextImageHtml } from './textImageGenerator';
import { generateFAQHtml } from './faqGenerator';
import { generateCTAHtml } from './ctaGenerator';
import { getStylesFromBlock } from '../styleConverter';

export const generateBlockHtml = (block: Block): string => {
  // Ensure block has a valid type before we try to access it
  if (!block || typeof block !== 'object' || !('type' in block)) {
    return '';
  }
  
  switch(block.type) {
    case 'hero':
      return generateHeroHtml(block);
    case 'text':
      return generateTextHtml(block);
    case 'features':
      return generateFeaturesHtml(block);
    case 'benefits':
      return generateBenefitsHtml(block);
    case 'specifications':
      return generateSpecificationsHtml(block);
    case 'image':
      return generateImageHtml(block);
    case 'gallery':
      return generateGalleryHtml(block);
    case 'imageText':
      return generateImageTextHtml(block);
    case 'textImage':
      return generateTextImageHtml(block);
    case 'faq':
      return generateFAQHtml(block);
    case 'cta':
      return generateCTAHtml(block);
    default:
      const blockStyleAttr = getStylesFromBlock(block) ? ` style="${getStylesFromBlock(block)}"` : '';
      return `<div${blockStyleAttr} class="unknown-block" style="padding:20px;margin-bottom:20px;border:1px dashed #ccc;">Bloco do tipo ${(block as any).type}</div>`;
  }
};
