
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

export const waterFilterTemplate: Template = {
  id: uuidv4(),
  name: 'Filtro IBBL CZ+7 Original',
  category: 'Casa e decoração',
  blocks: [
    // Hero section
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      heading: 'Filtro IBBL CZ+7 Original',
      subheading: 'Água pura e cristalina para o seu dia a dia',
      backgroundImage: '/lovable-uploads/05f724f5-3141-4fee-aa9e-d37e9faae0a4.png',
      buttonText: 'Compre Agora',
      buttonUrl: '#',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#0077be',
        textColor: '#ffffff',
        textAlign: 'center',
        padding: '40px',
      },
    },
    
    // Product description
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Descrição do Produto',
      heading: 'Refil IBBL CZ+7 Original',
      content: 'O refil IBBL CZ+7 Original é a solução ideal para manter a qualidade da água do seu purificador. Compatível com os principais modelos IBBL, este filtro garante água pura e saudável para você e sua família.',
      image: {
        src: '/lovable-uploads/05f724f5-3141-4fee-aa9e-d37e9faae0a4.png',
        alt: 'Filtro IBBL CZ+7 Original',
      },
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        padding: '40px 20px',
      },
    },
    
    // Key benefits
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Principais Benefícios',
      heading: 'Por que escolher o Refil IBBL CZ+7?',
      benefits: [
        {
          id: uuidv4(),
          title: 'Filtragem Eficiente',
          description: 'Remove impurezas, cloro e outras partículas',
          icon: 'filter',
        },
        {
          id: uuidv4(),
          title: 'Durabilidade',
          description: 'Até 3000 litros de água filtrada',
          icon: 'clock',
        },
        {
          id: uuidv4(),
          title: 'Fácil Instalação',
          description: 'Substitua em minutos sem ferramentas',
          icon: 'tool',
        },
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#f8f9fa',
        padding: '40px 20px',
        textAlign: 'center',
      },
    },
    
    // Technical details
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Detalhes Técnicos',
      heading: 'Especificações',
      specs: [
        {
          id: uuidv4(),
          name: 'Modelo',
          value: 'CZ+7',
        },
        {
          id: uuidv4(),
          name: 'Compatibilidade',
          value: 'Purificadores IBBL',
        },
        {
          id: uuidv4(),
          name: 'Vida Útil',
          value: '3 meses ou 3.000 litros',
        },
        {
          id: uuidv4(),
          name: 'Dimensões',
          value: '20cm x 10cm x 10cm',
        },
        {
          id: uuidv4(),
          name: 'Tipo de Filtro',
          value: 'Carvão Ativado',
        },
      ],
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#ffffff',
        padding: '40px 20px',
      },
    },
    
    // Call to action
    {
      id: uuidv4(),
      type: 'cta',
      title: 'Chamada para Ação',
      heading: 'Garanta Água Pura para sua Família',
      content: 'Não comprometa a qualidade da água que você e sua família consomem. Adquira já seu Refil IBBL CZ+7 Original.',
      buttonText: 'Comprar Agora',
      buttonUrl: '#',
      visible: true,
      columns: 'full',
      style: {
        backgroundColor: '#0077be',
        textColor: '#ffffff',
        textAlign: 'center',
        padding: '40px 20px',
      },
    },
  ],
  thumbnail: '/lovable-uploads/05f724f5-3141-4fee-aa9e-d37e9faae0a4.png',
};
