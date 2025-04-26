
import { v4 as uuidv4 } from 'uuid';
import { ProductDescription, Block } from '@/types/editor';

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

// Renamed from generateDescription to generateAIDescription to match usage
export const generateAIDescription = async (input: AIDescriptionInput): Promise<ProductDescription> => {
  // Mock implementation that simulates AI-generated description
  // In a real implementation, this would call an external AI service
  
  const blocks: Block[] = [];
  
  // Add hero block with the provided image or placeholder
  blocks.push({
    id: uuidv4(),
    type: 'hero',
    title: 'Banner Principal',
    columns: 'full',
    visible: true,
    heading: input.productName,
    subheading: `Descubra o melhor ${input.productCategory} do mercado`,
    image: input.imageUrl ? {
      src: input.imageUrl,
      alt: input.productName
    } : undefined,
    style: {
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      padding: '2rem',
      blockSpacing: 'large'
    }
  } as Block);
  
  // Add text block with introduction
  blocks.push({
    id: uuidv4(),
    type: 'text',
    title: 'Introdução',
    columns: 'full',
    visible: true,
    heading: 'Sobre o Produto',
    content: `<p>Apresentamos o ${input.productName}, a escolha perfeita para quem busca qualidade e desempenho.</p>
              <p>Desenvolvido por uma empresa com ${input.companyInfo.includes('anos') ? input.companyInfo : 'anos de experiência no mercado'}, este produto foi criado pensando nas necessidades específicas de ${input.targetAudience}.</p>`,
    style: {
      padding: '1rem',
      blockSpacing: 'medium'
    }
  } as Block);
  
  // Add benefits block based on main features
  blocks.push({
    id: uuidv4(),
    type: 'benefits',
    title: 'Benefícios',
    columns: 'full',
    visible: true,
    heading: 'Principais Benefícios',
    benefits: [
      {
        id: uuidv4(),
        title: 'Qualidade Superior',
        description: 'Fabricado com materiais de alta qualidade para garantir durabilidade.',
        icon: 'Star'
      },
      {
        id: uuidv4(),
        title: 'Desempenho Excepcional',
        description: 'Projetado para oferecer o melhor desempenho em todas as condições.',
        icon: 'Zap'
      },
      {
        id: uuidv4(),
        title: 'Fácil de Usar',
        description: 'Interface intuitiva que proporciona uma experiência do usuário simplificada.',
        icon: 'ThumbsUp'
      }
    ],
    style: {
      backgroundColor: '#f5f5f5',
      padding: '2rem',
      blockSpacing: 'medium'
    }
  } as Block);
  
  // Add specifications block
  blocks.push({
    id: uuidv4(),
    type: 'specifications',
    title: 'Especificações',
    columns: 'full',
    visible: true,
    heading: 'Especificações Técnicas',
    specs: [
      {
        id: uuidv4(),
        name: 'Material',
        value: 'Premium'
      },
      {
        id: uuidv4(),
        name: 'Dimensões',
        value: 'Padrão do setor'
      },
      {
        id: uuidv4(),
        name: 'Garantia',
        value: '12 meses'
      }
    ],
    style: {
      padding: '1rem',
      blockSpacing: 'medium'
    }
  } as Block);
  
  // Add CTA block
  blocks.push({
    id: uuidv4(),
    type: 'cta',
    title: 'Chamada para Ação',
    columns: 'full',
    visible: true,
    heading: 'Adquira Agora!',
    content: input.productPrice ? 
      `<p>Por apenas ${input.productPrice}! Não perca esta oportunidade.</p>` : 
      '<p>Entre em contato para saber mais sobre preços e disponibilidade.</p>',
    buttonText: 'Comprar',
    style: {
      backgroundColor: '#e9f7fe',
      textAlign: 'center',
      padding: '2rem',
      blockSpacing: 'large'
    }
  } as Block);
  
  return {
    id: uuidv4(),
    name: `Descrição: ${input.productName}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productName: input.productName,
    category: input.productCategory,
    blocks
  };
};
