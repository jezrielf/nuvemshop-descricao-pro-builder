import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { fixTemplateProps } from './fixTemplateProps';

// Shoes Template Collection
const shoesTemplatesRaw = [
  // TEMPLATE 1: Athletic Shoes
  {
    id: uuidv4(),
    name: 'Calçados Esportivos',
    category: 'shoes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Performance e Conforto para Seus Treinos',
        subheading: 'Encontre o tênis ideal para cada tipo de atividade física',
        buttonText: 'Ver Coleção',
        buttonUrl: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        style: {
          backgroundColor: '#f0f0f0',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Tecnologias Inovadoras',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos tênis esportivos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Amortecimento Avançado',
            description: 'Absorção de impacto superior para proteger suas articulações',
            icon: '🛡️'
          },
          {
            id: uuidv4(),
            title: 'Suporte e Estabilidade',
            description: 'Design que oferece segurança e firmeza em cada movimento',
            icon: '💪'
          },
          {
            id: uuidv4(),
            title: 'Respirabilidade',
            description: 'Materiais que mantêm seus pés secos e confortáveis durante todo o treino',
            icon: '💨'
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
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Destaques da Coleção',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1588943115091-894649292a47',
            alt: 'Tênis de corrida',
            caption: 'Tênis de Corrida Performance'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
            alt: 'Tênis de treino',
            caption: 'Tênis de Treino Crossfit'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1606107557195-0a29a5b4b4aa',
            alt: 'Tênis de basquete',
            caption: 'Tênis de Basquete Pro'
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
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações Técnicas',
        columns: 1,
        visible: true,
        heading: 'Detalhes que fazem a diferença',
        specs: [
          {
            id: uuidv4(),
            name: 'Material do Cabedal',
            value: 'Mesh respirável com tecnologia Primeknit'
          },
          {
            id: uuidv4(),
            name: 'Entressola',
            value: 'Tecnologia Boost para máximo amortecimento e retorno de energia'
          },
          {
            id: uuidv4(),
            name: 'Solado',
            value: 'Borracha Continental para maior aderência e durabilidade'
          },
          {
            id: uuidv4(),
            name: 'Peso',
            value: 'Aproximadamente 300g (tamanho 40)'
          },
          {
            id: uuidv4(),
            name: 'Drop',
            value: '10mm'
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
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Eleve seu desempenho com os melhores tênis esportivos',
        content: 'Aproveite nossas ofertas exclusivas e encontre o modelo perfeito para você',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#007bff',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Casual Shoes
  {
    id: uuidv4(),
    name: 'Calçados Casuais',
    category: 'shoes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Estilo e Conforto para o Seu Dia a Dia',
        subheading: 'Descubra a coleção de calçados casuais que combinam com você',
        buttonText: 'Ver Coleção',
        buttonUrl: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
        style: {
          backgroundColor: '#f8f8f8',
          headingColor: '#222222',
          textColor: '#444444',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Design e Versatilidade',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos calçados casuais',
        benefits: [
          {
            id: uuidv4(),
            title: 'Conforto Duradouro',
            description: 'Materiais macios e palmilhas que garantem o bem-estar dos seus pés',
            icon: '☁️'
          },
          {
            id: uuidv4(),
            title: 'Estilo Atemporal',
            description: 'Modelos que nunca saem de moda e combinam com diversos looks',
            icon: '⭐'
          },
          {
            id: uuidv4(),
            title: 'Qualidade Superior',
            description: 'Acabamento impecável e materiais resistentes para maior durabilidade',
            icon: '💎'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#222222',
          textColor: '#444444',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Tendências da Estação',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1560769629-975ef6bbefb3',
            alt: 'Tênis casual',
            caption: 'Tênis Casual Street Style'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1586315075701-47251b45453a',
            alt: 'Sapatênis',
            caption: 'Sapatênis Conforto Premium'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1515599982437-a42595f2502b',
            alt: 'Mocassim',
            caption: 'Mocassim Elegante Casual'
          }
        ],
        style: {
          backgroundColor: '#f0f0f0',
          headingColor: '#222222',
          textColor: '#444444',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Características',
        columns: 1,
        visible: true,
        heading: 'Detalhes que você vai amar',
        specs: [
          {
            id: uuidv4(),
            name: 'Material Externo',
            value: 'Couro legítimo ou camurça de alta qualidade'
          },
          {
            id: uuidv4(),
            name: 'Material Interno',
            value: 'Tecido macio e respirável'
          },
          {
            id: uuidv4(),
            name: 'Palmilha',
            value: 'Anatômica com tecnologia de amortecimento'
          },
          {
            id: uuidv4(),
            name: 'Solado',
            value: 'Borracha antiderrapante para maior segurança'
          },
          {
            id: uuidv4(),
            name: 'Fechamento',
            value: 'Cadarço, elástico ou fivela para ajuste perfeito'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#222222',
          textColor: '#444444',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Encontre o calçado casual perfeito para cada momento',
        content: 'Aproveite nossas condições especiais e renove seu guarda-roupa com estilo e conforto',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#6c757d',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Formal Shoes
  {
    id: uuidv4(),
    name: 'Calçados Formais',
    category: 'shoes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Elegância e Sofisticação para Ocasiões Especiais',
        subheading: 'Descubra a coleção de calçados formais que elevam seu estilo',
        buttonText: 'Ver Coleção',
        buttonUrl: '#',
        backgroundImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2',
        style: {
          backgroundColor: '#222222',
          headingColor: '#ffffff',
          textColor: '#dddddd',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Design e Acabamento',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos calçados formais',
        benefits: [
          {
            id: uuidv4(),
            title: 'Elegância Impecável',
            description: 'Modelos clássicos e sofisticados que transmitem confiança e bom gosto',
            icon: '🎩'
          },
          {
            id: uuidv4(),
            title: 'Conforto Surpreendente',
            description: 'Construção que prioriza o bem-estar dos seus pés, mesmo em longos eventos',
            icon: '😌'
          },
          {
            id: uuidv4(),
            title: 'Durabilidade Excepcional',
            description: 'Materiais nobres e técnicas de fabricação que garantem a longevidade do seu calçado',
            icon: '🕰️'
          }
        ],
        style: {
          backgroundColor: '#333333',
          headingColor: '#ffffff',
          textColor: '#dddddd',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Destaques da Coleção',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1508417541894-89c53b943797',
            alt: 'Sapato Oxford',
            caption: 'Sapato Oxford Clássico'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1527521655244-5940999362c9',
            alt: 'Sapato Derby',
            caption: 'Sapato Derby Moderno'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1520322784853-c49c3925269c',
            alt: 'Bota Chelsea',
            caption: 'Bota Chelsea Elegante'
          }
        ],
        style: {
          backgroundColor: '#444444',
          headingColor: '#ffffff',
          textColor: '#dddddd',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Detalhes',
        columns: 1,
        visible: true,
        heading: 'O que torna nossos calçados únicos',
        specs: [
          {
            id: uuidv4(),
            name: 'Material Externo',
            value: 'Couro nobre com acabamento impecável'
          },
          {
            id: uuidv4(),
            name: 'Forro Interno',
            value: 'Couro macio para maior conforto'
          },
          {
            id: uuidv4(),
            name: 'Solado',
            value: 'Couro com antiderrapante para segurança'
          },
          {
            id: uuidv4(),
            name: 'Construção',
            value: 'Feito à mão com técnicas tradicionais'
          },
          {
            id: uuidv4(),
            name: 'Acabamento',
            value: 'Pintura e lustro que realçam a beleza do couro'
          }
        ],
        style: {
          backgroundColor: '#333333',
          headingColor: '#ffffff',
          textColor: '#dddddd',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Destaque-se com elegância em todas as ocasiões',
        content: 'Aproveite nossas condições exclusivas e adquira o calçado formal perfeito para você',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#343a40',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  }
];

// Apply fixTemplateProps to ensure all templates have the correct properties
export const shoesTemplates: Template[] = shoesTemplatesRaw.map(fixTemplateProps);

// For backward compatibility with existing code that might expect a single template
export const shoesTemplate = shoesTemplates[0];
