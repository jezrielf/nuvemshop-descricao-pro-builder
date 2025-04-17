
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

// Create 3 haute couture templates
export const hauteCoutureTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Alta Costura - Luxo Contemporâneo',
    category: 'haute-couture',
    thumbnail: 'https://images.unsplash.com/photo-1605289355680-75fb41239154',
    blocks: [
      // Hero with luxury vibes
      createHeroBlock(1),
      // Text introduction
      createTextBlock(1),
      // Video of atelier
      createVideoBlock(1),
      // Features highlight
      createFeaturesBlock(3),
      // Gallery showcase
      createGalleryBlock(1),
      // Craftsmanship with image and text
      createImageTextBlock(1),
      // Materials section
      createTextImageBlock(1),
      // Another video for runway
      createVideoBlock(1),
      // Benefits of haute couture
      createBenefitsBlock(2),
      // Client testimonial as text
      createTextBlock(1),
      // FAQ section
      createFAQBlock(1),
      // Call to action
      createCTABlock(1)
    ]
  },
  {
    id: uuidv4(),
    name: 'Alta Costura - Coleção Nupcial',
    category: 'haute-couture',
    thumbnail: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903',
    blocks: [
      // Hero section
      createHeroBlock(1),
      // Text introduction
      createTextBlock(1),
      // Video of atelier
      createVideoBlock(1),
      // Features highlight
      createFeaturesBlock(3),
      // Gallery showcase
      createGalleryBlock(1),
      // Process with image and text
      createImageTextBlock(1),
      // Testimonial section
      createTextBlock(1),
      // Elements with text and image
      createTextImageBlock(1),
      // Benefits of bespoke bridal
      createBenefitsBlock(2),
      // Another video for behind the scenes
      createVideoBlock(1),
      // FAQ section
      createFAQBlock(1),
      // Call to action
      createCTABlock(1)
    ]
  },
  {
    id: uuidv4(),
    name: 'Alta Costura - Alfaiataria Masculina',
    category: 'haute-couture',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    blocks: [
      // Hero section
      createHeroBlock(1),
      // Text introduction
      createTextBlock(1),
      // Video of process
      createVideoBlock(1),
      // Features highlight
      createFeaturesBlock(3),
      // Gallery showcase
      createGalleryBlock(1),
      // Process with image and text
      createImageTextBlock(1),
      // Fabric section
      createTextImageBlock(1),
      // Benefits of bespoke tailoring
      createBenefitsBlock(2),
      // Testimonial section
      createTextBlock(1),
      // Another video for style tips
      createVideoBlock(1),
      // FAQ section
      createFAQBlock(1),
      // Call to action
      createCTABlock(1)
    ]
  }
];
