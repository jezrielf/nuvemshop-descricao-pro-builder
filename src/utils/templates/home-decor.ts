
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Home & Decor Template Collection
export const homeDecorTemplates: Template[] = [
  // TEMPLATE 1: Modern Home & Decor Landing Page
  {
    id: uuidv4(),
    name: 'Casa Moderna',
    category: 'home-decor',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Design que Transforma Ambientes',
        subheading: 'Móveis e decoração para uma casa com personalidade',
        buttonText: 'Ver Coleção',
        buttonUrl: '#collection',
        backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Benefits Block
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Diferenciais',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos produtos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Design Exclusivo',
            description: 'Peças únicas criadas por designers renomados',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Materiais Sustentáveis',
            description: 'Comprometimento com o meio ambiente em toda produção',
            icon: '🌱'
          },
          {
            id: uuidv4(),
            title: 'Garantia Estendida',
            description: '5 anos de garantia em todos os móveis',
            icon: '🛡️'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Image Text Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Sobre Nossa Coleção',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
          alt: 'Sala de estar moderna'
        },
        heading: 'Inspirada na Natureza',
        content: 'Nossa nova coleção traz elementos naturais para dentro de casa, combinando madeiras nobres, pedras e tecidos orgânicos em peças contemporâneas que transformam qualquer ambiente. Cada móvel é pensado para trazer conforto, funcionalidade e beleza para o seu lar.',
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Produtos',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
            alt: 'Poltrona de design',
            caption: 'Poltrona Oslo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72',
            alt: 'Mesa de jantar',
            caption: 'Mesa Milano'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25',
            alt: 'Luminária pendente',
            caption: 'Luminária Gota'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126',
            alt: 'Sofá modular',
            caption: 'Sofá Modular Vienna'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe',
            alt: 'Tapete geométrico',
            caption: 'Tapete Nordic'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
            alt: 'Estante modular',
            caption: 'Estante Cubic'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Video Block
      {
        id: uuidv4(),
        type: 'video',
        title: 'Vídeo Apresentação',
        columns: 1,
        visible: true,
        videoUrl: 'https://www.youtube.com/watch?v=2xcgsr6QGvA',
        autoplay: false,
        heading: 'Conheça nosso processo de criação',
        caption: 'Do design à entrega',
        description: 'Acompanhe o processo completo de criação dos nossos móveis, desde o desenho inicial até a entrega na sua casa.',
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características',
        columns: 2,
        visible: true,
        heading: 'O que nos diferencia',
        features: [
          {
            id: uuidv4(),
            title: 'Produção Artesanal',
            description: 'Cada peça é produzida por artesãos experientes',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Madeira Certificada',
            description: 'Utilizamos apenas madeira de origem sustentável',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Design Personalizado',
            description: 'Possibilidade de adaptar peças às suas necessidades',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Entrega Montada',
            description: 'Seus móveis chegam prontos para uso',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
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
        title: 'Nossa Filosofia',
        columns: 1,
        visible: true,
        heading: 'Design com Propósito',
        content: '<p>Acreditamos que um bom design vai além da estética. Cada peça que criamos é pensada para melhorar a qualidade de vida das pessoas, trazendo beleza, funcionalidade e personalidade para os ambientes.</p><p>Trabalhamos com materiais sustentáveis e processos que respeitam o meio ambiente, garantindo que cada produto não apenas transforme sua casa, mas também contribua para um mundo melhor.</p><p>Nossa equipe de designers está constantemente pesquisando tendências e inovações para oferecer o que há de melhor em decoração de interiores.</p>',
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Image Block
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Serviços Exclusivos',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
          alt: 'Consultoria de design de interiores'
        },
        heading: 'Consultoria de Design',
        content: 'Oferecemos serviços de consultoria de design de interiores para ajudar você a criar o ambiente perfeito. Nossos especialistas podem visitar sua casa, entender suas necessidades e criar um projeto personalizado que combine perfeitamente com seu estilo de vida.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a1a1a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
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
          { id: uuidv4(), name: 'Materiais', value: 'Madeira maciça, couro natural, tecidos sustentáveis' },
          { id: uuidv4(), name: 'Acabamento', value: 'Verniz ecológico à base d\'água' },
          { id: uuidv4(), name: 'Garantia', value: '5 anos contra defeitos de fabricação' },
          { id: uuidv4(), name: 'Entrega', value: 'Em até 30 dias para todo o Brasil' },
          { id: uuidv4(), name: 'Montagem', value: 'Inclusa para todos os produtos' }
        ],
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#1a1a1a',
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
        heading: 'Dúvidas Comuns',
        questions: [
          {
            id: uuidv4(),
            question: 'Como faço para personalizar um móvel?',
            answer: 'Entre em contato com nossa equipe de atendimento informando o produto que deseja personalizar e suas necessidades específicas. Enviaremos um orçamento personalizado em até 48h.'
          },
          {
            id: uuidv4(),
            question: 'Qual o prazo de entrega para móveis personalizados?',
            answer: 'Móveis personalizados têm prazo de entrega de 45 a 60 dias, dependendo da complexidade do projeto e da região de entrega.'
          },
          {
            id: uuidv4(),
            question: 'Como funciona a garantia?',
            answer: 'Todos os nossos produtos têm garantia de 5 anos contra defeitos de fabricação. Caso identifique algum problema, basta entrar em contato com nosso SAC.'
          },
          {
            id: uuidv4(),
            question: 'Vocês fazem projetos completos?',
            answer: 'Sim, oferecemos serviço de design de interiores completo, desde o projeto até a execução. Consulte valores e disponibilidade para sua região.'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a1a1a',
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
        heading: 'Transforme sua casa hoje mesmo',
        content: 'Entre em contato para conhecer todas as nossas opções e começar a transformar seu espaço.',
        buttonText: 'Solicitar Orçamento',
        buttonUrl: '#contato',
        style: {
          backgroundColor: '#1a1a1a',
          headingColor: '#ffffff',
          textColor: '#f0f0f0',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Minimalist Home & Decor Landing Page
  {
    id: uuidv4(),
    name: 'Casa Minimalista',
    category: 'home-decor',
    thumbnail: 'https://images.unsplash.com/photo-1600210492493-0946911123ea',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Menos é Mais',
        subheading: 'Decoração minimalista para ambientes modernos',
        buttonText: 'Explorar',
        buttonUrl: '#explore',
        backgroundImage: 'https://images.unsplash.com/photo-1600210492493-0946911123ea',
        style: {
          backgroundColor: '#f8f8f8',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Filosofia Minimalista',
        columns: 1,
        visible: true,
        heading: 'O Poder da Simplicidade',
        content: '<p>O minimalismo não é apenas um estilo de decoração, mas uma filosofia de vida que valoriza a simplicidade, a funcionalidade e a qualidade em detrimento da quantidade.</p><p>Nossos produtos refletem essa filosofia, com designs limpos, materiais duráveis e acabamentos impecáveis que se destacam pela sua elegância discreta.</p><p>Ao escolher móveis minimalistas, você não apenas está criando um ambiente visualmente harmonioso, mas também adotando um estilo de vida mais consciente e sustentável.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria Minimalista',
        columns: 2,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1526057138394-0508973c0c45',
            alt: 'Sala minimalista',
            caption: 'Sala de estar Essential'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be',
            alt: 'Quarto minimalista',
            caption: 'Quarto Zen'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5',
            alt: 'Cozinha minimalista',
            caption: 'Cozinha Pure'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea',
            alt: 'Home office minimalista',
            caption: 'Escritório Focus'
          }
        ],
        style: {
          backgroundColor: '#f8f8f8',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características',
        columns: 3,
        visible: true,
        heading: 'O que define nossos produtos',
        features: [
          {
            id: uuidv4(),
            title: 'Design Minimalista',
            description: 'Linhas limpas e formas simples para uma estética atemporal',
            icon: '◻️'
          },
          {
            id: uuidv4(),
            title: 'Funcionalidade',
            description: 'Cada peça é projetada para ter um propósito claro',
            icon: '🔍'
          },
          {
            id: uuidv4(),
            title: 'Materiais Nobres',
            description: 'Selecionamos apenas matérias-primas de alta qualidade',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Facilidade de Limpeza',
            description: 'Superfícies lisas e acabamentos que facilitam a manutenção',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Versatilidade',
            description: 'Peças que se adaptam a diferentes ambientes e estilos',
            icon: '↔️'
          },
          {
            id: uuidv4(),
            title: 'Paleta Neutra',
            description: 'Cores que harmonizam entre si e com qualquer decoração',
            icon: '⚪'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Video Block
      {
        id: uuidv4(),
        type: 'video',
        title: 'Vídeo Minimalismo',
        columns: 1,
        visible: true,
        videoUrl: 'https://www.youtube.com/watch?v=XszyCGyiff0',
        autoplay: false,
        heading: 'A Arte do Minimalismo',
        caption: 'Como criar espaços com propósito',
        description: 'Neste vídeo, nossos designers compartilham dicas de como aplicar os princípios do minimalismo na decoração da sua casa.',
        style: {
          backgroundColor: '#f8f8f8',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Image Block
      {
        id: uuidv4(),
        type: 'image',
        title: 'Destaque do Mês',
        columns: 1,
        visible: true,
        src: 'https://images.unsplash.com/photo-1581541771497-36ad3a6683d7',
        alt: 'Mesa de centro minimalista',
        caption: 'Mesa de centro Float - Nossa peça mais vendida',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Benefits Block
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens',
        columns: 2,
        visible: true,
        heading: 'Benefícios do Estilo Minimalista',
        benefits: [
          {
            id: uuidv4(),
            title: 'Sensação de Amplitude',
            description: 'Ambientes mais limpos parecem maiores e mais arejados',
            icon: '🔍'
          },
          {
            id: uuidv4(),
            title: 'Redução do Estresse',
            description: 'Espaços ordenados promovem sensação de calma e bem-estar',
            icon: '🧘'
          },
          {
            id: uuidv4(),
            title: 'Facilidade de Limpeza',
            description: 'Menos objetos significam menos superfícies para acumular poeira',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Atemporalidade',
            description: 'Design que não sai de moda, evitando trocas frequentes',
            icon: '⏱️'
          }
        ],
        style: {
          backgroundColor: '#f8f8f8',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // TextImage Block
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Processo de Design',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1528113205323-9d98deb37019',
          alt: 'Designer trabalhando em projeto minimalista'
        },
        heading: 'Do Conceito à Criação',
        content: 'Nosso processo de design começa com um conceito simples: criar móveis que tenham propósito, beleza e durabilidade. Cada produto passa por um rigoroso desenvolvimento, desde os primeiros esboços até os protótipos finais, testados para garantir conforto e resistência. Utilizamos técnicas tradicionais combinadas com tecnologias modernas para alcançar a perfeição em cada detalhe.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Qualidade dos Materiais',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1532446986237-d08d30accbb0',
          alt: 'Detalhe de madeira em móvel minimalista'
        },
        heading: 'Materiais Sustentáveis de Alta Qualidade',
        content: 'Selecionamos cuidadosamente cada material utilizado em nossos móveis, priorizando fontes sustentáveis e processos ecologicamente responsáveis. Trabalhamos com madeiras certificadas, metais reciclados e tecidos orgânicos que garantem não apenas beleza e durabilidade, mas também respeito ao meio ambiente.',
        style: {
          backgroundColor: '#f8f8f8',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Specifications Block
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Informações Técnicas',
        specs: [
          { id: uuidv4(), name: 'Materiais', value: 'Madeira de carvalho, nogueira e freixo; aço inoxidável; tecidos naturais' },
          { id: uuidv4(), name: 'Acabamentos', value: 'Óleos naturais e vernizes à base d\'água' },
          { id: uuidv4(), name: 'Cores', value: 'Tons neutros: branco, preto, cinza, bege e tons naturais de madeira' },
          { id: uuidv4(), name: 'Garantia', value: '10 anos para estrutura e 3 anos para acabamentos' },
          { id: uuidv4(), name: 'Manutenção', value: 'Instruções detalhadas fornecidas com cada produto' }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
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
        heading: 'Dúvidas Comuns',
        questions: [
          {
            id: uuidv4(),
            question: 'O minimalismo funciona em espaços pequenos?',
            answer: 'Sim, o design minimalista é especialmente eficaz em espaços pequenos, pois cria uma sensação de amplitude e organização através da redução de elementos visuais e da escolha de móveis com linhas limpas e multifuncionais.'
          },
          {
            id: uuidv4(),
            question: 'Como manter uma casa minimalista com crianças?',
            answer: 'É possível adaptar o minimalismo à vida familiar criando soluções de armazenamento inteligentes, estabelecendo rotinas de organização e escolhendo móveis duráveis e de fácil limpeza.'
          },
          {
            id: uuidv4(),
            question: 'Os móveis minimalistas são confortáveis?',
            answer: 'Absolutamente. O minimalismo prioriza a funcionalidade e o conforto, apenas eliminando elementos desnecessários. Nossos sofás e cadeiras são projetados para oferecer excelente ergonomia e conforto duradouro.'
          },
          {
            id: uuidv4(),
            question: 'É possível adicionar cor a um ambiente minimalista?',
            answer: 'Sim, o minimalismo não significa ausência de cor. A chave está em usar cores de forma intencional, seja através de uma paleta monocromática ou com toques de cor em elementos específicos, mantendo a coerência visual.'
          }
        ],
        style: {
          backgroundColor: '#f8f8f8',
          headingColor: '#2c2c2c',
          textColor: '#4a4a4a',
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
        heading: 'Simplifique seu espaço, enriqueça sua vida',
        content: 'Descubra como nossos móveis minimalistas podem transformar sua casa em um refúgio de tranquilidade e elegância.',
        buttonText: 'Ver Catálogo Completo',
        buttonUrl: '#catalogo',
        style: {
          backgroundColor: '#2c2c2c',
          headingColor: '#ffffff',
          textColor: '#f0f0f0',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  }
];

// Export for convenience
export const homeDecorTemplate = homeDecorTemplates[0];
