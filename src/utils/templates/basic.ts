
import { Template } from '@/types/editor';

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
          backgroundColor: '#f8f9fa',
          padding: '40px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Nome do Produto',
        subheading: 'Uma breve descrição do seu produto em destaque',
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
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        content: '<p>Adicione aqui uma descrição detalhada do seu produto. Explique suas características, benefícios e diferenciais. Este é um bom lugar para convencer o cliente sobre a qualidade e vantagens do seu produto.</p>'
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Imagem do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff',
          textAlign: 'center'
        },
        src: '',
        alt: 'Imagem principal do produto',
        caption: 'Legenda da imagem (opcional)'
      }
    ]
  },
  {
    id: 'basic-product-info-2',
    name: 'Informações Básicas do Produto',
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
          padding: '20px',
          backgroundColor: '#ffffff'
        },
        content: '<h2>Nome do Produto</h2><p>Descrição completa do produto com todas as informações relevantes para o cliente.</p>'
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Especificações Técnicas',
        specs: [
          { name: 'Material', value: 'Exemplo' },
          { name: 'Dimensões', value: 'Exemplo' },
          { name: 'Peso', value: 'Exemplo' },
          { name: 'Cor', value: 'Exemplo' }
        ]
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Imagem do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff',
          textAlign: 'center'
        },
        src: '',
        alt: 'Imagem do produto',
        caption: ''
      }
    ]
  }
];
