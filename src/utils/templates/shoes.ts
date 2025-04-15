import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

export const shoesTemplateA: Template = {
  id: uuidv4(),
  name: 'Template de Sapatos A',
  category: 'shoes',
  blocks: [
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      columns: 1,
      visible: true,
      heading: 'Encontre o Seu Par Perfeito',
      subheading: 'Descubra nossa nova coleção de sapatos',
      buttonText: 'Compre Agora',
      buttonUrl: '#',
      backgroundImage: 'https://images.unsplash.com/photo-1542296660-6e538a53498a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      style: {}
    },
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Benefícios',
      columns: 2,
      visible: true,
      heading: 'Por que Escolher Nossos Sapatos?',
      benefits: [
        {
          id: uuidv4(),
          title: 'Conforto Excepcional',
          description: 'Tecnologia de amortecimento que se adapta a cada passo',
          icon: "👟"
        },
        {
          id: uuidv4(),
          title: 'Estilo Moderno',
          description: 'Design contemporâneo para qualquer ocasião',
          icon: "✨"
        },
        {
          id: uuidv4(),
          title: 'Material Durável',
          description: 'Construído para durar, mesmo sob uso intenso',
          icon: "🔄"
        },
        {
          id: uuidv4(),
          title: 'Respirabilidade',
          description: 'Mantém seus pés frescos mesmo nos dias mais quentes',
          icon: "💨"
        },
        {
          id: uuidv4(),
          title: 'Tração Superior',
          description: 'Sola com aderência em qualquer superfície',
          icon: "🔒"
        },
        {
          id: uuidv4(),
          title: 'Leve como uma Pluma',
          description: 'Materiais leves para reduzir a fadiga',
          icon: "🪶"
        }
      ],
      style: {}
    },
    {
      id: uuidv4(),
      type: 'gallery',
      title: 'Galeria de Sapatos',
      columns: 1,
      visible: true,
      images: [
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1515955656352-a1a717cedcd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
          alt: 'Sapato Esportivo',
          caption: 'Conforto e estilo para seus treinos'
        },
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1588361035994-295e21daa67a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
          alt: 'Sapato Casual',
          caption: 'Perfeito para o dia a dia'
        }
      ],
      style: {}
    }
  ]
};

export const shoesTemplateB: Template = {
  id: uuidv4(),
  name: 'Template de Sapatos B',
  category: 'shoes',
  blocks: [
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      columns: 1,
      visible: true,
      heading: 'Sapatos que Acompanham Seu Ritmo',
      subheading: 'Inovação e conforto em cada detalhe',
      buttonText: 'Ver Coleção',
      buttonUrl: '#',
      backgroundImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNob2VzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
      style: {}
    },
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Benefícios',
      columns: 2,
      visible: true,
      heading: 'Descubra o Conforto e Estilo',
      benefits: [
        {
          id: uuidv4(),
          title: 'Conforto Todo Dia',
          description: 'Caminhadas longas sem desconforto',
          icon: "👣"
        },
        {
          id: uuidv4(),
          title: 'Estilo Versátil',
          description: 'Combina com qualquer roupa',
          icon: "👕"
        },
        {
          id: uuidv4(),
          title: 'Material Premium',
          description: 'Qualidade que se vê e se sente',
          icon: "🔝"
        },
        {
          id: uuidv4(),
          title: 'Fácil de Limpar',
          description: 'Manutenção simples para manter como novo',
          icon: "🧼"
        }
      ],
      style: {}
    },
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Imagem e Texto',
      columns: 1,
      visible: true,
      image: {
        src: 'https://images.unsplash.com/photo-1606107557195-0a29a5b4b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
        alt: 'Detalhes do Sapato'
      },
      heading: 'Detalhes que Fazem a Diferença',
      content: 'Design inovador e materiais de alta qualidade para o máximo conforto.',
      style: {}
    }
  ]
};
