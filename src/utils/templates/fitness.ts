
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

// Templates para fitness
export const fitnessTemplates: Template[] = [
  // Template 1: Equipamentos de Musculação
  {
    id: uuidv4(),
    name: 'Equipamentos de Musculação',
    category: 'fitness',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=u2uQT_UMwc0',
        heading: 'Treine em Casa com Eficiência',
        description: 'Conheça nossa linha de equipamentos para treinos intensos e resultados reais.',
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
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500'
  },
  
  // Template 2: Equipamentos para Yoga
  {
    id: uuidv4(),
    name: 'Equipamentos para Yoga',
    category: 'fitness',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=v7AYKMP6rOE',
        heading: 'Transforme sua Prática',
        description: 'Acessórios de qualidade que elevam sua experiência com yoga e meditação.',
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
    thumbnail: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=500'
  },
  
  // Template 3: Acessórios para Corrida
  {
    id: uuidv4(),
    name: 'Acessórios para Corrida',
    category: 'fitness',
    blocks: [
      createHeroBlock(1),
      createTextBlock(1),
      createGalleryBlock(1),
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=q2J-olYEEYo',
        heading: 'Performance em Cada Passo',
        description: 'Acessórios tecnológicos e confortáveis para elevar seu desempenho nas corridas.',
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
    thumbnail: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=500'
  }
];
