import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { fixTemplateProps } from './fixTemplateProps';

// Haute Couture Template Collection
const hauteCoutureTemplatesRaw = [
  // TEMPLATE 1: Luxury Couture
  {
    id: uuidv4(),
    name: 'Alta Costura Luxuosa',
    category: 'clothing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'A excelência da Alta Costura',
        subheading: 'Criações exclusivas que redefinem os padrões de sofisticação',
        buttonText: 'Descobrir Coleção',
        buttonUrl: '#collection',
        backgroundImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
        style: {
          backgroundColor: '#f0f0f0',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Introdução à Coleção',
        columns: 1,
        visible: true,
        heading: 'Uma obra de arte vestível',
        content: '<p style="font-size: 1.1em; line-height: 1.8;">A verdadeira Alta Costura transcende o conceito de vestuário. Cada peça é uma expressão artística meticulosamente elaborada, onde tradição e inovação se encontram para criar algo extraordinário.</p><p style="font-size: 1.1em; line-height: 1.8;">Nossa coleção representa o ápice da excelência em design e artesanato, com peças feitas à mão utilizando técnicas ancestrais combinadas com abordagens contemporâneas. Cada detalhe é pensado para criar não apenas uma roupa, mas uma experiência estética única.</p>',
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
        title: 'Ateliê e Processo Criativo',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e',
            alt: 'Croqui e design',
            caption: 'Concepção e Design'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1524041255072-7da0525d6b34',
            alt: 'Seleção de materiais',
            caption: 'Seleção de Materiais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1590401958868-1e21a2f3a363',
            alt: 'Costura artesanal',
            caption: 'Artesanato Refinado'
          }
        ],
        style: {
          backgroundColor: '#f5f5f5',
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
        title: 'Diferenciais da Alta Costura',
        columns: 3,
        visible: true,
        heading: 'A experiência da Alta Costura',
        benefits: [
          {
            id: uuidv4(),
            title: 'Exclusividade Absoluta',
            description: 'Cada peça é única e exclusiva, criada especificamente para você, com garantia de que não existirá outra igual.',
            icon: '🌟'
          },
          {
            id: uuidv4(),
            title: 'Ateliê Dedicado',
            description: 'Consultas privadas em nosso ateliê, onde você participa ativamente do processo criativo.',
            icon: '🏛️'
          },
          {
            id: uuidv4(),
            title: 'Mestres Artesãos',
            description: 'Nossas peças são criadas por mestres com décadas de experiência em técnicas refinadas de costura.',
            icon: '✂️'
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
        heading: 'Agende uma consulta exclusiva',
        content: 'Dê o primeiro passo para possuir uma criação verdadeiramente única, que transcende tendências e permanece atemporal.',
        buttonText: 'Solicitar Consulta',
        buttonUrl: '#contact',
        style: {
          backgroundColor: '#1a1a1a',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Designer Collection
  {
    id: uuidv4(),
    name: 'Coleção de Designer',
    category: 'clothing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1537832816519-689ad163238b',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Coleção Exclusiva de Designer',
        subheading: 'Onde visão artística encontra excelência em alfaiataria',
        buttonText: 'Ver Lookbook',
        buttonUrl: '#lookbook',
        backgroundImage: 'https://images.unsplash.com/photo-1537832816519-689ad163238b',
        style: {
          backgroundColor: '#e8e8e8',
          headingColor: '#1c1c1c',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Sobre o Designer',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1530319067432-f2a729c03db5',
          alt: 'Designer no ateliê'
        },
        heading: 'A Visão Criativa',
        content: 'Com formação nas mais prestigiadas escolas de moda de Paris e Milão, nossa designer-chefe traz uma perspectiva única que mescla influências clássicas com abordagens contemporâneas inovadoras. Sua jornada criativa é marcada pela busca incessante da perfeição e por uma sensibilidade aguçada para capturar a essência de cada cliente em suas criações exclusivas.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1c1c1c',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Destaques da Coleção',
        columns: 2,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1579298245158-33e8f568f7d3',
            alt: 'Vestido de noite',
            caption: 'Vestido Etéreo - Seda e Cristais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd',
            alt: 'Conjunto de alfaiataria',
            caption: 'Tailleur Desconstruído - Lã Italiana'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1539008835657-9773136e4059',
            alt: 'Peça bordada à mão',
            caption: 'Capa Bordada - 200 Horas de Trabalho Manual'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1536243298747-ea8874136d64',
            alt: 'Acessório exclusivo',
            caption: 'Clutch Escultural - Latão Banhado a Ouro'
          }
        ],
        style: {
          backgroundColor: '#f2f2f2',
          headingColor: '#1c1c1c',
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
        title: 'Processo de Criação',
        columns: 1,
        visible: true,
        heading: 'A Jornada de uma Peça Exclusiva',
        features: [
          {
            id: uuidv4(),
            title: 'Consulta Inicial',
            description: 'Uma conversa aprofundada para compreender seu estilo pessoal, necessidades e desejos',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Desenvolvimento do Conceito',
            description: 'Criação de croquis e propostas de design baseadas na sua personalidade',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Seleção de Materiais',
            description: 'Escolha dos tecidos e materiais mais refinados de fontes exclusivas',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Medidas e Moldes',
            description: 'Criação de moldes personalizados para um caimento perfeito',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Construção e Provas',
            description: 'Sessões de prova para ajustes precisos durante o processo de confecção',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Acabamento Refinado',
            description: 'Finalização detalhada com técnicas artesanais exclusivas',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1c1c1c',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Filosofia',
        columns: 1,
        visible: true,
        heading: 'Nossa Abordagem à Alta Costura',
        content: '<p>Acreditamos que a verdadeira elegância reside na autenticidade. Cada cliente tem uma história única, uma presença singular que merece ser celebrada e realçada. Nossa abordagem à alta costura não se trata apenas de criar roupas belas, mas de desenvolver peças que capturem a essência de quem as veste.</p><p>Através de um diálogo próximo e de um processo criativo colaborativo, desenvolvemos criações que são uma expressão genuína de individualidade. Nossas peças não apenas vestem o corpo, mas honram a personalidade, elevando a confiança e permitindo que cada pessoa brilhe em sua autenticidade.</p>',
        style: {
          backgroundColor: '#f2f2f2',
          headingColor: '#1c1c1c',
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
        heading: 'Sua História Merece uma Peça Única',
        content: 'Descubra o prazer de possuir uma criação feita exclusivamente para você, que conta sua história através da linguagem da alta costura.',
        buttonText: 'Agendar Consulta',
        buttonUrl: '#appointment',
        style: {
          backgroundColor: '#2c2c2c',
          headingColor: '#ffffff',
          textColor: '#e0e0e0',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Haute Couture Collection
  {
    id: uuidv4(),
    name: 'Coleção Alta Costura',
    category: 'clothing',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Descubra a Nova Coleção de Alta Costura',
        subheading: 'Elegância e sofisticação para momentos inesquecíveis',
        buttonText: 'Ver Coleção',
        buttonUrl: '#new-collection',
        backgroundImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
        style: {
          backgroundColor: '#f9f9f9',
          headingColor: '#333',
          textColor: '#666',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Sobre a Coleção',
        columns: 1,
        visible: true,
        heading: 'A Essência da Elegância',
        content: '<p>Nossa nova coleção de alta costura é uma celebração da feminilidade e do requinte. Cada peça foi cuidadosamente desenhada para realçar a beleza natural da mulher, utilizando tecidos nobres e detalhes artesanais que conferem um toque de exclusividade.</p><p>Deixe-se envolver pela magia da alta costura e encontre o vestido perfeito para os seus momentos mais especiais.</p>',
        style: {
          backgroundColor: '#fff',
          headingColor: '#333',
          textColor: '#666',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Destaques da Coleção',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1566667257538-7554e9995497',
            alt: 'Vestido de festa',
            caption: 'Vestido Longo Bordado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1584395489947-86abb494544f',
            alt: 'Vestido de gala',
            caption: 'Vestido de Gala Exclusivo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1547042985-c3991b91452c',
            alt: 'Vestido de cocktail',
            caption: 'Vestido de Cocktail Elegante'
          }
        ],
        style: {
          backgroundColor: '#f9f9f9',
          headingColor: '#333',
          textColor: '#666',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características Exclusivas',
        columns: 2,
        visible: true,
        heading: 'Detalhes que fazem a diferença',
        features: [
          {
            id: uuidv4(),
            title: 'Tecidos Nobres',
            description: 'Utilizamos apenas tecidos da mais alta qualidade, como seda pura, renda francesa e chiffon de seda.',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Bordados Artesanais',
            description: 'Nossos bordados são feitos à mão por artesãos especializados, garantindo um acabamento impecável.',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Modelagem Exclusiva',
            description: 'Cada vestido é modelado para valorizar a silhueta feminina, proporcionando um caimento perfeito.',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Acabamento Impecável',
            description: 'Cuidamos de cada detalhe, desde a escolha dos botões até o forro, para garantir um acabamento impecável.',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#fff',
          headingColor: '#333',
          textColor: '#666',
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
        heading: 'Encontre o Seu Vestido Perfeito',
        content: 'Agende uma visita ao nosso ateliê e descubra a coleção completa de alta costura.',
        buttonText: 'Agendar Visita',
        buttonUrl: '#appointment',
        style: {
          backgroundColor: '#333',
          headingColor: '#fff',
          textColor: '#fff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  }
];

// Apply fixTemplateProps to ensure all templates have the correct properties
export const hauteCoutureTemplates: Template[] = hauteCoutureTemplatesRaw.map(fixTemplateProps);

// For backward compatibility with existing code that might expect a single template
export const hauteCoutureTemplate = hauteCoutureTemplates[0];
