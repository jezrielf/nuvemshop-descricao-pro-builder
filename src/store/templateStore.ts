
import { create } from 'zustand';
import { Template, ProductCategory } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

interface TemplateState {
  templates: Template[];
  categories: ProductCategory[];
  selectedCategory: ProductCategory | null;
  
  // Actions
  loadTemplates: () => void;
  selectCategory: (category: ProductCategory | null) => void;
  getTemplatesByCategory: (category: ProductCategory | null) => Template[];
}

// Templates iniciais para demonstração
const initialTemplates: Template[] = [
  {
    id: '1',
    name: 'Suplemento Básico',
    category: 'supplements',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Nome do Suplemento',
        subheading: 'Melhore seu desempenho com nosso suplemento de alta qualidade',
        buttonText: 'Comprar Agora'
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Benefícios',
        columns: 3,
        visible: true,
        heading: 'Benefícios Principais',
        benefits: [
          {
            id: uuidv4(),
            title: 'Aumento de Energia',
            description: 'Proporciona mais energia para seus treinos diários',
            icon: 'zap'
          },
          {
            id: uuidv4(),
            title: 'Recuperação Muscular',
            description: 'Acelera a recuperação após exercícios intensos',
            icon: 'activity'
          },
          {
            id: uuidv4(),
            title: 'Ganho de Massa',
            description: 'Ajuda no desenvolvimento muscular quando combinado com exercícios',
            icon: 'dumbbell'
          }
        ]
      },
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Informações Nutricionais',
        specs: [
          {
            id: uuidv4(),
            name: 'Proteína',
            value: '25g por porção'
          },
          {
            id: uuidv4(),
            name: 'Carboidratos',
            value: '3g por porção'
          },
          {
            id: uuidv4(),
            name: 'Gorduras',
            value: '1.5g por porção'
          },
          {
            id: uuidv4(),
            name: 'Calorias',
            value: '120 por porção'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Camiseta Básica',
    category: 'clothing',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Nome da Camiseta',
        subheading: 'Estilo e conforto para o seu dia a dia',
        buttonText: 'Ver Opções'
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características',
        columns: 2,
        visible: true,
        heading: 'Características do Produto',
        features: [
          {
            id: uuidv4(),
            title: 'Material Premium',
            description: '100% algodão de alta qualidade para maior conforto',
            icon: 'shirt'
          },
          {
            id: uuidv4(),
            title: 'Durabilidade',
            description: 'Tecido resistente à lavagens mantendo a qualidade',
            icon: 'repeat'
          }
        ]
      },
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Informações Técnicas',
        specs: [
          {
            id: uuidv4(),
            name: 'Material',
            value: '100% Algodão'
          },
          {
            id: uuidv4(),
            name: 'Peso',
            value: '180g/m²'
          },
          {
            id: uuidv4(),
            name: 'Tamanhos',
            value: 'P, M, G, GG'
          },
          {
            id: uuidv4(),
            name: 'Instruções de Lavagem',
            value: 'Lavar à mão ou máquina (água fria)'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Produto Eletrônico',
    category: 'electronics',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Nome do Produto Eletrônico',
        subheading: 'Tecnologia avançada para facilitar seu dia a dia',
        buttonText: 'Saiba Mais'
      },
      {
        id: uuidv4(),
        type: 'features',
        title: 'Recursos',
        columns: 3,
        visible: true,
        heading: 'Recursos Principais',
        features: [
          {
            id: uuidv4(),
            title: 'Alta Performance',
            description: 'Processador de última geração para máxima eficiência',
            icon: 'cpu'
          },
          {
            id: uuidv4(),
            title: 'Bateria Duradoura',
            description: 'Até 10 horas de uso contínuo com uma única carga',
            icon: 'battery'
          },
          {
            id: uuidv4(),
            title: 'Conexão Rápida',
            description: 'Wi-Fi 6 e Bluetooth 5.0 para conexões estáveis',
            icon: 'wifi'
          }
        ]
      },
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações',
        columns: 1,
        visible: true,
        heading: 'Especificações Técnicas',
        specs: [
          {
            id: uuidv4(),
            name: 'Processador',
            value: 'Intel Core i7 10ª Geração'
          },
          {
            id: uuidv4(),
            name: 'Memória RAM',
            value: '16GB DDR4'
          },
          {
            id: uuidv4(),
            name: 'Armazenamento',
            value: 'SSD 512GB'
          },
          {
            id: uuidv4(),
            name: 'Sistema Operacional',
            value: 'Windows 11'
          }
        ]
      },
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
            question: 'Qual é a garantia do produto?',
            answer: 'Oferecemos garantia de 12 meses contra defeitos de fabricação.'
          },
          {
            id: uuidv4(),
            question: 'O produto vem com carregador?',
            answer: 'Sim, o produto inclui carregador e cabo USB-C na embalagem.'
          },
          {
            id: uuidv4(),
            question: 'É possível expandir a memória?',
            answer: 'Sim, há um slot adicional para expansão de memória RAM até 32GB.'
          }
        ]
      }
    ]
  }
];

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: initialTemplates,
  categories: ['supplements', 'clothing', 'accessories', 'shoes', 'electronics', 'energy', 'other'],
  selectedCategory: null,
  
  loadTemplates: () => {
    set({ templates: initialTemplates });
  },
  
  selectCategory: (category) => {
    set({ selectedCategory: category });
  },
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    if (!category) return templates;
    return templates.filter((template) => template.category === category);
  }
}));
