
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

// Templates para moda
export const fashionTemplates: Template[] = [
  // Template 1: Moda Urbana
  {
    id: uuidv4(),
    name: 'Moda Urbana',
    category: 'fashion',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=7_PBVDI_UMQ',
        heading: 'Estilo Urbano Autêntico',
        description: 'Roupas que combinam conforto, atitude e estilo para o dia a dia na cidade.',
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
    thumbnail: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500'
  },
  
  // Template 2: Moda Praia
  {
    id: uuidv4(),
    name: 'Moda Praia',
    category: 'fashion',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=0D5GHchQH6I',
        heading: 'Verão com Estilo',
        description: 'Nossa coleção de moda praia combina conforto, proteção solar e design exclusivo.',
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
    thumbnail: 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=500'
  },
  
  // Template 3: Moda Esportiva
  {
    id: uuidv4(),
    name: 'Moda Esportiva',
    category: 'fashion',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=QQvVjC3yr-8',
        heading: 'Performance e Design',
        description: 'Roupas que combinam tecnologia avançada para performance e visual moderno para qualquer atividade.',
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
    thumbnail: 'https://images.unsplash.com/photo-1518214598173-1666bc921d66?q=80&w=500'
  }
];
