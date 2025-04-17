
import { v4 as uuidv4 } from 'uuid';
import { Template, Block } from '@/types/editor';
import { createHeroBlock } from '../blockCreators/blocks/heroBlock';
import { createTextBlock } from '../blockCreators/blocks/textBlock';
import { createImageBlock } from '../blockCreators/blocks/imageBlock';
import { createGalleryBlock } from '../blockCreators/blocks/galleryBlock';
import { createVideoBlock } from '../blockCreators/blocks/videoBlock';
import { createImageTextBlock } from '../blockCreators/blocks/imageTextBlock';
import { createTextImageBlock } from '../blockCreators/blocks/textImageBlock';
import { createCTABlock } from '../blockCreators/blocks/ctaBlock';
import { createFAQBlock } from '../blockCreators/blocks/faqBlock';
import { createFeaturesBlock } from '../blockCreators/blocks/featuresBlock';
import { createBenefitsBlock } from '../blockCreators/blocks/benefitsBlock';

// Create 3 haute couture templates
export const hauteCoutureTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Alta Costura - Luxo Contemporâneo',
    category: 'haute-couture',
    thumbnail: 'https://images.unsplash.com/photo-1605289355680-75fb41239154',
    blocks: [
      // Hero with luxury vibes
      {
        ...createHeroBlock(1),
        heading: 'Coleção Exclusiva Atemporal',
        subheading: 'Peças únicas criadas com técnicas tradicionais e visão contemporânea',
        backgroundImage: 'https://images.unsplash.com/photo-1605289355680-75fb41239154',
        buttonText: 'Descobrir a coleção',
        buttonUrl: '#collection'
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'A arte da alta costura',
        content: '<p>Cada peça é uma obra de arte meticulosamente elaborada à mão por artesãos especializados. Utilizamos técnicas tradicionais de costura que foram aperfeiçoadas ao longo de gerações, combinadas com uma visão moderna e inovadora.</p><p>Do primeiro esboço à última costura, dedicamos centenas de horas para criar peças que transcendem tendências e se tornam patrimônio de elegância.</p>'
      },
      // Video of atelier
      {
        ...createVideoBlock(1),
        title: 'Por trás das cortinas',
        heading: 'Conheça nosso atelier',
        videoUrl: 'https://www.youtube.com/watch?v=dZYpHr1wDmY',
        description: 'Um raro vislumbre do processo artesanal por trás de nossas criações exclusivas.'
      },
      // Features highlight
      {
        ...createFeaturesBlock(3),
        heading: 'Excelência em cada detalhe',
        features: [
          {
            id: uuidv4(),
            title: 'Artesanato Excepcional',
            description: 'Técnicas tradicionais preservadas e aperfeiçoadas',
            icon: 'Scissors'
          },
          {
            id: uuidv4(),
            title: 'Materiais Nobres',
            description: 'Selecionados das melhores fontes ao redor do mundo',
            icon: 'Diamond'
          },
          {
            id: uuidv4(),
            title: 'Exclusividade',
            description: 'Peças únicas ou em edições extremamente limitadas',
            icon: 'Star'
          }
        ]
      },
      // Gallery showcase
      {
        ...createGalleryBlock(1),
        title: 'Destaques da coleção',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
            alt: 'Vestido de gala',
            caption: 'Vestido Constellation - bordado à mão'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1559244673-9cee88b2f315',
            alt: 'Casaco de alta costura',
            caption: 'Casaco Royale - lã merino e seda'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1579391885453-f415ea90ae4a',
            alt: 'Conjunto sofisticado',
            caption: 'Conjunto Élysée - tweed francês'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1596993100471-c3905dafa78e',
            alt: 'Acessórios exclusivos',
            caption: 'Acessórios complementares'
          }
        ]
      },
      // Craftsmanship with image and text
      {
        ...createImageTextBlock(1),
        heading: 'O valor do feito à mão',
        content: 'Cada peça leva em média 300 horas de trabalho manual. Nossos mestres artesãos dominam técnicas raras como o petit point, o tambour beading e o moulage, criando peças que são verdadeiras obras de arte vestíveis.',
        image: {
          src: 'https://images.unsplash.com/photo-1558095901-9b5b0a81974c',
          alt: 'Artesã trabalhando em bordado'
        }
      },
      // Materials section
      {
        ...createTextImageBlock(1),
        heading: 'Materiais extraordinários',
        content: 'Viajamos o mundo em busca dos materiais mais refinados e raros. Seda italiana, cashmere do Himalaia, rendas francesas e botões vintage são apenas alguns dos elementos que dão vida às nossas criações.',
        image: {
          src: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6',
          alt: 'Tecidos luxuosos'
        }
      },
      // Another video for runway
      {
        ...createVideoBlock(1),
        title: 'Desfile Exclusivo',
        heading: 'Coleção Outono-Inverno na passarela',
        videoUrl: 'https://www.youtube.com/watch?v=8R_rEw4LbKw',
        description: 'Assista ao desfile completo da nossa coleção mais recente, apresentada em um cenário histórico de Paris.'
      },
      // Benefits of haute couture
      {
        ...createBenefitsBlock(2),
        heading: 'A experiência da alta costura',
        benefits: [
          {
            id: uuidv4(),
            title: 'Ajuste Perfeito',
            description: 'Cada peça é criada para valorizar sua silhueta individual',
            icon: 'Ruler'
          },
          {
            id: uuidv4(),
            title: 'Atendimento Personalizado',
            description: 'Acompanhamento exclusivo durante todo o processo',
            icon: 'UserPlus'
          },
          {
            id: uuidv4(),
            title: 'Memória Têxtil',
            description: 'Peças que contam histórias e se tornam herança',
            icon: 'BookOpen'
          },
          {
            id: uuidv4(),
            title: 'Sustentabilidade',
            description: 'Produção consciente e valorização do trabalho artesanal',
            icon: 'Recycle'
          }
        ]
      },
      // Client testimonial as text
      {
        ...createTextBlock(1),
        heading: 'Palavras de nossas clientes',
        content: '<blockquote>"Usar uma peça de alta costura não é apenas vestir um traje, é experimentar arte, história e tradição. Cada vez que visto meu vestido, sinto a dedicação de quem o criou." - Helena M., cliente desde 2015</blockquote><blockquote>"A experiência de ter uma peça criada especialmente para mim foi transformadora. É muito mais que um vestido - é uma extensão da minha personalidade." - Sophia R., noiva</blockquote>'
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Quanto tempo leva o processo de criação?',
            answer: 'O processo completo, desde a primeira consulta até a entrega final, leva em média 3 a 6 meses.'
          },
          {
            id: uuidv4(),
            question: 'Vocês atendem internacionalmente?',
            answer: 'Sim, atendemos clientes do mundo todo, com sessões de prova presenciais ou virtuais.'
          },
          {
            id: uuidv4(),
            question: 'É possível ajustar peças de coleções anteriores?',
            answer: 'Oferecemos serviço vitalício de ajustes para todas as nossas criações.'
          },
          {
            id: uuidv4(),
            question: 'Vocês criam peças para ocasiões específicas?',
            answer: 'Sim, criamos desde vestidos de noiva até trajes para eventos de gala e ocasiões especiais.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Inicie sua jornada na alta costura',
        content: 'Agende uma consulta personalizada em nosso atelier e descubra o universo da verdadeira alta costura.',
        buttonText: 'Agendar consulta',
        buttonUrl: '#appointment'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Alta Costura - Coleção Nupcial',
    category: 'haute-couture',
    thumbnail: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'Sonhos em Seda e Renda',
        subheading: 'Vestidos de noiva exclusivos que contam sua história',
        backgroundImage: 'https://images.unsplash.com/photo-1549416878-b9ca95e26903',
        buttonText: 'Descobrir a coleção',
        buttonUrl: '#collection'
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'O vestido dos seus sonhos',
        content: '<p>Cada noiva é única, e seu vestido deve refletir sua personalidade, história e sonhos. Nossas criações nupciais são elaboradas com a mais alta atenção aos detalhes, utilizando materiais nobres e técnicas artesanais.</p><p>Da primeira consulta à última prova, acompanhamos cada passo da jornada para garantir que seu vestido seja tão único quanto o momento que ele celebra.</p>'
      },
      // Video of atelier
      {
        ...createVideoBlock(1),
        title: 'Arte em movimento',
        heading: 'O processo de criação',
        videoUrl: 'https://www.youtube.com/watch?v=iNOkZ3q6yFM',
        description: 'Acompanhe o fascinante processo de criação de um vestido de noiva, desde os primeiros esboços até os últimos detalhes.'
      },
      // Features highlight
      {
        ...createFeaturesBlock(3),
        heading: 'Por que escolher a alta costura para seu casamento',
        features: [
          {
            id: uuidv4(),
            title: 'Exclusividade',
            description: 'Um vestido único, criado apenas para você',
            icon: 'Fingerprint'
          },
          {
            id: uuidv4(),
            title: 'Ajuste Perfeito',
            description: 'Modelado diretamente no seu corpo para caimento impecável',
            icon: 'Ruler'
          },
          {
            id: uuidv4(),
            title: 'Materiais Nobres',
            description: 'Sedas, rendas e bordados de excepcional qualidade',
            icon: 'Star'
          }
        ]
      },
      // Gallery showcase
      {
        ...createGalleryBlock(1),
        title: 'Coleção Ethereal',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1596181525841-8eee0bb6e31c',
            alt: 'Vestido modelo sereia',
            caption: 'Vestido Celestial - renda chantilly'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1594123431057-b0ed5a1af5c4',
            alt: 'Vestido princesa',
            caption: 'Vestido Aurora - seda duchesse'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1612185093032-216c8d6442f6',
            alt: 'Vestido estilo império',
            caption: 'Vestido Serenity - musseline de seda'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1561648107-c413b2d73f5b',
            alt: 'Detalhes de bordado',
            caption: 'Bordados artesanais com pérolas e cristais'
          }
        ]
      },
      // Process with image and text
      {
        ...createImageTextBlock(1),
        heading: 'A jornada da criação',
        content: 'Nosso processo inicia com uma consulta profunda para entender seus sonhos, personalidade e a atmosfera do seu casamento. A partir daí, criamos esboços exclusivos, selecionamos materiais e iniciamos um processo colaborativo que resulta em um vestido que conta sua história.',
        image: {
          src: 'https://images.unsplash.com/photo-1552334823-d6ca72410d33',
          alt: 'Designer trabalhando em um vestido'
        }
      },
      // Testimonial section
      {
        ...createTextBlock(1),
        heading: 'Histórias de amor e vestidos',
        content: '<blockquote>"Meu vestido não era apenas belo, ele contava minha história de amor. Cada bordado, cada detalhe tinha um significado especial. Foi uma experiência transformadora." - Marina, noiva 2024</blockquote><blockquote>"O processo de criação do meu vestido foi quase tão especial quanto o dia do casamento. As memórias das provas, das conversas com a designer e da evolução do vestido são tesouros que guardo com carinho." - Carolina, noiva 2023</blockquote>'
      },
      // Elements with text and image
      {
        ...createTextImageBlock(1),
        heading: 'Acessórios complementares',
        content: 'Complementamos seu look nupcial com véus, tiaras, sapatos e joias exclusivas, criados em harmonia com seu vestido para formar um conjunto coeso e deslumbrante. Cada acessório é pensado para realçar sua beleza natural e complementar o design do vestido.',
        image: {
          src: 'https://images.unsplash.com/photo-1571144508737-c033f59c4f06',
          alt: 'Acessórios de noiva'
        }
      },
      // Benefits of bespoke bridal
      {
        ...createBenefitsBlock(2),
        heading: 'Vantagens de um vestido sob medida',
        benefits: [
          {
            id: uuidv4(),
            title: 'Conforto Supremo',
            description: 'Criado para se mover com você durante todo o dia',
            icon: 'Heart'
          },
          {
            id: uuidv4(),
            title: 'Expressão Pessoal',
            description: 'Cada elemento reflete sua personalidade',
            icon: 'Sparkles'
          },
          {
            id: uuidv4(),
            title: 'Herança Familiar',
            description: 'Uma peça para ser preservada por gerações',
            icon: 'GiftBox'
          },
          {
            id: uuidv4(),
            title: 'Sustentabilidade',
            description: 'Produção ética com materiais de alta qualidade',
            icon: 'Leaf'
          }
        ]
      },
      // Another video for behind the scenes
      {
        ...createVideoBlock(1),
        title: 'Nos bastidores',
        heading: 'Um dia no atelier',
        videoUrl: 'https://www.youtube.com/watch?v=5YQexHTYRcA',
        description: 'Veja como é um dia de trabalho no nosso atelier e conheça os artesãos que dão vida aos vestidos dos sonhos.'
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Quanto tempo antes do casamento devo iniciar o processo?',
            answer: 'Recomendamos iniciar o processo de 8 a 12 meses antes da data do casamento.'
          },
          {
            id: uuidv4(),
            question: 'Quantas provas são necessárias?',
            answer: 'Geralmente realizamos de 4 a 6 provas para garantir o ajuste perfeito.'
          },
          {
            id: uuidv4(),
            question: 'Vocês podem incorporar elementos sentimentais no vestido?',
            answer: 'Sim, adoramos incorporar elementos como renda de família, joias ou símbolos significativos.'
          },
          {
            id: uuidv4(),
            question: 'Vocês oferecem serviço de preservação pós-casamento?',
            answer: 'Sim, oferecemos serviço de limpeza especializada e preservação do vestido após o evento.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Comece a jornada do vestido dos seus sonhos',
        content: 'Agende uma consulta inicial em nosso atelier para discutir suas ideias e conhecer nossas coleções.',
        buttonText: 'Agendar consulta',
        buttonUrl: '#appointment'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Alta Costura - Alfaiataria Masculina',
    category: 'haute-couture',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'A Arte da Alfaiataria Sob Medida',
        subheading: 'Tradição centenária para o homem contemporâneo',
        backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
        buttonText: 'Explorar serviços',
        buttonUrl: '#services'
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'Tradição e excelência',
        content: '<p>A verdadeira alfaiataria é uma arte que transcende modas e tendências. Nossos alfaiates combinam técnicas tradicionais passadas por gerações com uma visão contemporânea, criando trajes que são expressões de individualidade e elegância atemporal.</p><p>Cada traje é construído à mão, através de um processo meticuloso que envolve mais de 30 medidas e dezenas de horas de trabalho artesanal.</p>'
      },
      // Video of process
      {
        ...createVideoBlock(1),
        title: 'Ofício e precisão',
        heading: 'O processo da alfaiataria artesanal',
        videoUrl: 'https://www.youtube.com/watch?v=_5Tw_uD1rkU',
        description: 'Acompanhe cada etapa da criação de um terno sob medida, desde as primeiras medidas até os últimos acabamentos.'
      },
      // Features highlight
      {
        ...createFeaturesBlock(3),
        heading: 'O que nos diferencia',
        features: [
          {
            id: uuidv4(),
            title: 'Construção Manual',
            description: 'Cada peça é costurada à mão com técnicas tradicionais',
            icon: 'Needle'
          },
          {
            id: uuidv4(),
            title: 'Tecidos Exclusivos',
            description: 'Parceria com os melhores moinhos da Inglaterra e Itália',
            icon: 'Factory'
          },
          {
            id: uuidv4(),
            title: 'Molde Individual',
            description: 'Criado exclusivamente para sua silhueta e postura',
            icon: 'Ruler'
          }
        ]
      },
      // Gallery showcase
      {
        ...createGalleryBlock(1),
        title: 'Nossos trabalhos',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660',
            alt: 'Terno completo',
            caption: 'Terno três peças em lã Super 150'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1593032465175-481ac7f401f0',
            alt: 'Blazer sob medida',
            caption: 'Blazer estruturado em cashmere'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1514222788835-3a1a1d5b32f8',
            alt: 'Detalhes de costura',
            caption: 'Acabamentos artesanais'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78',
            alt: 'Escolha de tecidos',
            caption: 'Seleção de tecidos premium'
          }
        ]
      },
      // Process with image and text
      {
        ...createImageTextBlock(1),
        heading: 'Da medida ao caimento perfeito',
        content: 'O processo inicia com uma sessão de medidas meticulosa, onde registramos mais de 30 pontos do seu corpo. Em seguida, criamos um molde exclusivo que considera não apenas suas medidas, mas também sua postura natural e preferências de estilo.',
        image: {
          src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
          alt: 'Alfaiate tomando medidas'
        }
      },
      // Fabric section
      {
        ...createTextImageBlock(1),
        heading: 'A importância do tecido',
        content: 'Trabalhamos apenas com tecidos de fabricantes renomados como Loro Piana, Holland & Sherry e Dormeuil. Cada fibra é cuidadosamente selecionada por sua qualidade, caimento e durabilidade, garantindo que seu traje não apenas pareça excepcional, mas também dure por décadas.',
        image: {
          src: 'https://images.unsplash.com/photo-1629099974956-be96c61c6c63',
          alt: 'Amostras de tecidos'
        }
      },
      // Benefits of bespoke tailoring
      {
        ...createBenefitsBlock(2),
        heading: 'As vantagens da alfaiataria sob medida',
        benefits: [
          {
            id: uuidv4(),
            title: 'Caimento Impecável',
            description: 'Projetado para realçar seus pontos fortes e minimizar imperfeições',
            icon: 'Check'
          },
          {
            id: uuidv4(),
            title: 'Conforto Superior',
            description: 'Movimente-se livremente sem restrições',
            icon: 'Smile'
          },
          {
            id: uuidv4(),
            title: 'Durabilidade Excepcional',
            description: 'Construção que resiste ao teste do tempo',
            icon: 'Clock'
          },
          {
            id: uuidv4(),
            title: 'Expressão Individual',
            description: 'Detalhes personalizados que refletem seu estilo único',
            icon: 'Fingerprint'
          }
        ]
      },
      // Testimonial section
      {
        ...createTextBlock(1),
        heading: 'O que dizem nossos clientes',
        content: '<blockquote>"Depois de experimentar a alfaiataria sob medida, é impossível voltar aos ternos prontos. A diferença no caimento e no conforto é simplesmente incomparável." - Ricardo M., empresário</blockquote><blockquote>"Meu primeiro terno sob medida foi para meu casamento. Cinco anos depois, ele continua em perfeito estado e ainda recebo elogios quando o uso." - André S., advogado</blockquote>'
      },
      // Another video for style tips
      {
        ...createVideoBlock(1),
        title: 'Estilo masculino',
        heading: 'Dicas de estilo e cuidados com suas peças',
        videoUrl: 'https://www.youtube.com/watch?v=PJsUniB-TNE',
        description: 'Nosso alfaiate-chefe compartilha dicas valiosas sobre como compor looks e manter suas peças sob medida em perfeito estado por muitos anos.'
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Quanto tempo leva o processo completo?',
            answer: 'O processo completo leva cerca de 8 a 10 semanas, com 3 a 4 provas durante este período.'
          },
          {
            id: uuidv4(),
            question: 'Posso escolher qualquer detalhe do terno?',
            answer: 'Sim, desde o número de botões até o tipo de lapela, forro e acabamentos, tudo é personalizável.'
          },
          {
            id: uuidv4(),
            question: 'Vocês mantêm meu molde para futuras encomendas?',
            answer: 'Sim, mantemos seu molde individual em arquivo para facilitar futuras encomendas.'
          },
          {
            id: uuidv4(),
            question: 'Vocês oferecem serviços de ajuste para variações de peso?',
            answer: 'Sim, oferecemos serviço vitalício de ajustes para acomodar pequenas variações de peso ou preferências.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Experimente a diferença da alfaiataria sob medida',
        content: 'Agende uma consulta inicial em nosso atelier para discutir suas necessidades e explorar nossa curadoria de tecidos.',
        buttonText: 'Agendar consulta',
        buttonUrl: '#appointment'
      }
    ]
  }
];
