
import { v4 as uuidv4 } from 'uuid';
import { BlockType, ProductDescription, Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';

interface AIDescriptionInput {
  productName: string;
  productCategory: string;
  productPrice?: string;
  companyInfo: string;
  targetAudience: string;
  mainFeatures: string;
  additionalInfo?: string;
  tone: 'formal' | 'casual' | 'professional' | 'enthusiastic';
  imageUrl?: string;
}

// Mock placeholder images for the generated blocks
const placeholderImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
  'https://images.unsplash.com/photo-1581591524425-c7e0978865fc',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86'
];

// Helper to get a random placeholder image
const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

// Helper to extract and format key points from a text
const extractKeyPoints = (text: string): string[] => {
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
  
  // Get some sentences as key points
  return sentences
    .slice(0, Math.min(sentences.length, 5))
    .map(s => s.trim())
    .filter(s => s.length > 15); // Filter out too short sentences
};

export const generateAIDescription = async (input: AIDescriptionInput): Promise<ProductDescription> => {
  // This would normally be an API call to an AI service like OpenAI
  // For now, we'll mock a structured description generation based on the input
  
  // Create a unique ID for the description
  const descriptionId = uuidv4();
  
  // Format the name
  const descriptionName = `Descrição de ${input.productName}`;
  
  // Create blocks array
  const blocks: Block[] = [];
  
  // Add a hero block
  const heroBlock = createBlock('hero', 1) as Block;
  heroBlock.visible = true;
  heroBlock.title = 'Banner Principal';
  (heroBlock as any).heading = input.productName;
  (heroBlock as any).subheading = `Descubra porque este é o produto perfeito para você. ${input.productPrice ? `Apenas ${input.productPrice}` : ''}`;
  (heroBlock as any).buttonText = 'Saiba Mais';
  (heroBlock as any).buttonUrl = '#features';
  if (input.imageUrl) {
    (heroBlock as any).image = {
      src: input.imageUrl,
      alt: input.productName
    };
  }
  heroBlock.style = {
    backgroundColor: '#f9fafb',
    headingColor: '#1f2937',
    textAlign: 'center',
    padding: 'lg',
    blockSpacing: 'md'
  };
  blocks.push(heroBlock);
  
  // Add features block
  const featurePoints = extractKeyPoints(input.mainFeatures);
  if (featurePoints.length > 0) {
    const featuresBlock = createBlock('features', 3) as Block;
    featuresBlock.visible = true;
    featuresBlock.title = 'Recursos do Produto';
    (featuresBlock as any).heading = 'Principais Recursos';
    (featuresBlock as any).features = featurePoints.map((point, index) => ({
      id: uuidv4(),
      title: `Recurso ${index + 1}`,
      description: point,
      icon: '✨'
    }));
    featuresBlock.style = {
      backgroundColor: '#ffffff',
      padding: 'md',
      blockSpacing: 'md'
    };
    blocks.push(featuresBlock);
  }
  
  // Add benefits block
  const benefitPoints = extractKeyPoints(input.targetAudience + '. ' + input.mainFeatures);
  if (benefitPoints.length > 0) {
    const benefitsBlock = createBlock('benefits', 2) as Block;
    benefitsBlock.visible = true;
    benefitsBlock.title = 'Benefícios';
    (benefitsBlock as any).heading = 'Benefícios para Você';
    (benefitsBlock as any).benefits = benefitPoints.slice(0, 4).map((point, index) => ({
      id: uuidv4(),
      title: `Benefício ${index + 1}`,
      description: point,
      icon: '🌟'
    }));
    benefitsBlock.style = {
      backgroundColor: '#f3f4f6',
      padding: 'md',
      blockSpacing: 'md'
    };
    blocks.push(benefitsBlock);
  }
  
  // Add imageText block if there's an uploaded image
  if (input.imageUrl) {
    const imageTextBlock = createBlock('imageText', 2) as Block;
    imageTextBlock.visible = true;
    imageTextBlock.title = 'Imagem e Texto';
    (imageTextBlock as any).heading = 'Qualidade Excepcional';
    (imageTextBlock as any).content = `${input.productName} foi desenvolvido para atender às necessidades do seu público-alvo. ${input.mainFeatures.split('.')[0]}.`;
    (imageTextBlock as any).image = {
      src: input.imageUrl,
      alt: input.productName
    };
    imageTextBlock.style = {
      backgroundColor: '#ffffff',
      padding: 'md',
      blockSpacing: 'md'
    };
    blocks.push(imageTextBlock);
  } else {
    // If no image was uploaded, use a placeholder
    const imageTextBlock = createBlock('imageText', 2) as Block;
    imageTextBlock.visible = true;
    imageTextBlock.title = 'Imagem e Texto';
    (imageTextBlock as any).heading = 'Qualidade Excepcional';
    (imageTextBlock as any).content = `${input.productName} foi desenvolvido para atender às necessidades do seu público-alvo. ${input.mainFeatures.split('.')[0]}.`;
    (imageTextBlock as any).image = {
      src: getRandomImage(),
      alt: input.productName
    };
    imageTextBlock.style = {
      backgroundColor: '#ffffff',
      padding: 'md',
      blockSpacing: 'md'
    };
    blocks.push(imageTextBlock);
  }
  
  // Add specifications if additional info is provided
  if (input.additionalInfo && input.additionalInfo.length > 20) {
    const specificationsBlock = createBlock('specifications', 2) as Block;
    specificationsBlock.visible = true;
    specificationsBlock.title = 'Especificações';
    (specificationsBlock as any).heading = 'Especificações Técnicas';
    
    // Generate some mock specifications from additional info
    const specLines = input.additionalInfo.split('.');
    (specificationsBlock as any).specs = [
      { id: uuidv4(), name: 'Material', value: 'Premium' },
      { id: uuidv4(), name: 'Garantia', value: '12 meses' },
      { id: uuidv4(), name: 'Origem', value: 'Brasil' },
      ...specLines.slice(0, 3).map((line, index) => ({
        id: uuidv4(),
        name: `Especificação ${index + 1}`,
        value: line.trim()
      }))
    ].filter(spec => spec.value.length > 3);
    
    specificationsBlock.style = {
      backgroundColor: '#f9fafb',
      padding: 'md',
      blockSpacing: 'md'
    };
    blocks.push(specificationsBlock);
  }
  
  // Add a gallery block with placeholder images
  const galleryBlock = createBlock('gallery', 3) as Block;
  galleryBlock.visible = true;
  galleryBlock.title = 'Galeria do Produto';
  
  // If we have a user image, include it in the gallery along with placeholders
  const galleryImages = [];
  if (input.imageUrl) {
    galleryImages.push({
      id: uuidv4(),
      src: input.imageUrl,
      alt: `${input.productName} - Imagem Principal`,
      caption: `${input.productName}`
    });
  }
  
  // Add some placeholder images
  for (let i = 0; i < 3; i++) {
    galleryImages.push({
      id: uuidv4(),
      src: getRandomImage(),
      alt: `${input.productName} - Imagem ${i + 1}`,
      caption: `Detalhe do produto ${i + 1}`
    });
  }
  
  (galleryBlock as any).images = galleryImages;
  galleryBlock.style = {
    backgroundColor: '#ffffff',
    padding: 'md',
    blockSpacing: 'md'
  };
  blocks.push(galleryBlock);
  
  // Add FAQ block
  const faqBlock = createBlock('faq', 1) as Block;
  faqBlock.visible = true;
  faqBlock.title = 'Perguntas Frequentes';
  (faqBlock as any).heading = 'Perguntas Frequentes';
  
  // Generate dynamic FAQs based on input
  (faqBlock as any).questions = [
    {
      id: uuidv4(),
      question: `Qual a garantia do ${input.productName}?`,
      answer: 'Oferecemos 12 meses de garantia para todos os nossos produtos.'
    },
    {
      id: uuidv4(),
      question: 'Como funciona o envio?',
      answer: 'Enviamos para todo o Brasil com os melhores serviços de entrega. Prazo médio de 3 a 7 dias úteis.'
    },
    {
      id: uuidv4(),
      question: `Para quem é indicado o ${input.productName}?`,
      answer: `${input.targetAudience.split('.')[0]}.`
    },
    {
      id: uuidv4(),
      question: 'Quais são os principais diferenciais deste produto?',
      answer: `${input.mainFeatures.split('.')[0]}.`
    }
  ];
  
  faqBlock.style = {
    backgroundColor: '#f9fafb',
    padding: 'md',
    blockSpacing: 'md'
  };
  blocks.push(faqBlock);
  
  // Add company info text block
  const companyBlock = createBlock('text', 1) as Block;
  companyBlock.visible = true;
  companyBlock.title = 'Sobre a Empresa';
  (companyBlock as any).heading = 'Sobre Nossa Empresa';
  (companyBlock as any).content = input.companyInfo;
  companyBlock.style = {
    backgroundColor: '#ffffff',
    padding: 'md',
    blockSpacing: 'md'
  };
  blocks.push(companyBlock);
  
  // Add CTA block at the end
  const ctaBlock = createBlock('cta', 1) as Block;
  ctaBlock.visible = true;
  ctaBlock.title = 'Chamada para Ação';
  (ctaBlock as any).heading = `Adquira seu ${input.productName} hoje mesmo!`;
  (ctaBlock as any).content = `Não perca a oportunidade de aproveitar todos os benefícios que o ${input.productName} pode oferecer. Faça seu pedido agora mesmo!`;
  (ctaBlock as any).buttonText = 'Comprar Agora';
  (ctaBlock as any).buttonUrl = '#';
  ctaBlock.style = {
    backgroundColor: '#f3f4f6',
    headingColor: '#1f2937',
    padding: 'lg',
    blockSpacing: 'lg'
  };
  blocks.push(ctaBlock);
  
  // Create the complete description
  const description: ProductDescription = {
    id: descriptionId,
    name: descriptionName,
    blocks,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return description;
};
