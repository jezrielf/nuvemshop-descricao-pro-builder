
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

// Templates para saúde e bem-estar
export const healthTemplates: Template[] = [
  // Template 1: Aromaterapia e Óleos Essenciais
  {
    id: uuidv4(),
    name: 'Aromaterapia e Óleos Essenciais',
    category: 'health',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=6zNPAOCDXOY',
        heading: 'O Poder da Aromaterapia',
        description: 'Descubra como os óleos essenciais podem transformar seu bem-estar físico e mental.',
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
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  
  // Template 2: Meditação e Mindfulness
  {
    id: uuidv4(),
    name: 'Meditação e Mindfulness',
    category: 'health',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM',
        heading: 'Prática de Mindfulness',
        description: 'Aprenda técnicas simples para trazer mais presença e paz para seu dia a dia.',
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
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  },
  
  // Template 3: Massagem Terapêutica
  {
    id: uuidv4(),
    name: 'Massagem Terapêutica',
    category: 'health',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=AFLZNUxdFgU',
        heading: 'Benefícios da Massagem Terapêutica',
        description: 'Conheça as técnicas e benefícios da massagem para alívio de tensões e bem-estar.',
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
    thumbnail: '/placeholder.svg' // Added missing thumbnail
  }
];
