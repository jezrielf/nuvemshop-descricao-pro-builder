
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
  createCTABlock
} from '@/utils/blockCreators';

// Templates para cosméticos
export const beautyTemplates: Template[] = [
  // Template 1: Linha Natural de Skincare
  {
    id: uuidv4(),
    name: 'Linha Natural de Skincare',
    category: 'beauty',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=lqgMqLuRj0w',
        heading: 'Beleza Natural e Consciente',
        description: 'Conheça nossa linha de produtos de skincare com ingredientes naturais e sustentáveis.',
        aspectRatio: '16:9'
      }),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500'
  },
  
  // Template 2: Maquiagem Profissional
  {
    id: uuidv4(),
    name: 'Maquiagem Profissional',
    category: 'beauty',
    blocks: [
      createHeroBlock(1),
      createGalleryBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=a7Wzn8VH3xs',
        heading: 'Tutoriais de Maquiagem',
        description: 'Aprenda técnicas profissionais com nossos produtos de alta performance.',
        aspectRatio: '16:9'
      }),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500'
  },
  
  // Template 3: Perfumaria Exclusiva
  {
    id: uuidv4(),
    name: 'Perfumaria Exclusiva',
    category: 'beauty',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createImageBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=F8NB8MU5jdE',
        heading: 'A Arte da Perfumaria',
        description: 'Descubra os segredos por trás da criação de fragrâncias exclusivas e sofisticadas.',
        aspectRatio: '16:9'
      }),
      createGalleryBlock(1),
      createTextImageBlock(1),
      createImageTextBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=500'
  }
];
