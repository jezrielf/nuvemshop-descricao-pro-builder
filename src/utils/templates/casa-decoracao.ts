import { Template } from '@/types/editor';

export const casaDecoracaoTemplates: Template[] = [
  {
    id: 'decor-moderno-1',
    name: 'Decoração Moderna',
    category: 'casa-decoracao',
    thumbnail: '/template-thumbnails/casa-decoracao/decor-moderno-1.jpg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f8f9fa',
          padding: '60px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Transforme sua casa com estilo moderno',
        subheading: 'Encontre os melhores itens de decoração para um ambiente contemporâneo e elegante.',
        buttonText: 'Ver Coleção',
        buttonUrl: '#'
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Descrição da Coleção',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        content: '<p>Descubra nossa seleção de itens de decoração moderna, cuidadosamente escolhidos para adicionar um toque de sofisticação e design ao seu lar. De móveis minimalistas a acessórios de arte, encontre tudo o que você precisa para criar um espaço único e inspirador.</p>'
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria de Produtos',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff'
        },
        images: [
          {
            id: 'img-1',
            src: '/template-thumbnails/casa-decoracao/gallery/modern-decor-1.jpg',
            alt: 'Decoração moderna',
            caption: 'Detalhes que inspiram'
          },
          {
            id: 'img-2',
            src: '/template-thumbnails/casa-decoracao/gallery/modern-decor-2.jpg',
            alt: 'Design minimalista',
            caption: 'Elegância em cada linha'
          },
          {
            id: 'img-3',
            src: '/template-thumbnails/casa-decoracao/gallery/modern-decor-3.jpg',
            alt: 'Ambientes sofisticados',
            caption: 'Conforto e beleza'
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
          backgroundColor: '#f8f9fa',
          padding: '40px 20px',
          textAlign: 'center'
        },
        heading: 'Está pronto para transformar sua casa?',
        content: 'Não perca tempo! Renove seu espaço com nossos itens exclusivos e crie um ambiente que reflita sua personalidade.',
        buttonText: 'Comece Agora',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'decor-rustico-2',
    name: 'Decoração Rústica',
    category: 'casa-decoracao',
    thumbnail: '/template-thumbnails/casa-decoracao/decor-rustico-2.jpg',
    blocks: [
      {
        id: 'hero-2',
        type: 'hero',
        title: 'Banner Rústico',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#e9ecef',
          padding: '60px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Aconchego e charme com toque rústico',
        subheading: 'Descubra peças únicas que trazem a beleza do campo para dentro da sua casa.',
        buttonText: 'Explore a Coleção',
        buttonUrl: '#'
      },
      {
        id: 'text-2',
        type: 'text',
        title: 'Descrição da Coleção Rústica',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        content: '<p>Nossa coleção de decoração rústica é perfeita para quem busca um ambiente acolhedor e cheio de personalidade. Com móveis de madeira maciça, tecidos naturais e detalhes artesanais, cada peça conta uma história e transforma sua casa em um refúgio de paz e tranquilidade.</p>'
      },
      {
        id: 'image-text-1',
        type: 'imageText',
        title: 'Detalhes Rústicos',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff'
        },
        image: {
          src: '/template-thumbnails/casa-decoracao/image-text/rustic-decor-1.jpg',
          alt: 'Detalhes rústicos'
        },
        heading: 'Artesanato e tradição',
        content: '<p>Valorizamos o trabalho manual e a riqueza dos materiais naturais. Cada item é feito com cuidado e atenção aos detalhes, garantindo a autenticidade e o charme da decoração rústica.</p>'
      },
      {
        id: 'cta-2',
        type: 'cta',
        title: 'Transforme seu Lar',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#e9ecef',
          padding: '40px 20px',
          textAlign: 'center'
        },
        heading: 'Crie um ambiente acolhedor e autêntico',
        content: 'Deixe-se inspirar pela beleza da decoração rústica e transforme sua casa em um espaço único e cheio de vida.',
        buttonText: 'Encontre Seu Estilo',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'decor-minimalista-3',
    name: 'Decoração Minimalista',
    category: 'casa-decoracao',
    thumbnail: '/template-thumbnails/casa-decoracao/decor-minimalista-3.jpg',
    blocks: [
      {
        id: 'hero-3',
        type: 'hero',
        title: 'Banner Minimalista',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f9f9f9',
          padding: '60px 20px',
          borderRadius: '8px',
          textAlign: 'center'
        },
        heading: 'Menos é mais: simplicidade e elegância',
        subheading: 'Descubra a beleza do design minimalista e crie ambientes clean e sofisticados.',
        buttonText: 'Descubra o Minimalismo',
        buttonUrl: '#'
      },
      {
        id: 'text-3',
        type: 'text',
        title: 'Descrição Minimalista',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#ffffff'
        },
        content: '<p>A decoração minimalista valoriza a funcionalidade, a organização e a ausência de excessos. Com linhas retas, cores neutras e poucos objetos, é possível criar espaços amplos, luminosos e cheios de personalidade.</p>'
      },
      {
        id: 'image-text-2',
        type: 'textImage',
        title: 'Design Clean',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff'
        },
        image: {
          src: '/template-thumbnails/casa-decoracao/text-image/minimalist-decor-1.jpg',
          alt: 'Design clean'
        },
        heading: 'A arte de simplificar',
        content: '<p>Cada detalhe é pensado para transmitir calma e bem-estar. Invista em móveis multifuncionais, iluminação natural e poucos acessórios para criar um ambiente equilibrado e inspirador.</p>'
      },
      {
        id: 'cta-3',
        type: 'cta',
        title: 'Crie Seu Espaço',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f9f9f9',
          padding: '40px 20px',
          textAlign: 'center'
        },
        heading: 'Transforme sua casa em um refúgio de paz',
        content: 'Aposte na decoração minimalista e descubra como a simplicidade pode transformar sua vida.',
        buttonText: 'Comece a Simplificar',
        buttonUrl: '#'
      },
      {
        id: 'video-1',
        type: 'video',
        title: 'Vídeo Inspirador',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#ffffff'
        },
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        aspectRatio: '16:9',
        autoplay: false,
        muteAudio: true
      }
    ]
  }
];
