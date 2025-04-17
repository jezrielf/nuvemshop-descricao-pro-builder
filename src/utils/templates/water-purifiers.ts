
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
  // Template 1: Purificador Residencial
  {
    id: uuidv4(),
    name: 'Purificador Residencial',
    category: 'energy',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=EO1-uP-fxbs',
        heading: 'Água Pura em Sua Casa',
        description: 'Descubra como nosso sistema de purificação traz água limpa e saudável para toda a família.',
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
    thumbnail: 'https://images.unsplash.com/photo-1612478969473-6545894474c2?q=80&w=500'
  },
  
  // Template 2: Purificador Industrial
  {
    id: uuidv4(),
    name: 'Purificador Industrial',
    category: 'energy',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=9duPxoJzNRA',
        heading: 'Soluções Industriais de Purificação',
        description: 'Sistemas de alta capacidade para empresas que precisam de água purificada em larga escala.',
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
    thumbnail: 'https://images.unsplash.com/photo-1613025636703-1803d2f390cc?q=80&w=500'
  },
  
  // Template 3: Filtros Avançados
  {
    id: uuidv4(),
    name: 'Filtros Avançados',
    category: 'energy',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=BdzLQBMtszk',
        heading: 'Tecnologia de Filtragem Avançada',
        description: 'Conheça nossos filtros com tecnologia de ponta para remoção de contaminantes e purificação premium.',
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
    thumbnail: 'https://images.unsplash.com/photo-1626168078796-ed36c3e9ad82?q=80&w=500'
  }
];
