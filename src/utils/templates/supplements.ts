import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

export const supplementsTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Template de Suplementos A',
    category: 'supplements',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'Suplementos de Alta Performance',
        subheading: 'Aumente sua energia e alcance seus objetivos',
        buttonText: 'Compre Agora',
        buttonUrl: '/suplementos',
        backgroundImage: 'https://source.unsplash.com/1600x900/?supplements',
        style: {}
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Benefícios',
        columns: 3,
        visible: true,
        heading: 'Nossos Suplementos Oferecem',
        benefits: [
          {
            id: uuidv4(),
            title: 'Aumento de Energia',
            description: 'Sinta-se mais disposto para seus treinos',
            icon: "⚡"
          },
          {
            id: uuidv4(),
            title: 'Recuperação Muscular',
            description: 'Recupere-se mais rápido entre os treinos',
            icon: "💪"
          },
          {
            id: uuidv4(),
            title: 'Ganho de Massa',
            description: 'Construa músculos mais facilmente',
            icon: "🏋️"
          }
        ],
        style: {}
      },
      {
        id: uuidv4(),
        type: 'text',
        title: 'Descrição',
        columns: 1,
        visible: true,
        heading: 'Sobre Nossos Suplementos',
        content: 'Nossos suplementos são formulados com ingredientes de alta qualidade para garantir o máximo desempenho e resultados. Testados e aprovados por especialistas.',
        style: {}
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Template de Suplementos B',
    category: 'supplements',
    blocks: [
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        columns: 1,
        visible: true,
        heading: 'A Nutrição que Você Precisa',
        subheading: 'Suplementos para uma vida mais saudável e ativa',
        buttonText: 'Ver Produtos',
        buttonUrl: '/suplementos',
        backgroundImage: 'https://source.unsplash.com/1600x900/?nutrition',
        style: {}
      },
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações',
        columns: 2,
        visible: true,
        heading: 'Especificações dos Nossos Produtos',
        specs: [
          { id: uuidv4(), name: 'Vitaminas', value: 'A, B, C, D, E' },
          { id: uuidv4(), name: 'Minerais', value: 'Zinco, Magnésio, Cálcio' },
          { id: uuidv4(), name: 'Proteínas', value: 'Whey, Caseína, Soja' },
          { id: uuidv4(), name: 'Aminoácidos', value: 'BCAA, Glutamina, Creatina' }
        ],
        style: {}
      },
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Qualidade e Confiança',
        columns: 3,
        visible: true,
        heading: 'Por que Escolher Nossos Suplementos?',
        benefits: [
          {
            id: uuidv4(),
            title: 'Qualidade Premium',
            description: 'Ingredientes de alta qualidade e pureza',
            icon: "✅"
          },
          {
            id: uuidv4(),
            title: 'Sem Conservantes',
            description: 'Formulação livre de conservantes artificiais',
            icon: "🌱"
          },
          {
            id: uuidv4(),
            title: 'Resultados Comprovados',
            description: 'Eficácia comprovada por estudos clínicos',
            icon: "🔬"
          }
        ],
        style: {}
      }
    ]
  }
];
