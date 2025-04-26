import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { fixTemplateProps } from './fixTemplateProps';

// Health Template Collection
const healthTemplatesRaw = [
  // TEMPLATE 1: General Health
  {
    id: uuidv4(),
    name: 'Saúde e Bem-estar',
    category: 'supplements',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532980400857-4a0c0a9ee8e2',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Sua saúde em primeiro lugar',
        subheading: 'Encontre os melhores produtos para cuidar de você',
        buttonText: 'Ver Produtos',
        buttonUrl: '#products',
        backgroundImage: 'https://images.unsplash.com/photo-1532980400857-4a0c0a9ee8e2',
        style: {
          backgroundColor: '#f0f8ff',
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
        title: 'Nossos Diferenciais',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossos produtos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Qualidade Garantida',
            description: 'Produtos rigorosamente testados para garantir a máxima eficácia e segurança.',
            icon: '✅'
          },
          {
            id: uuidv4(),
            title: 'Ingredientes Naturais',
            description: 'Fórmulas exclusivas com ingredientes naturais e orgânicos, sem aditivos químicos.',
            icon: '🌿'
          },
          {
            id: uuidv4(),
            title: 'Entrega Rápida',
            description: 'Receba seus produtos em casa com agilidade e segurança, em todo o Brasil.',
            icon: '🚚'
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
      // Image Block
      {
        id: uuidv4(),
        type: 'image',
        title: 'Imagem dos Produtos',
        columns: 1,
        visible: true,
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        alt: 'Produtos de Saúde e Bem-estar',
        caption: 'Vitamina D, Clorella, Triple Ômega, Feno Grego e Melatonina+',
        style: {
          backgroundColor: '#f8f9fa',
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
        title: 'Características dos Produtos',
        columns: 1,
        visible: true,
        heading: 'Conheça os benefícios de cada produto',
        features: [
          {
            id: uuidv4(),
            title: 'Vitamina D',
            description: 'Essencial para a saúde óssea e imunidade.',
            icon: '🌞'
          },
          {
            id: uuidv4(),
            title: 'Clorella',
            description: 'Poderoso detoxificante e fonte de nutrientes.',
            icon: '🌱'
          },
          {
            id: uuidv4(),
            title: 'Triple Ômega',
            description: 'Saúde cardiovascular e cerebral em um só produto.',
            icon: '🐟'
          },
          {
            id: uuidv4(),
            title: 'Feno Grego',
            description: 'Auxilia no ganho de massa muscular e energia.',
            icon: '💪'
          },
          {
            id: uuidv4(),
            title: 'Melatonina+',
            description: 'Melhora a qualidade do sono e promove o relaxamento.',
            icon: '😴'
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
        heading: 'Invista na sua saúde agora mesmo',
        content: 'Aproveite nossas ofertas exclusivas e garanta os melhores produtos para o seu bem-estar.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#28a745',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Vitamins & Minerals
  {
    id: uuidv4(),
    name: 'Vitaminas e Minerais',
    category: 'supplements',
    thumbnailUrl: 'https://images.unsplash.com/photo-1577003833619-76bbd7f82948',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Nutrição Essencial para Seu Corpo',
        subheading: 'Vitaminas e minerais de alta absorção para uma saúde completa',
        buttonText: 'Conhecer Produtos',
        buttonUrl: '#vitamins',
        backgroundImage: 'https://images.unsplash.com/photo-1577003833619-76bbd7f82948',
        style: {
          backgroundColor: '#e9f7ef',
          headingColor: '#196f3d',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'A Importância das Vitaminas',
        columns: 1,
        visible: true,
        heading: 'Por que seu corpo precisa de vitaminas?',
        content: '<p>As vitaminas e minerais são nutrientes essenciais que seu corpo precisa em pequenas quantidades para funcionar adequadamente. Eles desempenham papéis vitais em processos como o fortalecimento do sistema imunológico, a produção de energia, a saúde dos ossos, a função cerebral e muito mais.</p><p>Mesmo com uma alimentação saudável, fatores como o solo empobrecido, o processamento de alimentos e o estresse moderno podem dificultar a obtenção de todos os nutrientes necessários apenas pela dieta. É aqui que nossos suplementos de alta qualidade podem ajudar, preenchendo lacunas nutricionais e otimizando sua saúde.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#196f3d',
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
            src: 'https://images.unsplash.com/photo-1631392991590-86f8294f951e',
            alt: 'Multivitamínico',
            caption: 'Multivitamínico Completo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1584473457493-c5397ad525c3',
            alt: 'Vitamina D3 + K2',
            caption: 'Vitamina D3 + K2'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1544829885-87206c29d0b9',
            alt: 'Magnésio Bisglicinato',
            caption: 'Magnésio Bisglicinato'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1628594918853-d2b196843855',
            alt: 'Zinco Quelato',
            caption: 'Zinco Quelato'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1587854680352-936b22b91030',
            alt: 'Complexo B',
            caption: 'Complexo B'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1585435557343-3b092031a831',
            alt: 'Ômega 3',
            caption: 'Ômega 3 Ultrapuro'
          }
        ],
        style: {
          backgroundColor: '#f8f9fa',
          headingColor: '#196f3d',
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
        title: 'Diferenciais',
        columns: 3,
        visible: true,
        heading: 'Por que escolher nossas vitaminas',
        benefits: [
          {
            id: uuidv4(),
            title: 'Alta Biodisponibilidade',
            description: 'Formulações avançadas que seu corpo pode absorver e utilizar eficientemente',
            icon: '🔄'
          },
          {
            id: uuidv4(),
            title: 'Formas Ativas',
            description: 'Utilizamos as formas biologicamente ativas para eficácia máxima',
            icon: '⚡'
          },
          {
            id: uuidv4(),
            title: 'Sem Aditivos',
            description: 'Livre de corantes, aromatizantes artificiais e alérgenos comuns',
            icon: '✨'
          },
          {
            id: uuidv4(),
            title: 'Fontes Sustentáveis',
            description: 'Ingredientes obtidos de forma ética e ambientalmente responsável',
            icon: '🌍'
          },
          {
            id: uuidv4(),
            title: 'Sinergia Científica',
            description: 'Combinações de nutrientes baseadas em pesquisas para potencializar resultados',
            icon: '🔬'
          },
          {
            id: uuidv4(),
            title: 'Dosagens Terapêuticas',
            description: 'Quantidades otimizadas para benefícios reais à saúde',
            icon: '⚖️'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#196f3d',
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
            question: 'Preciso tomar vitaminas todos os dias?',
            answer: 'Sim, para resultados ideais, recomendamos uso diário conforme orientação do produto. Muitas vitaminas são hidrossolúveis e não armazenadas pelo corpo.'
          },
          {
            id: uuidv4(),
            question: 'Suas vitaminas são veganas?',
            answer: 'Temos opções veganas claramente marcadas em nossa linha. Algumas fórmulas contêm ingredientes de origem animal como ômega-3 de peixe ou colágeno bovino.'
          },
          {
            id: uuidv4(),
            question: 'Como saber quais vitaminas eu preciso?',
            answer: 'Idealmente, faça exames para identificar deficiências específicas. Como base, um bom multivitamínico, vitamina D3 e ômega-3 são benéficos para a maioria das pessoas.'
          }
        ],
        style: {
          backgroundColor: '#e9f7ef',
          headingColor: '#196f3d',
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
        heading: 'Fortaleça Seu Corpo por Dentro',
        content: 'Invista no seu bem-estar com nossas vitaminas e minerais premium, formulados para resultados reais.',
        buttonText: 'Escolher Vitaminas',
        buttonUrl: '#vitamins-shop',
        style: {
          backgroundColor: '#27ae60',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 3: Sleep & Stress
  {
    id: uuidv4(),
    name: 'Sono e Relaxamento',
    category: 'supplements',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Descanse Melhor, Viva Melhor',
        subheading: 'Suplementos naturais para um sono reparador e redução do estresse',
        buttonText: 'Descubra o Descanso',
        buttonUrl: '#sleep',
        backgroundImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55',
        style: {
          backgroundColor: '#1a237e',
          headingColor: '#ffffff',
          textColor: '#e0e0e0',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'A Importância do Sono',
        columns: 1,
        visible: true,
        heading: 'Por que o Sono de Qualidade é Essencial',
        content: '<p>O sono é fundamental para a saúde física e mental. Durante o sono profundo, seu corpo trabalha para reparar tecidos, consolidar memórias e regular hormônios essenciais. A falta de sono adequado está associada a problemas como ganho de peso, depressão, enfraquecimento do sistema imunológico e aumento do risco de doenças crônicas.</p><p>No mundo acelerado de hoje, mais de 30% dos adultos sofrem com insônia ou sono de baixa qualidade. Nossos suplementos naturais foram formulados para ajudar você a adormecer mais rapidamente, permanecer dormindo por mais tempo e acordar sentindo-se verdadeiramente descansado.</p>',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a237e',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Abordagem Natural',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1531353826977-0941b4779a1c',
          alt: 'Plantas relaxantes'
        },
        heading: 'Poder dos Ingredientes Naturais',
        content: 'Nossa fórmula exclusiva combina ingredientes comprovados cientificamente como melatonina, magnésio, L-teanina, camomila, valeriana e passiflora. Estes componentes trabalham em sinergia para acalmar a mente, relaxar o corpo e sinalizar ao cérebro que é hora de dormir, sem os efeitos colaterais ou dependência associados a medicamentos para dormir.',
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#1a237e',
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
        heading: 'Como Nossos Suplementos Ajudam',
        benefits: [
          {
            id: uuidv4(),
            title: 'Adormecer Mais Rápido',
            description: 'Reduz o tempo necessário para pegar no sono, mesmo em mentes agitadas',
            icon: '⏱️'
          },
          {
            id: uuidv4(),
            title: 'Sono Mais Profundo',
            description: 'Promove mais tempo nos estágios reparadores do sono profundo',
            icon: '💤'
          },
          {
            id: uuidv4(),
            title: 'Menos Interrupções',
            description: 'Ajuda a manter o sono contínuo durante toda a noite',
            icon: '🌙'
          },
          {
            id: uuidv4(),
            title: 'Redução da Ansiedade',
            description: 'Acalma a mente e diminui pensamentos acelerados antes de dormir',
            icon: '🧠'
          },
          {
            id: uuidv4(),
            title: 'Despertar Revigorado',
            description: 'Sem a sensação de groguice comum em medicamentos para dormir',
            icon: '🌞'
          },
          {
            id: uuidv4(),
            title: 'Regulação do Ciclo',
            description: 'Ajuda a estabelecer um ritmo circadiano saudável',
            icon: '🔄'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a237e',
          textColor: '#333333',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Produtos para Sono',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e',
            alt: 'Melatonina sublingual',
            caption: 'Melatonina Sublingual 3mg'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616628188502-383a5bf35091',
            alt: 'Magnésio para sono',
            caption: 'Magnésio Glicina Sleep'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616628523487-c1597aa58639',
            alt: 'Complexo calmante',
            caption: 'Complexo Relaxante Natural'
          }
        ],
        style: {
          backgroundColor: '#f5f5f5',
          headingColor: '#1a237e',
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
        title: 'Dicas para Melhor Sono',
        columns: 2,
        visible: true,
        heading: 'Maximize os Resultados com Hábitos Saudáveis',
        features: [
          {
            id: uuidv4(),
            title: 'Consistência',
            description: 'Mantenha horários regulares para dormir e acordar, mesmo nos fins de semana',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Ambiente Ideal',
            description: 'Quarto escuro, silencioso e com temperatura confortável (18-20°C)',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Limite Telas',
            description: 'Evite dispositivos eletrônicos pelo menos 1 hora antes de dormir',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Evite Estimulantes',
            description: 'Não consuma cafeína após o meio-dia e limite o álcool antes de dormir',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Exercício Regular',
            description: 'Pratique atividade física, mas evite exercícios intensos próximo à hora de dormir',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Rotina Relaxante',
            description: 'Crie um ritual noturno com atividades calmas como leitura ou banho morno',
            icon: '✓'
          }
        ],
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#1a237e',
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
        heading: 'Transforme Suas Noites, Melhore Seus Dias',
        content: 'Invista na qualidade do seu sono e sinta a diferença em sua energia, humor e produtividade diária.',
        buttonText: 'Dormir Melhor Agora',
        buttonUrl: '#sleep-products',
        style: {
          backgroundColor: '#303f9f',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  }
];

// Apply fixTemplateProps to ensure all templates have the correct properties
export const healthTemplates: Template[] = healthTemplatesRaw.map(fixTemplateProps);

// For backward compatibility with existing code that might expect a single template
export const healthTemplate = healthTemplates[0];
