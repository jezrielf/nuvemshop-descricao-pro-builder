// Fix this file to use thumbnailUrl instead of thumbnail

// Import the fixTemplateProps utility
import { fixTemplateProps } from './fixTemplateProps';
import { Template } from '@/types/editor';

// Export templates using the fixTemplateProps utility
export const accessoriesTemplates = [
  {
    id: 'accessories-basic',
    name: 'Accessories Basic',
    description: 'A simple template for accessories',
    thumbnailUrl: '/templates/accessories/basic.jpg', // Changed from thumbnail to thumbnailUrl
    category: 'accessories',
    blocks: [
      {
        id: 'accessories-basic-title',
        type: 'text',
        title: 'Title',
        heading: 'Título do Texto',
        content: '<h1>Acessórios que complementam seu estilo</h1>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-basic-subtitle',
        type: 'text',
        title: 'Subtitle',
        heading: 'Subtítulo do Texto',
        content: '<p>Encontre os acessórios perfeitos para expressar sua individualidade e elevar seu visual.</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-basic-image',
        type: 'image',
        title: 'Main Image',
        imageUrl: 'https://images.unsplash.com/photo-1550345332-09e3ac9876fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
        altText: 'Acessórios',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-basic-section-title',
        type: 'text',
        title: 'Section Title',
        heading: 'Título do Texto',
        content: '<h2>Nossa Coleção de Acessórios</h2>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-basic-section-description',
        type: 'text',
        title: 'Section Description',
        heading: 'Subtítulo do Texto',
        content: '<p>Explore nossa ampla gama de acessórios, desde joias elegantes até óculos de sol modernos e lenços estilosos.</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-basic-product-list',
        type: 'text',
        title: 'Product List',
        heading: 'Lista de Produtos',
        content: '<ul>\n  <li>Colares</li>\n  <li>Brincos</li>\n  <li>Pulseiras</li>\n  <li>Anéis</li>\n  <li>Óculos de sol</li>\n  <li>Lenços</li>\n  <li>Chapéus</li>\n  <li>Bolsas</li>\n</ul>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-basic-call-to-action',
        type: 'text',
        title: 'Call to Action',
        heading: 'Chamada para Ação',
        content: '<p>Descubra os acessórios que farão você se destacar. Compre agora e adicione um toque de estilo único ao seu look!</p>',
        visible: true,
        columns: 'full',
        style: {}
      }
    ],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 'accessories-trendy',
    name: 'Accessories Trendy',
    description: 'Template moderno para acessórios de moda.',
    thumbnailUrl: '/templates/accessories/trendy.jpg',
    category: 'accessories',
    blocks: [
      {
        id: 'accessories-trendy-title',
        type: 'text',
        title: 'Título Principal',
        heading: 'Título do Texto',
        content: '<h1>Acessórios da Moda: As Últimas Tendências</h1>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-trendy-intro',
        type: 'text',
        title: 'Introdução',
        heading: 'Subtítulo do Texto',
        content: '<p>Mantenha-se à frente da moda com nossos acessórios mais recentes e modernos. Descubra o que é tendência agora!</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-trendy-image',
        type: 'image',
        title: 'Imagem Principal',
        imageUrl: 'https://images.unsplash.com/photo-1588783884977-649a4c41a032?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80',
        altText: 'Acessórios da Moda',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-trendy-section1-title',
        type: 'text',
        title: 'Título da Seção 1',
        heading: 'Título do Texto',
        content: '<h2>Tendências Atuais em Acessórios</h2>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-trendy-section1-desc',
        type: 'text',
        title: 'Descrição da Seção 1',
        heading: 'Subtítulo do Texto',
        content: '<p>Explore as tendências mais quentes, como correntes grossas, brincos statement e óculos de sol oversized.</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-trendy-section2-title',
        type: 'text',
        title: 'Título da Seção 2',
        heading: 'Título do Texto',
        content: '<h2>Como Incorporar Acessórios ao Seu Look</h2>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-trendy-section2-desc',
        type: 'text',
        title: 'Descrição da Seção 2',
        heading: 'Subtítulo do Texto',
        content: '<p>Aprenda a combinar acessórios para criar looks únicos e personalizados que refletem seu estilo individual.</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-trendy-cta',
        type: 'text',
        title: 'Chamada para Ação',
        heading: 'Chamada para Ação',
        content: '<p>Adquira os acessórios que estão fazendo sucesso e eleve seu estilo a um novo patamar. Compre agora e arrase!</p>',
        visible: true,
        columns: 'full',
        style: {}
      }
    ],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: 'accessories-luxury',
    name: 'Accessories Luxury',
    description: 'Template sofisticado para acessórios de luxo.',
    thumbnailUrl: '/templates/accessories/luxury.jpg',
    category: 'accessories',
    blocks: [
      {
        id: 'accessories-luxury-title',
        type: 'text',
        title: 'Título Principal',
        heading: 'Título do Texto',
        content: '<h1>Acessórios de Luxo: Elegância e Sofisticação</h1>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-luxury-intro',
        type: 'text',
        title: 'Introdução',
        heading: 'Subtítulo do Texto',
        content: '<p>Descubra nossa coleção exclusiva de acessórios de luxo, projetados para quem busca o requinte em cada detalhe.</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-luxury-image',
        type: 'image',
        title: 'Imagem Principal',
        imageUrl: 'https://images.unsplash.com/photo-1617196129458-c9c97a9848ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80',
        altText: 'Acessórios de Luxo',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-luxury-section1-title',
        type: 'text',
        title: 'Título da Seção 1',
        heading: 'Título do Texto',
        content: '<h2>Materiais Nobres e Design Exclusivo</h2>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-luxury-section1-desc',
        type: 'text',
        title: 'Descrição da Seção 1',
        heading: 'Subtítulo do Texto',
        content: '<p>Cada acessório é confeccionado com materiais da mais alta qualidade e apresenta um design único que exala elegância.</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-luxury-section2-title',
        type: 'text',
        title: 'Título da Seção 2',
        heading: 'Título do Texto',
        content: '<h2>O Toque Final para Ocasiões Especiais</h2>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-luxury-section2-desc',
        type: 'text',
        title: 'Descrição da Seção 2',
        heading: 'Subtítulo do Texto',
        content: '<p>Adicione um toque de glamour aos seus looks para eventos e celebrações com nossos acessórios de luxo.</p>',
        visible: true,
        columns: 'full',
        style: {}
      },
      {
        id: 'accessories-luxury-cta',
        type: 'text',
        title: 'Chamada para Ação',
        heading: 'Chamada para Ação',
        content: '<p>Invista em acessórios que transcendem tendências e tornam cada momento inesquecível. Compre agora e celebre o luxo!</p>',
        visible: true,
        columns: 'full',
        style: {}
      }
    ],
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  }
];

// Apply fixTemplateProps to ensure all templates have the correct properties
export const fixedAccessoriesTemplates: Template[] = accessoriesTemplates.map(fixTemplateProps);
