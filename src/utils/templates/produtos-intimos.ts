
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

console.log('Loading produtos-intimos templates...');

export const produtosIntimosTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Produtos Íntimos Premium',
    category: 'adult',
    thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
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
        heading: 'Intimidade e Bem-Estar',
        subheading: 'Produtos premium desenvolvidos com cuidado e discrição para proporcionar momentos especiais e elevar sua qualidade de vida íntima',
        buttonText: 'Explorar Produtos',
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
        heading: 'Nossa Linha Premium',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
            alt: 'Produtos de bem-estar',
            caption: 'Bem-Estar Pessoal'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
            alt: 'Produtos de cuidado',
            caption: 'Cuidados Especiais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
            alt: 'Produtos premium',
            caption: 'Linha Premium'
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
        heading: 'Qualidade e Discrição',
        benefits: [
          {
            id: uuidv4(),
            icon: '🌸',
            title: 'Materiais Premium',
            description: 'Silicone médico e materiais hipoalergênicos da mais alta qualidade'
          },
          {
            id: uuidv4(),
            icon: '🔒',
            title: 'Discrição Total',
            description: 'Embalagem discreta e entrega confidencial para sua privacidade'
          },
          {
            id: uuidv4(),
            icon: '💎',
            title: 'Design Sofisticado',
            description: 'Produtos elegantes com design moderno e funcionalidade superior'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Qualidade e Segurança',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Segurança e Qualidade Garantidas',
        content: 'Todos os nossos produtos são fabricados com os mais altos padrões de qualidade e segurança. Utilizamos apenas materiais aprovados para uso corporal, livres de substâncias tóxicas como ftalatos, BPA e látex. Cada produto passa por rigorosos testes de qualidade antes de chegar até você.',
        image: {
          src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          alt: 'Qualidade e segurança premium'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Privacidade e Discrição',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#fef7ff'
        },
        heading: 'Sua Privacidade é Nossa Prioridade',
        content: 'Entendemos a importância da discrição. Todos os pedidos são enviados em embalagens neutras, sem identificação do conteúdo. O atendimento é sempre respeitoso e confidencial, e garantimos total privacidade em todas as transações e comunicações.',
        image: {
          src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          alt: 'Embalagem discreta e privacidade'
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
            icon: '🧪',
            title: 'Materiais Seguros',
            description: 'Silicone médico grau platina, livre de ftalatos e substâncias nocivas'
          },
          {
            id: uuidv4(),
            icon: '💧',
            title: 'À Prova d\'Água',
            description: 'Design impermeável para uso versátil e fácil higienização'
          },
          {
            id: uuidv4(),
            icon: '🔋',
            title: 'Tecnologia Avançada',
            description: 'Motores silenciosos e bateria de longa duração recarregável'
          },
          {
            id: uuidv4(),
            icon: '✨',
            title: 'Design Ergonômico',
            description: 'Formas estudadas para máximo conforto e experiência superior'
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
        heading: 'Especificações Técnicas',
        specs: [
          { name: 'Materiais', value: 'Silicone médico grau platina, ABS livre de ftalatos' },
          { name: 'Certificações', value: 'CE, RoHS, FDA approved materials' },
          { name: 'Impermeabilidade', value: 'IPX7 - Totalmente à prova d\'água' },
          { name: 'Bateria', value: 'Lítio recarregável com até 4 horas de uso' },
          { name: 'Carregamento', value: 'USB magnético (cabo incluído)' },
          { name: 'Garantia', value: '2 anos contra defeitos de fabricação' },
          { name: 'Higienização', value: 'Compatível com limpadores antibacterianos' },
          { name: 'Embalagem', value: 'Discreta, neutra e sustentável' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Suporte Especializado',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Atendimento Especializado e Discreto',
        content: 'Nossa equipe de atendimento é treinada para oferecer suporte respeitoso e informativo. Oferecemos orientações sobre uso seguro, cuidados com os produtos e esclarecemos dúvidas com total profissionalismo e discrição. Seu bem-estar é nossa prioridade.',
        image: {
          src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
          alt: 'Atendimento especializado e discreto'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Bem-Estar Premium',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fef7ff',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
        alt: 'Bem-estar e qualidade de vida',
        caption: 'Investindo no seu bem-estar e qualidade de vida íntima'
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
        heading: 'Dúvidas Mais Comuns',
        questions: [
          {
            question: 'Como é feita a entrega dos produtos?',
            answer: 'Todos os produtos são enviados em embalagens completamente discretas, sem qualquer identificação do conteúdo. O nome que aparece na etiqueta é neutro e o atendimento dos Correios é normal.'
          },
          {
            question: 'Os produtos são seguros para uso?',
            answer: 'Sim, todos os nossos produtos são fabricados com materiais aprovados para contato corporal, livres de substâncias tóxicas e seguem rigorosos padrões internacionais de qualidade e segurança.'
          },
          {
            question: 'Como higienizar os produtos adequadamente?',
            answer: 'Recomendamos lavar com água morna e sabão neutro antes e após o uso. Produtos impermeáveis podem ser higienizados com limpadores antibacterianos específicos.'
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
        heading: 'Eleve Sua Qualidade de Vida',
        content: 'Descubra produtos premium com total discrição. Entrega confidencial e atendimento especializado incluído.',
        buttonText: 'Explorar com Discrição',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`produtos-intimos templates loaded: ${produtosIntimosTemplates.length} templates`);
produtosIntimosTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
