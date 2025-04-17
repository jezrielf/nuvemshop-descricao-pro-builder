
import { v4 as uuidv4 } from 'uuid';
import { Template, Block } from '@/types/editor';
import { createHeroBlock } from '../blockCreators/blocks/heroBlock';
import { createTextBlock } from '../blockCreators/blocks/textBlock';
import { createImageBlock } from '../blockCreators/blocks/imageBlock';
import { createGalleryBlock } from '../blockCreators/blocks/galleryBlock';
import { createVideoBlock } from '../blockCreators/blocks/videoBlock';
import { createImageTextBlock } from '../blockCreators/blocks/imageTextBlock';
import { createTextImageBlock } from '../blockCreators/blocks/textImageBlock';
import { createCTABlock } from '../blockCreators/blocks/ctaBlock';
import { createFAQBlock } from '../blockCreators/blocks/faqBlock';
import { createFeaturesBlock } from '../blockCreators/blocks/featuresBlock';
import { createBenefitsBlock } from '../blockCreators/blocks/benefitsBlock';

// Create 3 clothing templates
export const clothingTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Moda Casual - Coleção Verão',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    blocks: [
      createHeroBlock(1),
      createVideoBlock(1),
      createTextBlock(1),
      createFeaturesBlock(3),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createVideoBlock(1),
      createBenefitsBlock(2),
      createFAQBlock(1),
      createCTABlock(1),
    ]
  },
  {
    id: uuidv4(),
    name: 'Moda Fitness - Linha Performance',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    blocks: [
      createHeroBlock(1),
      createVideoBlock(1),
      createFeaturesBlock(3),
      createTextBlock(1),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createBenefitsBlock(2),
      createVideoBlock(1),
      createFAQBlock(1),
      createCTABlock(1),
    ]
  },
  {
    id: uuidv4(),
    name: 'Moda Infantil - Diversão e Conforto',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1),
      createFeaturesBlock(3),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createBenefitsBlock(2),
      createTextImageBlock(1),
      createVideoBlock(1),
      createFAQBlock(1),
      createCTABlock(1),
    ]
  }
];
