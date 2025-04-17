
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

// Templates para alta costura
export const hauteCoutureTemplates: Template[] = [
  // Template 1: Coleção Exclusiva
  {
    id: uuidv4(),
    name: 'Coleção Exclusiva',
    category: 'haute-couture',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=iG-WzqZv8aY',
        heading: 'Desfile Coleção Primavera',
        description: 'Assista ao nosso desfile exclusivo com peças únicas criadas com maestria artesanal.',
        aspectRatio: '16:9'
      }),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createImageBlock(1),
      createFeaturesBlock(1),
      createBenefitsBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  },
  
  // Template 2: Atelier de Alta Costura
  {
    id: uuidv4(),
    name: 'Atelier de Alta Costura',
    category: 'haute-couture',
    blocks: [
      createHeroBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=yxXoLJ12h54',
        heading: 'Por Trás das Costuras',
        description: 'Um olhar exclusivo sobre o processo criativo e a confecção meticulosa de nossas peças.',
        aspectRatio: '16:9'
      }),
      createTextBlock(1),
      createGalleryBlock(1),
      createImageTextBlock(1),
      createTextImageBlock(1),
      createFeaturesBlock(1),
      createImageBlock(1),
      createBenefitsBlock(1),
      createTextBlock(1),
      createFAQBlock(1),
      createCTABlock(1)
    ]
  },
  
  // Template 3: Coleção de Gala
  {
    id: uuidv4(),
    name: 'Coleção de Gala',
    category: 'haute-couture',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=TbuP2ypiTRc',
        heading: 'A Arte do Glamour',
        description: 'Conheça nossa exclusiva coleção para eventos de gala e ocasiões especiais.',
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
