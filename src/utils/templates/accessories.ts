
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const accessoriesTemplate: Template = {
  id: 'adv-accessories-01',
  name: 'Acessórios Exclusivos',
  category: 'accessories',
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
      image: {
        src: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        alt: 'Coleção de Acessórios Exclusivos'
      },
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
    // TextImage Block
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Descrição da Coleção',
      columns: 2,
      visible: true,
      heading: 'Design contemporâneo com inspiração clássica',
      content: '<p>Nossa coleção de acessórios combina elementos tradicionais do artesanato com uma abordagem contemporânea, criando peças únicas que complementam qualquer visual.</p><p>Cada acessório é projetado para ser versátil, permitindo que você o use em diversas ocasiões, do dia a dia aos eventos mais sofisticados.</p><p>A atenção aos detalhes é uma marca registrada de nossas peças, desde a seleção dos materiais até o acabamento impecável.</p>',
      image: {
        src: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a',
        alt: 'Acessório artesanal'
      },
      style: {
        backgroundColor: '#f5f5f5',
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
      heading: 'Conheça nossas peças exclusivas',
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
    // Features Block
    {
      id: uuidv4(),
      type: 'features',
      title: 'Cuidados com suas peças',
      columns: 1,
      visible: true,
      heading: 'Como preservar seus acessórios',
      features: [
        {
          id: uuidv4(),
          title: 'Armazenamento Adequado',
          description: 'Guarde suas peças em local seco, preferencialmente em embalagens individuais ou organizadores específicos.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Limpeza Regular',
          description: 'Use apenas produtos específicos para cada material, evitando substâncias abrasivas.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Evite Contato com Produtos Químicos',
          description: 'Retire seus acessórios antes de aplicar perfumes, cremes ou produtos de limpeza.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Manutenção Preventiva',
          description: 'Verifique regularmente o estado de fechos, correntes e encaixes para prevenir danos.',
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
};
