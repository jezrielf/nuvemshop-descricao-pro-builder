
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

// Templates básicos
export const basicTemplates: Template[] = [
  // Template básico genérico
  {
    id: uuidv4(),
    name: 'Landing Page Básica',
    category: 'other', // Changed from 'basic' to 'other' which is a valid ProductCategory
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createImageBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        heading: 'Apresentação do Produto',
        description: 'Tudo o que você precisa saber sobre este produto incrível.',
        aspectRatio: '16:9'
      }),
      createTextImageBlock(1),
      createImageTextBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  // Template para promoção
  {
    id: uuidv4(),
    name: 'Página Promocional',
    category: 'other', // Changed from 'basic' to 'other'
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        heading: 'Oferta por Tempo Limitado',
        description: 'Não perca esta oportunidade exclusiva.',
        aspectRatio: '16:9'
      }),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  // Template de lançamento
  {
    id: uuidv4(),
    name: 'Lançamento de Produto',
    category: 'other', // Changed from 'basic' to 'other'
    blocks: [
      createHeroBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        heading: 'Conheça o Futuro',
        description: 'Uma introdução ao nosso inovador produto que vai transformar o mercado.',
        aspectRatio: '16:9'
      }),
      createTextBlock(1),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  }
];

// Para compatibilidade com código existente
export const basicTemplate = null;
