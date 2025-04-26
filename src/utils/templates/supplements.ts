import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { fixTemplateProps } from './fixTemplateProps';

// Supplements Template Collection
const supplementsTemplatesRaw = [
  // TEMPLATE 1: Supplements
  {
    id: uuidv4(),
    name: 'Suplementos Básico',
    category: 'supplements',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532980400857-4a0c0a9ee8e2',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Encontre os melhores suplementos para você',
        subheading: 'Qualidade e variedade para sua saúde e bem-estar',
        buttonText: 'Ver Suplementos',
        buttonUrl: '#suplementos',
        backgroundImage: 'https://images.unsplash.com/photo-1532980400857-4a0c0a9ee8e2',
        style: {
          backgroundColor: '#f0f8ff',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Nossos Diferenciais',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos suplementos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Qualidade Premium',
            description: 'Suplementos produzidos com os melhores ingredientes e alta tecnologia.',
            icon: '✅'
          },
          {
            id: uuidv4(),
            title: 'Variedade',
            description: 'Grande variedade de suplementos para atender todas as suas necessidades.',
            icon: '💪'
          },
          {
            id: uuidv4(),
            title: 'Entrega Rápida',
            description: 'Entrega rápida e segura para todo o Brasil.',
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
      {
        id: uuidv4(),
        type: 'image',
        title: 'Imagem dos Suplementos',
        columns: 1,
        visible: true,
        src: 'https://images.unsplash.com/photo-1563225422-dc2783157c3a',
        alt: 'Suplementos',
        caption: 'Nossa linha completa de suplementos',
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
        type: 'features',
        title: 'Características dos Suplementos',
        columns: 1,
        visible: true,
        heading: 'Conheça os benefícios de cada suplemento',
        features: [
          {
            id: uuidv4(),
            title: 'Whey Protein',
            description: 'Auxilia no ganho de massa muscular e recuperação pós-treino.',
            icon: '🥛'
          },
          {
            id: uuidv4(),
            title: 'Creatina',
            description: 'Aumenta a força e a energia durante os treinos.',
            icon: '⚡'
          },
          {
            id: uuidv4(),
            title: 'BCAA',
            description: 'Reduz a fadiga muscular e melhora a recuperação.',
            icon: '💊'
          },
          {
            id: uuidv4(),
            title: 'Multivitamínico',
            description: 'Fornece as vitaminas e minerais essenciais para o bom funcionamento do organismo.',
            icon: '💊'
          },
          {
            id: uuidv4(),
            title: 'Ômega 3',
            description: 'Auxilia na saúde cardiovascular e cerebral.',
            icon: '🐟'
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
        heading: 'Invista na sua saúde e bem-estar',
        content: 'Aproveite nossas ofertas exclusivas e garanta os melhores suplementos para você.',
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
  },
  
  // TEMPLATE 2: Performance Supplements
  {
    id: uuidv4(),
    name: 'Suplementos de Performance',
    category: 'supplements',
    thumbnailUrl: 'https://images.unsplash.com/photo-1577003833619-76bbd7f82948',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Maximize seu desempenho com nossos suplementos',
        subheading: 'Fórmulas avançadas para atletas e praticantes de atividades físicas',
        buttonText: 'Ver Suplementos',
        buttonUrl: '#suplementos',
        backgroundImage: 'https://images.unsplash.com/photo-1577003833619-76bbd7f82948',
        style: {
          backgroundColor: '#e9f7ef',
          headingColor: '#196f3d',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'text',
        title: 'A Importância dos Suplementos',
        columns: 1,
        visible: true,
        heading: 'Por que usar suplementos de performance?',
        content: '<p>Os suplementos de performance são formulados para auxiliar atletas e praticantes de atividades físicas a atingir seus objetivos de forma mais rápida e eficiente. Eles fornecem nutrientes essenciais para o ganho de massa muscular, aumento da força, melhora da resistência e recuperação pós-treino.</p><p>Nossa linha de suplementos de performance é desenvolvida com ingredientes de alta qualidade e tecnologia avançada, garantindo resultados superiores e segurança para sua saúde.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#196f3d',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Linha de Suplementos',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1587370560942-1ca2e0e57f69',
            alt: 'Whey Protein',
            caption: 'Whey Protein Isolado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1599420186946-7b6a440646c6',
            alt: 'Creatina',
            caption: 'Creatina Monohidratada'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1590779033149-5f3314dd9998',
            alt: 'BCAA',
            caption: 'BCAA 2:1:1'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1598515220547-431558ddc74a',
            alt: 'Glutamina',
            caption: 'Glutamina Pura'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1563225433-440e56514c63',
            alt: 'Cafeína',
            caption: 'Cafeína Anidra'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1587854680352-936b22b91030',
            alt: 'Ômega 3',
            caption: 'Ômega 3 Ultra Concentrado'
          }
        ],
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#196f3d',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Diferenciais',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos suplementos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Alta Qualidade',
            description: 'Ingredientes importados e rigoroso controle de qualidade.',
            icon: '✅'
          },
          {
            id: uuidv4(),
            title: 'Fórmulas Exclusivas',
            description: 'Desenvolvidas por especialistas em nutrição esportiva.',
            icon: '🧪'
          },
          {
            id: uuidv4(),
            title: 'Resultados Comprovados',
            description: 'Suplementos que auxiliam no alcance de seus objetivos.',
            icon: '🏆'
          },
          {
            id: uuidv4(),
            title: 'Sem Aditivos',
            description: 'Livre de corantes, aromatizantes artificiais e glúten.',
            icon: '🌿'
          },
          {
            id: uuidv4(),
            title: 'Fácil Digestão',
            description: 'Fórmulas que não causam desconforto gastrointestinal.',
            icon: '👌'
          },
          {
            id: uuidv4(),
            title: 'Entrega Rápida',
            description: 'Receba seus suplementos em casa com agilidade e segurança.',
            icon: '🚚'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#196f3d',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'faq',
        title: 'Perguntas Frequentes',
        columns: 1,
        visible: true,
        heading: 'Dúvidas Comuns',
        questions: [
          {
            id: uuidv4(),
            question: 'Qual a dosagem ideal de Whey Protein?',
            answer: 'A dosagem ideal varia de acordo com o peso e o nível de atividade física. Consulte um nutricionista para saber a quantidade ideal para você.'
          },
          {
            id: uuidv4(),
            question: 'Creatina causa retenção de líquidos?',
            answer: 'A creatina pode causar uma leve retenção de líquidos intramuscular, o que é benéfico para o ganho de massa muscular.'
          },
          {
            id: uuidv4(),
            question: 'BCAA engorda?',
            answer: 'O BCAA não engorda, pois possui baixas calorias e auxilia na recuperação muscular.'
          },
          {
            id: uuidv4(),
            question: 'Qual a diferença entre Whey Protein Concentrado, Isolado e Hidrolisado?',
            answer: 'O Whey Protein Concentrado possui maior quantidade de carboidratos e gorduras, o Isolado possui menor quantidade e o Hidrolisado é pré-digerido, facilitando a absorção.'
          }
        ],
        style: {
          backgroundColor: '#e9f7ef',
          headingColor: '#196f3d',
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
        heading: 'Eleve seu desempenho ao máximo',
        content: 'Aproveite nossas ofertas exclusivas e garanta os melhores suplementos para seus treinos.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#27ae60',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Wellness Supplements
  {
    id: uuidv4(),
    name: 'Suplementos de Bem-estar',
    category: 'supplements',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Cuide da sua saúde e bem-estar com nossos suplementos',
        subheading: 'Fórmulas naturais para uma vida mais equilibrada e saudável',
        buttonText: 'Ver Suplementos',
        buttonUrl: '#suplementos',
        backgroundImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        style: {
          backgroundColor: '#1a237e',
          headingColor: '#ffffff',
          textColor: '#e0e0e0',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'text',
        title: 'A Importância do Bem-Estar',
        columns: 1,
        visible: true,
        heading: 'Por que investir em suplementos de bem-estar?',
        content: '<p>Os suplementos de bem-estar são formulados para auxiliar na manutenção da saúde e do equilíbrio do organismo. Eles fornecem nutrientes essenciais para o bom funcionamento do corpo, fortalecendo o sistema imunológico, melhorando a qualidade do sono, reduzindo o estresse e promovendo a sensação de bem-estar geral.</p><p>Nossa linha de suplementos de bem-estar é desenvolvida com ingredientes naturais e tecnologia avançada, garantindo segurança e eficácia para sua saúde.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a237e',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Ingredientes Naturais',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1505778221682-dca9bca5a7ca',
          alt: 'Ingredientes Naturais'
        },
        heading: 'O poder dos ingredientes naturais',
        content: 'Nossos suplementos de bem-estar são formulados com ingredientes naturais cuidadosamente selecionados, como vitaminas, minerais, ervas e extratos de plantas. Esses ingredientes possuem propriedades benéficas para a saúde, auxiliando no fortalecimento do sistema imunológico, na melhora da qualidade do sono, na redução do estresse e na promoção da sensação de bem-estar geral.',
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#1a237e',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Benefícios',
        columns: 3,
        visible: true,
        heading: 'Como nossos suplementos podem te ajudar',
        benefits: [
          {
            id: uuidv4(),
            title: 'Fortalecimento do Sistema Imunológico',
            description: 'Auxilia na proteção contra doenças e infecções.',
            icon: '🛡️'
          },
          {
            id: uuidv4(),
            title: 'Melhora da Qualidade do Sono',
            description: 'Promove um sono mais profundo e reparador.',
            icon: '😴'
          },
          {
            id: uuidv4(),
            title: 'Redução do Estresse',
            description: 'Auxilia no controle do estresse e da ansiedade.',
            icon: '🧘'
          },
          {
            id: uuidv4(),
            title: 'Aumento da Energia',
            description: 'Fornece mais energia e disposição para o dia a dia.',
            icon: '⚡'
          },
          {
            id: uuidv4(),
            title: 'Melhora do Humor',
            description: 'Auxilia na melhora do humor e da sensação de bem-estar.',
            icon: '😊'
          },
          {
            id: uuidv4(),
            title: 'Ação Antioxidante',
            description: 'Combate os radicais livres e previne o envelhecimento precoce.',
            icon: '🍇'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a237e',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Linha de Suplementos',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1563225422-dc2783157c3a',
            alt: 'Multivitamínico',
            caption: 'Multivitamínico Completo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1587854680352-936b22b91030',
            alt: 'Ômega 3',
            caption: 'Ômega 3 Ultra Concentrado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1590779033149-5f3314dd9998',
            alt: 'Vitamina D',
            caption: 'Vitamina D3'
          }
        ],
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#1a237e',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Dicas para uma Vida Mais Saudável',
        columns: 2,
        visible: true,
        heading: 'Maximize os resultados com hábitos saudáveis',
        features: [
          {
            id: uuidv4(),
            title: 'Alimentação Equilibrada',
            description: 'Consuma alimentos nutritivos e variados.',
            icon: '🍎'
          },
          {
            id: uuidv4(),
            title: 'Atividade Física Regular',
            description: 'Pratique exercícios físicos regularmente.',
            icon: '🏃'
          },
          {
            id: uuidv4(),
            title: 'Sono de Qualidade',
            description: 'Durma de 7 a 8 horas por noite.',
            icon: '😴'
          },
          {
            id: uuidv4(),
            title: 'Controle do Estresse',
            description: 'Pratique técnicas de relaxamento e meditação.',
            icon: '🧘'
          },
          {
            id: uuidv4(),
            title: 'Hidratação Adequada',
            description: 'Beba bastante água ao longo do dia.',
            icon: '💧'
          },
          {
            id: uuidv4(),
            title: 'Evite Hábitos Nocivos',
            description: 'Não fume e limite o consumo de álcool.',
            icon: '🚭'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a237e',
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
        heading: 'Invista na sua saúde e bem-estar',
        content: 'Aproveite nossas ofertas exclusivas e garanta os melhores suplementos para uma vida mais equilibrada e saudável.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#303f9f',
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
export const supplementsTemplates: Template[] = supplementsTemplatesRaw.map(fixTemplateProps);

// For backward compatibility with existing code that might expect a single template
export const supplementsTemplate = supplementsTemplates[0];
