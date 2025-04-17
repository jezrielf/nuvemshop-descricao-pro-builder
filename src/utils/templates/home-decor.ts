
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

// Templates para casa e decoração
export const homeDecorTemplates: Template[] = [
  // Template 1: Decoração Minimalista
  {
    id: uuidv4(),
    name: 'Decoração Minimalista',
    category: 'home-decor',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=8gKCUzS24JAk',
        heading: 'Nossa Coleção em Movimento',
        description: 'Veja como nossos móveis transformam qualquer espaço com elegância e funcionalidade.',
        aspectRatio: '16:9'
      }),
      createFeaturesBlock(1),
      createImageBlock(1),
      createBenefitsBlock(1),
      createTextBlock(1),
      createCTABlock(1),
      createFAQBlock(1)
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  
  // Template 2: Decoração Contemporânea
  {
    id: uuidv4(),
    name: 'Decoração Contemporânea',
    category: 'home-decor',
    blocks: [
      createHeroBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=FQGJo9H6AoM',
        heading: 'Design Contemporâneo em Ação',
        description: 'Descubra como integrar elementos contemporâneos ao seu espaço.',
        aspectRatio: '16:9'
      }),
      createGalleryBlock(1),
      createTextBlock(1),
      createFeaturesBlock(1),
      createTextImageBlock(1),
      createImageTextBlock(1),
      createBenefitsBlock(1),
      createTextBlock(1),
      createImageBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  
  // Template 3: Decoração Escandinava
  {
    id: uuidv4(),
    name: 'Decoração Escandinava',
    category: 'home-decor',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createImageBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=lKP584JaHFk',
        heading: 'Estilo Escandinavo: Simplicidade e Elegância',
        description: 'A beleza da simplicidade e funcionalidade do design nórdico para sua casa.',
        aspectRatio: '16:9'
      }),
      createTextImageBlock(1),
      createGalleryBlock(1),
      createFeaturesBlock(1),
      createImageTextBlock(1),
      createBenefitsBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  }
];
