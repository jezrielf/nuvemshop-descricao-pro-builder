import {
  Block,
  BlockType,
  TextBlock,
  HeroBlock,
  FeaturesBlock,
  BenefitsBlock,
  ImageBlock,
  GalleryBlock,
  ImageTextBlock,
  TextImageBlock,
  FAQBlock,
  CTABlock,
  SpecificationsBlock,
  AIBlock
} from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const createTextBlock = (columns: number = 1): TextBlock => ({
  id: uuidv4(),
  type: 'text',
  title: 'Bloco de Texto',
  columns,
  visible: true,
  heading: 'Título do Bloco',
  content: 'Adicione seu texto aqui...',
});

export const createHeroBlock = (columns: number = 1): HeroBlock => ({
  id: uuidv4(),
  type: 'hero',
  title: 'Bloco de Hero',
  columns,
  visible: true,
  heading: 'Título Principal',
  subheading: 'Subtítulo Atraente',
  backgroundImage: 'URL da Imagem',
  buttonText: 'Clique Aqui',
  buttonUrl: '#',
});

export const createFeaturesBlock = (columns: number = 1): FeaturesBlock => ({
  id: uuidv4(),
  type: 'features',
  title: 'Bloco de Características',
  columns,
  visible: true,
  heading: 'Nossas Características',
  features: [
    { id: uuidv4(), title: 'Característica 1', description: 'Descrição da característica', icon: 'star' },
    { id: uuidv4(), title: 'Característica 2', description: 'Descrição da característica', icon: 'code' },
    { id: uuidv4(), title: 'Característica 3', description: 'Descrição da característica', icon: 'cloud' },
  ],
});

export const createBenefitsBlock = (columns: number = 1): BenefitsBlock => ({
  id: uuidv4(),
  type: 'benefits',
  title: 'Bloco de Benefícios',
  columns,
  visible: true,
  heading: 'Nossos Benefícios',
  benefits: [
    { id: uuidv4(), title: 'Benefício 1', description: 'Descrição do benefício', icon: 'heart' },
    { id: uuidv4(), title: 'Benefício 2', description: 'Descrição do benefício', icon: 'check' },
  ],
});

export const createImageBlock = (columns: number = 1): ImageBlock => ({
  id: uuidv4(),
  type: 'image',
  title: 'Bloco de Imagem',
  columns,
  visible: true,
  src: 'URL da Imagem',
  alt: 'Texto Alternativo',
  caption: 'Legenda da Imagem',
});

export const createGalleryBlock = (columns: number = 1): GalleryBlock => ({
  id: uuidv4(),
  type: 'gallery',
  title: 'Bloco de Galeria',
  columns,
  visible: true,
  images: [
    { id: uuidv4(), src: 'URL da Imagem 1', alt: 'Texto Alternativo 1', caption: 'Legenda 1' },
    { id: uuidv4(), src: 'URL da Imagem 2', alt: 'Texto Alternativo 2', caption: 'Legenda 2' },
  ],
});

export const createImageTextBlock = (columns: number = 1): ImageTextBlock => ({
  id: uuidv4(),
  type: 'imageText',
  title: 'Bloco de Imagem e Texto',
  columns,
  visible: true,
  heading: 'Título do Bloco',
  content: 'Seu conteúdo aqui...',
  image: { src: 'URL da Imagem', alt: 'Texto Alternativo' },
});

export const createTextImageBlock = (columns: number = 1): TextImageBlock => ({
  id: uuidv4(),
  type: 'textImage',
  title: 'Bloco de Texto e Imagem',
  columns,
  visible: true,
  heading: 'Título do Bloco',
  content: 'Seu conteúdo aqui...',
  image: { src: 'URL da Imagem', alt: 'Texto Alternativo' },
});

export const createFAQBlock = (columns: number = 1): FAQBlock => ({
  id: uuidv4(),
  type: 'faq',
  title: 'Bloco de FAQ',
  columns,
  visible: true,
  heading: 'Perguntas Frequentes',
  questions: [
    { id: uuidv4(), question: 'Pergunta 1', answer: 'Resposta 1' },
    { id: uuidv4(), question: 'Pergunta 2', answer: 'Resposta 2' },
  ],
});

export const createCTABlock = (columns: number = 1): CTABlock => ({
  id: uuidv4(),
  type: 'cta',
  title: 'Bloco de CTA',
  columns,
  visible: true,
  heading: 'Chamada para Ação',
  content: 'Descrição da chamada para ação...',
  buttonText: 'Ação!',
  buttonUrl: '#',
});

export const createSpecificationsBlock = (columns: number = 1): SpecificationsBlock => ({
  id: uuidv4(),
  type: 'specifications',
  title: 'Bloco de Especificações',
  columns,
  visible: true,
  heading: 'Especificações do Produto',
  specs: [
    { id: uuidv4(), name: 'Especificação 1', value: 'Valor 1' },
    { id: uuidv4(), name: 'Especificação 2', value: 'Valor 2' },
  ],
});

// Add support for creating AI blocks
export const createAIBlock = (columns: number = 1): AIBlock => {
  return {
    id: uuidv4(),
    type: 'ai',
    title: 'Conteúdo Gerado por IA',
    columns,
    visible: true,
    content: '',
    heading: 'Conteúdo Gerado por IA',
    subheading: 'Este conteúdo foi gerado automaticamente usando inteligência artificial',
    layout: 'modern',
    colorScheme: 'default'
  };
};

// Update the createBlock function to support AI blocks
export const createBlock = (type: BlockType, columns: number = 1): Block => {
  switch (type) {
    case 'text':
      return createTextBlock(columns);
    case 'hero':
      return createHeroBlock(columns);
    case 'features':
      return createFeaturesBlock(columns);
    case 'benefits':
      return createBenefitsBlock(columns);
    case 'image':
      return createImageBlock(columns);
    case 'gallery':
      return createGalleryBlock(columns);
    case 'imageText':
      return createImageTextBlock(columns);
    case 'textImage':
      return createTextImageBlock(columns);
    case 'faq':
      return createFAQBlock(columns);
    case 'cta':
      return createCTABlock(columns);
    case 'specifications':
      return createSpecificationsBlock(columns);
    case 'ai':
      return createAIBlock(columns);
    default:
      return createTextBlock(columns);
  }
};
