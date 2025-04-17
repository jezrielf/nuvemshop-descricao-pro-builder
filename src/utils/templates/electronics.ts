
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

// Templates para eletrônicos
export const electronicsTemplates: Template[] = [
  // Template 1: Smartphone Premium
  {
    id: uuidv4(),
    name: 'Smartphone Premium',
    category: 'electronics',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=thq3vMEXwOQ',
        heading: 'Conheça o Futuro da Tecnologia Móvel',
        description: 'Um tour completo pelos recursos mais avançados do nosso novo smartphone.',
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
  
  // Template 2: Smart TV 4K
  {
    id: uuidv4(),
    name: 'Smart TV 4K',
    category: 'electronics',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=WqVzNYmyYlU',
        heading: 'Experiência Visual Imersiva',
        description: 'Descubra como nossa tecnologia de display revoluciona sua forma de assistir conteúdo.',
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
  
  // Template 3: Fones de Ouvido Bluetooth
  {
    id: uuidv4(),
    name: 'Fones de Ouvido Bluetooth',
    category: 'electronics',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=e3dTNUqUAjc',
        heading: 'Som Imersivo e Liberdade',
        description: 'A tecnologia de áudio que vai transformar sua experiência musical.',
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
  }
];

// Para compatibilidade com código existente
export const electronicsTemplate = null;
