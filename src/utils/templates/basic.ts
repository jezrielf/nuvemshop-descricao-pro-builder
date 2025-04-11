
import { Template, ProductCategory } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Helper function to generate IDs
const generateId = () => uuidv4();

// Simula o carregamento de templates básicos
export const basicTemplates: Template[] = [
  {
    id: 'template-1',
    name: 'Descrição Básica',
    category: 'supplements',
    blocks: [
      {
        id: 'block-1',
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Suplemento Proteico',
        subheading: 'Maximize seus resultados com nossa fórmula exclusiva',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      },
      {
        id: 'block-2',
        type: 'features',
        title: 'Características',
        columns: 3,
        visible: true,
        heading: 'Principais Características',
        features: [
          { id: generateId(), title: 'Alta Absorção', description: 'Fórmula de rápida absorção para melhores resultados' },
          { id: generateId(), title: 'Sem Açúcar', description: 'Zero açúcar para não comprometer sua dieta' },
          { id: generateId(), title: 'Sabor Superior', description: 'Sabor desenvolvido para uma experiência agradável' }
        ]
      },
      {
        id: 'block-3',
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Experimente Agora',
        content: 'Transforme seus resultados com nosso suplemento premium.',
        buttonText: 'Comprar',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'template-2',
    name: 'Descrição Detalhada',
    category: 'clothing',
    blocks: [
      {
        id: 'block-1',
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Camiseta Premium',
        subheading: 'Conforto e estilo para o dia a dia',
        buttonText: 'Ver Detalhes',
        buttonUrl: '#'
      },
      {
        id: 'block-2',
        type: 'gallery',
        title: 'Galeria',
        columns: 3,
        visible: true,
        images: [
          { id: generateId(), src: '', alt: 'Frente', caption: 'Vista frontal' },
          { id: generateId(), src: '', alt: 'Costas', caption: 'Vista traseira' },
          { id: generateId(), src: '', alt: 'Detalhe', caption: 'Detalhe do tecido' }
        ]
      },
      {
        id: 'block-3',
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Especificações do Produto',
        specs: [
          { id: generateId(), name: 'Material', value: '100% Algodão' },
          { id: generateId(), name: 'Cores', value: 'Preto, Branco, Azul' },
          { id: generateId(), name: 'Tamanhos', value: 'P, M, G, GG' },
          { id: generateId(), name: 'Tipo de Gola', value: 'Redonda' }
        ]
      },
      {
        id: 'block-4',
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Adicione ao Carrinho',
        content: 'Renove seu guarda-roupa com nossa camiseta premium.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  },
  {
    id: 'template-3',
    name: 'Descrição de Eletrônicos',
    category: 'electronics',
    blocks: [
      {
        id: 'block-1',
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Smartphone XYZ',
        subheading: 'A tecnologia do futuro em suas mãos',
        buttonText: 'Saiba Mais',
        buttonUrl: '#'
      },
      {
        id: 'block-2',
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Especificações Técnicas',
        specs: [
          { id: generateId(), name: 'Processador', value: 'Octa-core 2.3GHz' },
          { id: generateId(), name: 'Memória RAM', value: '8GB' },
          { id: generateId(), name: 'Armazenamento', value: '128GB' },
          { id: generateId(), name: 'Tela', value: '6.5" AMOLED' },
          { id: generateId(), name: 'Câmera', value: '48MP + 12MP + 5MP' },
          { id: generateId(), name: 'Bateria', value: '4500mAh' }
        ]
      },
      {
        id: 'block-3',
        type: 'features',
        title: 'Recursos',
        columns: 3,
        visible: true,
        heading: 'Recursos Principais',
        features: [
          { id: generateId(), title: 'Carregamento Rápido', description: '50% de bateria em apenas 30 minutos' },
          { id: generateId(), title: 'Câmera Profissional', description: 'Capture momentos com qualidade de DSLR' },
          { id: generateId(), title: 'Resistente à Água', description: 'Certificação IP68 contra água e poeira' }
        ]
      }
    ]
  },
  {
    id: 'template-4',
    name: 'Descrição Simples',
    category: 'other',
    blocks: [
      {
        id: 'block-1',
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Produto Premium',
        subheading: 'Qualidade e inovação em cada detalhe',
        buttonText: 'Ver Mais',
        buttonUrl: '#'
      },
      {
        id: 'block-2',
        type: 'text',
        title: 'Texto',
        columns: 1,
        visible: true,
        heading: 'Sobre o Produto',
        content: 'Este produto foi desenvolvido com os mais altos padrões de qualidade para atender às suas necessidades. Com design moderno e funcionalidades exclusivas, ele certamente superará suas expectativas.'
      },
      {
        id: 'block-3',
        type: 'cta',
        title: 'Chamada para Ação',
        columns: 1,
        visible: true,
        heading: 'Não Perca Esta Oportunidade',
        content: 'Adquira agora mesmo e aproveite todos os benefícios.',
        buttonText: 'Comprar',
        buttonUrl: '#'
      }
    ]
  }
];
