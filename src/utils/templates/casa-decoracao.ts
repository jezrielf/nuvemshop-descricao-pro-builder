
import { Template } from '@/types/editor';

export const casaDecoracaoTemplates: Template[] = [
  {
    id: 'casa-decoracao-premium-1',
    name: 'Casa e Decoração Premium',
    category: 'Casa e decoração',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f8f4f0',
          padding: '80px 20px',
          borderRadius: '0',
          textAlign: 'center'
        },
        heading: 'Transforme seu Espaço',
        subheading: 'Móveis e objetos de decoração com design exclusivo e materiais sustentáveis',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#'
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Ambientes',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: '',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
            alt: 'Sala de estar com decoração escandinava',
            caption: 'Sala de estar - Coleção Primavera'
          },
          {
            src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea',
            alt: 'Detalhe de mesa de centro com objetos decorativos',
            caption: 'Objetos decorativos feitos à mão'
          },
          {
            src: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1',
            alt: 'Quarto com iluminação aconchegante',
            caption: 'Ambiente aconchegante para seu descanso'
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
        content: '<h2 style="font-size: 32px; font-weight: 300; color: #4a4a4a; margin-bottom: 30px;">Design e Conforto em Perfeita Harmonia</h2><p style="font-size: 18px; line-height: 1.8; color: #6c6c6c; max-width: 800px; margin: 0 auto;">Nossa coleção de móveis e objetos decorativos foi criada para transformar qualquer ambiente em um espaço acolhedor, funcional e esteticamente harmônico. Inspirados pela natureza e pelo design escandinavo, cada peça combina linhas limpas com materiais naturais para criar um equilíbrio perfeito entre beleza e praticidade.</p>'
      },
      {
        id: 'imageText-1',
        type: 'imageText',
        title: 'Materiais Sustentáveis',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f4f0',
          margin: '0'
        },
        heading: 'Compromisso com a Sustentabilidade',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #6c6c6c;">Nossos móveis são produzidos com madeiras de reflorestamento certificado e materiais naturais cuidadosamente selecionados. Cada peça é criada com processos que minimizam o impacto ambiental, desde o uso de tintas e vernizes à base de água até embalagens biodegradáveis e recicláveis.</p><p style="font-size: 16px; line-height: 1.8; color: #6c6c6c; margin-top: 20px;">Ao escolher nossos produtos, você não apenas eleva a estética do seu lar, mas também contribui para um futuro mais sustentável para o planeta.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1525896650794-60ad4ec40d0e',
          alt: 'Detalhe de madeira natural utilizada nos móveis',
        }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Características dos Produtos',
        visible: true,
        columns: '2',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Qualidade em Cada Detalhe',
        features: [
          {
            icon: '🌳',
            title: 'Materiais Naturais',
            description: 'Madeiras nobres, algodão orgânico e fibras naturais em cada peça'
          },
          {
            icon: '🛠️',
            title: 'Artesanato Premium',
            description: 'Técnicas tradicionais combinadas com tecnologia de ponta'
          },
          {
            icon: '♻️',
            title: 'Ecologicamente Responsável',
            description: 'Produção com baixo impacto ambiental e materiais recicláveis'
          },
          {
            icon: '✨',
            title: 'Design Premiado',
            description: 'Criações exclusivas de designers renomados internacionalmente'
          }
        ]
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios da Nossa Linha',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f4f0',
          margin: '0'
        },
        heading: 'Por Que Escolher Nossa Marca',
        benefits: [
          {
            icon: '🏠',
            title: 'Ambientes Harmônicos',
            description: 'Peças que se complementam para criar espaços visualmente equilibrados'
          },
          {
            icon: '💤',
            title: 'Conforto Supremo',
            description: 'Ergonomia e materiais que proporcionam bem-estar cotidiano'
          },
          {
            icon: '⏱️',
            title: 'Durabilidade',
            description: 'Móveis feitos para durar gerações com manutenção mínima'
          }
        ]
      },
      {
        id: 'textImage-1',
        type: 'textImage',
        title: 'Processo de Fabricação',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Tradição e Inovação',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #6c6c6c;">Nosso processo de fabricação preserva técnicas artesanais tradicionais que valorizam cada material e garantem peças únicas com personalidade. Marceneiros experientes trabalham lado a lado com designers contemporâneos, combinando conhecimento ancestral com visão moderna.</p><p style="font-size: 16px; line-height: 1.8; color: #6c6c6c; margin-top: 20px;">Cada móvel passa por rigoroso controle de qualidade, garantindo que apenas peças perfeitas cheguem até sua casa. Este compromisso com a excelência resulta em produtos que contam histórias e transformam ambientes.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d',
          alt: 'Artesão trabalhando em móvel de madeira',
        }
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Ambiente Decorado',
        visible: true,
        columns: 'full',
        style: {
          padding: '0',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        src: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90',
        alt: 'Ambiente completo decorado com produtos da coleção',
        caption: 'Sala de jantar com mesa e cadeiras da coleção Primavera'
      },
      {
        id: 'video-1',
        type: 'video',
        title: 'Tour Virtual',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f4f0',
          margin: '0'
        },
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        aspectRatio: '16:9',
        title: 'Tour pelos Nossos Ambientes',
        description: 'Conheça nossas sugestões de decoração e combinações',
        autoplay: false,
        muteAudio: true
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Dúvidas Comuns',
        questions: [
          {
            question: 'Como cuidar dos móveis de madeira natural?',
            answer: 'Recomendamos limpar regularmente com pano macio levemente umedecido, evitar exposição direta ao sol por longos períodos e utilizar ceras naturais específicas para madeira a cada 6 meses para manter a hidratação e beleza natural da peça.'
          },
          {
            question: 'Vocês oferecem serviço de montagem?',
            answer: 'Sim, oferecemos serviço de entrega e montagem por profissionais treinados para garantir que seus móveis sejam instalados corretamente e com todo cuidado. Este serviço pode ser adicionado no momento da compra.'
          },
          {
            question: 'As cores dos produtos nas fotos são fiéis?',
            answer: 'Trabalhamos para que as imagens sejam o mais fiéis possível, porém, por se tratarem de materiais naturais como madeira, cada peça possui características únicas de cor e veios. Pequenas variações são parte da beleza dos produtos artesanais.'
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
          backgroundColor: '#4a4a4a',
          color: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        heading: 'Transforme sua Casa em um Lar',
        content: 'Peças atemporais que trazem conforto e personalidade para cada ambiente',
        buttonText: 'Ver Coleção Completa',
        buttonUrl: '#'
      }
    ]
  }
];
