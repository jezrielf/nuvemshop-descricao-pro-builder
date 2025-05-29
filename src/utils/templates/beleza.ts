
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

console.log('Loading beleza templates...');

export const belezaTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Beleza e Cuidados Premium',
    category: 'other',
    thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#fdf2f8',
          textColor: '#831843',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Desperte Sua Beleza Natural',
        subheading: 'Produtos de beleza premium desenvolvidos com ingredientes naturais para realçar sua beleza única e cuidar da sua pele com carinho',
        buttonText: 'Descobrir Produtos',
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
        heading: 'Nossa Linha de Cuidados',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
            alt: 'Cuidados faciais',
            caption: 'Linha Facial Premium'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
            alt: 'Produtos de beleza',
            caption: 'Cosméticos Naturais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
            alt: 'Rotina de cuidados',
            caption: 'Kit Completo'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens dos Nossos Produtos',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#fef7ff'
        },
        heading: 'Por Que Escolher Nossa Marca',
        benefits: [
          {
            id: uuidv4(),
            icon: '🌿',
            title: 'Ingredientes Naturais',
            description: 'Fórmulas desenvolvidas com extratos botânicos puros e livres de químicos agressivos'
          },
          {
            id: uuidv4(),
            icon: '🧪',
            title: 'Cientificamente Testado',
            description: 'Produtos dermatologicamente testados e aprovados por especialistas em cuidados da pele'
          },
          {
            id: uuidv4(),
            icon: '🐰',
            title: 'Cruelty-Free',
            description: 'Nunca testamos em animais e somos certificados por organizações de proteção animal'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Ciência e Natureza',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'A Perfeita Combinação de Ciência e Natureza',
        content: 'Nossos laboratórios combinam pesquisa científica avançada com o poder dos ingredientes naturais. Cada produto é formulado com precisão para entregar resultados visíveis enquanto respeita a sensibilidade da sua pele, proporcionando cuidados eficazes e seguros.',
        image: {
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          alt: 'Pesquisa científica em beleza'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Rotina Personalizada',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#fef7ff'
        },
        heading: 'Cuidados Personalizados Para Cada Tipo de Pele',
        content: 'Entendemos que cada pele é única. Por isso, oferecemos consultoria personalizada para ajudar você a criar a rotina perfeita. Nossos especialistas analisam seu tipo de pele e recomendam os produtos ideais para suas necessidades específicas.',
        image: {
          src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
          alt: 'Consultoria personalizada'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características dos Produtos',
        visible: true,
        columns: 2,
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Diferenciais da Nossa Linha',
        features: [
          {
            id: uuidv4(),
            icon: '💧',
            title: 'Hidratação Profunda',
            description: 'Ácido hialurônico e ceramidas para hidratação duradoura de 24 horas'
          },
          {
            id: uuidv4(),
            icon: '☀️',
            title: 'Proteção Solar',
            description: 'FPS 60 com proteção UVA e UVB para uso diário'
          },
          {
            id: uuidv4(),
            icon: '✨',
            title: 'Anti-Idade',
            description: 'Retinol e vitamina C para combater sinais do envelhecimento'
          },
          {
            id: uuidv4(),
            icon: '🌸',
            title: 'Fragrância Suave',
            description: 'Aromas naturais delicados que não irritam peles sensíveis'
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
          backgroundColor: '#fef7ff'
        },
        heading: 'Detalhes da Linha de Produtos',
        specs: [
          { name: 'Tipo de Pele', value: 'Todos os tipos (normal, oleosa, seca, mista, sensível)' },
          { name: 'Ingredientes Ativos', value: 'Ácido Hialurônico, Retinol, Vitamina C, Niacinamida' },
          { name: 'Conservantes', value: 'Livres de parabenos, sulfatos e álcool' },
          { name: 'Textura', value: 'Gel, Creme, Sérum, Loção' },
          { name: 'Volume', value: '30ml, 50ml, 100ml' },
          { name: 'Certificações', value: 'Dermatologicamente testado, Hipoalergênico' },
          { name: 'Validade', value: '36 meses fechado, 12 meses após abertura' },
          { name: 'Origem', value: 'Laboratórios nacionais certificados' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Resultados Comprovados',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Resultados Visíveis em Poucas Semanas',
        content: 'Nossos clientes relatam melhora significativa na textura e aparência da pele em apenas 2-4 semanas de uso regular. Estudos clínicos comprovam redução de 85% nas manchas, 90% na hidratação e 78% na redução de linhas finas.',
        image: {
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
          alt: 'Resultados visíveis'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Beleza Radiante',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fef7ff',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
        alt: 'Pele radiante e saudável',
        caption: 'Desperte sua beleza natural com nossos cuidados'
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
        heading: 'Dúvidas Sobre Beleza e Cuidados',
        questions: [
          {
            question: 'Os produtos são adequados para peles sensíveis?',
            answer: 'Sim! Todos os nossos produtos são hipoalergênicos e dermatologicamente testados, especialmente formulados para não causar irritações mesmo em peles mais sensíveis.'
          },
          {
            question: 'Posso usar os produtos durante a gravidez?',
            answer: 'A maioria dos nossos produtos é segura durante a gravidez, mas recomendamos consultar seu médico antes do uso, especialmente produtos com retinol.'
          },
          {
            question: 'Em quanto tempo verei resultados?',
            answer: 'Os primeiros resultados são visíveis entre 2-4 semanas de uso regular. Para resultados mais significativos, recomendamos uso contínuo por 8-12 semanas.'
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
          backgroundColor: '#831843',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Transforme Sua Rotina de Beleza Hoje',
        content: 'Descubra produtos que realmente fazem a diferença. Consultoria gratuita e primeira compra com 20% de desconto.',
        buttonText: 'Começar Agora',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`beleza templates loaded: ${belezaTemplates.length} templates`);
belezaTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
