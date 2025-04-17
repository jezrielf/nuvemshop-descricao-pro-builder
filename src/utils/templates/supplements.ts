
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Supplements Template Collection
export const supplementsTemplates: Template[] = [
  // TEMPLATE 1: Modern Supplements Landing Page
  {
    id: uuidv4(),
    name: 'Suplementos Premium',
    category: 'supplements',
    thumbnail: 'https://images.unsplash.com/photo-1581009137042-c552e485697a',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Potencialize seus Resultados',
        subheading: 'Suplementos de alta qualidade para o máximo desempenho',
        buttonText: 'Conhecer Produtos',
        buttonUrl: '#products',
        backgroundImage: 'https://images.unsplash.com/photo-1581009137042-c552e485697a',
        style: {
          backgroundColor: '#0d0d0d',
          headingColor: '#ffffff',
          textColor: '#f0f0f0',
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
        heading: 'Por que escolher nossos suplementos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Ingredientes Premium',
            description: 'Matérias-primas selecionadas e testadas para máxima pureza',
            icon: '⭐'
          },
          {
            id: uuidv4(),
            title: 'Fórmulas Cientificamente Testadas',
            description: 'Desenvolvidas com base em estudos científicos avançados',
            icon: '🔬'
          },
          {
            id: uuidv4(),
            title: 'Produção Certificada',
            description: 'Fabricados em laboratórios com certificação GMP',
            icon: '✅'
          },
          {
            id: uuidv4(),
            title: 'Resultados Comprovados',
            description: 'Eficácia demonstrada em testes clínicos',
            icon: '📈'
          },
          {
            id: uuidv4(),
            title: 'Sem Aditivos Artificiais',
            description: 'Formulações livres de corantes e conservantes nocivos',
            icon: '🌿'
          },
          {
            id: uuidv4(),
            title: 'Absorção Superior',
            description: 'Tecnologia que garante melhor biodisponibilidade',
            icon: '💪'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#111111',
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
            src: 'https://images.unsplash.com/photo-1579310962131-aa21f240d986',
            alt: 'Proteína Whey Premium',
            caption: 'Whey Protein Isolado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1579722820258-c3c889d39160',
            alt: 'BCAA',
            caption: 'BCAA 4:1:1 Premium'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1606889464198-fcb18894cf50',
            alt: 'Creatina',
            caption: 'Creatina Monohidratada'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1532635248-cdd3d399f56c',
            alt: 'Pré-Treino',
            caption: 'Ultimate Pre-Workout'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1578668577946-2f7065013d5e',
            alt: 'Multivitamínico',
            caption: 'Multivitamínico Performance'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1554384557-23889e050ffd',
            alt: 'Termogênico',
            caption: 'Termogênico Advanced'
          }
        ],
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#111111',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Video Block
      {
        id: uuidv4(),
        type: 'video',
        title: 'Vídeo Demonstrativo',
        columns: 1,
        visible: true,
        videoUrl: 'https://www.youtube.com/watch?v=_Gp1RbR2EEA',
        autoplay: false,
        heading: 'Conheça Nosso Processo de Produção',
        caption: 'Qualidade em cada etapa',
        description: 'Veja como nossos suplementos são produzidos, desde a seleção de ingredientes até o controle de qualidade final.',
        style: {
          backgroundColor: '#000000',
          headingColor: '#ffffff',
          textColor: '#f0f0f0',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Tecnologia Avançada',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1581089778245-3ce67677f718',
          alt: 'Laboratório de pesquisa'
        },
        heading: 'Tecnologia de Microencapsulação',
        content: 'Nossos suplementos utilizam a mais avançada tecnologia de microencapsulação, que protege os nutrientes durante o processo digestivo, garantindo sua liberação no momento e local adequados para máxima absorção. Isso significa que você obtém mais benefícios de cada dose, otimizando seus resultados.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#111111',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Diferenciais',
        columns: 2,
        visible: true,
        heading: 'O que nos diferencia',
        features: [
          {
            id: uuidv4(),
            title: 'Matéria-Prima Importada',
            description: 'Ingredientes dos mais respeitados fornecedores internacionais',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Testes de Pureza',
            description: 'Cada lote é testado para garantir ausência de contaminantes',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Equipe de Pesquisa',
            description: 'Fórmulas desenvolvidas por cientistas e nutricionistas esportivos',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Sabores Naturais',
            description: 'Aromatizantes naturais para um sabor excepcional',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#111111',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Nossa Missão',
        columns: 1,
        visible: true,
        heading: 'Compromisso com sua Performance',
        content: '<p>Nossa missão é fornecer suplementos nutricionais da mais alta qualidade, desenvolvidos com base na ciência mais avançada, para ajudar atletas e entusiastas do fitness a alcançarem seu potencial máximo.</p><p>Acreditamos que a suplementação adequada, combinada com treinamento e alimentação balanceada, é fundamental para quem busca resultados superiores, seja na performance esportiva, na composição corporal ou na saúde geral.</p><p>Por isso, investimos continuamente em pesquisa e desenvolvimento, buscando sempre as melhores matérias-primas e tecnologias de produção para oferecer produtos que realmente fazem a diferença.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#111111',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // TextImage Block
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Consultoria Nutricional',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
          alt: 'Nutricionista esportivo'
        },
        heading: 'Suporte Especializado',
        content: 'Todos os nossos clientes têm acesso a consultoria nutricional especializada para maximizar os resultados com nossos produtos. Nossa equipe de nutricionistas esportivos está pronta para criar um plano personalizado que integre suplementação, alimentação e treinamento de acordo com seus objetivos específicos.',
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#111111',
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
          { id: uuidv4(), name: 'Certificações', value: 'GMP, ISO 9001, ANVISA' },
          { id: uuidv4(), name: 'Testes', value: 'Pureza, contaminantes, valor biológico' },
          { id: uuidv4(), name: 'Produção', value: 'Laboratório próprio com tecnologia de ponta' },
          { id: uuidv4(), name: 'Validade', value: '24 meses após a data de fabricação' },
          { id: uuidv4(), name: 'Armazenamento', value: 'Local seco e arejado, temperatura ambiente' }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#111111',
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
            question: 'Qual o melhor momento para consumir proteína?',
            answer: 'O momento ideal varia de acordo com seus objetivos. Para recuperação muscular, o período pós-treino (30-60 minutos) é eficaz. Para ganho de massa, distribuir o consumo ao longo do dia é recomendado. Antes de dormir, a caseína pode ser benéfica para liberação lenta de aminoácidos durante a noite.'
          },
          {
            id: uuidv4(),
            question: 'A creatina causa retenção de líquido?',
            answer: 'Sim, a creatina pode causar retenção hídrica intracelular (dentro da célula muscular), o que é benéfico para performance e síntese proteica. Esta retenção não é subcutânea (sob a pele) e contribui para o volume e performance muscular.'
          },
          {
            id: uuidv4(),
            question: 'Os suplementos são testados para substâncias proibidas?',
            answer: 'Sim, todos os nossos produtos passam por rigorosos testes para garantir que estão livres de substâncias proibidas no esporte. Trabalhamos com laboratórios certificados e seguimos padrões internacionais de controle de qualidade.'
          },
          {
            id: uuidv4(),
            question: 'Como sei qual suplemento é adequado para meus objetivos?',
            answer: 'Recomendamos consultar nossa equipe de nutricionistas para uma recomendação personalizada. Em geral, para ganho de massa muscular, proteínas e creatina são fundamentais. Para performance, pré-treinos e BCAAs podem ser benéficos. Para emagrecimento, termogênicos e proteínas podem auxiliar.'
          }
        ],
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#111111',
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
        heading: 'Leve seus resultados para o próximo nível',
        content: 'Experimente a diferença que suplementos de alta qualidade podem fazer em sua performance e resultados.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#buy',
        style: {
          backgroundColor: '#111111',
          headingColor: '#ffffff',
          textColor: '#f0f0f0',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Natural Supplements Landing Page
  {
    id: uuidv4(),
    name: 'Suplementos Naturais',
    category: 'supplements',
    thumbnail: 'https://images.unsplash.com/photo-1610725663727-08695a1ac3ff',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Nutrição Natural para Bem-Estar',
        subheading: 'Suplementos orgânicos para uma vida mais saudável',
        buttonText: 'Descobrir',
        buttonUrl: '#discover',
        backgroundImage: 'https://images.unsplash.com/photo-1610725663727-08695a1ac3ff',
        style: {
          backgroundColor: '#e8f3e8',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
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
        heading: 'O Poder da Natureza',
        content: '<p>Acreditamos que a natureza oferece todos os nutrientes que nosso corpo precisa para funcionar em seu potencial máximo. Por isso, desenvolvemos suplementos 100% naturais, feitos apenas com ingredientes orgânicos, sustentáveis e da mais alta qualidade.</p><p>Nossa filosofia se baseia em três pilares: pureza, potência e sustentabilidade. Cada produto é cuidadosamente formulado para fornecer nutrientes biodisponíveis que trabalham em sinergia com seu organismo, sem aditivos artificiais ou substâncias questionáveis.</p><p>Junte-se a nós nessa jornada de saúde verdadeiramente natural.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
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
        heading: 'Vantagens dos Suplementos Naturais',
        benefits: [
          {
            id: uuidv4(),
            title: '100% Orgânico',
            description: 'Ingredientes cultivados sem pesticidas ou fertilizantes químicos',
            icon: '🌱'
          },
          {
            id: uuidv4(),
            title: 'Sem Aditivos',
            description: 'Livre de corantes, conservantes e aromas artificiais',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Certificação Orgânica',
            description: 'Produtos certificados por órgãos internacionais',
            icon: '📜'
          },
          {
            id: uuidv4(),
            title: 'Biodisponibilidade Superior',
            description: 'Formulações que maximizam a absorção dos nutrientes',
            icon: '⚡'
          },
          {
            id: uuidv4(),
            title: 'Sustentável',
            description: 'Embalagens eco-friendly e processos sustentáveis',
            icon: '♻️'
          },
          {
            id: uuidv4(),
            title: 'Testado Clinicamente',
            description: 'Eficácia comprovada em estudos científicos',
            icon: '🔬'
          }
        ],
        style: {
          backgroundColor: '#f8f9f8',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Nossos Produtos',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616117469323-1ec784a3a556',
            alt: 'Proteína Vegana',
            caption: 'Proteína Vegetal Orgânica'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1579543767390-cf66a435f1ad',
            alt: 'Multivitamínico Natural',
            caption: 'Multivitamínico de Frutas e Vegetais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1524592485187-145046de8ed4',
            alt: 'Superalimentos',
            caption: 'Blend de Superalimentos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1515364429925-94d2b5ab3bd2',
            alt: 'Ômega 3 de Algas',
            caption: 'Ômega 3 Vegano'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1598258334998-a2c138a6a653',
            alt: 'Probióticos',
            caption: 'Probióticos Orgânicos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1542444592-f2bf83d33930',
            alt: 'Vitamina D Natural',
            caption: 'Vitamina D de Origem Natural'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Video Block
      {
        id: uuidv4(),
        type: 'video',
        title: 'Vídeo Institucional',
        columns: 1,
        visible: true,
        videoUrl: 'https://www.youtube.com/watch?v=zFzR3oj4cAc',
        autoplay: false,
        heading: 'Da Natureza para Você',
        caption: 'Conheça nossa história e valores',
        description: 'Descubra como cultivamos, selecionamos e processamos cuidadosamente cada ingrediente para garantir suplementos verdadeiramente naturais e eficazes.',
        style: {
          backgroundColor: '#f8f9f8',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // TextImage Block
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Ingredientes Orgânicos',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1573246123716-6b1782bfc499',
          alt: 'Fazenda orgânica'
        },
        heading: 'Cultivados com Respeito',
        content: 'Nossos ingredientes são cultivados em fazendas orgânicas certificadas, onde o solo é tratado com respeito e sem uso de pesticidas ou fertilizantes químicos. Trabalhamos diretamente com pequenos produtores que compartilham nossa visão de sustentabilidade e qualidade, garantindo matérias-primas superiores e apoiando comunidades agrícolas.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Image Block
      {
        id: uuidv4(),
        type: 'image',
        title: 'Certificações',
        columns: 1,
        visible: true,
        src: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38',
        alt: 'Certificações orgânicas',
        caption: 'Nossos produtos são certificados pelos principais órgãos reguladores internacionais',
        style: {
          backgroundColor: '#f8f9f8',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Diferenciais',
        columns: 2,
        visible: true,
        heading: 'O que nos torna únicos',
        features: [
          {
            id: uuidv4(),
            title: 'Processamento a Frio',
            description: 'Preserva nutrientes e enzimas naturais',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Transparência Total',
            description: 'Rastreabilidade de todos os ingredientes',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Fórmulas Sinérgicas',
            description: 'Nutrientes que trabalham em conjunto para potencializar resultados',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Especialistas em Fitoterapia',
            description: 'Equipe com mais de 20 anos de experiência em plantas medicinais',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Processamento Cuidadoso',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1563178993-61895b25e504',
          alt: 'Laboratório de produção natural'
        },
        heading: 'Tecnologia que Preserva a Natureza',
        content: 'Utilizamos métodos de processamento de baixa temperatura que preservam as propriedades naturais das plantas e nutrientes. Nossa tecnologia exclusiva mantém intactos compostos sensíveis como enzimas e antioxidantes, garantindo suplementos verdadeiramente vivos e bioativos.',
        style: {
          backgroundColor: '#f8f9f8',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
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
        heading: 'Características dos Produtos',
        specs: [
          { id: uuidv4(), name: 'Origem', value: 'Ingredientes 100% orgânicos e vegetais' },
          { id: uuidv4(), name: 'Certificações', value: 'USDA Organic, Ecocert, IBD, Non-GMO' },
          { id: uuidv4(), name: 'Embalagem', value: 'Vidro âmbar ou materiais biodegradáveis' },
          { id: uuidv4(), name: 'Forma', value: 'Disponível em pó, cápsulas vegetais e líquido' },
          { id: uuidv4(), name: 'Armazenamento', value: 'Preferencialmente em local fresco e protegido da luz' }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
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
            question: 'Quais as vantagens dos suplementos naturais frente aos sintéticos?',
            answer: 'Suplementos naturais contêm nutrientes em suas formas complexas originais, com todos os cofatores e enzimas que auxiliam na absorção e utilização pelo organismo. Isso frequentemente resulta em melhor biodisponibilidade e menos efeitos colaterais comparado a vitaminas isoladas sintéticas.'
          },
          {
            id: uuidv4(),
            question: 'Os produtos são veganos?',
            answer: 'Sim, todos os nossos suplementos são 100% à base de plantas e livres de ingredientes de origem animal. Utilizamos apenas cápsulas vegetais e não realizamos testes em animais.'
          },
          {
            id: uuidv4(),
            question: 'Por que os suplementos orgânicos são mais caros?',
            answer: 'O cultivo orgânico é mais trabalhoso e tem menor rendimento que o convencional. Além disso, as certificações orgânicas têm custos significativos. Preferimos manter o compromisso com a qualidade e sustentabilidade mesmo que isso reflita no preço final do produto.'
          },
          {
            id: uuidv4(),
            question: 'Como sei qual suplemento é ideal para mim?',
            answer: 'Recomendamos uma consulta com nossos especialistas em nutrição para uma avaliação personalizada. Também oferecemos um questionário detalhado em nosso site que pode sugerir produtos adequados às suas necessidades específicas.'
          }
        ],
        style: {
          backgroundColor: '#f8f9f8',
          headingColor: '#2c5e2e',
          textColor: '#3a3a3a',
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
        heading: 'Nutra seu corpo naturalmente',
        content: 'Experimente a diferença dos suplementos verdadeiramente naturais e sinta os benefícios para sua saúde e bem-estar.',
        buttonText: 'Comprar Produtos Orgânicos',
        buttonUrl: '#shop',
        style: {
          backgroundColor: '#2c5e2e',
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
