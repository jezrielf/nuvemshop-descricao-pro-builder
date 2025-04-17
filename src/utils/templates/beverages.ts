import { v4 as uuidv4 } from 'uuid';
import { Template, Block } from '@/types/editor';
import { 
  createHeroBlock, 
  createTextBlock, 
  createImageBlock, 
  createGalleryBlock, 
  createVideoBlock, 
  createImageTextBlock, 
  createTextImageBlock, 
  createCTABlock, 
  createFAQBlock, 
  createFeaturesBlock, 
  createBenefitsBlock 
} from '../blockCreators/blocks';

// Create 3 beverages templates
export const beveragesTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Bebidas - Café Especial',
    category: 'beverages',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    blocks: [
      // Hero section
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
    name: 'Bebidas - Cerveja Artesanal',
    category: 'beverages',
    thumbnail: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148',
    blocks: [
      // Add at least 10 blocks here
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
    name: 'Bebidas - Sucos Naturais',
    category: 'beverages',
    thumbnail: 'https://images.unsplash.com/photo-1546173159-315724a31696',
    blocks: [
      // Add at least 10 blocks here
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
