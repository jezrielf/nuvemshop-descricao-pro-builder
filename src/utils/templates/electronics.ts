import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

export const electronicsTemplate: Template = {
  id: uuidv4(),
  name: "Template de Eletrônicos",
  category: "electronics",
  blocks: [
    {
      id: uuidv4(),
      type: "hero",
      title: "Banner Principal",
      columns: 1,
      visible: true,
      heading: "Descubra a Última Geração de Eletrônicos",
      subheading: "Inovação e Tecnologia ao Seu Alcance",
      buttonText: "Ver Produtos",
      buttonUrl: "#produtos",
      backgroundImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      style: {}
    },
    {
      id: uuidv4(),
      type: "text",
      title: "Descrição Geral",
      columns: 1,
      visible: true,
      heading: "Por que Escolher Nossos Eletrônicos?",
      content: "Nossos produtos são cuidadosamente selecionados para oferecer o melhor em tecnologia, durabilidade e custo-benefício. Encontre desde smartphones de última geração até acessórios inovadores que facilitam o seu dia a dia.",
      style: {}
    },
    {
      id: uuidv4(),
      type: "benefits",
      title: "Benefícios",
      columns: 2,
      visible: true,
      heading: "Características Principais",
      benefits: [
        {
          id: uuidv4(),
          title: "Alta Durabilidade",
          description: "Construído com materiais de alta qualidade para durar anos",
          icon: "⭐"
        },
        {
          id: uuidv4(),
          title: "Tecnologia Avançada",
          description: "Utiliza os componentes mais recentes do mercado",
          icon: "💻"
        },
        {
          id: uuidv4(),
          title: "Baixo Consumo",
          description: "Design eficiente que economiza energia",
          icon: "🔋"
        },
        {
          id: uuidv4(),
          title: "Garantia Estendida",
          description: "Garantia de 2 anos em todos os produtos",
          icon: "✅"
        }
      ],
      style: {}
    },
    {
      id: uuidv4(),
      type: "specifications",
      title: "Especificações",
      columns: 1,
      visible: true,
      heading: "Especificações Técnicas",
      specs: [
        { id: uuidv4(), name: "Processador", value: "Octa-Core 2.8GHz" },
        { id: uuidv4(), name: "Memória RAM", value: "8GB" },
        { id: uuidv4(), name: "Armazenamento", value: "256GB SSD" },
        { id: uuidv4(), name: "Tela", value: "AMOLED 6.5 polegadas" }
      ],
      style: {}
    },
    {
      id: uuidv4(),
      type: "cta",
      title: "Chamada para Ação",
      columns: 1,
      visible: true,
      heading: "Não Perca Tempo!",
      content: "Aproveite nossas ofertas exclusivas e garanta já o seu eletrônico de última geração.",
      buttonText: "Comprar Agora",
      buttonUrl: "#comprar",
      style: {}
    }
  ]
};
