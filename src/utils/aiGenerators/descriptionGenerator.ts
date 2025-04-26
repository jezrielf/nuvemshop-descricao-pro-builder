
import { v4 as uuidv4 } from 'uuid';
import { ProductDescription, BlockStyle, BlockType } from '@/types/editor';

// Define input interface for AI generation
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

// Function to add specific block types
const createBlock = (
  type: BlockType,
  title: string,
  style?: Partial<BlockStyle>
) => {
  return {
    id: uuidv4(),
    type,
    title,
    columns: 'full',
    visible: true,
    style: style || {},
  };
};

// Main function to generate AI description
export const generateAIDescription = async (input: AIDescriptionInput): Promise<ProductDescription> => {
  // For a real application, here you would call an actual AI service
  // For now, we'll create a template-based description
  
  const blocks = [];
  const currentDate = new Date().toISOString();
  
  // Add hero block
  blocks.push({
    ...createBlock('hero', 'Hero Principal'),
    heading: input.productName,
    subheading: `Descubra ${input.productName} - A escolha ideal para ${input.targetAudience}`,
    backgroundImage: input.imageUrl,
    buttonText: 'Saiba Mais',
    buttonUrl: '#features',
    style: {
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      blockSpacing: 'lg'
    }
  });
  
  // Add main text introduction
  blocks.push({
    ...createBlock('text', 'Introdução'),
    content: `<h2>Conheça ${input.productName}</h2><p>${input.companyInfo}</p><p>Desenvolvido especialmente para ${input.targetAudience}, este produto oferece uma solução completa para suas necessidades.</p>`,
    columns: 'full' as any,
    style: {
      textAlign: 'center',
      blockSpacing: 'md'
    }
  });
  
  // Add features block
  const featuresArray = input.mainFeatures
    .split('\n')
    .filter(item => item.trim().length > 0)
    .map((feature, index) => ({
      id: uuidv4(),
      title: `Característica ${index + 1}`,
      description: feature,
      icon: ['Sparkles', 'Star', 'Award', 'Zap'][index % 4] || 'Check'
    }));
  
  blocks.push({
    ...createBlock('features', 'Características Principais'),
    features: featuresArray.slice(0, 3),
    columns: 'full' as any,
    style: {
      backgroundColor: '#ffffff',
      blockSpacing: 'lg'
    }
  });
  
  // Add image block if available
  if (input.imageUrl) {
    blocks.push({
      ...createBlock('image', 'Imagem do Produto'),
      src: input.imageUrl,
      alt: `Imagem de ${input.productName}`,
      title: input.productName,
      caption: `${input.productName} - ${input.productCategory}`,
      columns: 'full' as any,
      style: {
        blockSpacing: 'md'
      }
    });
  }
  
  // Add benefits
  blocks.push({
    ...createBlock('benefits', 'Benefícios'),
    heading: 'Principais Benefícios',
    benefits: [
      { id: uuidv4(), title: 'Qualidade Superior', description: 'Fabricado com os melhores materiais' },
      { id: uuidv4(), title: 'Durável', description: 'Projetado para durar por muito tempo' },
      { id: uuidv4(), title: 'Versátil', description: 'Adaptável a diferentes usos e necessidades' }
    ],
    columns: 'full' as any,
    style: {
      backgroundColor: '#f8f9fa',
      blockSpacing: 'lg',
      textAlign: 'center'
    }
  });
  
  // Add call to action
  blocks.push({
    ...createBlock('cta', 'Chamada para Ação'),
    heading: 'Pronto para Experimentar?',
    content: `${input.productName} é a escolha perfeita para ${input.targetAudience}. Não perca mais tempo!`,
    buttonText: input.productPrice ? `Comprar por ${input.productPrice}` : 'Comprar Agora',
    buttonUrl: '#comprar',
    columns: 'full' as any,
    style: {
      backgroundColor: '#e9ecef',
      textAlign: 'center',
      blockSpacing: 'lg'
    }
  });
  
  // Add FAQ
  blocks.push({
    ...createBlock('faq', 'Perguntas Frequentes'),
    questions: [
      { 
        id: uuidv4(), 
        question: `Como o ${input.productName} se destaca da concorrência?`, 
        answer: 'Nosso produto se destaca pela sua qualidade superior e características inovadoras que atendem perfeitamente às necessidades dos clientes.' 
      },
      { 
        id: uuidv4(), 
        question: 'Qual é o prazo de garantia?', 
        answer: 'Oferecemos garantia completa de 12 meses para todos os nossos produtos.' 
      },
      { 
        id: uuidv4(), 
        question: 'Como funciona a entrega?', 
        answer: 'Fazemos entregas para todo o Brasil, com prazos que variam de acordo com sua localidade.' 
      }
    ],
    columns: 'full' as any,
    style: {
      blockSpacing: 'md'
    }
  });
  
  // Additional information if provided
  if (input.additionalInfo) {
    blocks.push({
      ...createBlock('text', 'Informações Adicionais'),
      content: `<h3>Informações Adicionais</h3><p>${input.additionalInfo}</p>`,
      columns: 'full' as any,
      style: {
        blockSpacing: 'md'
      }
    });
  }
  
  // Create the final description object
  const description: ProductDescription = {
    id: uuidv4(),
    name: `Descrição de ${input.productName}`,
    blocks,
    createdAt: currentDate,
    updatedAt: currentDate,
    category: input.productCategory as any,
    seo: {
      title: input.productName,
      description: `${input.productName} - ${input.companyInfo.substring(0, 100)}...`,
      keywords: input.mainFeatures.split('\n').map(f => f.trim()).filter(f => f.length > 0)
    }
  };
  
  return description;
};
