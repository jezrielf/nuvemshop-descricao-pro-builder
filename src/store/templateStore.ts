
import { create } from 'zustand';
import { Template } from '@/types/editor';
import { advancedTemplates } from '@/utils/advancedTemplates';

interface TemplateState {
  templates: Template[];
  categories: string[];
  selectedCategory: string | null;
  loadTemplates: () => void;
  selectCategory: (category: string | null) => void;
  getTemplatesByCategory: (category: string | null) => Template[];
}

// Simula o carregamento de templates da API
const mockTemplates: Template[] = [
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
        buttonUrl: '#',
        image: {
          src: '',
          alt: 'Suplemento Proteico'
        }
      },
      {
        id: 'block-2',
        type: 'features',
        title: 'Características',
        columns: 3,
        visible: true,
        heading: 'Principais Características',
        features: [
          { title: 'Alta Absorção', description: 'Fórmula de rápida absorção para melhores resultados' },
          { title: 'Sem Açúcar', description: 'Zero açúcar para não comprometer sua dieta' },
          { title: 'Sabor Superior', description: 'Sabor desenvolvido para uma experiência agradável' }
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
        buttonUrl: '#',
        image: {
          src: '',
          alt: 'Camiseta Premium'
        }
      },
      {
        id: 'block-2',
        type: 'gallery',
        title: 'Galeria',
        columns: 3,
        visible: true,
        images: [
          { src: '', alt: 'Frente', caption: 'Vista frontal' },
          { src: '', alt: 'Costas', caption: 'Vista traseira' },
          { src: '', alt: 'Detalhe', caption: 'Detalhe do tecido' }
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
          { name: 'Material', value: '100% Algodão' },
          { name: 'Cores', value: 'Preto, Branco, Azul' },
          { name: 'Tamanhos', value: 'P, M, G, GG' },
          { name: 'Tipo de Gola', value: 'Redonda' }
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
  // Adicionando mais templates básicos
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
        buttonUrl: '#',
        image: {
          src: '',
          alt: 'Smartphone XYZ'
        }
      },
      {
        id: 'block-2',
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Especificações Técnicas',
        specs: [
          { name: 'Processador', value: 'Octa-core 2.3GHz' },
          { name: 'Memória RAM', value: '8GB' },
          { name: 'Armazenamento', value: '128GB' },
          { name: 'Tela', value: '6.5" AMOLED' },
          { name: 'Câmera', value: '48MP + 12MP + 5MP' },
          { name: 'Bateria', value: '4500mAh' }
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
          { title: 'Carregamento Rápido', description: '50% de bateria em apenas 30 minutos' },
          { title: 'Câmera Profissional', description: 'Capture momentos com qualidade de DSLR' },
          { title: 'Resistente à Água', description: 'Certificação IP68 contra água e poeira' }
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
        buttonUrl: '#',
        image: {
          src: '',
          alt: 'Produto Premium'
        }
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

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  categories: [],
  selectedCategory: null,
  
  loadTemplates: () => {
    // Combina os templates básicos com os avançados
    const allTemplates = [...mockTemplates, ...advancedTemplates];
    
    // Extrai categorias únicas dos templates
    const uniqueCategories = Array.from(
      new Set(allTemplates.map(template => template.category))
    );
    
    set({
      templates: allTemplates,
      categories: uniqueCategories
    });
  },
  
  selectCategory: (category) => {
    set({ selectedCategory: category });
  },
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    if (!category) return templates;
    return templates.filter(template => template.category === category);
  }
}));
