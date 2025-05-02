
import { Template } from '@/types/editor';

export const accessoriesTemplates: Template[] = [
  {
    id: 'accessories-premium-1',
    name: 'Acessórios Premium',
    category: 'accessories',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f0f0f0',
          padding: '60px 20px',
          borderRadius: '0',
          textAlign: 'center'
        },
        heading: 'Acessórios que Definem Estilo',
        subheading: 'Detalhes precisos, materiais nobres e design contemporâneo para complementar seu visual',
        buttonText: 'Explore a Coleção',
        buttonUrl: '#'
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Produtos',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: '',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1631485055112-c9b2aec772a1',
            alt: 'Relógio premium em fundo neutro',
            caption: 'Relógio Cronógrafo Serie Premium'
          },
          {
            src: 'https://images.unsplash.com/photo-1509112756314-34a0badb29d4',
            alt: 'Bolsa de couro genuíno',
            caption: 'Bolsa Artesanal em Couro Italiano'
          },
          {
            src: 'https://images.unsplash.com/photo-1601740982034-56bc36106e82',
            alt: 'Joias finas',
            caption: 'Coleção Exclusiva de Joias'
          }
        ]
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Sobre a Coleção',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        content: '<h2 style="font-size: 28px; font-weight: 400; color: #333; margin-bottom: 24px;">Elevando o Conceito de Luxo</h2><p style="font-size: 16px; line-height: 1.8; color: #555; max-width: 800px; margin: 0 auto;">Nossa coleção de acessórios premium redefine o significado de elegância através de peças meticulosamente elaboradas que combinam design contemporâneo com técnicas artesanais tradicionais. Cada item é criado para ser não apenas um complemento ao seu visual, mas uma declaração de estilo e sofisticação.</p>'
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Vantagens da Nossa Linha',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f7f7f7',
          margin: '0'
        },
        heading: 'Por Que Escolher Nossos Acessórios',
        benefits: [
          {
            icon: '💎',
            title: 'Qualidade Superior',
            description: 'Materiais premium selecionados das melhores fontes globais'
          },
          {
            icon: '🔄',
            title: 'Durabilidade',
            description: 'Peças projetadas para durar e manter sua beleza por anos'
          },
          {
            icon: '✨',
            title: 'Design Exclusivo',
            description: 'Criações únicas desenvolvidas por designers renomados'
          }
        ]
      },
      {
        id: 'imageText-1',
        type: 'imageText',
        title: 'Artesanato de Precisão',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Artesanato de Excelência',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #555;">Cada peça da nossa coleção passa por um rigoroso processo de fabricação onde artesãos especializados utilizam técnicas refinadas ao longo de décadas de experiência. A atenção aos mínimos detalhes é o que diferencia nossos acessórios, desde o corte preciso do couro até o polimento final das peças metálicas.</p><p style="font-size: 16px; line-height: 1.8; color: #555; margin-top: 20px;">Este compromisso com a excelência resulta em acessórios que não apenas complementam seu visual, mas também contam uma história de tradição e qualidade.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1533758488827-caf6f782e87d',
          alt: 'Artesão trabalhando em acessório de couro',
        }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Diferenciais dos Produtos',
        visible: true,
        columns: '2',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f7f7f7',
          margin: '0'
        },
        heading: 'Características Exclusivas',
        features: [
          {
            icon: '🔧',
            title: 'Hardware Premium',
            description: 'Componentes metálicos banhados a ouro e resistentes à corrosão'
          },
          {
            icon: '🧵',
            title: 'Costuras Precisas',
            description: 'Cada ponto é meticulosamente aplicado para garantir durabilidade'
          },
          {
            icon: '🛡️',
            title: 'Proteção Garantida',
            description: 'Tratamentos especiais para resistência à água e manchas'
          },
          {
            icon: '🔒',
            title: 'Segurança Integrada',
            description: 'Sistemas anti-roubo discretos em bolsas e carteiras'
          }
        ]
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Detalhe do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1604695442099-4f78f3bf9623',
        alt: 'Detalhe de costura em acessório de couro',
        caption: 'Detalhe da costura artesanal em couro italiano de primeira qualidade'
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f7f7f7',
          margin: '0'
        },
        heading: 'Especificações Detalhadas',
        specs: [
          { name: 'Material Principal', value: 'Couro Italiano Full Grain' },
          { name: 'Forro', value: 'Suede Premium' },
          { name: 'Hardware', value: 'Metal Hipoalergênico Banhado a Ouro 18k' },
          { name: 'Dimensões', value: '25cm x 18cm x 10cm' },
          { name: 'Peso', value: '0.8kg' },
          { name: 'Garantia', value: '5 anos contra defeitos de fabricação' }
        ]
      },
      {
        id: 'textImage-1',
        type: 'textImage',
        title: 'Cuidados com o Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Como Preservar seu Acessório',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #555;">Para garantir que seu acessório premium mantenha sua beleza e durabilidade por muitos anos, recomendamos seguir nossas diretrizes de cuidado. Produtos em couro devem ser mantidos longe de umidade excessiva e luz solar direta. Aplique condicionador de couro específico periodicamente para manter a maciez e evitar ressecamento.</p><p style="font-size: 16px; line-height: 1.8; color: #555; margin-top: 20px;">Para peças metálicas, evite contato com perfumes, loções e outros produtos químicos que podem causar oxidação. Limpe regularmente com um pano macio e seco.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1606222074634-eb45interactionpdf10dc3b',
          alt: 'Kit de manutenção para acessórios premium',
        }
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f7f7f7',
          margin: '0'
        },
        heading: 'Dúvidas Comuns',
        questions: [
          {
            question: 'Como identificar um produto autêntico da marca?',
            answer: 'Todos os nossos produtos vêm com cartão de autenticidade holográfico, número de série único e detalhes de acabamento exclusivos que podem ser verificados em nosso site oficial.'
          },
          {
            question: 'Vocês oferecem serviços de reparo?',
            answer: 'Sim, oferecemos serviços de manutenção e reparo vitalícios para todos os nossos acessórios premium. Entre em contato com nosso atendimento ao cliente para mais detalhes.'
          },
          {
            question: 'Como é a política de devolução?',
            answer: 'Aceitamos devoluções em até 30 dias após a compra, desde que o produto esteja em perfeito estado, com todas as etiquetas originais e embalagem intacta.'
          }
        ]
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada Final',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#333333',
          color: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        heading: 'Eleve seu Estilo com Nossa Coleção Exclusiva',
        content: 'Adquira agora um acessório premium e receba um kit de manutenção especial como cortesia',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
