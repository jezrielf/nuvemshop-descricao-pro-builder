
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

// Templates para roupas
export const clothingTemplates: Template[] = [
  // Template 1: Coleção Casual
  {
    id: uuidv4(),
    name: 'Coleção Casual',
    category: 'clothing',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=7d1OpSEEQPE',
        heading: 'Nossa Nova Coleção Casual',
        description: 'Conheça as peças que combinam conforto e estilo para o seu dia a dia.',
        aspectRatio: '16:9'
      }),
      createTextImageBlock(1),
      createImageTextBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=500'
  },
  
  // Template 2: Moda Sustentável
  {
    id: uuidv4(),
    name: 'Moda Sustentável',
    category: 'clothing',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=BiSYoeqb_VY',
        heading: 'Moda com Propósito',
        description: 'Conheça nossa linha de roupas produzidas com materiais sustentáveis e processos éticos.',
        aspectRatio: '16:9'
      }),
      createImageTextBlock(1),
      createGalleryBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createImageBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ],
    thumbnail: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=500'
  },
  
  // Template 3: Coleção Sazonal
  {
    id: uuidv4(),
    name: 'Coleção Sazonal',
    category: 'clothing',
    blocks: [
      createHeroBlock(1),
      createGalleryBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=V1RPi2MYptY',
        heading: 'Tendências da Estação',
        description: 'As peças essenciais para você arrasar nesta temporada com estilo e personalidade.',
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
    thumbnail: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=500'
  }
];
