
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Fashion Template Collection
export const fashionTemplates: Template[] = [
  // TEMPLATE 1: Premium Fashion
  {
    id: uuidv4(),
    name: 'Moda Premium',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Elegância que transforma o seu estilo',
        subheading: 'Descubra peças exclusivas que elevam seu visual a um novo patamar',
        buttonText: 'Ver Coleção',
        buttonUrl: '#collection',
        backgroundImage: 'https://images.unsplash.com/photo-1560243563-062bfc001d68',
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
        title: 'Diferenciais da Marca',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossa marca',
        benefits: [
          {
            id: uuidv4(),
            title: 'Design Exclusivo',
            description: 'Peças desenvolvidas por estilistas renomados com atenção aos mínimos detalhes.',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Materiais Premium',
            description: 'Utilizamos apenas tecidos de alta qualidade que garantem conforto e durabilidade.',
            icon: '🧵'
          },
          {
            id: uuidv4(),
            title: 'Produção Ética',
            description: 'Compromisso com práticas sustentáveis e condições justas de trabalho.',
            icon: '♻️'
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
        title: 'Galeria da Coleção',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
            alt: 'Modelo vestindo roupa da coleção',
            caption: 'Blazer Estruturado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
            alt: 'Modelo vestindo roupa da coleção',
            caption: 'Vestido Midi'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9',
            alt: 'Modelo vestindo roupa da coleção',
            caption: 'Conjunto Coordenado'
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
      // Specifications Block
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações do Produto',
        columns: 1,
        visible: true,
        heading: 'Detalhes técnicos',
        specs: [
          {
            id: uuidv4(),
            name: 'Composição',
            value: '100% Algodão Egípcio'
          },
          {
            id: uuidv4(),
            name: 'Peso do Tecido',
            value: '180g/m²'
          },
          {
            id: uuidv4(),
            name: 'Origem',
            value: 'Fabricado no Brasil'
          },
          {
            id: uuidv4(),
            name: 'Instruções de Lavagem',
            value: 'Lavagem à mão ou máquina em ciclo delicado, água fria'
          },
          {
            id: uuidv4(),
            name: 'Certificações',
            value: 'GOTS (Global Organic Textile Standard)'
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
      // CTA Block
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Transforme seu estilo hoje mesmo',
        content: 'Garanta suas peças exclusivas enquanto o estoque está disponível. Frete grátis para compras acima de R$ 500.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#000000',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Sustainable Fashion
  {
    id: uuidv4(),
    name: 'Moda Sustentável',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Moda Consciente e Sustentável',
        subheading: 'Peças que respeitam o planeta e valorizam o seu estilo',
        buttonText: 'Conhecer Coleção',
        buttonUrl: '#eco-collection',
        backgroundImage: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d',
        style: {
          backgroundColor: '#e9f5db',
          headingColor: '#2d6a4f',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Nossa Filosofia',
        columns: 1,
        visible: true,
        heading: 'Moda com Propósito',
        content: '<p>Acreditamos que a moda pode ser bonita, confortável e responsável. Nossa marca nasceu do desejo de criar roupas que não só destacam a beleza de quem as veste, mas também respeitam os recursos naturais e as pessoas envolvidas em sua produção.</p><p>Utilizamos materiais orgânicos, reciclados e biodegradáveis, além de práticas de produção que minimizam o impacto ambiental e garantem condições justas de trabalho para todos os envolvidos.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2d6a4f',
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
        columns: 3,
        visible: true,
        heading: 'Por que escolher moda sustentável',
        benefits: [
          {
            id: uuidv4(),
            title: 'Materiais Ecológicos',
            description: 'Algodão orgânico, linho e tecidos reciclados livres de químicos nocivos',
            icon: '🌱'
          },
          {
            id: uuidv4(),
            title: 'Produção Responsável',
            description: 'Processos que economizam água e reduzem emissões de carbono',
            icon: '💧'
          },
          {
            id: uuidv4(),
            title: 'Comércio Justo',
            description: 'Garantimos condições justas e éticas em toda nossa cadeia produtiva',
            icon: '🤝'
          },
          {
            id: uuidv4(),
            title: 'Embalagens Sustentáveis',
            description: 'Todas as embalagens são biodegradáveis ou recicláveis',
            icon: '♻️'
          },
          {
            id: uuidv4(),
            title: 'Peças Duráveis',
            description: 'Roupas feitas para durar, contrariando a lógica do fast-fashion',
            icon: '⏳'
          },
          {
            id: uuidv4(),
            title: 'Impacto Positivo',
            description: 'Parte das vendas é destinada a projetos ambientais',
            icon: '🌍'
          }
        ],
        style: {
          backgroundColor: '#f0f8ea',
          headingColor: '#2d6a4f',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Coleção Eco',
        columns: 2,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03',
            alt: 'Roupa sustentável',
            caption: 'Vestido de Algodão Orgânico'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
            alt: 'Roupa sustentável',
            caption: 'Blazer de Linho Natural'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2',
            alt: 'Acessório sustentável',
            caption: 'Bolsa de Material Reciclado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1523381140794-a1eef1fff818',
            alt: 'Roupa sustentável',
            caption: 'Calça de Tecido Eco'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2d6a4f',
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
        heading: 'Vista-se com Consciência',
        content: 'Escolher nossas peças é optar por um futuro mais sustentável para a moda. Faça parte desta mudança.',
        buttonText: 'Explorar Coleção Eco',
        buttonUrl: '#eco-collection',
        style: {
          backgroundColor: '#52b788',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Seasonal Collection
  {
    id: uuidv4(),
    name: 'Coleção Sazonal',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Nova Coleção Verão 2023',
        subheading: 'Cores vibrantes e tecidos leves para os dias mais quentes',
        buttonText: 'Ver Lançamentos',
        buttonUrl: '#summer-collection',
        backgroundImage: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b',
        style: {
          backgroundColor: '#f9f2f2',
          headingColor: '#d62828',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Inspiração',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
          alt: 'Inspiração da coleção'
        },
        heading: 'Inspirada nas Praias Tropicais',
        content: 'Nossa coleção de verão traz elementos das mais belas praias tropicais do mundo. Padrões inspirados na natureza, cores vibrantes que remetem ao pôr do sol e tecidos leves e fluidos que capturam a brisa do mar. Cada peça foi pensada para trazer conforto nos dias quentes sem abrir mão do estilo.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#d62828',
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
        heading: 'Características da Coleção',
        features: [
          {
            id: uuidv4(),
            title: 'Tecidos Naturais',
            description: 'Linho, algodão e seda para máximo conforto em dias quentes',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Cores Tropicais',
            description: 'Paleta inspirada em destinos praiano',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Proteção UV',
            description: 'Tecidos com proteção contra raios ultravioleta',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Peças Versáteis',
            description: 'Design pensado para múltiplas combinações',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Estampas Exclusivas',
            description: 'Padrões desenvolvidos por artistas locais',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Modelagem Confortável',
            description: 'Cortes que valorizam todos os tipos de corpos',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#f9f2f2',
          headingColor: '#d62828',
          textColor: '#333333',
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
            src: 'https://images.unsplash.com/photo-1577898561467-020ca3a3d56c',
            alt: 'Vestido verão',
            caption: 'Vestido Longo Brisa'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1',
            alt: 'Camiseta verão',
            caption: 'Camiseta Estampada Coral'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2',
            alt: 'Acessório verão',
            caption: 'Chapéu de Palha Natural'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1475178626620-a4d074967452',
            alt: 'Shorts verão',
            caption: 'Shorts Linho Coqueiro'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1545291730-faff8ca1d4b0',
            alt: 'Bolsa verão',
            caption: 'Bolsa de Palha Havaí'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1517345593424-21466a523b50',
            alt: 'Sandália verão',
            caption: 'Sandália Trançada Areia'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#d62828',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // FAQ Block
      {
        id: uuidv4(),
        type: 'faq',
        title: 'Perguntas Frequentes',
        columns: 1,
        visible: true,
        heading: 'Dúvidas sobre a Coleção',
        questions: [
          {
            id: uuidv4(),
            question: 'Quando a coleção estará disponível nas lojas físicas?',
            answer: 'A coleção de verão chegará a todas as nossas lojas físicas a partir do dia 15 de outubro. Online, já está disponível com pré-venda.'
          },
          {
            id: uuidv4(),
            question: 'As peças têm tamanhos inclusivos?',
            answer: 'Sim, temos orgulho de oferecer peças do PP ao G4, garantindo que todos possam aproveitar nossa coleção.'
          },
          {
            id: uuidv4(),
            question: 'Os tecidos podem ser lavados em máquina?',
            answer: 'A maioria das peças é adequada para lavagem em máquina no ciclo delicado. Consulte a etiqueta específica de cada peça para instruções detalhadas.'
          }
        ],
        style: {
          backgroundColor: '#f9f2f2',
          headingColor: '#d62828',
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
        heading: 'Garanta as Peças da Nova Estação',
        content: 'Seja o primeiro a usar as tendências do verão com nossa coleção exclusiva.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#summer-buy',
        style: {
          backgroundColor: '#fb8500',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  }
];

// For backward compatibility with existing code that might expect a single template
export const fashionTemplate = fashionTemplates[0];
