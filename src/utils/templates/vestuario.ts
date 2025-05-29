
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

console.log('Loading vestuario templates...');

export const vestuarioTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Vestuário Exclusivo',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f8f9fa',
          textColor: '#1a1a1a',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Moda Exclusiva Para Cada Momento',
        subheading: 'Descubra nossa coleção de vestuário premium que combina estilo contemporâneo, conforto excepcional e qualidade duradoura para expressar sua personalidade única',
        buttonText: 'Ver Coleção',
        buttonUrl: '#'
      },
      
      // Galeria em 3 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Produtos',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Nossa Coleção Exclusiva',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            alt: 'Coleção casual premium',
            caption: 'Casual Premium'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            alt: 'Linha executiva',
            caption: 'Linha Executiva'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            alt: 'Peças especiais',
            caption: 'Peças Especiais'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens do Nosso Vestuário',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#fafafa'
        },
        heading: 'Por Que Escolher Nossa Marca',
        benefits: [
          {
            id: uuidv4(),
            icon: '👔',
            title: 'Design Exclusivo',
            description: 'Peças desenvolvidas por designers renomados com cortes únicos e detalhes sofisticados'
          },
          {
            id: uuidv4(),
            icon: '🌟',
            title: 'Qualidade Premium',
            description: 'Tecidos selecionados e processos de confecção que garantem durabilidade e conforto'
          },
          {
            id: uuidv4(),
            icon: '♻️',
            title: 'Sustentabilidade',
            description: 'Produção consciente com materiais eco-friendly e práticas sustentáveis'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Qualidade dos Tecidos',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Tecidos de Primeira Qualidade',
        content: 'Trabalhamos exclusivamente com fornecedores internacionais reconhecidos pela excelência. Nossos tecidos passam por rigorosos testes de qualidade, garantindo resistência, durabilidade e conforto. Cada fibra é cuidadosamente selecionada para proporcionar a melhor experiência de uso.',
        image: {
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          alt: 'Tecidos de alta qualidade'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Processo de Criação',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#fafafa'
        },
        heading: 'Do Conceito à Criação',
        content: 'Cada peça nasce de um processo criativo minucioso. Nossos designers estudam tendências mundiais, analisam comportamentos e criam peças que refletem personalidade e estilo. Do primeiro esboço até a peça final, cada detalhe é pensado para oferecer uma experiência única de moda.',
        image: {
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          alt: 'Processo criativo de design'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características das Peças',
        visible: true,
        columns: 2,
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Diferenciais da Nossa Confecção',
        features: [
          {
            id: uuidv4(),
            icon: '✂️',
            title: 'Corte Personalizado',
            description: 'Modelagem estudada para diferentes tipos de corpo, garantindo caimento perfeito'
          },
          {
            id: uuidv4(),
            icon: '🧵',
            title: 'Costura Premium',
            description: 'Acabamentos impecáveis com costuras reforçadas e detalhes refinados'
          },
          {
            id: uuidv4(),
            icon: '🎨',
            title: 'Cores Exclusivas',
            description: 'Paleta de cores desenvolvida especialmente para cada coleção'
          },
          {
            id: uuidv4(),
            icon: '📏',
            title: 'Variação de Tamanhos',
            description: 'Grade completa do PP ao GG com numeração inclusiva'
          }
        ]
      },
      
      // Especificações
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Informações dos Produtos',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#fafafa'
        },
        heading: 'Detalhes Técnicos das Peças',
        specs: [
          { name: 'Tecidos', value: 'Algodão Premium, Linho, Seda, Lã Merino, Blends Exclusivos' },
          { name: 'Tamanhos', value: 'PP, P, M, G, GG (consulte tabela de medidas)' },
          { name: 'Cuidados', value: 'Lavagem especial, alguns itens dry-clean only' },
          { name: 'Origem', value: 'Confecção nacional com tecidos importados selecionados' },
          { name: 'Modelagem', value: 'Regular, Slim, Oversized conforme peça' },
          { name: 'Cores', value: 'Paleta sazonal com cores básicas sempre disponíveis' },
          { name: 'Garantia', value: 'Garantia de qualidade contra defeitos de fabricação' },
          { name: 'Certificação', value: 'Certificado de origem e qualidade dos materiais' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Atendimento Personalizado',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Consultoria de Estilo Personalizada',
        content: 'Nossa equipe de estilistas está disponível para ajudar você a criar looks únicos e encontrar as peças perfeitas para cada ocasião. Oferecemos consultoria gratuita para compras acima de R$ 500, incluindo dicas de combinação e cuidados especiais.',
        image: {
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          alt: 'Consultoria de estilo personalizada'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Estilo Único',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fafafa',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
        alt: 'Pessoa com estilo único',
        caption: 'Vista sua personalidade com nosso vestuário exclusivo'
      },
      
      // Perguntas Frequentes
      {
        id: uuidv4(),
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Dúvidas Sobre Nosso Vestuário',
        questions: [
          {
            question: 'Como escolher o tamanho ideal?',
            answer: 'Temos uma tabela de medidas detalhada disponível em cada produto. Recomendamos medir-se e comparar com nossa tabela. Em caso de dúvida, nossa equipe oferece consultoria gratuita.'
          },
          {
            question: 'Qual a política de trocas?',
            answer: 'Aceitamos trocas em até 30 dias para produtos sem uso, com etiquetas e em perfeito estado. Primeira troca gratuita, demais trocas consultar política.'
          },
          {
            question: 'As peças encolhem na lavagem?',
            answer: 'Nossos tecidos passam por pré-encolhimento. Seguindo as instruções de cuidado, não há encolhimento significativo. Sempre consulte a etiqueta de cuidados.'
          }
        ]
      },
      
      // Chamada para Ação
      {
        id: uuidv4(),
        type: 'cta',
        title: 'Chamada Final',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#1a1a1a',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Vista Seu Estilo Único',
        content: 'Descubra peças que contam sua história. Frete grátis em compras acima de R$ 299 e consultoria de estilo gratuita.',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`vestuario templates loaded: ${vestuarioTemplates.length} templates`);
vestuarioTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
