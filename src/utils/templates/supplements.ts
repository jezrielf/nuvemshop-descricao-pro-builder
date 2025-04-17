
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

// Supplements Template Collection
export const supplementsTemplates: Template[] = [
  // TEMPLATE 1: Sports Supplements
  {
    id: uuidv4(),
    name: 'Suplementos Esportivos',
    category: 'supplements',
    thumbnail: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Suplementos de Alta Performance',
        subheading: 'Aumente sua energia e alcance seus objetivos',
        buttonText: 'Compre Agora',
        buttonUrl: '/suplementos',
        backgroundImage: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd',
        style: {
          backgroundColor: '#f7f7f7',
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
        columns: 3,
        visible: true,
        heading: 'Nossos Suplementos Oferecem',
        benefits: [
          {
            id: uuidv4(),
            title: 'Aumento de Energia',
            description: 'Sinta-se mais disposto para seus treinos',
            icon: "⚡"
          },
          {
            id: uuidv4(),
            title: 'Recuperação Muscular',
            description: 'Recupere-se mais rápido entre os treinos',
            icon: "💪"
          },
          {
            id: uuidv4(),
            title: 'Ganho de Massa',
            description: 'Construa músculos mais facilmente',
            icon: "🏋️"
          },
          {
            id: uuidv4(),
            title: 'Foco Mental',
            description: 'Melhore sua concentração durante os exercícios',
            icon: "🧠"
          },
          {
            id: uuidv4(),
            title: 'Nutrição Completa',
            description: 'Vitaminas e minerais essenciais para seu corpo',
            icon: "🥗"
          },
          {
            id: uuidv4(),
            title: 'Resultado Garantido',
            description: 'Fórmulas testadas e aprovadas por atletas',
            icon: "✅"
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
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Descrição',
        columns: 1,
        visible: true,
        heading: 'Sobre Nossos Suplementos',
        content: '<p>Nossos suplementos são formulados com ingredientes de alta qualidade para garantir o máximo desempenho e resultados. Cada produto é desenvolvido por especialistas em nutrição esportiva e testado rigorosamente para assegurar sua eficácia e segurança.</p><p>Utilizamos processos de fabricação avançados que preservam a integridade dos nutrientes, garantindo que você receba todos os benefícios em cada dose. Nossos produtos são livres de substâncias proibidas e seguem os mais altos padrões de qualidade da indústria.</p>',
        style: {
          backgroundColor: '#f7f7f7',
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
        title: 'Linha de Produtos',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1579722820903-01d3d6a3e6fc',
            alt: 'Whey Protein',
            caption: 'Whey Protein Premium'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616606103915-dea7be788566',
            alt: 'BCAA',
            caption: 'BCAA 2:1:1'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1611079830811-dad04e2a1bdb',
            alt: 'Creatina',
            caption: 'Creatina Monohidratada'
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
        heading: 'Potencialize seus Resultados',
        content: 'Descubra como nossos suplementos podem ajudar você a atingir o próximo nível em seus treinos.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#comprar',
        style: {
          backgroundColor: '#00a8e8',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Natural Supplements
  {
    id: uuidv4(),
    name: 'Suplementos Naturais',
    category: 'supplements',
    thumbnail: 'https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'A Nutrição que a Natureza Oferece',
        subheading: 'Suplementos 100% naturais para uma vida mais saudável',
        buttonText: 'Descobrir',
        buttonUrl: '#natural',
        backgroundImage: 'https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5',
        style: {
          backgroundColor: '#f0f7ee',
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
        heading: 'O Poder dos Ingredientes Naturais',
        content: '<p>Acreditamos que a natureza oferece tudo o que precisamos para uma saúde plena. Nossos suplementos naturais são cuidadosamente formulados utilizando apenas ingredientes orgânicos de alta qualidade, sem aditivos químicos, conservantes artificiais ou organismos geneticamente modificados.</p><p>Cada produto é desenvolvido para trabalhar em harmonia com seu corpo, proporcionando nutrição de forma suave e eficaz, como a natureza pretendia.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2d6a4f',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Nosso Processo',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1518465444133-2b3d0dceb29a',
          alt: 'Processamento de suplementos naturais'
        },
        heading: 'Da Natureza ao Frasco',
        content: 'Mantemos a integridade dos nutrientes através de um processo de fabricação suave e de baixa temperatura. Colhemos os ingredientes no momento ideal e utilizamos métodos de extração que preservam seus componentes ativos. Isso garante que você receba o máximo de benefícios que a natureza tem a oferecer em cada dose dos nossos suplementos.',
        style: {
          backgroundColor: '#f0f7ee',
          headingColor: '#2d6a4f',
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
        title: 'Benefícios',
        columns: 3,
        visible: true,
        heading: 'Por que escolher suplementos naturais?',
        benefits: [
          {
            id: uuidv4(),
            title: 'Sem Químicos',
            description: 'Livres de corantes, aromatizantes e conservantes artificiais',
            icon: '🌱'
          },
          {
            id: uuidv4(),
            title: 'Biodisponibilidade',
            description: 'Seu corpo absorve melhor os nutrientes de fontes naturais',
            icon: '🔄'
          },
          {
            id: uuidv4(),
            title: 'Sustentabilidade',
            description: 'Práticas de cultivo e produção que respeitam o meio ambiente',
            icon: '🌍'
          },
          {
            id: uuidv4(),
            title: 'Sinergia Natural',
            description: 'Combinações de ingredientes que potencializam os efeitos um do outro',
            icon: '⚡'
          },
          {
            id: uuidv4(),
            title: 'Menos Efeitos Colaterais',
            description: 'Gentil com seu organismo, minimizando reações adversas',
            icon: '😌'
          },
          {
            id: uuidv4(),
            title: 'Nutrição Completa',
            description: 'Complexos naturais com todos os cofatores necessários',
            icon: '🍃'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2d6a4f',
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
        heading: 'Especificações dos Nossos Produtos',
        specs: [
          { id: uuidv4(), name: 'Certificações', value: 'Orgânico, Non-GMO, Vegano' },
          { id: uuidv4(), name: 'Processo', value: 'Extração a frio para preservar nutrientes' },
          { id: uuidv4(), name: 'Embalagem', value: 'Sustentável e reciclável' },
          { id: uuidv4(), name: 'Testes', value: 'Testado para pureza e potência' },
          { id: uuidv4(), name: 'Armazenamento', value: 'Local fresco e seco, protegido da luz' }
        ],
        style: {
          backgroundColor: '#f0f7ee',
          headingColor: '#2d6a4f',
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
            question: 'Os suplementos naturais são tão eficazes quanto os sintéticos?',
            answer: 'Sim, muitos estudos mostram que nutrientes de fontes naturais têm melhor biodisponibilidade e oferecem benefícios adicionais devido aos cofatores naturalmente presentes.'
          },
          {
            id: uuidv4(),
            question: 'Quanto tempo leva para ver resultados?',
            answer: 'Os suplementos naturais funcionam gradualmente com seu corpo. A maioria das pessoas começa a notar benefícios após 2-4 semanas de uso consistente.'
          },
          {
            id: uuidv4(),
            question: 'São adequados para veganos?',
            answer: 'Sim, todos os nossos produtos são 100% veganos e livres de qualquer ingrediente de origem animal.'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2d6a4f',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Weight Management Supplements
  {
    id: uuidv4(),
    name: 'Suplementos para Gerenciamento de Peso',
    category: 'supplements',
    thumbnail: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Alcance Seus Objetivos de Forma Saudável',
        subheading: 'Suplementos avançados para ajudar em sua jornada de gerenciamento de peso',
        buttonText: 'Transforme seu Corpo',
        buttonUrl: '#weight-management',
        backgroundImage: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14',
        style: {
          backgroundColor: '#f0f0f0',
          headingColor: '#1e3a8a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Benefits Block
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Principais Benefícios',
        columns: 2,
        visible: true,
        heading: 'Como Nossos Suplementos Podem Ajudar',
        benefits: [
          {
            id: uuidv4(),
            title: 'Aumento do Metabolismo',
            description: 'Ingredientes termogênicos que ajudam a queimar calorias de forma mais eficiente',
            icon: '🔥'
          },
          {
            id: uuidv4(),
            title: 'Controle do Apetite',
            description: 'Ajuda a reduzir a fome e os desejos por alimentos calóricos',
            icon: '🍽️'
          },
          {
            id: uuidv4(),
            title: 'Níveis de Energia',
            description: 'Melhora a disposição durante o dia, especialmente em períodos de déficit calórico',
            icon: '⚡'
          },
          {
            id: uuidv4(),
            title: 'Preservação Muscular',
            description: 'Ajuda a manter a massa muscular durante a perda de peso',
            icon: '💪'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1e3a8a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Ingredientes Principais',
        columns: 2,
        visible: true,
        heading: 'Componentes Ativos',
        features: [
          {
            id: uuidv4(),
            title: 'Chá Verde',
            description: 'Rico em catequinas que auxiliam na queima de gordura e no metabolismo',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Garcinia Cambogia',
            description: 'Contém HCA que ajuda a bloquear enzimas que produzem gordura',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'L-Carnitina',
            description: 'Transporta ácidos graxos para serem usados como energia',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Cromo',
            description: 'Mineral que ajuda a regular os níveis de açúcar no sangue',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Glucomanano',
            description: 'Fibra natural que aumenta a saciedade',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Cafeína',
            description: 'Estimulante natural que aumenta a energia e o foco',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#1e3a8a',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Abordagem Científica',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1551727974-8af20a3b41b2',
          alt: 'Pesquisa científica de suplementos'
        },
        heading: 'Baseado em Ciência',
        content: 'Nossos suplementos para gerenciamento de peso são desenvolvidos por uma equipe de nutricionistas e cientistas com base nas mais recentes pesquisas. Cada ingrediente é cuidadosamente selecionado e dosado para trabalhar em sinergia, maximizando os resultados de forma segura e saudável.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1e3a8a',
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
        title: 'Linha de Produtos',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85',
            alt: 'Termogênico',
            caption: 'Termogênico Avançado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1607004772621-ec30a8a512e6',
            alt: 'Controlador de apetite',
            caption: 'Controlador de Apetite Natural'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1611079830811-dad04e2a1bdb',
            alt: 'Bloqueador de carboidratos',
            caption: 'Bloqueador de Carboidratos'
          }
        ],
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#1e3a8a',
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
        heading: 'Comece Sua Transformação Hoje',
        content: 'Nossos suplementos são parte de uma abordagem completa para gerenciamento de peso saudável, incluindo dieta equilibrada e exercícios regulares.',
        buttonText: 'Começar Agora',
        buttonUrl: '#start',
        style: {
          backgroundColor: '#1e3a8a',
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
export const supplementsTemplate = supplementsTemplates[0];
