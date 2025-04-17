
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

// Templates para bebidas
export const beveragesTemplates: Template[] = [
  // Template 1: Vinhos Especiais
  {
    id: uuidv4(),
    name: 'Vinhos Especiais',
    category: 'beverages',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=OCeQGtiFLPU',
        heading: 'A Arte da Vinificação',
        description: 'Descubra o processo tradicional de produção dos nossos vinhos premiados.',
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
    ]
  },
  
  // Template 2: Cafés Gourmet
  {
    id: uuidv4(),
    name: 'Cafés Gourmet',
    category: 'beverages',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=N3mZZ6wVnB4',
        heading: 'Da Fazenda à Xícara',
        description: 'O caminho que nossos grãos percorrem para entregar o melhor café à sua mesa.',
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
    ]
  },
  
  // Template 3: Bebidas Funcionais
  {
    id: uuidv4(),
    name: 'Bebidas Funcionais',
    category: 'beverages',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=hekO0rRKnrM',
        heading: 'Nutrição e Sabor',
        description: 'Bebidas que combinam sabor excepcional com benefícios para sua saúde e bem-estar.',
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
    ]
  }
];
