
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const fashionTemplate: Template = {
  id: 'adv-fashion-01',
  name: 'Moda Premium',
  category: 'clothing',
  blocks: [
    // Hero Block
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Banner Principal',
      columns: 1,
      visible: true,
      heading: 'Elegância que transforma o seu estilo',
      subheading: 'Descubra peças exclusivas que elevam seu visual a um novo patamar',
      buttonText: 'Ver Coleção',
      buttonUrl: '#collection',
      image: {
        src: 'https://images.unsplash.com/photo-1560243563-062bfc001d68',
        alt: 'Coleção de Moda Premium'
      },
      style: {
        backgroundColor: '#f5f5f5',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Benefits Block
    {
      id: uuidv4(),
      type: 'benefits',
      title: 'Diferenciais da Marca',
      columns: 3,
      visible: true,
      heading: 'Por que escolher nossa marca',
      benefits: [
        {
          id: uuidv4(),
          title: 'Design Exclusivo',
          description: 'Peças desenvolvidas por estilistas renomados com atenção aos mínimos detalhes.',
          icon: '✨'
        },
        {
          id: uuidv4(),
          title: 'Materiais Premium',
          description: 'Utilizamos apenas tecidos de alta qualidade que garantem conforto e durabilidade.',
          icon: '🧵'
        },
        {
          id: uuidv4(),
          title: 'Produção Ética',
          description: 'Compromisso com práticas sustentáveis e condições justas de trabalho.',
          icon: '♻️'
        }
      ],
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Features Block
    {
      id: uuidv4(),
      type: 'features',
      title: 'Características do Produto',
      columns: 1,
      visible: true,
      heading: 'Composição e Características',
      features: [
        {
          id: uuidv4(),
          title: 'Tecido Premium',
          description: '100% algodão egípcio de alta densidade para máximo conforto e durabilidade.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Acabamento Impecável',
          description: 'Costuras reforçadas e detalhes finalizados à mão para garantir perfeição.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Versatilidade',
          description: 'Design versátil que permite combinações para diferentes ocasiões.',
          icon: '✓'
        },
        {
          id: uuidv4(),
          title: 'Conforto Superior',
          description: 'Modelagem estudada para proporcionar liberdade de movimentos e caimento perfeito.',
          icon: '✓'
        }
      ],
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Gallery Block
    {
      id: uuidv4(),
      type: 'gallery',
      title: 'Galeria da Coleção',
      columns: 3,
      visible: true,
      heading: 'Conheça nossa coleção exclusiva',
      images: [
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
          alt: 'Modelo vestindo roupa da coleção',
          caption: 'Blazer Estruturado'
        },
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
          alt: 'Modelo vestindo roupa da coleção',
          caption: 'Vestido Midi'
        },
        {
          id: uuidv4(),
          src: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9',
          alt: 'Modelo vestindo roupa da coleção',
          caption: 'Conjunto Coordenado'
        }
      ],
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // Specifications Block
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações do Produto',
      columns: 1,
      visible: true,
      heading: 'Detalhes técnicos',
      specs: [
        {
          id: uuidv4(),
          name: 'Composição',
          value: '100% Algodão Egípcio'
        },
        {
          id: uuidv4(),
          name: 'Peso do Tecido',
          value: '180g/m²'
        },
        {
          id: uuidv4(),
          name: 'Origem',
          value: 'Fabricado no Brasil'
        },
        {
          id: uuidv4(),
          name: 'Instruções de Lavagem',
          value: 'Lavagem à mão ou máquina em ciclo delicado, água fria'
        },
        {
          id: uuidv4(),
          name: 'Certificações',
          value: 'GOTS (Global Organic Textile Standard)'
        }
      ],
      style: {
        backgroundColor: '#f8f9fa',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // FAQ Block
    {
      id: uuidv4(),
      type: 'faq',
      title: 'Perguntas Frequentes',
      columns: 1,
      visible: true,
      heading: 'Dúvidas comuns sobre nossos produtos',
      questions: [
        {
          id: uuidv4(),
          question: 'Qual a política de troca?',
          answer: 'Aceitamos trocas em até 30 dias após a compra, desde que o produto esteja em perfeito estado, com etiquetas e embalagem original.'
        },
        {
          id: uuidv4(),
          question: 'Como garantir o tamanho correto?',
          answer: 'Disponibilizamos uma tabela de medidas detalhada em cada produto. Em caso de dúvidas, nossa equipe está disponível para auxiliar na escolha do tamanho ideal.'
        },
        {
          id: uuidv4(),
          question: 'Qual o prazo de entrega?',
          answer: 'O prazo varia de acordo com a região, geralmente entre 3 a 7 dias úteis. Após a confirmação do pagamento, você receberá um código de rastreamento.'
        },
        {
          id: uuidv4(),
          question: 'As peças podem ser personalizadas?',
          answer: 'Sim, oferecemos serviço de personalização para alguns itens selecionados. Entre em contato com nossa equipe para verificar disponibilidade e custos adicionais.'
        }
      ],
      style: {
        backgroundColor: '#ffffff',
        headingColor: '#000000',
        textColor: '#333333',
        padding: 'lg',
        blockSpacing: 'md'
      }
    },
    // CTA Block
    {
      id: uuidv4(),
      type: 'cta',
      title: 'Chamada para Ação',
      columns: 1,
      visible: true,
      heading: 'Transforme seu estilo hoje mesmo',
      content: 'Garanta suas peças exclusivas enquanto o estoque está disponível. Frete grátis para compras acima de R$ 500.',
      buttonText: 'Comprar Agora',
      buttonUrl: '#',
      style: {
        backgroundColor: '#000000',
        headingColor: '#ffffff',
        textColor: '#ffffff',
        padding: 'lg',
        blockSpacing: 'none'
      }
    }
  ]
};
