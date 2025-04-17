
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

// Create 3 beauty templates
export const beautyTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Cosméticos - Skincare Natural',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
    blocks: [
      // Use proper creator functions for each block type
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
  
  // Second template - Maquiagem Vegana
  {
    id: uuidv4(),
    name: 'Cosméticos - Maquiagem Vegana',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
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
  
  // Third template - Perfumaria Artesanal
  {
    id: uuidv4(),
    name: 'Cosméticos - Perfumaria Artesanal',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1615289646521-4fd40a38f469',
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
