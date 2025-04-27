
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Electronics Template Collection
export const electronicsTemplates: Template[] = [
  // TEMPLATE 1: Modern Electronics
  {
    id: uuidv4(),
    name: 'Eletrônicos Modernos',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1498049794561-7780e7231661',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Descubra a Última Geração de Eletrônicos',
        subheading: 'Inovação e Tecnologia ao Seu Alcance',
        buttonText: 'Ver Produtos',
        buttonUrl: '#produtos',
        backgroundImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        style: {
          backgroundColor: '#f0f0f0',
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
        title: 'Descrição Geral',
        columns: 1,
        visible: true,
        heading: 'Por que Escolher Nossos Eletrônicos?',
        content: 'Nossos produtos são cuidadosamente selecionados para oferecer o melhor em tecnologia, durabilidade e custo-benefício. Encontre desde smartphones de última geração até acessórios inovadores que facilitam o seu dia a dia.',
        style: {
          backgroundColor: '#ffffff',
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
        heading: 'Características Principais',
        benefits: [
          {
            id: uuidv4(),
            title: 'Alta Durabilidade',
            description: 'Construído com materiais de alta qualidade para durar anos',
            icon: '⭐'
          },
          {
            id: uuidv4(),
            title: 'Tecnologia Avançada',
            description: 'Utiliza os componentes mais recentes do mercado',
            icon: '💻'
          },
          {
            id: uuidv4(),
            title: 'Baixo Consumo',
            description: 'Design eficiente que economiza energia',
            icon: '🔋'
          },
          {
            id: uuidv4(),
            title: 'Garantia Estendida',
            description: 'Garantia de 2 anos em todos os produtos',
            icon: '✅'
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
      // Specifications Block
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Especificações Técnicas',
        specs: [
          { id: uuidv4(), name: 'Processador', value: 'Octa-Core 2.8GHz' },
          { id: uuidv4(), name: 'Memória RAM', value: '8GB' },
          { id: uuidv4(), name: 'Armazenamento', value: '256GB SSD' },
          { id: uuidv4(), name: 'Tela', value: 'AMOLED 6.5 polegadas' },
          { id: uuidv4(), name: 'Bateria', value: '5000mAh' },
          { id: uuidv4(), name: 'Sistema Operacional', value: 'Android 12' }
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
        heading: 'Não Perca Tempo!',
        content: 'Aproveite nossas ofertas exclusivas e garanta já o seu eletrônico de última geração.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
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
  
  // TEMPLATE 2: Smart Home
  {
    id: uuidv4(),
    name: 'Casa Inteligente',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1558002038-1055908f0ba7',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Transforme sua Casa com Tecnologia Inteligente',
        subheading: 'Conforto, segurança e economia em um só lugar',
        buttonText: 'Conheça as Soluções',
        buttonUrl: '#smart-home',
        backgroundImage: 'https://images.unsplash.com/photo-1558002038-1055908f0ba7',
        style: {
          backgroundColor: '#2c3e50',
          headingColor: '#ffffff',
          textColor: '#ecf0f1',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Produtos Smart Home',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1534135954997-e58fbd6dbbfc',
            alt: 'Smart Speaker',
            caption: 'Assistente Virtual Inteligente'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1588971450627-eb9de8828f9d',
            alt: 'Smart Lighting',
            caption: 'Iluminação Inteligente'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1610641564207-18114eb5412a',
            alt: 'Smart Security Camera',
            caption: 'Câmera de Segurança Inteligente'
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
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Recursos da Casa Inteligente',
        columns: 2,
        visible: true,
        heading: 'Funcionalidades Principais',
        features: [
          {
            id: uuidv4(),
            title: 'Controle por Voz',
            description: 'Controle todos os dispositivos usando apenas comandos de voz',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Automação Programável',
            description: 'Crie rotinas personalizadas para automatizar tarefas diárias',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Controle Remoto',
            description: 'Acesse e controle sua casa de qualquer lugar através do smartphone',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Economia de Energia',
            description: 'Reduza o consumo de energia com dispositivos inteligentes',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Integração Total',
            description: 'Todos os dispositivos podem ser integrados em um único sistema',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Segurança Avançada',
            description: 'Monitoramento 24/7 e alertas em tempo real',
            icon: '✓'
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
      // Image Text Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Instalação Fácil',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232',
          alt: 'Instalação de dispositivo smart home'
        },
        heading: 'Instalação Simples e Rápida',
        content: 'Nossos dispositivos smart home são projetados para fácil instalação e configuração. A maioria não requer ferramentas especiais ou conhecimentos técnicos avançados. Em poucos minutos, você terá sua casa inteligente funcionando perfeitamente.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#000000',
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
        heading: 'Dúvidas Comuns',
        questions: [
          {
            id: uuidv4(),
            question: 'É necessário ter internet para os dispositivos funcionarem?',
            answer: 'A maioria dos dispositivos requer conexão wi-fi para funcionalidades completas, mas muitos mantêm funções básicas mesmo sem internet.'
          },
          {
            id: uuidv4(),
            question: 'Os dispositivos são compatíveis entre si?',
            answer: 'Sim, trabalhamos com padrões abertos que garantem compatibilidade entre diferentes marcas e modelos.'
          },
          {
            id: uuidv4(),
            question: 'Posso controlar os dispositivos quando estou fora de casa?',
            answer: 'Sim, através do aplicativo móvel você pode controlar todos os dispositivos remotamente de qualquer lugar.'
          }
        ],
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Gaming Electronics
  {
    id: uuidv4(),
    name: 'Eletrônicos para Gamers',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Equipamentos Premium para Gamers',
        subheading: 'Eleve sua experiência de jogo ao próximo nível',
        buttonText: 'Explorar Produtos',
        buttonUrl: '#gaming',
        backgroundImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
        style: {
          backgroundColor: '#1a1a1a',
          headingColor: '#ffffff',
          textColor: '#cccccc',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Benefits Block
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens Gaming',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos produtos Gaming',
        benefits: [
          {
            id: uuidv4(),
            title: 'Desempenho Máximo',
            description: 'Hardware de última geração para rodar os jogos mais exigentes',
            icon: '🎮'
          },
          {
            id: uuidv4(),
            title: 'Iluminação RGB',
            description: 'Personalize a iluminação do seu setup de acordo com seu estilo',
            icon: '🌈'
          },
          {
            id: uuidv4(),
            title: 'Ergonomia Avançada',
            description: 'Design focado no conforto para longas sessões de jogo',
            icon: '👍'
          },
          {
            id: uuidv4(),
            title: 'Conectividade Ultra-rápida',
            description: 'Conexões de alta velocidade para jogos online sem lag',
            icon: '⚡'
          },
          {
            id: uuidv4(),
            title: 'Software Intuitivo',
            description: 'Aplicativos fáceis de usar para configurar e personalizar seu equipamento',
            icon: '💻'
          },
          {
            id: uuidv4(),
            title: 'Garantia Gamer',
            description: 'Garantia estendida especial para gamers intensivos',
            icon: '🛡️'
          }
        ],
        style: {
          backgroundColor: '#232323',
          headingColor: '#ffffff',
          textColor: '#cccccc',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Produtos Gaming',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e',
            alt: 'Teclado Mecânico Gaming',
            caption: 'Teclado Mecânico RGB'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2',
            alt: 'Mouse Gaming',
            caption: 'Mouse Gamer 16000 DPI'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8',
            alt: 'Headset Gaming',
            caption: 'Headset 7.1 Surround'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad',
            alt: 'Cadeira Gamer',
            caption: 'Cadeira Ergonômica Pro Gamer'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96',
            alt: 'Monitor Gaming',
            caption: 'Monitor 240Hz 1ms'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1626242118385-38288c0f8c16',
            alt: 'Controle Gaming',
            caption: 'Controle Pro Wireless'
          }
        ],
        style: {
          backgroundColor: '#151515',
          headingColor: '#ffffff',
          textColor: '#cccccc',
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
        heading: 'Especificações Técnicas',
        specs: [
          { id: uuidv4(), name: 'Processador Recomendado', value: 'Intel Core i7 ou AMD Ryzen 7' },
          { id: uuidv4(), name: 'Placa de Vídeo', value: 'NVIDIA RTX 3070 ou AMD RX 6800' },
          { id: uuidv4(), name: 'Memória RAM', value: '16GB DDR4 3200MHz' },
          { id: uuidv4(), name: 'Armazenamento', value: 'SSD NVMe 1TB' },
          { id: uuidv4(), name: 'Refrigeração', value: 'Watercooler 240mm' },
          { id: uuidv4(), name: 'Fonte', value: '750W 80+ Gold' }
        ],
        style: {
          backgroundColor: '#232323',
          headingColor: '#ffffff',
          textColor: '#cccccc',
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
        heading: 'Prepare-se para Vencer',
        content: 'Equipamentos de alta performance para garantir sua vantagem competitiva nos jogos.',
        buttonText: 'Equipar Agora',
        buttonUrl: '#buy',
        style: {
          backgroundColor: '#7611f7',
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
export const electronicsTemplate = electronicsTemplates[0];
