import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

export const basicTemplate: Template = {
  id: uuidv4(),
  name: "Template Básico",
  category: "other",
  blocks: [
    {
      id: uuidv4(),
      type: "hero",
      title: "Banner Principal",
      columns: 1,
      visible: true,
      heading: "Título do Produto",
      subheading: "Descrição chamativa do produto",
      buttonText: "Compre Agora",
      buttonUrl: "#",
      backgroundImage: "URL_DA_IMAGEM",
      style: {}
    },
    {
      id: uuidv4(),
      type: "text",
      title: "Descrição Detalhada",
      columns: 1,
      visible: true,
      heading: "Sobre o Produto",
      content: "Uma descrição completa e informativa sobre o produto, destacando seus benefícios e características.",
      style: {}
    },
    {
      id: uuidv4(),
      type: "features",
      title: "Recursos",
      columns: 3,
      visible: true,
      heading: "Características Principais",
      features: [
        {
          id: uuidv4(),
          title: "Recurso 1",
          description: "Descrição do recurso 1",
          icon: "URL_DO_ICONE"
        },
        {
          id: uuidv4(),
          title: "Recurso 2",
          description: "Descrição do recurso 2",
          icon: "URL_DO_ICONE"
        },
        {
          id: uuidv4(),
          title: "Recurso 3",
          description: "Descrição do recurso 3",
          icon: "URL_DO_ICONE"
        }
      ],
      style: {}
    },
    {
      id: uuidv4(),
      type: "benefits",
      title: "Benefícios",
      columns: 2,
      visible: true,
      heading: "Benefícios do Produto",
      benefits: [
        {
          id: "benefit1",
          title: "Benefício 1",
          description: "Descrição do benefício 1",
          icon: "✓" // Adding default icon
        },
        {
          id: "benefit2",
          title: "Benefício 2",
          description: "Descrição do benefício 2",
          icon: "✓" // Adding default icon
        },
        {
          id: "benefit3",
          title: "Benefício 3",
          description: "Descrição do benefício 3",
          icon: "✓" // Adding default icon
        }
      ],
      style: {}
    },
    {
      id: uuidv4(),
      type: "cta",
      title: "Chamada para Ação",
      columns: 1,
      visible: true,
      heading: "Não perca tempo!",
      content: "Aproveite esta oferta exclusiva por tempo limitado.",
      buttonText: "Compre Agora",
      buttonUrl: "#",
      style: {}
    }
  ]
};
