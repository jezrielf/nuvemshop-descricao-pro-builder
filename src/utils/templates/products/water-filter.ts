
import { Template } from '@/types/editor';

export const waterFilterTemplate: Template = {
  id: 'water-filter',
  name: 'Filtro de Água',
  category: 'other',
  blocks: [
    {
      id: 'header',
      type: 'hero',
      title: 'Cabeçalho',
      visible: true,
      columns: 'full',
      heading: 'Refil IBBL CZ+7 Original',
      subheading: 'Tecnologia avançada para água pura e saudável',
      content: '',
      style: {
        backgroundColor: '#0088cc',
        textColor: 'white',
        padding: '20px',
      }
    },
    {
      id: 'intro',
      type: 'text',
      title: 'Introdução',
      visible: true,
      columns: 'full',
      heading: 'A Escolha Ideal para Sua Família',
      content: 'Se você está em busca de um refil de alto desempenho, qualidade comprovada e máxima eficiência na purificação da água, o Refil IBBL CZ+7 Original é a escolha ideal. Projetado com tecnologia avançada e compatível com diversos modelos da linha IBBL, ele garante água pura, livre de impurezas e pronta para o consumo diário de toda a sua família.',
      style: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '24px',
      }
    },
    {
      id: 'features',
      type: 'features',
      title: 'Características',
      visible: true,
      columns: 'full',
      heading: 'Principais Características',
      features: [
        {
          icon: '7',
          title: 'Etapas de Filtragem',
          description: 'Processo completo de purificação'
        },
        {
          icon: '100%',
          title: 'Original',
          description: 'Garantia de autenticidade'
        },
        {
          icon: '6m',
          title: 'Durabilidade',
          description: 'Até 6 meses de uso'
        }
      ],
      style: {
        backgroundColor: '#f5f5f7',
        padding: '40px',
      }
    },
    {
      id: 'description',
      type: 'benefits',
      title: 'Descrição do Produto',
      visible: true,
      columns: 'full',
      heading: 'Principais Benefícios',
      benefits: [
        {
          title: 'Purificação em 7 etapas',
          description: 'Proporciona uma água cristalina, livre de impurezas e com sabor natural.',
          icon: '7'
        },
        {
          title: 'Redução de cloro',
          description: 'Melhora o gosto e o odor da água, além de proteger a saúde da sua família.',
          icon: 'Cl'
        },
        {
          title: 'Ação bacteriostática',
          description: 'Previne a proliferação de micro-organismos no interior do refil.',
          icon: 'B'
        },
        {
          title: 'Troca fácil',
          description: 'O sistema Girou Trocou permite substituição prática, sem ferramentas.',
          icon: '↻'
        },
        {
          title: 'Alta durabilidade',
          description: 'Com até 6 meses de uso contínuo ou 3.000 litros de água, reduz a necessidade de manutenções frequentes.',
          icon: '6m'
        }
      ],
      style: {
        backgroundColor: '#f5f5f7',
        padding: '60px',
      }
    },
    {
      id: 'compatibility',
      type: 'specifications',
      title: 'Compatibilidade',
      visible: true,
      columns: 'full',
      heading: 'Compatibilidade com Purificadores IBBL',
      specifications: [
        { label: 'FR600 Expert', value: 'Compatível' },
        { label: 'FR600 Speciale', value: 'Compatível' },
        { label: 'FRQ600', value: 'Compatível' },
        { label: 'Evolux', value: 'Compatível' },
        { label: 'Immaginare', value: 'Compatível' },
        { label: 'Atlantis', value: 'Compatível' },
        { label: 'PDF', value: 'Compatível' },
        { label: 'E-due', value: 'Compatível' },
        { label: 'FR600 Exclusive', value: 'Compatível' },
        { label: 'FR600 Refrigeração Eletrônica', value: 'Compatível' }
      ],
      style: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '24px'
      }
    },
    {
      id: 'tech-specs',
      type: 'specifications',
      title: 'Especificações Técnicas',
      visible: true,
      columns: 'full',
      heading: 'Especificações Técnicas',
      specifications: [
        { label: 'Modelo', value: 'CZ+7' },
        { label: 'Marca', value: 'IBBL' },
        { label: 'Etapas de Filtragem', value: '7' },
        { label: 'Tecnologia de Troca', value: 'Girou Trocou' },
        { label: 'Eficiência na Retenção de Partículas', value: 'Classe C (≥ 5 a < 15 micra)' },
        { label: 'Eficiência na Redução de Cloro', value: 'Aprovado segundo norma NBR 16098' },
        { label: 'Certificação', value: 'INMETRO' },
        { label: 'Vida útil', value: 'até 6 meses ou 3.000 litros' },
        { label: 'Dimensões', value: '21 cm (altura) x 7,5 cm (largura)' },
        { label: 'Temperatura de operação', value: 'de 5°C a 50°C' }
      ],
      style: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '24px'
      }
    },
    {
      id: 'faq',
      type: 'faq',
      title: 'Perguntas Frequentes',
      visible: true,
      columns: 'full',
      heading: 'Perguntas Frequentes',
      questions: [
        {
          question: 'Esse refil é original da IBBL?',
          answer: 'Sim. O CZ+7 vendido pela H2O é 100% original, com selo IBBL e certificado pelo INMETRO.'
        },
        {
          question: 'Como sei se o CZ+7 serve no meu purificador?',
          answer: 'Verifique o modelo no corpo do seu purificador ou consulte nosso atendimento. Listamos todos os modelos compatíveis nesta descrição.'
        },
        {
          question: 'Posso trocar o refil sozinho?',
          answer: 'Sim. Com o sistema Girou Trocou, basta girar e encaixar o novo refil – sem ferramentas.'
        },
        {
          question: 'Quanto tempo o refil dura?',
          answer: 'A vida útil é de até 6 meses ou 3.000 litros de água, variando de acordo com a qualidade da água da sua região.'
        },
        {
          question: 'Esse refil reduz bactérias?',
          answer: 'Sim. O CZ+7 possui ação bacteriostática, impedindo a proliferação de bactérias no interior do filtro.'
        }
      ],
      style: {
        backgroundColor: '#f5f5f7',
        padding: '40px',
        borderRadius: '24px'
      }
    },
    {
      id: 'cta',
      type: 'cta',
      title: 'Chamada para Ação',
      visible: true,
      columns: 'full',
      heading: 'Garanta Água Pura e Saudável para Sua Família',
      content: 'Invista em qualidade e segurança com o Refil IBBL CZ+7 Original. Produto 100% original com garantia de procedência.',
      buttonText: 'COMPRAR AGORA',
      buttonUrl: '#',
      style: {
        backgroundColor: '#0088cc',
        backgroundImage: 'linear-gradient(135deg, #0088cc 0%, #005580 100%)',
        textColor: 'white',
        padding: '80px 20px'
      }
    }
  ]
};

