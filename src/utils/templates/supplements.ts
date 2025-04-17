
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

// Templates para suplementos
export const supplementsTemplates: Template[] = [
  // Template 1: Proteínas e Ganho Muscular
  {
    id: uuidv4(),
    name: 'Proteínas e Ganho Muscular',
    category: 'supplements',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=2KLwTTERDnk',
        heading: 'Nutrição para Performance',
        description: 'Como nossos suplementos proteicos potencializam seus resultados no treino.',
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
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  
  // Template 2: Vitaminas e Minerais
  {
    id: uuidv4(),
    name: 'Vitaminas e Minerais',
    category: 'supplements',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=O0e8Lm8n-Wk',
        heading: 'Suplementação Diária',
        description: 'A importância das vitaminas e minerais para sua saúde e bem-estar.',
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
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  
  // Template 3: Suplementos Naturais
  {
    id: uuidv4(),
    name: 'Suplementos Naturais',
    category: 'supplements',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=wHbfN9KK2PY',
        heading: 'O Poder da Nutrição Natural',
        description: 'Suplementos 100% naturais para apoiar seu bem-estar e qualidade de vida.',
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
    ],
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  }
];
