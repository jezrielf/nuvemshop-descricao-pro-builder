
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

// Templates para calçados
export const shoesTemplates: Template[] = [
  // Template 1: Tênis Esportivos
  {
    id: uuidv4(),
    name: 'Tênis Esportivos',
    category: 'shoes',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=NQpwR3JnNe4',
        heading: 'Tecnologia em Movimento',
        description: 'Conheça a tecnologia exclusiva que proporciona conforto e performance aos nossos tênis.',
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
  
  // Template 2: Sapatos de Couro
  {
    id: uuidv4(),
    name: 'Sapatos de Couro',
    category: 'shoes',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=Yqyml7rYZrg',
        heading: 'Tradição e Elegância',
        description: 'O processo artesanal de fabricação dos nossos sapatos de couro premium.',
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
  
  // Template 3: Calçados Sustentáveis
  {
    id: uuidv4(),
    name: 'Calçados Sustentáveis',
    category: 'shoes',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=eZa2v9zZjjQ',
        heading: 'Moda Consciente',
        description: 'Nosso compromisso com o meio ambiente através de calçados feitos com materiais sustentáveis.',
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
  }
];

// Para compatibilidade com código existente
export const shoesTemplateA = null;
export const shoesTemplateB = null;
