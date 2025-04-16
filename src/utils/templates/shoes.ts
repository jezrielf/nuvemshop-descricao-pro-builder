
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

// Shoes Template Collection
export const shoesTemplates: Template[] = [
  // TEMPLATE 1: Casual Shoes
  {
    id: uuidv4(),
    name: 'Calçados Casuais',
    category: 'shoes',
    thumbnail: 'https://images.unsplash.com/photo-1542296660-6e538a53498a',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Encontre o Seu Par Perfeito',
        subheading: 'Descubra nossa nova coleção de sapatos casuais',
        buttonText: 'Compre Agora',
        buttonUrl: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1542296660-6e538a53498a',
        style: {
          backgroundColor: '#f5f5f5',
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
        title: 'Benefícios',
        columns: 2,
        visible: true,
        heading: 'Por que Escolher Nossos Sapatos?',
        benefits: [
          {
            id: uuidv4(),
            title: 'Conforto Excepcional',
            description: 'Tecnologia de amortecimento que se adapta a cada passo',
            icon: "👟"
          },
          {
            id: uuidv4(),
            title: 'Estilo Moderno',
            description: 'Design contemporâneo para qualquer ocasião',
            icon: "✨"
          },
          {
            id: uuidv4(),
            title: 'Material Durável',
            description: 'Construído para durar, mesmo sob uso intenso',
            icon: "🔄"
          },
          {
            id: uuidv4(),
            title: 'Respirabilidade',
            description: 'Mantém seus pés frescos mesmo nos dias mais quentes',
            icon: "💨"
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
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Sapatos',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1515955656352-a1a717cedcd6',
            alt: 'Sapato Esportivo',
            caption: 'Conforto e estilo para seus treinos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1588361035994-295e21daa67a',
            alt: 'Sapato Casual',
            caption: 'Perfeito para o dia a dia'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d',
            alt: 'Tênis Moderno',
            caption: 'A união perfeita entre estilo e conforto'
          }
        ],
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // Specifications Block
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Detalhes Técnicos',
        specs: [
          { id: uuidv4(), name: 'Material Superior', value: 'Mesh respirável / Couro sintético' },
          { id: uuidv4(), name: 'Solado', value: 'Borracha anti-derrapante' },
          { id: uuidv4(), name: 'Palmilha', value: 'Memory foam removível' },
          { id: uuidv4(), name: 'Peso', value: 'Aproximadamente 280g por pé (tamanho 40)' },
          { id: uuidv4(), name: 'Altura do Salto', value: '2.5 cm' }
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
        heading: 'Experimente o Conforto Inovador',
        content: 'Nossos calçados foram projetados para oferecer o máximo de conforto e estilo. Experimente e sinta a diferença.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#buy',
        style: {
          backgroundColor: '#212529',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Athletic Shoes
  {
    id: uuidv4(),
    name: 'Tênis Esportivos',
    category: 'shoes',
    thumbnail: 'https://images.unsplash.com/photo-1606107557195-0a29a5b4b4aa',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Supere Seus Limites',
        subheading: 'Tênis esportivos projetados para alto desempenho',
        buttonText: 'Ver Coleção',
        buttonUrl: '#collection',
        backgroundImage: 'https://images.unsplash.com/photo-1606107557195-0a29a5b4b4aa',
        style: {
          backgroundColor: '#e9ecef',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Tecnologia Avançada',
        columns: 1,
        visible: true,
        heading: 'Tecnologia que Impulsiona seu Desempenho',
        content: '<p>Nossos tênis esportivos são desenvolvidos com as mais avançadas tecnologias para garantir conforto, estabilidade e desempenho superior durante suas atividades físicas.</p><p>Cada elemento foi cuidadosamente projetado e testado por atletas profissionais para assegurar que você tenha a melhor experiência possível, seja correndo, treinando ou praticando seu esporte favorito.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Detalhes do Produto',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1562183241-b937e95585b6',
          alt: 'Detalhes do tênis esportivo'
        },
        heading: 'Projetado para Performance',
        content: 'Com uma combinação única de amortecimento responsivo e suporte estrutural, nosso tênis esportivo oferece estabilidade excepcional durante os treinos mais intensos. O sistema de ventilação avançado mantém seus pés secos e confortáveis mesmo nas atividades mais exigentes.',
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características',
        columns: 2,
        visible: true,
        heading: 'Características Principais',
        features: [
          {
            id: uuidv4(),
            title: 'Amortecimento Responsivo',
            description: 'Tecnologia que retorna energia a cada passada',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Suporte Estabilizador',
            description: 'Previne torções e oferece segurança durante movimentos laterais',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Sistema de Ventilação',
            description: 'Canais de fluxo de ar que mantêm os pés frescos',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Tração Superior',
            description: 'Solado multi-superfície para aderência em qualquer terreno',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Design Anatômico',
            description: 'Moldagem que acompanha os contornos naturais dos pés',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Peso Ultraleve',
            description: 'Materiais avançados que reduzem o peso sem comprometer a durabilidade',
            icon: '✓'
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
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Modelos Disponíveis',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
            alt: 'Tênis de corrida vermelho',
            caption: 'Runner Pro - Vermelho'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
            alt: 'Tênis de treino preto',
            caption: 'Training Max - Preto'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
            alt: 'Tênis para cross-training',
            caption: 'Cross Elite - Cinza/Azul'
          }
        ],
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Luxury Footwear
  {
    id: uuidv4(),
    name: 'Calçados de Luxo',
    category: 'shoes',
    thumbnail: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Elegância em Cada Passo',
        subheading: 'Calçados de luxo feitos à mão com os melhores materiais',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#luxury-collection',
        backgroundImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
        style: {
          backgroundColor: '#0a0908',
          headingColor: '#e6ccb2',
          textColor: '#ebebeb',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Tradição e Artesanato',
        columns: 1,
        visible: true,
        heading: 'Artesanato de Excelência',
        content: '<p>Cada par de nossos calçados de luxo é meticulosamente criado por artesãos mestres com décadas de experiência, utilizando técnicas tradicionais transmitidas por gerações.</p><p>Comprometemo-nos com a excelência em cada etapa do processo de fabricação, desde a seleção dos melhores couros até o acabamento perfeito de cada peça.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Image Block
      {
        id: uuidv4(),
        type: 'image',
        title: 'Imagem Destaque',
        columns: 1,
        visible: true,
        src: 'https://images.unsplash.com/photo-1573309463328-ec43614b3def',
        alt: 'Fabricação artesanal de sapatos',
        caption: 'Cada sapato é cuidadosamente confeccionado à mão por nossos mestres artesãos',
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // Benefits Block
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Diferenciais',
        columns: 3,
        visible: true,
        heading: 'A Excelência dos Nossos Calçados',
        benefits: [
          {
            id: uuidv4(),
            title: 'Couro Premium',
            description: 'Selecionamos apenas os melhores couros de curtumes italianos e franceses',
            icon: '🥇'
          },
          {
            id: uuidv4(),
            title: 'Produção Artesanal',
            description: 'Mais de 200 etapas manuais para criar cada par',
            icon: '👌'
          },
          {
            id: uuidv4(),
            title: 'Solas Blake',
            description: 'Método de costura que garante flexibilidade e durabilidade',
            icon: '🔄'
          },
          {
            id: uuidv4(),
            title: 'Personalização',
            description: 'Serviço de customização para criar um par único',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Conforto Excepcional',
            description: 'Fôrmas desenvolvidas após anos de estudos ergonômicos',
            icon: '👣'
          },
          {
            id: uuidv4(),
            title: 'Garantia Vitalícia',
            description: 'Compromisso com a qualidade que dura para sempre',
            icon: '♾️'
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
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Coleção de Luxo',
        columns: 2,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd',
            alt: 'Oxford clássico',
            caption: 'Oxford Clássico em Couro Italiano'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1531310197839-ccf54634509e',
            alt: 'Loafer elegante',
            caption: 'Loafer Elegante em Couro Escovado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1613987876445-fcb353cd8e27',
            alt: 'Bota masculina',
            caption: 'Bota Chelsea em Couro Encerado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95',
            alt: 'Sapato feminino',
            caption: 'Scarpin Clássico em Couro Suede'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // CTA Block
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Experimente o Verdadeiro Luxo',
        content: 'Descubra calçados que combinam beleza atemporal com conforto excepcional. Uma experiência única para seus pés.',
        buttonText: 'Conhecer a Coleção',
        buttonUrl: '#luxury',
        style: {
          backgroundColor: '#1c1c1c',
          headingColor: '#e6ccb2',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  }
];

// For backward compatibility with existing code that might expect a single template
export const shoesTemplateA = shoesTemplates[0];
export const shoesTemplateB = shoesTemplates[1];
