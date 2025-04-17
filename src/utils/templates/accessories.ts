
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

// Templates para acessórios
export const accessoriesTemplates: Template[] = [
  // Template 1: Joias Artesanais
  {
    id: uuidv4(),
    name: 'Joias Artesanais',
    category: 'accessories',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=wM9Yw2_uRQM',
        heading: 'A Arte da Joalheria',
        description: 'Conheça o processo artesanal por trás de cada peça única de nossa coleção.',
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
    ]
  },
  
  // Template 2: Bolsas de Couro
  {
    id: uuidv4(),
    name: 'Bolsas de Couro',
    category: 'accessories',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=Z30rzdXKfBQ',
        heading: 'Artesanato em Couro',
        description: 'Descubra a qualidade e o processo tradicional por trás de nossas bolsas de couro.',
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
    ]
  },
  
  // Template 3: Acessórios de Luxo
  {
    id: uuidv4(),
    name: 'Acessórios de Luxo',
    category: 'accessories',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=bFGU08vQ_vU',
        heading: 'Elegância e Exclusividade',
        description: 'Explore nossa coleção de acessórios de luxo que unem tradição e design contemporâneo.',
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
    ]
  }
];

// Para compatibilidade com código existente
export const accessoriesTemplate = null;
