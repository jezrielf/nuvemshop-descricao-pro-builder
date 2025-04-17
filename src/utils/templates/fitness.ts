
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';
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

// Create 3 fitness templates
export const fitnessTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Fitness - Equipamento de Treinamento',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1),
      createFeaturesBlock(3),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createVideoBlock(1),
      createBenefitsBlock(2),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  },
  {
    id: uuidv4(),
    name: 'Fitness - Estúdio de Treinamento',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1),
      createFeaturesBlock(3),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createVideoBlock(1),
      createBenefitsBlock(2),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  },
  {
    id: uuidv4(),
    name: 'Fitness - Programa de Treinamento Online',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1),
      createFeaturesBlock(3),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createVideoBlock(1),
      createBenefitsBlock(2),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  }
];
