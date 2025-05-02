import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';
import { ibblFilterTemplate } from './products/ibbl-filter-template';
import { gemBlendTemplate } from './products/gem-blend';
import { waterFilterTemplate } from './products/water-filter';
import { waterFilterPremiumTemplate } from './products/water-filter-premium';

// Casa e decoração templates collection
export const casaDecoracaoTemplates: Template[] = [
  // Template 1: Air Purifier
  {
    id: uuidv4(),
    name: 'Purificador de Ar Premium',
    category: 'casa-decoracao',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Ar Puro e Revigorante',
        subheading: 'Desfrute de um ambiente mais saudável com nosso purificador de ar de alta performance.',
        backgroundImage: '/lovable-uploads/871ee81c-828a-4474-9a93-77f13d2d9601.png',
        buttonText: 'Compre Agora',
        buttonUrl: '#',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f0f4f8',
          textColor: '#333',
          textAlign: 'center',
          padding: '40px',
        },
      },
      {
        id: uuidv4(),
        type: 'text',
        title: 'Descrição do Produto',
        heading: 'Por que escolher nosso purificador de ar?',
        content: 'Nosso purificador de ar utiliza tecnologia de ponta para eliminar poeira, alérgenos e odores, proporcionando um ar mais limpo e saudável para você e sua família.',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#fff',
          padding: '20px',
          textAlign: 'left',
        },
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Recursos Avançados',
        heading: 'Conheça os recursos que fazem a diferença',
        layout: 'horizontal',
        features: [
          {
            id: uuidv4(),
            title: 'Filtro HEPA',
            description: 'Remove até 99,97% das partículas no ar.',
            icon: 'shield',
          },
          {
            id: uuidv4(),
            title: 'Ionizador',
            description: 'Neutraliza poluentes e melhora a qualidade do ar.',
            icon: 'zap',
          },
          {
            id: uuidv4(),
            title: 'Design Moderno',
            description: 'Integra-se perfeitamente a qualquer ambiente.',
            icon: 'layout',
          },
        ],
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f9f9f9',
          padding: '20px',
        },
      },
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        heading: 'Transforme seu ambiente agora!',
        content: 'Adquira já o seu purificador de ar e respire um ar mais puro e saudável.',
        buttonText: 'Compre Agora',
        buttonUrl: '#',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#4a90e2',
          textColor: '#fff',
          textAlign: 'center',
          padding: '30px',
        },
      },
    ],
    thumbnail: '/lovable-uploads/871ee81c-828a-4474-9a93-77f13d2d9601.png',
  },
  
  // Template 2: Smart Home Kit
  {
    id: uuidv4(),
    name: 'Kit Casa Inteligente',
    category: 'casa-decoracao',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Controle sua Casa na Palma da Mão',
        subheading: 'Simplifique sua vida com nosso kit casa inteligente completo.',
        backgroundImage: '/lovable-uploads/ea72f039-790b-455c-b2ea-0c2a7981d2d2.png',
        buttonText: 'Saiba Mais',
        buttonUrl: '#',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#28a745',
          textColor: '#fff',
          textAlign: 'center',
          padding: '40px',
        },
      },
      {
        id: uuidv4(),
        type: 'text',
        title: 'Descrição do Produto',
        heading: 'O que você pode fazer com nosso kit?',
        content: 'Com nosso kit casa inteligente, você pode controlar a iluminação, segurança e eletrodomésticos de qualquer lugar, proporcionando conforto e segurança para sua família.',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#fff',
          padding: '20px',
          textAlign: 'left',
        },
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Componentes do Kit',
        heading: 'Descubra os componentes essenciais',
        layout: 'vertical',
        features: [
          {
            id: uuidv4(),
            title: 'Central de Controle',
            description: 'Conecte e controle todos os dispositivos.',
            icon: 'home',
          },
          {
            id: uuidv4(),
            title: 'Sensores de Presença',
            description: 'Detecte movimentos e acione alarmes.',
            icon: 'eye',
          },
          {
            id: uuidv4(),
            title: 'Lâmpadas Inteligentes',
            description: 'Ajuste a intensidade e cor da luz.',
            icon: 'sun',
          },
        ],
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f9f9f9',
          padding: '20px',
        },
      },
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        heading: 'Comece a viver no futuro hoje!',
        content: 'Adquira já o seu kit casa inteligente e transforme sua casa em um ambiente conectado e seguro.',
        buttonText: 'Compre Agora',
        buttonUrl: '#',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#28a745',
          textColor: '#fff',
          textAlign: 'center',
          padding: '30px',
        },
      },
    ],
    thumbnail: '/lovable-uploads/ea72f039-790b-455c-b2ea-0c2a7981d2d2.png',
  },
  
  // Template 3: Decorative Lighting
  {
    id: uuidv4(),
    name: 'Iluminação Decorativa',
    category: 'casa-decoracao',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        heading: 'Transforme Seus Espaços com Luz',
        subheading: 'Descubra nossa coleção exclusiva de iluminação decorativa.',
        backgroundImage: '/lovable-uploads/e93193b7-175d-4c24-b5a9-e86626675f3b.png',
        buttonText: 'Veja a Coleção',
        buttonUrl: '#',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#ffc107',
          textColor: '#333',
          textAlign: 'center',
          padding: '40px',
        },
      },
      {
        id: uuidv4(),
        type: 'text',
        title: 'Descrição do Produto',
        heading: 'Por que a iluminação faz toda a diferença?',
        content: 'A iluminação decorativa certa pode transformar qualquer ambiente, criando atmosferas acolhedoras e realçando a beleza de seus espaços.',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#fff',
          padding: '20px',
          textAlign: 'left',
        },
      },
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Produtos',
        heading: 'Inspire-se com nossas opções',
        images: [
          {
            id: uuidv4(),
            src: '/assets/templates/casa-decoracao/lighting-1.jpg',
            alt: 'Luminária Pendente',
          },
          {
            id: uuidv4(),
            src: '/assets/templates/casa-decoracao/lighting-2.jpg',
            alt: 'Abajur Moderno',
          },
          {
            id: uuidv4(),
            src: '/assets/templates/casa-decoracao/lighting-3.jpg',
            alt: 'Arandela Elegante',
          },
        ],
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f9f9f9',
          padding: '20px',
        },
      },
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        heading: 'Ilumine seus sonhos!',
        content: 'Explore nossa coleção de iluminação decorativa e encontre as peças perfeitas para seus espaços.',
        buttonText: 'Compre Agora',
        buttonUrl: '#',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#ffc107',
          textColor: '#333',
          textAlign: 'center',
          padding: '30px',
        },
      },
    ],
    thumbnail: '/lovable-uploads/e93193b7-175d-4c24-b5a9-e86626675f3b.png',
  },
  
  // Add our updated templates to the collection
  waterFilterTemplate,
  waterFilterPremiumTemplate,
  ibblFilterTemplate,
  gemBlendTemplate,
];
