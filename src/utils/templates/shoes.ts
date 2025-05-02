import { Template } from '@/types/editor';

export const shoesTemplates: Template[] = [
  {
    id: 'shoes-product-1',
    name: 'Sapatos Modernos',
    category: 'shoes',
    thumbnail: '/templates/shoes/shoes-template-1-thumb.jpg',
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
        heading: 'Descubra o Conforto e Estilo dos Nossos Sapatos',
        subheading: 'Encontre o par perfeito para cada ocasião.',
        buttonText: 'Ver Coleção',
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
        content: '<p>Nossos sapatos são projetados para oferecer o máximo de conforto e estilo. Feitos com materiais de alta qualidade, eles são perfeitos para o uso diário e ocasiões especiais. Descubra a combinação ideal de design e funcionalidade.</p>'
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
        src: '/templates/shoes/shoes-template-1-main.jpg',
        alt: 'Sapatos modernos',
        caption: 'Conforto e estilo em cada passo.'
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Características',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Características Principais',
        features: [
          {
            id: 'feature-1',
            title: 'Conforto Superior',
            description: 'Palmilhas macias e design ergonômico para o máximo de conforto.',
            icon: '✓'
          },
          {
            id: 'feature-2',
            title: 'Materiais Duráveis',
            description: 'Feitos com couro genuíno e materiais resistentes para maior durabilidade.',
            icon: '✓'
          },
          {
            id: 'feature-3',
            title: 'Design Moderno',
            description: 'Estilo contemporâneo que combina com qualquer look.',
            icon: '✓'
          }
        ]
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Por que Escolher Nossos Sapatos?',
        benefits: [
          {
            id: 'benefit-1',
            title: 'Versatilidade',
            description: 'Perfeitos para o trabalho, lazer e eventos sociais.',
            icon: '✓'
          },
          {
            id: 'benefit-2',
            title: 'Qualidade Garantida',
            description: 'Produzidos com rigorosos padrões de qualidade.',
            icon: '✓'
          },
          {
            id: 'benefit-3',
            title: 'Suporte ao Cliente',
            description: 'Atendimento personalizado para todas as suas necessidades.',
            icon: '✓'
          }
        ]
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Imagens',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#f8f9fa'
        },
        images: [
          {
            id: 'gallery-image-1',
            src: '/templates/shoes/shoes-template-1-gallery-1.jpg',
            alt: 'Sapato em detalhe',
            caption: 'Detalhes que fazem a diferença.'
          },
          {
            id: 'gallery-image-2',
            src: '/templates/shoes/shoes-template-1-gallery-2.jpg',
            alt: 'Sapato sendo usado',
            caption: 'Estilo e conforto em movimento.'
          }
        ]
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada para Ação',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Não Perca Tempo!',
        content: 'Adquira já o seu par de sapatos e experimente o conforto e estilo que você merece.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'shoes-product-2',
    name: 'Tênis Esportivo',
    category: 'shoes',
    thumbnail: '/templates/shoes/shoes-template-2-thumb.jpg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#e9ecef',
          padding: '40px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Performance e Estilo com Nossos Tênis Esportivos',
        subheading: 'Ideal para treinos e atividades do dia a dia.',
        buttonText: 'Descobrir Agora',
        buttonUrl: '#'
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
        src: '/templates/shoes/shoes-template-2-main.jpg',
        alt: 'Tênis esportivo',
        caption: 'Seu melhor aliado nos treinos.'
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
        content: '<p>Nossos tênis esportivos combinam tecnologia e design para oferecer o melhor desempenho. Com amortecimento responsivo e materiais respiráveis, eles são perfeitos para corrida, academia e outras atividades físicas.</p>'
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Especificações Técnicas',
        specs: [
          {
            id: 'spec-1',
            name: 'Material',
            value: 'Mesh respirável'
          },
          {
            id: 'spec-2',
            name: 'Solado',
            value: 'Borracha antiderrapante'
          },
          {
            id: 'spec-3',
            name: 'Amortecimento',
            value: 'Tecnologia de absorção de impacto'
          }
        ]
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Por que Escolher Nossos Tênis Esportivos?',
        benefits: [
          {
            id: 'benefit-1',
            title: 'Desempenho Aprimorado',
            description: 'Tecnologia que impulsiona seus treinos.',
            icon: '✓'
          },
          {
            id: 'benefit-2',
            title: 'Conforto Duradouro',
            description: 'Materiais que garantem conforto durante todo o dia.',
            icon: '✓'
          },
          {
            id: 'benefit-3',
            title: 'Estilo Moderno',
            description: 'Design que combina com seu estilo de vida ativo.',
            icon: '✓'
          }
        ]
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada para Ação',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#e9ecef',
          textAlign: 'center'
        },
        heading: 'Eleve Seu Desempenho!',
        content: 'Adquira já seus tênis esportivos e sinta a diferença em cada movimento.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'shoes-product-3',
    name: 'Sandálias de Verão',
    category: 'shoes',
    thumbnail: '/templates/shoes/shoes-template-3-thumb.jpg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#fffaf0',
          padding: '40px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Leveza e Frescor com Nossas Sandálias de Verão',
        subheading: 'Perfeitas para os dias quentes e ensolarados.',
        buttonText: 'Ver Coleção',
        buttonUrl: '#'
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
        src: '/templates/shoes/shoes-template-3-main.jpg',
        alt: 'Sandálias de verão',
        caption: 'Seus pés merecem este conforto.'
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
        content: '<p>Nossas sandálias de verão são a escolha ideal para quem busca conforto e estilo nos dias mais quentes. Com designs modernos e materiais leves, elas proporcionam frescor e bem-estar em cada passo.</p>'
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Características',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fffaf0'
        },
        heading: 'Características Principais',
        features: [
          {
            id: 'feature-1',
            title: 'Leveza Incrível',
            description: 'Materiais que proporcionam a sensação de estar descalço.',
            icon: '✓'
          },
          {
            id: 'feature-2',
            title: 'Design Moderno',
            description: 'Estilo que combina com qualquer look de verão.',
            icon: '✓'
          },
          {
            id: 'feature-3',
            title: 'Conforto Duradouro',
            description: 'Materiais que garantem conforto durante todo o dia.',
            icon: '✓'
          }
        ]
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Imagens',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff'
        },
        images: [
          {
            id: 'gallery-image-1',
            src: '/templates/shoes/shoes-template-3-gallery-1.jpg',
            alt: 'Sandália em detalhe',
            caption: 'Detalhes que fazem a diferença.'
          },
          {
            id: 'gallery-image-2',
            src: '/templates/shoes/shoes-template-3-gallery-2.jpg',
            alt: 'Sandália sendo usada',
            caption: 'Estilo e conforto em cada passo.'
          }
        ]
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada para Ação',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fffaf0',
          textAlign: 'center'
        },
        heading: 'Aproveite o Verão com Estilo!',
        content: 'Adquira já suas sandálias de verão e sinta a leveza e o frescor que você merece.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'shoes-product-4',
    name: 'Botas de Inverno',
    category: 'shoes',
    thumbnail: '/templates/shoes/shoes-template-4-thumb.jpg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f5f5f5',
          padding: '40px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Aqueça Seus Pés com Nossas Botas de Inverno',
        subheading: 'Conforto e proteção para os dias frios.',
        buttonText: 'Ver Coleção',
        buttonUrl: '#'
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
        src: '/templates/shoes/shoes-template-4-main.jpg',
        alt: 'Botas de inverno',
        caption: 'Proteção e estilo para os dias frios.'
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
        content: '<p>Nossas botas de inverno são projetadas para manter seus pés quentes e protegidos nos dias mais frios. Com materiais impermeáveis e isolamento térmico, elas garantem conforto e segurança em todas as suas atividades.</p>'
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f5f5f5'
        },
        heading: 'Especificações Técnicas',
        specs: [
          {
            id: 'spec-1',
            name: 'Material',
            value: 'Couro impermeável'
          },
          {
            id: 'spec-2',
            name: 'Isolamento',
            value: 'Térmico de alta performance'
          },
          {
            id: 'spec-3',
            name: 'Solado',
            value: 'Antiderrapante'
          }
        ]
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Por que Escolher Nossas Botas de Inverno?',
        benefits: [
          {
            id: 'benefit-1',
            title: 'Proteção Contra o Frio',
            description: 'Mantenha seus pés quentes e protegidos.',
            icon: '✓'
          },
          {
            id: 'benefit-2',
            title: 'Conforto Duradouro',
            description: 'Materiais que garantem conforto durante todo o dia.',
            icon: '✓'
          },
          {
            id: 'benefit-3',
            title: 'Segurança',
            description: 'Solado antiderrapante para evitar quedas.',
            icon: '✓'
          }
        ]
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada para Ação',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f5f5f5',
          textAlign: 'center'
        },
        heading: 'Prepare-se para o Inverno!',
        content: 'Adquira já suas botas de inverno e enfrente o frio com conforto e estilo.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'shoes-product-5',
    name: 'Sapatos Sociais',
    category: 'shoes',
    thumbnail: '/templates/shoes/shoes-template-5-thumb.jpg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f8f8ff',
          padding: '40px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Elegância e Sofisticação com Nossos Sapatos Sociais',
        subheading: 'O toque final para um look impecável.',
        buttonText: 'Ver Coleção',
        buttonUrl: '#'
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
        src: '/templates/shoes/shoes-template-5-main.jpg',
        alt: 'Sapatos sociais',
        caption: 'Elegância em cada detalhe.'
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
        content: '<p>Nossos sapatos sociais são a escolha perfeita para quem busca elegância e sofisticação. Com designs clássicos e materiais de alta qualidade, eles garantem um look impecável em qualquer ocasião formal.</p>'
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Características',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f8ff'
        },
        heading: 'Características Principais',
        features: [
          {
            id: 'feature-1',
            title: 'Design Clássico',
            description: 'Estilo atemporal que nunca sai de moda.',
            icon: '✓'
          },
          {
            id: 'feature-2',
            title: 'Materiais Nobres',
            description: 'Couro genuíno e acabamento impecável.',
            icon: '✓'
          },
          {
            id: 'feature-3',
            title: 'Conforto Duradouro',
            description: 'Materiais que garantem conforto durante todo o dia.',
            icon: '✓'
          }
        ]
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Imagens',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff'
        },
        images: [
          {
            id: 'gallery-image-1',
            src: '/templates/shoes/shoes-template-5-gallery-1.jpg',
            alt: 'Sapato social em detalhe',
            caption: 'Detalhes que fazem a diferença.'
          },
          {
            id: 'gallery-image-2',
            src: '/templates/shoes/shoes-template-5-gallery-2.jpg',
            alt: 'Sapato social sendo usado',
            caption: 'Elegância em cada passo.'
          }
        ]
      },
      {
        id: 'video-1',
        type: 'video',
        title: 'Vídeo do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f8ff'
        },
        videoUrl: 'https://www.youtube.com/watch?v=your_youtube_video_id',
        aspectRatio: '16:9',
        autoplay: false,
        muteAudio: true,
        description: 'Veja como nossos sapatos sociais são feitos e como eles podem transformar seu look.'
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada para Ação',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f8ff',
          textAlign: 'center'
        },
        heading: 'Eleve Seu Estilo!',
        content: 'Adquira já seus sapatos sociais e adicione um toque de elegância ao seu guarda-roupa.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
