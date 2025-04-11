
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Template para Suplementos Esportivos
export const supplementsTemplate: Template = {
  id: 'adv-supplements-1',
  name: 'Suplemento Proteico Premium',
  category: 'supplements',
  blocks: [
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Hero',
      columns: 1,
      visible: true,
      heading: 'Proteína Whey Premium',
      subheading: 'Maximize seus resultados com a proteína de mais alta qualidade do mercado',
      buttonText: 'Comprar Agora',
      buttonUrl: '#'
    },
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Benefícios',
      columns: 3,
      visible: true,
      heading: 'Benefícios Exclusivos',
      benefits: [
        { id: uuidv4(), title: 'Absorção Rápida', description: 'Fórmula de rápida absorção para resultados imediatos' },
        { id: uuidv4(), title: 'Alto Valor Biológico', description: '25g de proteína por dose com todos os aminoácidos essenciais' },
        { id: uuidv4(), title: 'Zero Açúcar', description: 'Desenvolvido para atender às dietas mais rigorosas, sem açúcar adicionado' }
      ]
    },
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações',
      columns: 1,
      visible: true,
      heading: 'Informação Nutricional',
      specs: [
        { id: uuidv4(), name: 'Proteína por dose', value: '25g' },
        { id: uuidv4(), name: 'Carboidratos', value: '3g' },
        { id: uuidv4(), name: 'Gorduras', value: '1.5g' },
        { id: uuidv4(), name: 'Açúcares', value: '0g' },
        { id: uuidv4(), name: 'Aminoácidos BCAA', value: '5.5g' },
        { id: uuidv4(), name: 'Glutamina', value: '4g' }
      ]
    },
    {
      id: uuidv4(),
      type: 'features',
      title: 'Recursos',
      columns: 2,
      visible: true,
      heading: 'Por Que Escolher Nossa Proteína',
      features: [
        { id: uuidv4(), title: 'Certificação de Qualidade', description: 'Produto testado e certificado, livre de impurezas' },
        { id: uuidv4(), title: 'Matéria-Prima Premium', description: 'Produzido com proteínas importadas de alta qualidade' },
        { id: uuidv4(), title: 'Sabores Exclusivos', description: 'Disponível em diversos sabores desenvolvidos por especialistas' },
        { id: uuidv4(), title: 'Produção Nacional', description: 'Fabricado no Brasil com os mais altos padrões de qualidade' }
      ]
    },
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Imagem e Texto',
      columns: 1,
      visible: true,
      heading: 'Tecnologia de Filtração Avançada',
      content: 'Nossa proteína passa por um processo exclusivo de microfiltração que preserva as frações proteicas e potencializa os resultados. Este processo garante a mais alta pureza e biodisponibilidade do mercado.',
      image: {
        src: 'https://images.unsplash.com/photo-1614630982169-e89cf9eb5d10',
        alt: 'Processo de filtração avançada'
      }
    },
    {
      id: uuidv4(),
      type: 'faq',
      title: 'FAQ',
      columns: 1,
      visible: true,
      heading: 'Perguntas Frequentes',
      questions: [
        { id: uuidv4(), question: 'Qual o melhor horário para consumir?', answer: 'O melhor momento é logo após o treino, quando seu corpo está mais receptivo aos nutrientes.' },
        { id: uuidv4(), question: 'Posso consumir mesmo em dias sem treino?', answer: 'Sim, a proteína pode ser consumida diariamente para complementar sua ingestão proteica.' },
        { id: uuidv4(), question: 'Este produto contém lactose?', answer: 'Nossa proteína possui baixíssimo teor de lactose, mas não é completamente livre.' },
        { id: uuidv4(), question: 'Quantas doses devo tomar por dia?', answer: 'Recomenda-se 1-2 doses diárias, dependendo da sua necessidade proteica total.' }
      ]
    },
    {
      id: uuidv4(),
      type: 'cta',
      title: 'CTA',
      columns: 1,
      visible: true,
      heading: 'Pronto para Elevar seus Resultados?',
      content: 'Adquira agora a Proteína Whey Premium e experimente a diferença de um suplemento de alta qualidade.',
      buttonText: 'Comprar Agora',
      buttonUrl: '#'
    }
  ]
};
