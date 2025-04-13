import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const healthTemplate: Template = {
  id: 'adv-health-01',
  name: 'Saúde e Bem-estar',
  category: 'supplements',
  blocks: [
    // Hero Block
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      columns: 1,
      visible: true,
      heading: 'Sua saúde em primeiro lugar',
      subheading: 'Encontre os melhores produtos para cuidar de você',
      buttonText: 'Ver Produtos',
      buttonUrl: '#products',
      image: {
        src: 'https://images.unsplash.com/photo-1532980400857-4a0c0a9ee8e2',
        alt: 'Produtos de Saúde e Bem-estar'
      },
      style: {
        backgroundColor: '#f0f8ff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Benefits Block
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Nossos Diferenciais',
      columns: 3,
      visible: true,
      heading: 'Por que escolher nossos produtos',
      benefits: [
        {
          id: uuidv4(),
          title: 'Qualidade Garantida',
          description: 'Produtos rigorosamente testados para garantir a máxima eficácia e segurança.',
          icon: '✅'
        },
        {
          id: uuidv4(),
          title: 'Ingredientes Naturais',
          description: 'Fórmulas exclusivas com ingredientes naturais e orgânicos, sem aditivos químicos.',
          icon: '🌿'
        },
        {
          id: uuidv4(),
          title: 'Entrega Rápida',
          description: 'Receba seus produtos em casa com agilidade e segurança, em todo o Brasil.',
          icon: '🚚'
        }
      ],
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Fix the Image block to use the correct structure
    {
      id: uuidv4(),
      type: 'image',
      title: 'Imagem dos Produtos',
      columns: 1,
      visible: true,
      src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      alt: 'Produtos de Saúde e Bem-estar',
      caption: 'Vitamina D, Clorella, Triple Ômega, Feno Grego e Melatonina+',
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Features Block
    {
      id: uuidv4(),
      type: 'features',
      title: 'Características dos Produtos',
      columns: 1,
      visible: true,
      heading: 'Conheça os benefícios de cada produto',
      features: [
        {
          id: uuidv4(),
          title: 'Vitamina D',
          description: 'Essencial para a saúde óssea e imunidade.',
          icon: '🌞'
        },
        {
          id: uuidv4(),
          title: 'Clorella',
          description: 'Poderoso detoxificante e fonte de nutrientes.',
          icon: '🌱'
        },
        {
          id: uuidv4(),
          title: 'Triple Ômega',
          description: 'Saúde cardiovascular e cerebral em um só produto.',
          icon: '🐟'
        },
        {
          id: uuidv4(),
          title: 'Feno Grego',
          description: 'Auxilia no ganho de massa muscular e energia.',
          icon: '💪'
        },
        {
          id: uuidv4(),
          title: 'Melatonina+',
          description: 'Melhora a qualidade do sono e promove o relaxamento.',
          icon: '😴'
        }
      ],
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Specifications Block
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações dos Produtos',
      columns: 1,
      visible: true,
      heading: 'Informações técnicas',
      specs: [
        {
          id: uuidv4(),
          name: 'Vitamina D',
          value: '2.000 UI'
        },
        {
          id: uuidv4(),
          name: 'Clorella',
          value: '500mg'
        },
        {
          id: uuidv4(),
          name: 'Triple Ômega',
          value: '1.000mg'
        },
        {
          id: uuidv4(),
          name: 'Feno Grego',
          value: '600mg'
        },
        {
          id: uuidv4(),
          name: 'Melatonina+',
          value: '3mg'
        }
      ],
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // FAQ Block
    {
      id: uuidv4(),
      type: 'faq',
      title: 'Perguntas Frequentes',
      columns: 1,
      visible: true,
      heading: 'Tire suas dúvidas',
      questions: [
        {
          id: uuidv4(),
          question: 'Como devo tomar os produtos?',
          answer: 'Recomendamos seguir as instruções de uso de cada produto, presentes na embalagem.'
        },
        {
          id: uuidv4(),
          question: 'Os produtos possuem contraindicações?',
          answer: 'Consulte um profissional de saúde antes de iniciar o uso, especialmente se você possui alguma condição preexistente.'
        },
        {
          id: uuidv4(),
          question: 'Qual o prazo de entrega?',
          answer: 'O prazo de entrega varia de acordo com a sua região. Consulte o prazo no momento da compra.'
        }
      ],
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // CTA Block
    {
      id: uuidv4(),
      type: 'cta',
      title: 'Chamada para Ação',
      columns: 1,
      visible: true,
      heading: 'Invista na sua saúde agora mesmo',
      content: 'Aproveite nossas ofertas exclusivas e garanta os melhores produtos para o seu bem-estar.',
      buttonText: 'Comprar Agora',
      buttonUrl: '#',
      style: {
        backgroundColor: '#28a745',
        headingColor: '#ffffff',
        textColor: '#ffffff',
        padding: 'lg',
        blockSpacing: 'none'
      }
    }
  ]
};
