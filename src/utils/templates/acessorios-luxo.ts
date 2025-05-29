
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

console.log('Loading acessorios-luxo templates...');

export const acessoriosLuxoTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Acessórios de Luxo',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#0f0f0f',
          textColor: '#ffffff',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Luxo em Cada Detalhe',
        subheading: 'Coleção exclusiva de acessórios de luxo que elevam seu estilo a um novo patamar. Peças únicas criadas por artesãos especializados com materiais preciosos',
        buttonText: 'Ver Coleção Exclusiva',
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
        heading: 'Coleção de Luxo',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
            alt: 'Joias exclusivas',
            caption: 'Joalheria Exclusiva'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
            alt: 'Relógios de luxo',
            caption: 'Relógios de Luxo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
            alt: 'Bolsas premium',
            caption: 'Bolsas Premium'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens dos Nossos Acessórios',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Excelência em Cada Peça',
        benefits: [
          {
            id: uuidv4(),
            icon: '💎',
            title: 'Materiais Preciosos',
            description: 'Ouro 18k, prata 925, diamantes certificados e pedras preciosas selecionadas'
          },
          {
            id: uuidv4(),
            icon: '🎨',
            title: 'Design Autoral',
            description: 'Criações exclusivas de designers internacionais reconhecidos no mundo da moda'
          },
          {
            id: uuidv4(),
            icon: '🏆',
            title: 'Edição Limitada',
            description: 'Peças únicas ou em séries muito limitadas para garantir exclusividade'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Artesania Excepcional',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Arte e Tradição em Cada Criação',
        content: 'Nossos acessórios são criados por mestres artesãos com décadas de experiência em joalheria fina. Cada peça passa por mais de 50 etapas de produção, desde a seleção dos materiais até os acabamentos finais, garantindo perfeição em cada detalhe e durabilidade que atravessa gerações.',
        image: {
          src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
          alt: 'Artesão trabalhando em joia'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Certificação e Autenticidade',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Garantia de Autenticidade',
        content: 'Todas as nossas peças vêm acompanhadas de certificado de autenticidade emitido por laboratórios gemológicos internacionais. Cada diamante possui certificação GIA ou equivalente, e nossos metais preciosos são testados e certificados quanto à pureza e origem ética.',
        image: {
          src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
          alt: 'Certificado de autenticidade'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características Exclusivas',
        visible: true,
        columns: 2,
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Detalhes que Fazem a Diferença',
        features: [
          {
            id: uuidv4(),
            icon: '⚡',
            title: 'Acabamento Perfeito',
            description: 'Polimento espelhado e acabamentos que realçam o brilho natural dos materiais'
          },
          {
            id: uuidv4(),
            icon: '🔒',
            title: 'Segurança Premium',
            description: 'Fechos e travas de segurança desenvolvidos especialmente para cada peça'
          },
          {
            id: uuidv4(),
            icon: '🎁',
            title: 'Embalagem Exclusiva',
            description: 'Caixas personalizadas em madeira nobre com certificado de garantia'
          },
          {
            id: uuidv4(),
            icon: '🛡️',
            title: 'Garantia Vitalícia',
            description: 'Manutenção e restauração gratuita por toda a vida da peça'
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
          backgroundColor: '#f8f9fa'
        },
        heading: 'Detalhes Técnicos das Peças',
        specs: [
          { name: 'Metais', value: 'Ouro 18k (750), Prata 925, Platina, Ouro Branco' },
          { name: 'Pedras', value: 'Diamantes certificados GIA, Rubis, Safiras, Esmeraldas' },
          { name: 'Acabamentos', value: 'Polimento espelhado, Fosco, Texturizado' },
          { name: 'Tamanhos', value: 'Ajustável ou sob medida conforme a peça' },
          { name: 'Origem', value: 'Ateliê próprio com materiais certificados' },
          { name: 'Garantia', value: 'Vitalícia contra defeitos de fabricação' },
          { name: 'Certificação', value: 'GIA, Gübelin, SSEF para pedras preciosas' },
          { name: 'Entrega', value: 'Embalagem premium com seguro total incluído' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Atendimento VIP',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Experiência de Compra Exclusiva',
        content: 'Oferecemos atendimento personalizado com consultor dedicado, agendamento para visualização privativa das peças, e serviço de ajuste sob medida. Para peças especiais, realizamos criações personalizadas seguindo suas especificações e desejos únicos.',
        image: {
          src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
          alt: 'Atendimento personalizado VIP'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Luxo Atemporal',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        alt: 'Acessório de luxo atemporal',
        caption: 'Investimento em beleza e exclusividade que dura para sempre'
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
        heading: 'Dúvidas Sobre Acessórios de Luxo',
        questions: [
          {
            question: 'As peças têm certificado de autenticidade?',
            answer: 'Sim, todas as peças vêm com certificado de autenticidade emitido por laboratórios internacionais reconhecidos, garantindo a procedência e qualidade dos materiais.'
          },
          {
            question: 'É possível fazer peças personalizadas?',
            answer: 'Absolutamente! Nosso ateliê aceita encomendas personalizadas. O prazo varia de 30 a 90 dias dependendo da complexidade da peça.'
          },
          {
            question: 'Qual a política de garantia?',
            answer: 'Oferecemos garantia vitalícia contra defeitos de fabricação, incluindo manutenção e restauração gratuita. Também temos seguro total durante o transporte.'
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
          backgroundColor: '#0f0f0f',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Adquira Sua Peça Exclusiva',
        content: 'Investimento em luxo atemporal. Agendamento para visualização privativa e consultoria personalizada incluída.',
        buttonText: 'Agendar Consulta',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`acessorios-luxo templates loaded: ${acessoriosLuxoTemplates.length} templates`);
acessoriosLuxoTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
