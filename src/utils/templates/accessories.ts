
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const accessoriesTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Acessórios Premium',
    category: 'accessories',
    thumbnail: 'https://images.unsplash.com/photo-1631485055112-c9b2aec772a1',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f0f0f0',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Acessórios que Definem Estilo',
        subheading: 'Detalhes precisos, materiais nobres e design contemporâneo para complementar seu visual com sofisticação única',
        buttonText: 'Explore a Coleção',
        buttonUrl: '#'
      },
      
      // Galeria em 3 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Produtos',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Nossa Coleção Exclusiva',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1631485055112-c9b2aec772a1',
            alt: 'Relógio premium em fundo neutro',
            caption: 'Relógio Cronógrafo Serie Premium'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1509112756314-34a0badb29d4',
            alt: 'Bolsa de couro genuíno',
            caption: 'Bolsa Artesanal em Couro Italiano'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1601740982034-56bc36106e82',
            alt: 'Joias finas',
            caption: 'Coleção Exclusiva de Joias'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens da Nossa Linha',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f7f7f7'
        },
        heading: 'Por Que Escolher Nossos Acessórios',
        benefits: [
          {
            id: uuidv4(),
            icon: '💎',
            title: 'Qualidade Superior',
            description: 'Materiais premium selecionados das melhores fontes globais para máxima durabilidade'
          },
          {
            id: uuidv4(),
            icon: '🔄',
            title: 'Durabilidade Excepcional',
            description: 'Peças projetadas para durar décadas mantendo sua beleza e funcionalidade'
          },
          {
            id: uuidv4(),
            icon: '✨',
            title: 'Design Exclusivo',
            description: 'Criações únicas desenvolvidas por designers renomados internacionalmente'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Artesanato de Precisão',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Artesanato de Excelência Mundial',
        content: 'Cada peça da nossa coleção passa por um rigoroso processo de fabricação onde artesãos especializados utilizam técnicas refinadas ao longo de décadas de experiência. A atenção aos mínimos detalhes é o que diferencia nossos acessórios, desde o corte preciso do couro até o polimento final das peças metálicas, resultando em produtos verdadeiramente excepcionais.',
        image: {
          src: 'https://images.unsplash.com/photo-1533758488827-caf6f782e87d',
          alt: 'Artesão trabalhando em acessório de couro'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Materiais Selecionados',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f7f7f7'
        },
        heading: 'Seleção Rigorosa de Materiais Premium',
        content: 'Trabalhamos exclusivamente com fornecedores certificados que compartilham nossos valores de qualidade e sustentabilidade. Couro italiano de primeira linha, metais nobres e componentes de precisão suíça se combinam para criar acessórios que não apenas impressionam pela beleza, mas também pela funcionalidade e longevidade excepcionais.',
        image: {
          src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
          alt: 'Materiais premium para acessórios'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Diferenciais dos Produtos',
        visible: true,
        columns: '2',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Características Exclusivas',
        features: [
          {
            id: uuidv4(),
            icon: '🔧',
            title: 'Hardware Premium',
            description: 'Componentes metálicos banhados a ouro e resistentes à corrosão'
          },
          {
            id: uuidv4(),
            icon: '🧵',
            title: 'Costuras Precisas',
            description: 'Cada ponto é meticulosamente aplicado para garantir durabilidade máxima'
          },
          {
            id: uuidv4(),
            icon: '🛡️',
            title: 'Proteção Garantida',
            description: 'Tratamentos especiais para resistência à água e manchas'
          },
          {
            id: uuidv4(),
            icon: '🔒',
            title: 'Segurança Integrada',
            description: 'Sistemas anti-roubo discretos em bolsas e carteiras premium'
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
          backgroundColor: '#f7f7f7'
        },
        heading: 'Especificações Detalhadas',
        specs: [
          { name: 'Material Principal', value: 'Couro Italiano Full Grain' },
          { name: 'Forro', value: 'Suede Premium Antimicrobiano' },
          { name: 'Hardware', value: 'Metal Hipoalergênico Banhado a Ouro 18k' },
          { name: 'Dimensões', value: '25cm x 18cm x 10cm' },
          { name: 'Peso', value: '0.8kg' },
          { name: 'Garantia', value: '5 anos contra defeitos de fabricação' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Cuidados com o Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Como Preservar seu Acessório Premium',
        content: 'Para garantir que seu acessório premium mantenha sua beleza e durabilidade por muitos anos, desenvolvemos um guia completo de cuidados específicos. Produtos em couro devem ser mantidos longe de umidade excessiva e luz solar direta. Aplicamos condicionador específico periodicamente e fornecemos um kit de manutenção completo com cada compra.',
        image: {
          src: 'https://images.unsplash.com/photo-1606222074634-eb45interactionpdf10dc3b',
          alt: 'Kit de manutenção para acessórios premium'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Detalhe do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f7f7f7',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1604695442099-4f78f3bf9623',
        alt: 'Detalhe de costura em acessório de couro',
        caption: 'Detalhe da costura artesanal em couro italiano de primeira qualidade'
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
        heading: 'Dúvidas Comuns',
        questions: [
          {
            question: 'Como identificar um produto autêntico da marca?',
            answer: 'Todos os nossos produtos vêm com cartão de autenticidade holográfico, número de série único e detalhes de acabamento exclusivos que podem ser verificados em nosso site oficial.'
          },
          {
            question: 'Vocês oferecem serviços de reparo?',
            answer: 'Sim, oferecemos serviços de manutenção e reparo vitalícios para todos os nossos acessórios premium. Entre em contato com nosso atendimento ao cliente para mais detalhes.'
          },
          {
            question: 'Como é a política de devolução?',
            answer: 'Aceitamos devoluções em até 30 dias após a compra, desde que o produto esteja em perfeito estado, com todas as etiquetas originais e embalagem intacta.'
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
          backgroundColor: '#333333',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Eleve seu Estilo com Nossa Coleção Exclusiva',
        content: 'Adquira agora um acessório premium e receba um kit de manutenção especial como cortesia. Frete grátis para todo o Brasil.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
