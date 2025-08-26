
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Simple, minimalist templates that can be used as starting points
export const basicTemplates: Template[] = [
  {
    id: 'minimal-product-1',
    name: 'Produto Minimalista',
    category: 'other',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          background: 'linear-gradient(135deg, hsl(220, 13%, 97%) 0%, hsl(220, 13%, 95%) 100%)',
          padding: '80px 20px',
          borderRadius: '16px',
          textAlign: 'center',
          border: '1px solid hsl(220, 13%, 91%)',
          boxShadow: '0 4px 24px hsl(220, 13%, 69% / 0.1)'
        },
        heading: 'Nome do Produto',
        subheading: 'Uma breve descrição do seu produto em destaque com design moderno e elegante',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 32px',
          backgroundColor: 'hsl(0, 0%, 100%)',
          borderRadius: '12px',
          margin: '24px 0',
          boxShadow: '0 2px 16px hsl(220, 13%, 69% / 0.08)'
        },
        content: '<h2 style="font-size: 28px; font-weight: 600; color: hsl(220, 9%, 20%); margin-bottom: 24px; line-height: 1.3;">Descrição do Produto</h2><p style="font-size: 18px; line-height: 1.7; color: hsl(220, 9%, 40%); max-width: 700px; margin: 0 auto;">Adicione aqui uma descrição detalhada do seu produto. Explique suas características, benefícios e diferenciais únicos. Este é o momento perfeito para destacar a qualidade e as vantagens exclusivas que seu produto oferece.</p>'
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Imagem do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: 'hsl(0, 0%, 100%)',
          textAlign: 'center',
          borderRadius: '12px',
          margin: '24px 0'
        },
        src: '',
        alt: 'Imagem principal do produto',
        caption: 'Visualização do produto em alta qualidade'
      }
    ]
  },
  {
    id: 'basic-product-info-2',
    name: 'Informações Completas do Produto',
    category: 'other',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'text-1',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 32px',
          background: 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(220, 13%, 98%) 100%)',
          borderRadius: '16px',
          border: '1px solid hsl(220, 13%, 91%)',
          boxShadow: '0 8px 32px hsl(220, 13%, 69% / 0.12)'
        },
        content: '<h1 style="font-size: 36px; font-weight: 700; color: hsl(220, 9%, 15%); margin-bottom: 16px; line-height: 1.2;">Nome do Produto</h1><p style="font-size: 20px; line-height: 1.6; color: hsl(220, 9%, 40%); max-width: 800px;">Descrição completa e envolvente do produto com todas as informações relevantes para conquistar o cliente. Destaque os benefícios únicos e características especiais.</p>'
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações',
        visible: true,
        columns: 'full',
        style: {
          padding: '48px 32px',
          background: 'linear-gradient(135deg, hsl(220, 13%, 97%) 0%, hsl(220, 13%, 95%) 100%)',
          borderRadius: '12px',
          margin: '32px 0',
          border: '1px solid hsl(220, 13%, 89%)'
        },
        heading: 'Especificações Técnicas',
        specs: [
          { name: 'Material', value: 'Premium Quality' },
          { name: 'Dimensões', value: '50 x 30 x 20 cm' },
          { name: 'Peso', value: '2.5 kg' },
          { name: 'Cor', value: 'Disponível em múltiplas cores' }
        ]
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Imagem do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: 'hsl(0, 0%, 100%)',
          textAlign: 'center',
          borderRadius: '12px',
          margin: '32px 0',
          boxShadow: '0 4px 24px hsl(220, 13%, 69% / 0.08)'
        },
        src: '',
        alt: 'Imagem do produto em alta qualidade',
        caption: 'Visualização detalhada do produto'
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '48px 32px',
          backgroundColor: 'hsl(0, 0%, 100%)',
          borderRadius: '16px',
          margin: '32px 0',
          boxShadow: '0 8px 32px hsl(220, 13%, 69% / 0.1)',
          border: '1px solid hsl(220, 13%, 91%)'
        },
        heading: 'Perguntas Frequentes',
        questions: [
          {
            id: uuidv4(),
            question: 'Como usar este produto?',
            answer: 'Instruções detalhadas e fáceis de seguir para o uso adequado do produto, garantindo máximo aproveitamento.'
          },
          {
            id: uuidv4(),
            question: 'Qual é a garantia oferecida?',
            answer: 'Este produto possui garantia de 12 meses contra defeitos de fabricação, oferecendo total tranquilidade.'
          },
          {
            id: uuidv4(),
            question: 'Posso trocar se não gostar?',
            answer: 'Sim, você tem 7 dias para trocar ou devolver o produto, seguindo nossa política de satisfação garantida.'
          }
        ]
      }
    ]
  }
];
