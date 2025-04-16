
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Accessories Template Collection
export const accessoriesTemplates: Template[] = [
  // TEMPLATE 1: Premium Accessories
  {
    id: uuidv4(),
    name: 'Acessórios Premium',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Acessórios que complementam seu estilo',
        subheading: 'Detalhes que fazem toda a diferença na composição do seu visual',
        buttonText: 'Ver Coleção',
        buttonUrl: '#collection',
        backgroundImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        style: {
          backgroundColor: '#f8f8f8',
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
        title: 'Diferenciais dos Acessórios',
        columns: 3,
        visible: true,
        heading: 'Por que nossos acessórios são especiais',
        benefits: [
          {
            id: uuidv4(),
            title: 'Artesanato Premium',
            description: 'Cada peça é desenvolvida por artesãos experientes com técnicas tradicionais e modernas.',
            icon: '🔷'
          },
          {
            id: uuidv4(),
            title: 'Materiais Exclusivos',
            description: 'Utilizamos apenas matérias-primas de alta qualidade, incluindo metais nobres e pedras naturais.',
            icon: '💎'
          },
          {
            id: uuidv4(),
            title: 'Design Atemporal',
            description: 'Peças que transcendem tendências e permanecem relevantes ao longo do tempo.',
            icon: '⏱️'
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
      // Gallery Block
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria da Coleção',
        columns: 3,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f',
            alt: 'Colar artesanal',
            caption: 'Colar Ágata Azul'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1635767798638-3685bcb2b4b3',
            alt: 'Pulseira de couro',
            caption: 'Pulseira Toscana'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427',
            alt: 'Conjunto de anéis',
            caption: 'Anéis Minimalistas'
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
        heading: 'Eleve seu estilo com nossos acessórios exclusivos',
        content: 'Peças atemporais que transformam qualquer visual. Garantia de 1 ano em todas as peças.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#212121',
          headingColor: '#ffffff',
          textColor: '#ffffff',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  },
  
  // TEMPLATE 2: Accessories Collection
  {
    id: uuidv4(),
    name: 'Coleção de Acessórios',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Coleção Exclusiva de Acessórios',
        subheading: 'Peças únicas para completar seu look com elegância',
        buttonText: 'Explorar',
        buttonUrl: '#explore',
        backgroundImage: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a',
        style: {
          backgroundColor: '#f0f0f0',
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
        title: 'Imagem Destaque',
        columns: 1,
        visible: true,
        src: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed',
        alt: 'Acessório Destaque da Coleção',
        caption: 'Brincos Cristal - Edição Limitada',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#000000',
          textColor: '#333333',
          padding: 'md',
          blockSpacing: 'md',
          imageFit: 'cover'
        }
      },
      // Features Block
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características do Produto',
        columns: 3,
        visible: true,
        heading: 'Características e Vantagens',
        features: [
          {
            id: uuidv4(),
            title: 'Hipoalergênico',
            description: 'Materiais testados e seguros para todos os tipos de pele',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Feito à Mão',
            description: 'Produção artesanal com atenção aos detalhes',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Resistente à Água',
            description: 'Peças com tratamento especial para maior durabilidade',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Certificado de Autenticidade',
            description: 'Cada peça acompanha certificado de originalidade',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Embalagem Exclusiva',
            description: 'Apresentação premium para presente ou uso pessoal',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Garantia Estendida',
            description: 'Garantia de 2 anos contra defeitos de fabricação',
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
      // ImageText Block
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Sobre a Coleção',
        columns: 1,
        visible: true,
        image: {
          src: 'https://images.unsplash.com/photo-1631965004544-1762fc696476',
          alt: 'Criação de acessórios'
        },
        heading: 'Inspiração e Processo Criativo',
        content: 'Nossa nova coleção é inspirada em elementos geométricos e formas orgânicas da natureza. Cada peça é cuidadosamente desenhada e produzida por artesãos especializados, garantindo a mais alta qualidade e atenção aos detalhes. Utilizamos apenas materiais sustentáveis e éticos em nossa produção.',
        style: {
          backgroundColor: '#ffffff',
          headingColor: '#000000',
          textColor: '#333333',
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
        heading: 'Especificações do Produto',
        specs: [
          { id: uuidv4(), name: 'Material', value: 'Prata 925 / Ouro 18k' },
          { id: uuidv4(), name: 'Peso', value: '3.5g - 8.2g (dependendo do modelo)' },
          { id: uuidv4(), name: 'Dimensões', value: '2cm x 1.5cm (ajustável)' },
          { id: uuidv4(), name: 'Acabamento', value: 'Polido / Fosco / Texturizado' },
          { id: uuidv4(), name: 'Pedras', value: 'Zircônia / Quartzo / Ágata' }
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
  
  // TEMPLATE 3: Luxury Accessories
  {
    id: uuidv4(),
    name: 'Acessórios de Luxo',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0',
    blocks: [
      // Hero Block
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Acessórios de Luxo',
        subheading: 'Sofisticação e elegância em cada detalhe',
        buttonText: 'Descubra',
        buttonUrl: '#discover',
        backgroundImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0',
        style: {
          backgroundColor: '#000000',
          headingColor: '#ffffff',
          textColor: '#f0f0f0',
          padding: 'lg',
          blockSpacing: 'md'
        }
      },
      // Text Block
      {
        id: uuidv4(),
        type: 'text',
        title: 'Descrição da Coleção',
        columns: 1,
        visible: true,
        heading: 'Requinte em Cada Detalhe',
        content: '<p>Nossa coleção de acessórios de luxo representa o ápice da sofisticação e artesanato. Cada peça é meticulosamente criada por mestres joalheiros, utilizando materiais preciosos e técnicas tradicionais transmitidas por gerações.</p><p>As peças combinam design contemporâneo com elementos clássicos, resultando em acessórios que são verdadeiras obras de arte que resistem ao teste do tempo.</p>',
        style: {
          backgroundColor: '#ffffff',
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
        title: 'Galeria de Produtos',
        columns: 2,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1576053139394-f0c3f4e1a85f',
            alt: 'Relógio de luxo',
            caption: 'Relógio Cronógrafo Série Platinum'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d',
            alt: 'Pulseira em ouro',
            caption: 'Pulseira Entrelaçada Ouro 18k'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e',
            alt: 'Conjunto de anéis',
            caption: 'Anéis Trilogy Diamantes'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401',
            alt: 'Colar de pérolas',
            caption: 'Colar Pérolas Akoya Genuínas'
          }
        ],
        style: {
          backgroundColor: '#f8f8f8',
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
            question: 'Como garantir a autenticidade dos produtos?',
            answer: 'Todos os nossos produtos vêm com certificado de autenticidade numerado e verificável, além de gravação a laser exclusiva em cada peça.'
          },
          {
            id: uuidv4(),
            question: 'Qual a política de devolução?',
            answer: 'Oferecemos 30 dias para devolução ou troca, desde que o produto esteja em perfeito estado e com todas as embalagens originais.'
          },
          {
            id: uuidv4(),
            question: 'Vocês oferecem serviço de personalização?',
            answer: 'Sim, oferecemos serviço de gravação e personalização em peças selecionadas. Entre em contato com nossa equipe para mais detalhes.'
          },
          {
            id: uuidv4(),
            question: 'Como cuidar adequadamente dos acessórios?',
            answer: 'Recomendamos guardar as peças na embalagem original, evitar contato com produtos químicos e limpar regularmente com produtos específicos para o material de cada acessório.'
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
        heading: 'Experimente o Luxo Autêntico',
        content: 'Conheça nossa coleção exclusiva e descubra peças que combinam perfeitamente com seu estilo sofisticado.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#buy',
        style: {
          backgroundColor: '#1a1a1a',
          headingColor: '#ffffff',
          textColor: '#cccccc',
          padding: 'lg',
          blockSpacing: 'none'
        }
      }
    ]
  }
];

// For backward compatibility with existing code that might expect a single template
export const accessoriesTemplate = accessoriesTemplates[0];
