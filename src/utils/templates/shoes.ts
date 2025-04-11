
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Template para Calçados Esportivos
export const shoesTemplate: Template = {
  id: 'adv-shoes-1',
  name: 'Tênis de Corrida Profissional',
  category: 'shoes',
  blocks: [
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Hero',
      columns: 1,
      visible: true,
      heading: 'Tênis de Corrida Pro-Runner',
      subheading: 'Desenvolvido para quem busca desempenho máximo em cada passada',
      buttonText: 'Ver Detalhes',
      buttonUrl: '#'
    },
    {
      id: uuidv4(),
      type: 'gallery',
      title: 'Galeria',
      columns: 4,
      visible: true,
      images: [
        { id: uuidv4(), src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5', alt: 'Vista lateral', caption: 'Design lateral' },
        { id: uuidv4(), src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a', alt: 'Vista superior', caption: 'Vista superior' },
        { id: uuidv4(), src: 'https://images.unsplash.com/photo-1584735174965-48c48d7edfde', alt: 'Vista frontal', caption: 'Vista frontal' },
        { id: uuidv4(), src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa', alt: 'Solado', caption: 'Tecnologia do solado' },
      ]
    },
    {
      id: uuidv4(),
      type: 'features',
      title: 'Recursos',
      columns: 3,
      visible: true,
      heading: 'Tecnologias Exclusivas',
      features: [
        { id: uuidv4(), title: 'Air Cushion 3.0', description: 'Sistema de amortecimento que retorna energia a cada passada' },
        { id: uuidv4(), title: 'Grip Control', description: 'Solado desenvolvido para máxima aderência em diferentes superfícies' },
        { id: uuidv4(), title: 'Flyknit Ultra', description: 'Tecido respirável que se adapta ao formato do seu pé' },
        { id: uuidv4(), title: 'Suporte Dinâmico', description: 'Estrutura que oferece estabilidade sem comprometer a flexibilidade' },
        { id: uuidv4(), title: 'Drop Preciso', description: 'Drop de 8mm ideal para corridas de longa distância' },
        { id: uuidv4(), title: 'Peso Reduzido', description: 'Apenas 280g (tamanho 41) para máxima performance' }
      ]
    },
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Texto e Imagem',
      columns: 1,
      visible: true,
      heading: 'Conforto Sem Comparação',
      content: 'O Pro-Runner foi desenvolvido após anos de pesquisa com atletas profissionais. Seu sistema de amortecimento exclusivo distribui o impacto de forma uniforme, protegendo suas articulações mesmo nas corridas mais longas. A palmilha anatômica se molda ao seu pé, garantindo conforto personalizado.',
      image: {
        src: 'https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda',
        alt: 'Tecnologia de amortecimento'
      }
    },
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Benefícios',
      columns: 2,
      visible: true,
      heading: 'Ideal Para Todos os Corredores',
      benefits: [
        { id: uuidv4(), title: 'Corredores de Longa Distância', description: 'Amortecimento superior para maratonas e ultramaratonas' },
        { id: uuidv4(), title: 'Treinos de Velocidade', description: 'Resposta rápida e retorno de energia para treinos intensos' },
        { id: uuidv4(), title: 'Uso Diário', description: 'Conforto duradouro para quem passa o dia todo em movimento' },
        { id: uuidv4(), title: 'Recuperação', description: 'Suporte adicional para corredores em fase de recuperação' }
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
        { id: uuidv4(), name: 'Peso', value: '280g (tamanho 41)' },
        { id: uuidv4(), name: 'Drop', value: '8mm' },
        { id: uuidv4(), name: 'Material do cabedal', value: 'Flyknit Ultra respirável' },
        { id: uuidv4(), name: 'Material do solado', value: 'Borracha de carbono de alta durabilidade' },
        { id: uuidv4(), name: 'Amortecimento', value: 'Sistema Air Cushion 3.0' },
        { id: uuidv4(), name: 'Palmilha', value: 'Removível, anatômica' },
        { id: uuidv4(), name: 'Indicado para', value: 'Superfícies como asfalto, pista e terra batida' }
      ]
    },
    {
      id: uuidv4(),
      type: 'cta',
      title: 'CTA',
      columns: 1,
      visible: true,
      heading: 'Eleve Sua Performance',
      content: 'Experimente a diferença que um tênis desenvolvido com tecnologia de ponta pode fazer em seus treinos e competições.',
      buttonText: 'Comprar Agora',
      buttonUrl: '#'
    }
  ]
};
