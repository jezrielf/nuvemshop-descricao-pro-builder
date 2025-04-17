
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { 
  createHeroBlock,
  createTextBlock,
  createImageBlock,
  createGalleryBlock,
  createVideoBlock,
  createImageTextBlock,
  createTextImageBlock,
  createFeaturesBlock,
  createBenefitsBlock,
  createFAQBlock,
  createCTABlock,
  createSpecificationsBlock
} from '@/utils/blockCreators';

// Templates para purificadores de água
export const waterPurifiersTemplates: Template[] = [
  // Template 1: Purificadores Residenciais
  {
    id: uuidv4(),
    name: 'Purificadores Residenciais',
    category: 'water-purifiers',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=WtfKuGo1Bnc',
        heading: 'Água Pura em Casa',
        description: 'Como nossa tecnologia exclusiva garante água limpa e saudável para toda a família.',
        aspectRatio: '16:9'
      }),
      createSpecificationsBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  },
  
  // Template 2: Filtros de Água Portáteis
  {
    id: uuidv4(),
    name: 'Filtros de Água Portáteis',
    category: 'water-purifiers',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=xvTyRj8OfFI',
        heading: 'Água Limpa em Qualquer Lugar',
        description: 'Filtros compactos e eficientes para levar água de qualidade para suas aventuras.',
        aspectRatio: '16:9'
      }),
      createGalleryBlock(1),
      createSpecificationsBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  },
  
  // Template 3: Sistemas de Filtração Avançada
  {
    id: uuidv4(),
    name: 'Sistemas de Filtração Avançada',
    category: 'water-purifiers',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=oWl2vXfgJbg',
        heading: 'Tecnologia de Ponta',
        description: 'Sistemas completos de filtração que removem até os contaminantes mais difíceis.',
        aspectRatio: '16:9'
      }),
      createSpecificationsBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  }
];
