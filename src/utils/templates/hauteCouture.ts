
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Haute Couture Template Collection
export const hauteCoutureTemplates: Template[] = [
  // TEMPLATE 1: Luxury Couture
  {
    id: uuidv4(),
    name: 'Alta Costura Luxuosa',
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
    thumbnail: 'https://images.unsplash.com/photo-1537832816519-689ad163238b',
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
  
  // TEMPLATE 3: Bridal Couture
  {
    id: uuidv4(),
    name: 'Alta Costura para Noivas',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1508467876889-77d4fcd7268a',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Vestidos de Noiva Exclusivos',
        subheading: 'Criações únicas para o dia mais especial da sua vida',
        buttonText: 'Conhecer Coleção',
        buttonUrl: '#bridal',
        backgroundImage: 'https://images.unsplash.com/photo-1508467876889-77d4fcd7268a',
        style: {
          backgroundColor: '#f8f5f2',
          headingColor: '#5a3535',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Arte Nupcial',
        columns: 1,
        visible: true,
        heading: 'A Arte da Alta Costura Nupcial',
        content: '<p>Um vestido de noiva feito sob medida é muito mais do que uma peça para um único dia - é um legado que conta uma história de amor, tradição e individualidade. No ateliê de alta costura nupcial, cada vestido é concebido como uma obra de arte única, elaborada com a mais elevada dedicação e habilidade artesanal.</p><p>Desde os primeiros esboços até o último ponto, cada etapa do processo é conduzida com reverência à importância do momento que o vestido celebrará. Trabalhamos com as noivas para criar não apenas um vestido deslumbrante, mas uma experiência transformadora que honra seus sonhos e realça sua beleza natural.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#5a3535',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Benefits Block
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens',
        columns: 3,
        visible: true,
        heading: 'Por que escolher um vestido exclusivo',
        benefits: [
          {
            id: uuidv4(),
            title: 'Personalização Total',
            description: 'Um design criado especialmente para você, considerando sua personalidade e estilo do casamento',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Caimento Perfeito',
            description: 'Ajuste impecável que considera todas as particularidades do seu corpo',
            icon: '👗'
          },
          {
            id: uuidv4(),
            title: 'Materiais Excepcionais',
            description: 'Acesso a tecidos raros, rendas artesanais e bordados exclusivos',
            icon: '🧵'
          },
          {
            id: uuidv4(),
            title: 'Atenção aos Detalhes',
            description: 'Acabamentos meticulosos e soluções criativas que só a alta costura pode oferecer',
            icon: '🔍'
          },
          {
            id: uuidv4(),
            title: 'Experiência Inesquecível',
            description: 'O processo de criação torna-se parte especial das memórias do seu casamento',
            icon: '💍'
          },
          {
            id: uuidv4(),
            title: 'Peça de Herança',
            description: 'Um vestido que pode ser preservado e passado para gerações futuras',
            icon: '🌹'
          }
        ],
        style: {
          backgroundColor: '#f8f5f2',
          headingColor: '#5a3535',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Coleção Nupcial',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1525257831372-1adeb6112a12',
            alt: 'Vestido sereia',
            caption: 'Modelo Afrodite - Renda Francesa'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1550021955-d9a3a9555c5d',
            alt: 'Vestido princesa',
            caption: 'Modelo Aurora - Tule de Seda'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044',
            alt: 'Vestido boho',
            caption: 'Modelo Flora - Algodão Orgânico'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1596455607563-ad6193f76b17',
            alt: 'Detalhes de bordado',
            caption: 'Bordado Manual com Cristais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4',
            alt: 'Véu artesanal',
            caption: 'Véu Catedral com Apliques'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1580214080088-66c0abe2cc39',
            alt: 'Acessórios nupciais',
            caption: 'Tiara Artesanal com Pérolas'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#5a3535',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Processo Nupcial',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1585241920473-b472eb9ffbae',
          alt: 'Atelier nupcial'
        },
        heading: 'A Jornada de Criação',
        content: 'Criar um vestido de noiva exclusivo é uma jornada especial que normalmente se estende por 6 a 12 meses. O processo começa com uma consulta aprofundada onde exploramos suas inspirações, o estilo do seu casamento e suas preferências pessoais. Avançamos para a seleção de materiais, provas de conceito e múltiplas sessões de ajuste para garantir que cada detalhe seja perfeito para o grande dia.',
        style: {
          backgroundColor: '#f8f5f2',
          headingColor: '#5a3535',
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
        heading: 'Dúvidas sobre Alta Costura Nupcial',
        questions: [
          {
            id: uuidv4(),
            question: 'Com quanto tempo de antecedência devo encomendar meu vestido?',
            answer: 'Recomendamos iniciar o processo entre 10 e 12 meses antes do casamento. Vestidos mais elaborados com bordados extensivos podem exigir até 14 meses para criação.'
          },
          {
            id: uuidv4(),
            question: 'Quantas provas são necessárias?',
            answer: 'Geralmente realizamos de 4 a 6 provas, dependendo da complexidade do vestido. Cada prova é uma oportunidade para refinamentos e ajustes precisos.'
          },
          {
            id: uuidv4(),
            question: 'Vocês criam acessórios coordenados?',
            answer: 'Sim, oferecemos serviço completo de criação de véus, tiaras, joias e outros acessórios que complementam perfeitamente seu vestido exclusivo.'
          },
          {
            id: uuidv4(),
            question: 'É possível incorporar elementos sentimentais ao vestido?',
            answer: 'Absolutamente. Podemos integrar rendas de família, joias herdadas ou outros elementos significativos ao design do seu vestido, criando uma peça ainda mais especial.'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#5a3535',
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
        heading: 'Realize o Sonho do Vestido Perfeito',
        content: 'Agende uma consulta em nosso ateliê para iniciar a jornada de criação do vestido que você sempre sonhou.',
        buttonText: 'Marcar Consulta',
        buttonUrl: '#bridal-appointment',
        style: {
          backgroundColor: '#9e7676',
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
export const hauteCoutureTemplate = hauteCoutureTemplates[0];
