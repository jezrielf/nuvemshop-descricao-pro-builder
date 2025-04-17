
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
      // Hero with natural vibes
      createHeroBlock(1),
      
      // Text introduction
      createTextBlock(1),
      
      // Video about formulation
      createVideoBlock(1),
      
      // Key ingredients
      createFeaturesBlock(3),
      
      // Gallery of products
      createGalleryBlock(1),
      
      // Sustainable practices
      createImageTextBlock(1),
      
      // Skincare routine
      createTextImageBlock(1),
      
      // Tutorial video
      createVideoBlock(1),
      
      // Benefits section
      createBenefitsBlock(2),
      
      // Testimonials
      createTextBlock(1),
      
      // FAQ section
      createFAQBlock(1),
      
      // Call to action
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
      // Hero section
      createHeroBlock(1),
      
      // Introduction text
      createTextBlock(1),
      
      // Video block
      createVideoBlock(1),
      
      // Vegan makeup features
      createFeaturesBlock(3),
      
      // Product gallery
      createGalleryBlock(1),
      
      // Image + Text block
      createImageTextBlock(1),
      
      // Text + Image block
      createTextImageBlock(1),
      
      // Tutorial video
      createVideoBlock(1),
      
      // Benefits
      createBenefitsBlock(2),
      
      // FAQ
      createFAQBlock(1),
      
      // CTA
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
      // Hero section
      createHeroBlock(1),
      
      // Introduction text
      createTextBlock(1),
      
      // Video
      createVideoBlock(1),
      
      // Features
      createFeaturesBlock(3),
      
      // Gallery
      createGalleryBlock(1),
      
      // Image + Text
      createImageTextBlock(1),
      
      // Text + Image
      createTextImageBlock(1),
      
      // Video tutorial
      createVideoBlock(1),
      
      // Benefits
      createBenefitsBlock(2),
      
      // FAQ
      createFAQBlock(1),
      
      // CTA
      createCTABlock(1)
    ]
  }
];
