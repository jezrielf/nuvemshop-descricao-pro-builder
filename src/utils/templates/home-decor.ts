import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';
import { createHeroBlock } from '../blockCreators/blocks/heroBlock';
import { createTextBlock } from '../blockCreators/blocks/textBlock';
import { createImageBlock } from '../blockCreators/blocks/imageBlock';
import { createGalleryBlock } from '../blockCreators/blocks/galleryBlock';
import { createVideoBlock } from '../blockCreators/blocks/videoBlock';
import { createImageTextBlock } from '../blockCreators/blocks/imageTextBlock';
import { createTextImageBlock } from '../blockCreators/blocks/textImageBlock';
import { createCTABlock } from '../blockCreators/blocks/ctaBlock';
import { createFAQBlock } from '../blockCreators/blocks/faqBlock';
import { createFeaturesBlock } from '../blockCreators/blocks/featuresBlock';
import { createBenefitsBlock } from '../blockCreators/blocks/benefitsBlock';

// Create 3 home decor templates
export const homeDecorTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Casa e Decoração - Elegante',
    category: 'home-decor',
    thumbnail: 'https://images.unsplash.com/photo-1581967662151-abe1c71c53d1',
    blocks: [
      // Hero block with background image
      createHeroBlock(1, {
        heading: 'Transforme Seu Espaço em um Lar',
        subheading: 'Móveis e decorações exclusivas para ambientes sofisticados',
        backgroundImage: 'https://images.unsplash.com/photo-1581967662151-abe1c71c53d1',
        buttonText: 'Ver Coleção',
        buttonUrl: '#collection'
      }),
      // Video showcase
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=7maUQRoG3xk',
        heading: 'Nossa Inspiração',
        description: 'Veja como nossa mobília transforma ambientes comuns em espaços extraordinários.'
      }),
      // Features in columns
      createFeaturesBlock(3, {
        heading: 'Por que escolher nossos produtos',
        features: [
          {
            id: uuidv4(),
            title: 'Design Exclusivo',
            description: 'Peças únicas criadas por designers renomados',
            icon: 'Palette'
          },
          {
            id: uuidv4(),
            title: 'Materiais Nobres',
            description: 'Utilizamos apenas matérias-primas de alta qualidade',
            icon: 'Gem'
          },
          {
            id: uuidv4(),
            title: 'Produção Artesanal',
            description: 'Cada peça é produzida com atenção aos detalhes',
            icon: 'Brush'
          }
        ]
      }),
      // Gallery showcase
      createGalleryBlock(1, {
        title: 'Galeria de Ambientes',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
            alt: 'Sala de estar elegante',
            caption: 'Sala de estar com móveis modernos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32',
            alt: 'Quarto sofisticado',
            caption: 'Quarto com decoração sofisticada'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1617104678098-de229db51b21',
            alt: 'Cozinha planejada',
            caption: 'Cozinha com móveis planejados'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1595514535215-9a2297e8d2bc',
            alt: 'Banheiro luxuoso',
            caption: 'Banheiro com acabamentos de luxo'
          }
        ]
      }),
      // Text with benefits
      createTextBlock(1, {
        heading: 'Nosso Compromisso',
        content: '<p>Acreditamos que cada espaço tem potencial para ser transformado em um ambiente acolhedor e elegante. Nossa missão é ajudar você a criar um lar que reflita sua personalidade e estilo de vida.</p><p>Trabalhamos com os melhores fornecedores e artesãos para garantir que cada peça que você adquire tenha qualidade superior e durabilidade.</p>'
      }),
      // Product highlights with image
      createImageTextBlock(1, {
        heading: 'Coleção Primavera 2025',
        content: 'Nossa nova coleção traz cores vibrantes e texturas naturais que adicionam vida e personalidade aos ambientes. Inspirada na natureza, cada peça foi pensada para trazer harmonia e equilíbrio ao seu lar.',
        image: {
          src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6',
          alt: 'Móveis da coleção primavera'
        }
      }),
      // Benefits section
      createBenefitsBlock(2, {
        heading: 'Vantagens de nossos produtos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Durabilidade',
            description: 'Produtos feitos para durar gerações',
            icon: 'Shield'
          },
          {
            id: uuidv4(),
            title: 'Sustentabilidade',
            description: 'Comprometidos com práticas sustentáveis',
            icon: 'Leaf'
          },
          {
            id: uuidv4(),
            title: 'Entrega Rápida',
            description: 'Entregamos em todo o Brasil',
            icon: 'Truck'
          },
          {
            id: uuidv4(),
            title: 'Garantia Estendida',
            description: '5 anos de garantia em todos os produtos',
            icon: 'Award'
          }
        ]
      }),
      // FAQ
      createFAQBlock(1, {
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Qual o prazo de entrega?',
            answer: 'O prazo médio de entrega é de 15 a 30 dias dependendo da sua localização.'
          },
          {
            id: uuidv4(),
            question: 'Vocês oferecem serviço de montagem?',
            answer: 'Sim, oferecemos serviço de montagem em todas as capitais e regiões metropolitanas.'
          },
          {
            id: uuidv4(),
            question: 'Como funciona a garantia?',
            answer: 'Todos os nossos produtos têm 5 anos de garantia contra defeitos de fabricação.'
          },
          {
            id: uuidv4(),
            question: 'Posso personalizar os móveis?',
            answer: 'Sim, oferecemos serviço de personalização para a maioria dos nossos produtos.'
          }
        ]
      }),
      // Testimonial as text
      createTextBlock(1, {
        heading: 'O que nossos clientes dizem',
        content: '<blockquote>"Os móveis transformaram completamente minha sala de estar. A qualidade é excepcional e o atendimento foi impecável." - Maria Silva, São Paulo</blockquote><blockquote>"Já comprei várias peças e sempre fico impressionada com os detalhes e acabamento. Recomendo a todos!" - João Pereira, Rio de Janeiro</blockquote>'
      }),
      // Call to action
      createCTABlock(1, {
        heading: 'Transforme seu lar hoje mesmo',
        content: 'Entre em contato conosco e descubra como podemos ajudar a transformar seu espaço.',
        buttonText: 'Falar com um consultor',
        buttonUrl: '#contact'
      })
    ]
  },
  {
    id: uuidv4(),
    name: 'Casa e Decoração - Minimalista',
    category: 'home-decor',
    thumbnail: 'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d',
    blocks: [
      // Hero with clean design
      createHeroBlock(1, {
        heading: 'Simplicidade e Elegância',
        subheading: 'Menos é mais: decoração minimalista para ambientes serenos',
        image: {
          src: 'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d',
          alt: 'Sala minimalista'
        },
        buttonText: 'Explorar conceito',
        buttonUrl: '#concept'
      }),
      // Concept Video
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=tGAxla9VSvQ',
        heading: 'A arte de viver com menos',
        description: 'Conheça a filosofia por trás do design minimalista e como ela pode transformar sua vida.'
      }),
      // Text introduction
      createTextBlock(1, {
        heading: 'Design consciente',
        content: '<p>O design minimalista não se trata apenas de estética, mas de uma abordagem consciente à forma como vivemos e consumimos. Remover o excesso nos permite valorizar o que realmente importa.</p><p>Nossos móveis são projetados com linhas limpas, espaços abertos e uma paleta de cores neutras que criam uma sensação de calma e ordem.</p>'
      }),
      // Image and text alternating
      createImageTextBlock(1, {
        heading: 'Materiais Naturais',
        content: 'Utilizamos madeiras sustentáveis, pedras naturais e tecidos orgânicos para criar peças que são tão gentis com o planeta quanto elegantes em sua casa.',
        image: {
          src: 'https://images.unsplash.com/photo-1521334884684-d80222895322',
          alt: 'Materiais naturais'
        }
      }),
      // Features columns
      createFeaturesBlock(3, {
        heading: 'Características do design minimalista',
        features: [
          {
            id: uuidv4(),
            title: 'Linhas Limpas',
            description: 'Formas simples e geométricas que criam harmonia visual',
            icon: 'LineChart'
          },
          {
            id: uuidv4(),
            title: 'Espaços Abertos',
            description: 'Ambientes que favorecem a circulação e a luz natural',
            icon: 'LayoutGrid'
          },
          {
            id: uuidv4(),
            title: 'Cores Neutras',
            description: 'Paleta de cores suaves que promovem tranquilidade',
            icon: 'Palette'
          }
        ]
      }),
      // Gallery in grid
      createGalleryBlock(1, {
        title: 'Inspirações',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103',
            alt: 'Cozinha minimalista',
            caption: 'Cozinha com design clean e funcional'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1558442074-9df65f0b536c',
            alt: 'Sala de estar',
            caption: 'Sala com poucos elementos e muito conforto'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2',
            alt: 'Escritório home office',
            caption: 'Escritório produtivo e organizado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1556910103-1c02745adc4b',
            alt: 'Quarto minimalista',
            caption: 'Quarto para descanso profundo'
          }
        ]
      }),
      // Text image reversed
      createTextImageBlock(1, {
        heading: 'Organização Inteligente',
        content: 'Soluções de armazenamento discretas e eficientes que mantêm seus espaços organizados e livres de desordem visual.',
        image: {
          src: 'https://images.unsplash.com/photo-1594626302778-3c8c4a85d227',
          alt: 'Soluções de organização'
        }
      }),
      // Benefits section
      createBenefitsBlock(2, {
        heading: 'Vantagens do estilo minimalista',
        benefits: [
          {
            id: uuidv4(),
            title: 'Mais Fácil de Limpar',
            description: 'Menos objetos significam menos superfícies para acumular poeira',
            icon: 'Sparkles'
          },
          {
            id: uuidv4(),
            title: 'Menos Estresse',
            description: 'Ambientes organizados promovem bem-estar mental',
            icon: 'Heart'
          },
          {
            id: uuidv4(),
            title: 'Economia',
            description: 'Comprar menos significa gastar menos',
            icon: 'PiggyBank'
          },
          {
            id: uuidv4(),
            title: 'Versatilidade',
            description: 'Peças neutras combinam com qualquer decoração',
            icon: 'Repeat'
          }
        ]
      }),
      // Another video for how-to
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=D4X_qQvXxhY',
        heading: 'Como começar sua jornada minimalista',
        description: 'Guia passo a passo para simplificar sua casa e começar a viver com menos.'
      }),
      // FAQ section
      createFAQBlock(1, {
        heading: 'Dúvidas Comuns',
        faqs: [
          {
            id: uuidv4(),
            question: 'O minimalismo significa ter poucos móveis?',
            answer: 'Não necessariamente. Trata-se de ter apenas o que você precisa e valoriza, sem excessos.'
          },
          {
            id: uuidv4(),
            question: 'É possível ter um lar minimalista com crianças?',
            answer: 'Sim! Na verdade, ensinar as crianças a valorizar qualidade em vez de quantidade é um grande benefício.'
          },
          {
            id: uuidv4(),
            question: 'Como começar a transição para o minimalismo?',
            answer: 'Comece com um cômodo de cada vez, eliminando o que não usa ou não traz alegria.'
          },
          {
            id: uuidv4(),
            question: 'Minimalismo significa apenas preto e branco?',
            answer: 'Não, você pode usar qualquer paleta de cores, desde que seja coesa e sem excesso de variações.'
          }
        ]
      }),
      // Call to action
      createCTABlock(1, {
        heading: 'Simplifique sua vida hoje',
        content: 'Agende uma consulta com nossos designers e descubra como o minimalismo pode transformar sua casa e sua vida.',
        buttonText: 'Agendar consulta gratuita',
        buttonUrl: '#schedule'
      })
    ]
  },
  {
    id: uuidv4(),
    name: 'Casa e Decoração - Rústico Moderno',
    category: 'home-decor',
    thumbnail: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92',
    blocks: [
      // Hero section
      createHeroBlock(1, {
        heading: 'O Charme do Rústico Contemporâneo',
        subheading: 'Onde tradição e modernidade se encontram para criar ambientes únicos',
        backgroundImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
        buttonText: 'Descobrir coleção',
        buttonUrl: '#collection'
      }),
      // Introduction text
      createTextBlock(1, {
        heading: 'Tradição reinventada',
        content: '<p>O estilo rústico moderno combina elementos naturais e tradicionais com linhas contemporâneas e tecnologia atual. É a união perfeita entre o aconchego do campo e a praticidade urbana.</p><p>Nossas peças são cuidadosamente elaboradas para trazer elementos naturais para dentro de casa, criando espaços acolhedores sem abrir mão do conforto moderno.</p>'
      }),
      // Gallery of examples
      createGalleryBlock(1, {
        title: 'Ambientes inspiradores',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            alt: 'Sala rústica moderna',
            caption: 'Sala com vigas de madeira e mobiliário contemporâneo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1617104678098-de229db51b21',
            alt: 'Cozinha com ilha',
            caption: 'Cozinha com bancada de madeira maciça e eletrodomésticos de aço'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1506402583875-5bc73a8365a0',
            alt: 'Quarto rústico',
            caption: 'Quarto com parede de tijolos aparentes e roupa de cama natural'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae',
            alt: 'Banheiro com elementos naturais',
            caption: 'Banheiro com pedra natural e madeira'
          }
        ]
      }),
      // Video showcase
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=8llfD6Bz7G0',
        heading: 'Da natureza para sua casa',
        description: 'Veja como transformamos matérias-primas naturais em peças únicas para sua casa.'
      }),
      // Features showcase
      createFeaturesBlock(3, {
        heading: 'Elementos do estilo rústico moderno',
        features: [
          {
            id: uuidv4(),
            title: 'Materiais Naturais',
            description: 'Madeira, pedra, couro e tecidos orgânicos',
            icon: 'Tree'
          },
          {
            id: uuidv4(),
            title: 'Texturas Contrastantes',
            description: 'Superfícies rústicas com acabamentos polidos',
            icon: 'Layers'
          },
          {
            id: uuidv4(),
            title: 'Cores Terrosas',
            description: 'Paleta inspirada na natureza com toques de cores vibrantes',
            icon: 'Palette'
          }
        ]
      }),
      // Products with image and text
      createImageTextBlock(1, {
        heading: 'Coleção Madeira e Pedra',
        content: 'Nossa linha exclusiva combina madeira de demolição com pedras naturais. Cada peça conta uma história e traz o calor da natureza para dentro de sua casa.',
        image: {
          src: 'https://images.unsplash.com/photo-1580237754524-0d98a1fccfed',
          alt: 'Mesa de jantar de madeira'
        }
      }),
      // Text and image showcase
      createTextImageBlock(1, {
        heading: 'Artesanato Contemporâneo',
        content: 'Valorizamos as técnicas artesanais tradicionais, mas as adaptamos para o mundo contemporâneo. Nossos artesãos utilizam ferramentas modernas para criar peças com a mesma atenção aos detalhes de antigamente.',
        image: {
          src: 'https://images.unsplash.com/photo-1531984093292-c7c2d7280430',
          alt: 'Artesão trabalhando com madeira'
        }
      }),
      // Benefits section
      createBenefitsBlock(2, {
        heading: 'Por que escolher o estilo rústico moderno',
        benefits: [
          {
            id: uuidv4(),
            title: 'Aconchego Natural',
            description: 'Cria ambientes calorosos e acolhedores',
            icon: 'Home'
          },
          {
            id: uuidv4(),
            title: 'Durabilidade',
            description: 'Materiais robustos que melhoram com o tempo',
            icon: 'Clock'
          },
          {
            id: uuidv4(),
            title: 'Versatilidade',
            description: 'Combina com diversos estilos de decoração',
            icon: 'Shuffle'
          },
          {
            id: uuidv4(),
            title: 'Conexão com a Natureza',
            description: 'Traz elementos naturais para ambientes urbanos',
            icon: 'Leaf'
          }
        ]
      }),
      // Another video for styling tips
      createVideoBlock(1, {
        videoUrl: 'https://www.youtube.com/watch?v=iNJl-ioF6JQ',
        heading: 'Como combinar peças rústicas e modernas',
        description: 'Nossa designer de interiores compartilha dicas para criar o equilíbrio perfeito entre elementos rústicos e contemporâneos.'
      }),
      // FAQ section
      createFAQBlock(1, {
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Como manter a madeira rústica em bom estado?',
            answer: 'Aplique cera natural a cada 6 meses e evite a exposição direta ao sol.'
          },
          {
            id: uuidv4(),
            question: 'É possível combinar móveis rústicos com décor contemporâneo?',
            answer: 'Sim, na verdade essa é a essência do estilo rústico moderno: a combinação harmoniosa de elementos.'
          },
          {
            id: uuidv4(),
            question: 'Seus móveis são feitos com madeira de reflorestamento?',
            answer: 'Sim, utilizamos madeira certificada e de demolição para garantir sustentabilidade.'
          },
          {
            id: uuidv4(),
            question: 'Vocês podem personalizar as medidas dos móveis?',
            answer: 'Sim, oferecemos serviço de personalização para adaptar as peças ao seu espaço.'
          }
        ]
      }),
      // Call to action
      createCTABlock(1, {
        heading: 'Traga a natureza para dentro de casa',
        content: 'Visite nosso showroom e descubra a beleza do rústico moderno ou agende uma consulta virtual.',
        buttonText: 'Agendar visita',
        buttonUrl: '#visit'
      })
    ]
  }
];
