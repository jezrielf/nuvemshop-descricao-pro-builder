
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';
import { gemBlendTemplate } from './products/gem-blend';

export const casaDecoracaoTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Casa e Decoração Premium',
    category: 'casa-decoracao',
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f7f3f0',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Transforme Sua Casa em um Lar',
        subheading: 'Peças exclusivas de decoração que refletem seu estilo e criam ambientes únicos e acolhedores',
        buttonText: 'Descobrir Coleção',
        buttonUrl: '#'
      },
      
      // Galeria em 3 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Ambientes',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Inspire-se com Nossos Ambientes',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
            alt: 'Sala de estar moderna',
            caption: 'Sala de Estar Contemporânea'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
            alt: 'Quarto minimalista',
            caption: 'Quarto Minimalista'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365',
            alt: 'Cozinha gourmet',
            caption: 'Cozinha Gourmet'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens dos Nossos Produtos',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f9f7f4'
        },
        heading: 'Por Que Escolher Nossos Produtos',
        benefits: [
          {
            id: uuidv4(),
            icon: '🏠',
            title: 'Design Exclusivo',
            description: 'Peças únicas criadas por designers renomados que transformam qualquer ambiente'
          },
          {
            id: uuidv4(),
            icon: '🌱',
            title: 'Sustentabilidade',
            description: 'Materiais eco-friendly e processos responsáveis para um futuro mais verde'
          },
          {
            id: uuidv4(),
            icon: '💎',
            title: 'Qualidade Premium',
            description: 'Materiais nobres e acabamento artesanal que garantem durabilidade e beleza'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Artesanato Exclusivo',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Arte e Funcionalidade em Perfeita Harmonia',
        content: 'Cada peça da nossa coleção é cuidadosamente elaborada por artesãos especializados que dominam técnicas tradicionais transmitidas por gerações. Combinamos essa expertise com design contemporâneo para criar objetos únicos que são verdadeiras obras de arte funcionais para o seu lar.',
        image: {
          src: 'https://images.unsplash.com/photo-1586373962517-b2cc2bc7cf97',
          alt: 'Artesão trabalhando em peça decorativa'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Materiais Nobres',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f9f7f4'
        },
        heading: 'Seleção Criteriosa de Materiais',
        content: 'Utilizamos apenas os melhores materiais disponíveis: madeiras certificadas, metais nobres, tecidos de alta qualidade e pedras naturais. Cada material é escolhido não apenas pela sua beleza, mas também pela durabilidade e impacto ambiental responsável.',
        image: {
          src: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89',
          alt: 'Materiais nobres para decoração'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características Especiais',
        visible: true,
        columns: '2',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Diferenciais dos Nossos Produtos',
        features: [
          {
            id: uuidv4(),
            icon: '🔧',
            title: 'Montagem Simples',
            description: 'Sistema inteligente de montagem com instruções claras e ferramentas inclusas'
          },
          {
            id: uuidv4(),
            icon: '🎨',
            title: 'Personalização',
            description: 'Opções de customização para adequar perfeitamente ao seu estilo'
          },
          {
            id: uuidv4(),
            icon: '📐',
            title: 'Medidas Precisas',
            description: 'Dimensões exatas para aproveitamento otimizado do espaço'
          },
          {
            id: uuidv4(),
            icon: '🛡️',
            title: 'Garantia Estendida',
            description: 'Proteção completa com garantia de 5 anos contra defeitos'
          }
        ]
      },
      
      // Especificações
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações Detalhadas',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f9f7f4'
        },
        heading: 'Informações Técnicas',
        specs: [
          { name: 'Material Principal', value: 'Madeira Maciça de Reflorestamento' },
          { name: 'Acabamento', value: 'Verniz Ecológico UV Resistente' },
          { name: 'Ferragens', value: 'Aço Inox Escovado Premium' },
          { name: 'Dimensões', value: '120 x 80 x 40 cm (LxAxP)' },
          { name: 'Peso', value: '25kg' },
          { name: 'Capacidade', value: 'Suporta até 50kg' },
          { name: 'Certificações', value: 'FSC, ISO 14001' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Cuidados e Manutenção',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Mantenha a Beleza Por Muito Tempo',
        content: 'Nossos produtos são desenvolvidos para durar décadas com os cuidados adequados. Fornecemos um guia completo de manutenção e oferecemos produtos específicos para limpeza e conservação. Nossa equipe de suporte está sempre disponível para orientações personalizadas.',
        image: {
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
          alt: 'Cuidados com móveis e decoração'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Ambiente Completo',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f9f7f4',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
        alt: 'Ambiente decorado completo',
        caption: 'Transformação completa com nossa linha de produtos'
      },
      
      // Perguntas Frequentes
      {
        id: uuidv4(),
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Tire Suas Dúvidas',
        questions: [
          {
            question: 'Vocês fazem entrega e montagem?',
            answer: 'Sim! Oferecemos entrega em todo o país e serviço de montagem profissional. A montagem está inclusa em compras acima de R$ 1.000.'
          },
          {
            question: 'É possível personalizar as peças?',
            answer: 'Absolutamente! Oferecemos diversas opções de personalização incluindo cores, acabamentos e dimensões. Consulte nossa equipe para orçamento personalizado.'
          },
          {
            question: 'Qual o prazo de entrega?',
            answer: 'Peças em estoque: 5 a 10 dias úteis. Peças personalizadas: 15 a 30 dias úteis. Informamos o prazo exato no momento da compra.'
          }
        ]
      },
      
      // Chamada para Ação
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada Final',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#8B4513',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Transforme Sua Casa Hoje Mesmo',
        content: 'Descubra nossa coleção completa e crie o lar dos seus sonhos. Consultoria gratuita e financiamento em até 12x sem juros.',
        buttonText: 'Ver Produtos',
        buttonUrl: '#'
      }
    ]
  },
  
  // Manter o template do Gem Blend
  gemBlendTemplate
];
