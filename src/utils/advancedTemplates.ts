import { Template, BlockType, Block } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create template blocks with proper typing
const createBlock = (type: BlockType, overrides = {}): Block => {
  const baseBlock = {
    id: uuidv4(),
    type,
    title: type.charAt(0).toUpperCase() + type.slice(1),
    columns: 1,
    visible: true,
    style: {},
  };

  // Based on type, ensure the block has all the required properties
  switch (type) {
    case 'hero':
      return {
        ...baseBlock,
        heading: 'Default Heading',
        subheading: 'Default Subheading',
        ...overrides,
      } as Block;
    
    case 'text':
      return {
        ...baseBlock,
        heading: 'Default Heading',
        content: 'Default Content',
        ...overrides,
      } as Block;
    
    case 'features':
      return {
        ...baseBlock,
        heading: 'Default Features',
        features: [],
        ...overrides,
      } as Block;
    
    case 'benefits':
      return {
        ...baseBlock,
        heading: 'Default Benefits',
        benefits: [],
        ...overrides,
      } as Block;
    
    case 'specifications':
      return {
        ...baseBlock,
        heading: 'Default Specifications',
        specs: [],
        ...overrides,
      } as Block;
    
    case 'image':
      return {
        ...baseBlock,
        src: '',
        alt: 'Default Alt',
        ...overrides,
      } as Block;
    
    case 'gallery':
      return {
        ...baseBlock,
        images: [],
        ...overrides,
      } as Block;
    
    case 'imageText':
      return {
        ...baseBlock,
        heading: 'Default Heading',
        content: 'Default Content',
        image: { src: '', alt: 'Default Alt' },
        ...overrides,
      } as Block;
    
    case 'textImage':
      return {
        ...baseBlock,
        heading: 'Default Heading',
        content: 'Default Content',
        image: { src: '', alt: 'Default Alt' },
        ...overrides,
      } as Block;
    
    case 'faq':
      return {
        ...baseBlock,
        heading: 'Default FAQ',
        questions: [],
        ...overrides,
      } as Block;
    
    case 'cta':
      return {
        ...baseBlock,
        heading: 'Default CTA',
        content: 'Default Content',
        buttonText: 'Click me',
        ...overrides,
      } as Block;
    
    default:
      throw new Error(`Unsupported block type: ${type}`);
  }
};

// Advanced Templates
export const advancedTemplates: Template[] = [
  // Template para Suplementos Esportivos
  {
    id: 'adv-supplements-1',
    name: 'Suplemento Proteico Premium',
    category: 'supplements',
    blocks: [
      createBlock('hero', {
        heading: 'Proteína Whey Premium',
        subheading: 'Maximize seus resultados com a proteína de mais alta qualidade do mercado',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }),
      createBlock('benefits', {
        heading: 'Benefícios Exclusivos',
        columns: 3,
        benefits: [
          { id: uuidv4(), title: 'Absorção Rápida', description: 'Fórmula de rápida absorção para resultados imediatos' },
          { id: uuidv4(), title: 'Alto Valor Biológico', description: '25g de proteína por dose com todos os aminoácidos essenciais' },
          { id: uuidv4(), title: 'Zero Açúcar', description: 'Desenvolvido para atender às dietas mais rigorosas, sem açúcar adicionado' }
        ]
      }),
      createBlock('specifications', {
        heading: 'Informação Nutricional',
        specs: [
          { id: uuidv4(), name: 'Proteína por dose', value: '25g' },
          { id: uuidv4(), name: 'Carboidratos', value: '3g' },
          { id: uuidv4(), name: 'Gorduras', value: '1.5g' },
          { id: uuidv4(), name: 'Açúcares', value: '0g' },
          { id: uuidv4(), name: 'Aminoácidos BCAA', value: '5.5g' },
          { id: uuidv4(), name: 'Glutamina', value: '4g' }
        ]
      }),
      createBlock('features', {
        heading: 'Por Que Escolher Nossa Proteína',
        columns: 2,
        features: [
          { id: uuidv4(), title: 'Certificação de Qualidade', description: 'Produto testado e certificado, livre de impurezas' },
          { id: uuidv4(), title: 'Matéria-Prima Premium', description: 'Produzido com proteínas importadas de alta qualidade' },
          { id: uuidv4(), title: 'Sabores Exclusivos', description: 'Disponível em diversos sabores desenvolvidos por especialistas' },
          { id: uuidv4(), title: 'Produção Nacional', description: 'Fabricado no Brasil com os mais altos padrões de qualidade' }
        ]
      }),
      createBlock('imageText', {
        heading: 'Tecnologia de Filtração Avançada',
        content: 'Nossa proteína passa por um processo exclusivo de microfiltração que preserva as frações proteicas e potencializa os resultados. Este processo garante a mais alta pureza e biodisponibilidade do mercado.',
        image: {
          src: 'https://images.unsplash.com/photo-1614630982169-e89cf9eb5d10',
          alt: 'Processo de filtração avançada'
        }
      }),
      createBlock('faq', {
        heading: 'Perguntas Frequentes',
        questions: [
          { id: uuidv4(), question: 'Qual o melhor horário para consumir?', answer: 'O melhor momento é logo após o treino, quando seu corpo está mais receptivo aos nutrientes.' },
          { id: uuidv4(), question: 'Posso consumir mesmo em dias sem treino?', answer: 'Sim, a proteína pode ser consumida diariamente para complementar sua ingestão proteica.' },
          { id: uuidv4(), question: 'Este produto contém lactose?', answer: 'Nossa proteína possui baixíssimo teor de lactose, mas não é completamente livre.' },
          { id: uuidv4(), question: 'Quantas doses devo tomar por dia?', answer: 'Recomenda-se 1-2 doses diárias, dependendo da sua necessidade proteica total.' }
        ]
      }),
      createBlock('cta', {
        heading: 'Pronto para Elevar seus Resultados?',
        content: 'Adquira agora a Proteína Whey Premium e experimente a diferença de um suplemento de alta qualidade.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      })
    ]
  },
  
  // Template para Calçados Esportivos
  {
    id: 'adv-shoes-1',
    name: 'Tênis de Corrida Profissional',
    category: 'shoes',
    blocks: [
      createBlock('hero', {
        heading: 'Tênis de Corrida Pro-Runner',
        subheading: 'Desenvolvido para quem busca desempenho máximo em cada passada',
        buttonText: 'Ver Detalhes',
        buttonUrl: '#'
      }),
      createBlock('gallery', {
        columns: 4,
        images: [
          { id: uuidv4(), src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5', alt: 'Vista lateral', caption: 'Design lateral' },
          { id: uuidv4(), src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', alt: 'Vista superior', caption: 'Vista superior' },
          { id: uuidv4(), src: 'https://images.unsplash.com/photo-1584735174965-48c48d7edfde', alt: 'Vista frontal', caption: 'Vista frontal' },
          { id: uuidv4(), src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa', alt: 'Solado', caption: 'Tecnologia do solado' },
        ]
      }),
      createBlock('features', {
        heading: 'Tecnologias Exclusivas',
        columns: 3,
        features: [
          { id: uuidv4(), title: 'Air Cushion 3.0', description: 'Sistema de amortecimento que retorna energia a cada passada' },
          { id: uuidv4(), title: 'Grip Control', description: 'Solado desenvolvido para máxima aderência em diferentes superfícies' },
          { id: uuidv4(), title: 'Flyknit Ultra', description: 'Tecido respirável que se adapta ao formato do seu pé' },
          { id: uuidv4(), title: 'Suporte Dinâmico', description: 'Estrutura que oferece estabilidade sem comprometer a flexibilidade' },
          { id: uuidv4(), title: 'Drop Preciso', description: 'Drop de 8mm ideal para corridas de longa distância' },
          { id: uuidv4(), title: 'Peso Reduzido', description: 'Apenas 280g (tamanho 41) para máxima performance' }
        ]
      }),
      createBlock('textImage', {
        heading: 'Conforto Sem Comparação',
        content: 'O Pro-Runner foi desenvolvido após anos de pesquisa com atletas profissionais. Seu sistema de amortecimento exclusivo distribui o impacto de forma uniforme, protegendo suas articulações mesmo nas corridas mais longas. A palmilha anatômica se molda ao seu pé, garantindo conforto personalizado.',
        image: {
          src: 'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda',
          alt: 'Tecnologia de amortecimento'
        }
      }),
      createBlock('benefits', {
        heading: 'Ideal Para Todos os Corredores',
        columns: 2,
        benefits: [
          { id: uuidv4(), title: 'Corredores de Longa Distância', description: 'Amortecimento superior para maratonas e ultramaratonas' },
          { id: uuidv4(), title: 'Treinos de Velocidade', description: 'Resposta rápida e retorno de energia para treinos intensos' },
          { id: uuidv4(), title: 'Uso Diário', description: 'Conforto duradouro para quem passa o dia todo em movimento' },
          { id: uuidv4(), title: 'Recuperação', description: 'Suporte adicional para corredores em fase de recuperação' }
        ]
      }),
      createBlock('specifications', {
        heading: 'Especificações Técnicas',
        specs: [
          { id: uuidv4(), name: 'Peso', value: '280g (tamanho 41)' },
          { id: uuidv4(), name: 'Drop', value: '8mm' },
          { id: uuidv4(), name: 'Material do cabedal', value: 'Flyknit Ultra respirável' },
          { id: uuidv4(), name: 'Material do solado', value: 'Borracha de carbono de alta durabilidade' },
          { id: uuidv4(), name: 'Amortecimento', value: 'Sistema Air Cushion 3.0' },
          { id: uuidv4(), name: 'Palmilha', value: 'Removível, anatômica' },
          { id: uuidv4(), name: 'Indicado para', value: 'Superfícies como asfalto, pista e terra batida' }
        ]
      }),
      createBlock('cta', {
        heading: 'Eleve Sua Performance',
        content: 'Experimente a diferença que um tênis desenvolvido com tecnologia de ponta pode fazer em seus treinos e competições.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      })
    ]
  },
  
  // Template para Eletrônicos (Smartphone)
  {
    id: 'adv-electronics-1',
    name: 'Smartphone Premium',
    category: 'electronics',
    blocks: [
      createBlock('hero', {
        heading: 'UltraPhone Pro X',
        subheading: 'Redefina o conceito de smartphone com a mais avançada tecnologia disponível',
        buttonText: 'Explorar Recursos',
        buttonUrl: '#'
      }),
      createBlock('gallery', {
        columns: 3,
        images: [
          { id: uuidv4(), src: 'https://images.unsplash.com/photo-1560617544-b4f287789e24', alt: 'Vista frontal', caption: 'Tela Infinita' },
          { id: uuidv4(), src: 'https://images.unsplash.com/photo-1552056739-d4c85c9cd997', alt: 'Câmera', caption: 'Sistema de câmeras profissionais' },
          { id: uuidv4(), src: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f', alt: 'Interface', caption: 'Interface fluida e intuitiva' }
        ]
      }),
      createBlock('specifications', {
        heading: 'Ficha Técnica',
        specs: [
          { id: uuidv4(), name: 'Processador', value: 'OctaCore 3.2GHz' },
          { id: uuidv4(), name: 'Memória RAM', value: '12GB LPDDR5' },
          { id: uuidv4(), name: 'Armazenamento', value: '256GB/512GB UFS 3.1' },
          { id: uuidv4(), name: 'Tela', value: 'AMOLED 6.7" 120Hz HDR10+' },
          { id: uuidv4(), name: 'Resolução', value: '3200 x 1440 pixels' },
          { id: uuidv4(), name: 'Câmera principal', value: 'Quádrupla 108MP + 48MP + 12MP + 5MP' },
          { id: uuidv4(), name: 'Câmera frontal', value: '32MP com autofoco' },
          { id: uuidv4(), name: 'Bateria', value: '5000mAh com carregamento rápido 65W' },
          { id: uuidv4(), name: 'Sistema', value: 'UltraOS 13 baseado em Android 13' },
          { id: uuidv4(), name: 'Resistência', value: 'IP68 (água e poeira)' },
          { id: uuidv4(), name: 'Dimensões', value: '158.3 x 73.4 x 8.1 mm' },
          { id: uuidv4(), name: 'Peso', value: '189g' }
        ]
      }),
      createBlock('imageText', {
        heading: 'Fotografia Profissional em suas Mãos',
        content: 'O sistema de câmeras do UltraPhone Pro X foi desenvolvido em parceria com especialistas em fotografia. A câmera principal de 108MP captura detalhes impressionantes mesmo em condições de pouca luz. Com estabilização óptica avançada e inteligência artificial, suas fotos e vídeos terão qualidade profissional em qualquer situação.',
        image: {
          src: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0',
          alt: 'Sistema de câmeras'
        }
      }),
      createBlock('features', {
        heading: 'Recursos Exclusivos',
        columns: 2,
        features: [
          { id: uuidv4(), title: 'UltraDisplay', description: 'Tela AMOLED de 120Hz com HDR10+ e brilho de 1500 nits' },
          { id: uuidv4(), title: 'UltraCharge', description: 'Carregamento completo em apenas 35 minutos' },
          { id: uuidv4(), title: 'UltraSound', description: 'Sistema de áudio estéreo com Dolby Atmos' },
          { id: uuidv4(), title: 'UltraSecure', description: 'Leitor de digital na tela e reconhecimento facial avançado' }
        ]
      }),
      createBlock('textImage', {
        heading: 'Desempenho Sem Limites',
        content: 'O processador OctaCore de última geração combinado com 12GB de RAM garante que você possa executar múltiplas tarefas simultaneamente sem qualquer lentidão. Jogos, edição de vídeo, multitarefa pesada - o UltraPhone Pro X lida com tudo isso e muito mais com extrema fluidez.',
        image: {
          src: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb',
          alt: 'Desempenho gráfico'
        }
      }),
      createBlock('faq', {
        heading: 'Perguntas Frequentes',
        questions: [
          { id: uuidv4(), question: 'O UltraPhone Pro X suporta 5G?', answer: 'Sim, o aparelho é compatível com redes 5G em todas as bandas disponíveis no Brasil.' },
          { id: uuidv4(), question: 'Qual a duração média da bateria?', answer: 'Com uso moderado, a bateria de 5000mAh pode durar facilmente mais de um dia inteiro.' },
          { id: uuidv4(), question: 'O aparelho vem com carregador?', answer: 'Sim, o UltraPhone Pro X inclui o carregador UltraCharge de 65W na caixa.' },
          { id: uuidv4(), question: 'Quantos anos de atualizações são garantidos?', answer: 'Garantimos 4 anos de atualizações de sistema e 5 anos de patches de segurança.' }
        ]
      }),
      createBlock('cta', {
        heading: 'Transforme sua Experiência Mobile',
        content: 'Não se contente com menos do que a excelência. O UltraPhone Pro X redefine o conceito de smartphone premium.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      })
    ]
  }
];
