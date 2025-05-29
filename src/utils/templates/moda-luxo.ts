import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';
import { optimizeImageUrl } from '@/utils/imageOptimization';

console.log('Loading moda-luxo templates...');

// Optimized Unsplash URLs for better performance
const OPTIMIZED_IMAGES = {
  hero: optimizeImageUrl('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', 'hero'),
  thumbnail: optimizeImageUrl('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', 'thumbnail'),
  gallery: optimizeImageUrl('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7', 'gallery'),
};

export const modaLuxoTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Moda Luxo Couture',
    category: 'luxury',
    thumbnail: OPTIMIZED_IMAGES.thumbnail,
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#000000',
          textColor: '#ffffff',
          padding: '100px 20px',
          textAlign: 'center'
        },
        heading: 'Haute Couture Exclusiva',
        subheading: 'Alta costura criada por mestres da moda. Peças únicas e exclusivas que definem tendências e expressam a mais pura arte da costura contemporânea',
        buttonText: 'Ver Coleção Couture',
        buttonUrl: '#'
      },
      
      // Galeria em 2 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Produtos',
        visible: true,
        columns: 2,
        style: {
          padding: '80px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Coleção Exclusiva Couture',
        images: [
          {
            id: uuidv4(),
            src: OPTIMIZED_IMAGES.gallery,
            alt: 'Haute couture dress',
            caption: 'Vestidos de Gala'
          },
          {
            id: uuidv4(),
            src: OPTIMIZED_IMAGES.gallery,
            alt: 'Luxury suits',
            caption: 'Ternos Exclusivos'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens da Alta Costura',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f8f8'
        },
        heading: 'A Arte da Perfeição',
        benefits: [
          {
            id: uuidv4(),
            icon: '✨',
            title: 'Peças Únicas',
            description: 'Cada criação é uma obra de arte única, desenvolvida exclusivamente para você'
          },
          {
            id: uuidv4(),
            icon: '👑',
            title: 'Mestres Artesãos',
            description: 'Criado por costureiros com décadas de experiência em alta costura internacional'
          },
          {
            id: uuidv4(),
            icon: '🎭',
            title: 'Arte Vestível',
            description: 'Cada peça conta uma história através de técnicas ancestrais e design contemporâneo'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Processo Artesanal',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'O Processo da Alta Costura',
        content: 'Cada peça couture passa por mais de 200 horas de trabalho manual. Nossos mestres artesãos utilizam técnicas centenárias transmitidas através de gerações, combinadas com inovação contemporânea. Desde o primeiro esboço até a entrega final, cada detalhe é meticulosamente planejado e executado à mão.',
        image: {
          src: OPTIMIZED_IMAGES.gallery,
          alt: 'Processo artesanal de costura'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Tecidos Exclusivos',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#f8f8f8'
        },
        heading: 'Materiais de Exceção',
        content: 'Trabalhamos exclusivamente com as mais prestigiadas tecelagens europeias. Sedas de Lyon, lãs de Cashmere do Himalaia, algodões egípcios de fibra extra-longa e tecidos desenvolvidos especialmente para nossa marca. Cada metro é selecionado pela qualidade excepcional e raridade.',
        image: {
          src: OPTIMIZED_IMAGES.gallery,
          alt: 'Tecidos de luxo exclusivos'
        }
      },
      
      // Recursos em 1 coluna
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características Couture',
        visible: true,
        columns: 1,
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Detalhes da Alta Costura',
        features: [
          {
            id: uuidv4(),
            icon: '🪡',
            title: 'Costura Manual Completa',
            description: 'Cada ponto é feito à mão por artesãos especializados, garantindo perfeição e durabilidade incomparável'
          },
          {
            id: uuidv4(),
            icon: '📐',
            title: 'Modelagem Anatômica',
            description: 'Moldes únicos criados especificamente para seu corpo, garantindo caimento perfeito'
          },
          {
            id: uuidv4(),
            icon: '💎',
            title: 'Bordados e Aplicações',
            description: 'Bordados feitos com fios de ouro, prata e pedras preciosas aplicados manualmente'
          }
        ]
      },
      
      // Especificações
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Especificações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f8f8'
        },
        heading: 'Detalhes da Produção Couture',
        specs: [
          { name: 'Tempo de Produção', value: '8 a 16 semanas (dependendo da complexidade)' },
          { name: 'Tecidos', value: 'Seda Lyon, Cashmere, Linho Irlandês, Lã Merino' },
          { name: 'Técnicas', value: 'Costura manual, Bordado à mão, Plissados artesanais' },
          { name: 'Provas', value: '3 a 5 provas para ajuste perfeito' },
          { name: 'Acabamentos', value: 'Forros de seda, botões personalizados, fecho invisível' },
          { name: 'Ateliê', value: 'Produção em ateliê próprio com mestres certificados' },
          { name: 'Exclusividade', value: 'Peça única, nunca reproduzida' },
          { name: 'Garantia', value: 'Vitalícia para ajustes e manutenção' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Experiência Personalizada',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Atendimento Exclusivo de Ateliê',
        content: 'A experiência couture começa com uma consulta privativa em nosso ateliê. Nosso estilista principal trabalha diretamente com você para criar uma peça que reflita sua personalidade e estilo. Cada encontro é uma sessão de criação colaborativa, onde seus sonhos se tornam realidade.',
        image: {
          src: OPTIMIZED_IMAGES.gallery,
          alt: 'Consulta personalizada em ateliê'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Arte da Costura',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f8f8',
          textAlign: 'center'
        },
        src: OPTIMIZED_IMAGES.gallery,
        alt: 'Obra de arte da alta costura',
        caption: 'Onde a moda encontra a arte - Criações que transcendem o tempo'
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
        heading: 'Dúvidas Sobre Alta Costura',
        questions: [
          {
            question: 'Qual é o processo de criação de uma peça couture?',
            answer: 'O processo inicia com uma consulta para entender sua visão. Seguem-se esboços, seleção de tecidos, criação do molde personalizado, 3-5 provas de ajuste e finalização artesanal. Todo processo leva de 8 a 16 semanas.'
          },
          {
            question: 'É possível adaptar designs de coleções passadas?',
            answer: 'Cada peça couture é única e exclusiva. Podemos nos inspirar em elementos de criações anteriores, mas adaptamos completamente para criar algo inédito e personalizado para você.'
          },
          {
            question: 'Que tipo de eventos são apropriados para alta costura?',
            answer: 'Nossas criações são perfeitas para galas, premiações, casamentos de luxo, eventos corporativos de alto nível e qualquer ocasião onde você deseje causar uma impressão inesquecível.'
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
          padding: '100px 20px',
          backgroundColor: '#000000',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Crie Sua Obra-Prima Pessoal',
        content: 'Agende uma consulta exclusiva em nosso ateliê. Experiência couture completa com estilista dedicado.',
        buttonText: 'Agendar Consulta Privativa',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`moda-luxo templates loaded: ${modaLuxoTemplates.length} templates`);
modaLuxoTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
