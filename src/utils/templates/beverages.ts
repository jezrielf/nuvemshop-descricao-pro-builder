
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

// Create 3 beverages templates
export const beveragesTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Bebidas - Café Especial',
    category: 'beverages',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'A Arte do Café Especial',
        subheading: 'Grãos selecionados, torras artesanais, experiência extraordinária',
        backgroundImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
        buttonText: 'Descobrir sabores',
        buttonUrl: '#flavors'
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'Da origem à sua xícara',
        content: '<p>Nosso café é cuidadosamente selecionado nas melhores regiões produtoras do Brasil e do mundo. Trabalhamos diretamente com pequenos produtores que compartilham nossa paixão por qualidade e sustentabilidade.</p><p>Cada lote é torrado artesanalmente em pequenas quantidades para garantir frescor e preservar os aromas e sabores únicos de cada origem.</p>'
      },
      // Process video
      {
        ...createVideoBlock(1),
        title: 'A jornada do café',
        heading: 'Do cultivo à xícara perfeita',
        videoUrl: 'https://www.youtube.com/watch?v=WqtGwhRxuD4',
        description: 'Acompanhe todo o processo de produção do nosso café, desde a colheita seletiva dos grãos até o momento da extração perfeita.'
      },
      // Features section
      {
        ...createFeaturesBlock(3),
        heading: 'Nossas especialidades',
        features: [
          {
            id: uuidv4(),
            title: 'Micro-lotes',
            description: 'Cafés exclusivos com produção limitada',
            icon: 'Star'
          },
          {
            id: uuidv4(),
            title: 'Torras Frescas',
            description: 'Enviamos apenas cafés torrados na semana',
            icon: 'Calendar'
          },
          {
            id: uuidv4(),
            title: 'Origens Diversas',
            description: 'Do Brasil à Etiópia, uma viagem de sabores',
            icon: 'Globe'
          }
        ]
      },
      // Product gallery
      {
        ...createGalleryBlock(1),
        title: 'Nossas seleções',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe',
            alt: 'Café Cerrado Mineiro',
            caption: 'Cerrado Mineiro - notas de chocolate e caramelo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1559525839-b184a4d542fd',
            alt: 'Café Etiópia Yirgacheffe',
            caption: 'Etiópia Yirgacheffe - notas florais e cítricas'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56',
            alt: 'Café Colômbia Huila',
            caption: 'Colômbia Huila - notas de frutas vermelhas'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
            alt: 'Blend Especial da Casa',
            caption: 'Blend Especial - equilibrado e versátil'
          }
        ]
      },
      // Featured product with image and text
      {
        ...createImageTextBlock(1),
        heading: 'Assinatura de Café',
        content: 'Receba mensalmente uma seleção dos nossos melhores cafés fresquinhos em casa. Personalize de acordo com seu método de preparo preferido e descubra novos sabores a cada entrega, junto com cards informativos sobre a origem e as notas sensoriais.',
        image: {
          src: 'https://images.unsplash.com/photo-1616338695096-71f6e39a5cf3',
          alt: 'Kit assinatura de café'
        }
      },
      // Sustainable practices
      {
        ...createTextImageBlock(1),
        heading: 'Compromisso com a sustentabilidade',
        content: 'Trabalhamos apenas com produtores que seguem práticas sustentáveis de cultivo, respeitando o meio ambiente e garantindo condições justas de trabalho. Nossas embalagens são biodegradáveis e nosso processo de torra utiliza energia de fontes renováveis.',
        image: {
          src: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92',
          alt: 'Cultivo sustentável de café'
        }
      },
      // Brewing video
      {
        ...createVideoBlock(1),
        title: 'A extração perfeita',
        heading: 'Técnicas para realçar cada sabor',
        videoUrl: 'https://www.youtube.com/watch?v=JrcH-4wHK9w',
        description: 'Nosso barista ensina diferentes métodos de preparo para extrair o melhor de cada tipo de café.'
      },
      // Benefits section
      {
        ...createBenefitsBlock(2),
        heading: 'Por que escolher café especial',
        benefits: [
          {
            id: uuidv4(),
            title: 'Experiência Sensorial',
            description: 'Aromas e sabores únicos e complexos',
            icon: 'Coffee'
          },
          {
            id: uuidv4(),
            title: 'Rastreabilidade',
            description: 'Conheça a história por trás de cada xícara',
            icon: 'Map'
          },
          {
            id: uuidv4(),
            title: 'Qualidade Superior',
            description: 'Grãos selecionados e processos cuidadosos',
            icon: 'Award'
          },
          {
            id: uuidv4(),
            title: 'Impacto Positivo',
            description: 'Apoio a pequenos produtores e práticas sustentáveis',
            icon: 'Heart'
          }
        ]
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Qual a diferença entre café especial e café comum?',
            answer: 'Cafés especiais possuem pontuação acima de 80 pontos na escala da SCA (Specialty Coffee Association), com características sensoriais distintas e rastreabilidade completa.'
          },
          {
            id: uuidv4(),
            question: 'Quanto tempo o café se mantém fresco?',
            answer: 'Recomendamos consumir o café em até 30 dias após a torra para aproveitar ao máximo seus aromas e sabores.'
          },
          {
            id: uuidv4(),
            question: 'Como devo armazenar o café?',
            answer: 'Em local fresco, seco, longe da luz e em recipiente hermético. Não recomendamos armazenar na geladeira devido à umidade.'
          },
          {
            id: uuidv4(),
            question: 'Vocês moem o café?',
            answer: 'Sim, podemos moer de acordo com seu método de preparo ou enviar os grãos inteiros para que você moa no momento do preparo.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Experimente a diferença do café especial',
        content: 'Faça sua primeira compra com 15% de desconto e comece a descobrir um novo universo de sabores.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Bebidas - Cerveja Artesanal',
    category: 'beverages',
    thumbnail: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148',
    blocks: [
      // Add at least 10 blocks here
      {
        ...createHeroBlock(1),
        heading: 'Cerveja Artesanal de Verdade',
        subheading: 'Tradição, criatividade e ingredientes selecionados em cada garrafa',
        backgroundImage: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148',
        buttonText: 'Explorar estilos',
        buttonUrl: '#styles'
      },
      {
        ...createTextBlock(1),
        heading: 'Feita por apaixonados para apaixonados',
        content: '<p>Nossa cervejaria nasceu da paixão por criar sabores únicos e proporcionar experiências memoráveis. Cada receita é desenvolvida com cuidado artesanal, respeitando as tradições cervejeiras e, ao mesmo tempo, inovando com criatividade.</p><p>Utilizamos apenas ingredientes selecionados, sem aditivos artificiais ou processos industriais que comprometam o sabor e a qualidade.</p>'
      },
      {
        ...createVideoBlock(1),
        title: 'Arte em forma líquida',
        heading: 'O processo de produção artesanal',
        videoUrl: 'https://www.youtube.com/watch?v=QTtZ6C4iBDY',
        description: 'Conheça nossa cervejaria e acompanhe todo o processo de produção, desde a seleção dos maltes até o envase cuidadoso.'
      },
      {
        ...createFeaturesBlock(3),
        heading: 'Linhas principais',
        features: [
          {
            id: uuidv4(),
            title: 'Clássicos Revisitados',
            description: 'Estilos tradicionais com toques únicos',
            icon: 'Star'
          },
          {
            id: uuidv4(),
            title: 'Linha Experimental',
            description: 'Criações ousadas e inovadoras',
            icon: 'Zap'
          },
          {
            id: uuidv4(),
            title: 'Edições Sazonais',
            description: 'Cervejas especiais para cada época do ano',
            icon: 'Calendar'
          }
        ]
      },
      {
        ...createGalleryBlock(1),
        title: 'Nosso portfólio',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757',
            alt: 'American IPA',
            caption: 'Hop Explosion IPA - Amargor intenso e aroma cítrico'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7',
            alt: 'Weissbier',
            caption: 'Golden Wheat - Refrescante com notas de banana e cravo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1608270586620-248524c67de9',
            alt: 'Stout',
            caption: 'Dark Matter Stout - Notas de café e chocolate'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1587582816472-81e94768469a',
            alt: 'Sour',
            caption: 'Wild Berries Sour - Acidez equilibrada com frutas vermelhas'
          }
        ]
      },
      {
        ...createImageTextBlock(1),
        heading: 'Ingredientes selecionados',
        content: 'Selecionamos os melhores maltes, lúpulos, leveduras e água para criar nossas cervejas. Trabalhamos com fornecedores locais sempre que possível e importamos ingredientes especiais de regiões tradicionais quando necessário para garantir autenticidade e qualidade.',
        image: {
          src: 'https://images.unsplash.com/photo-1569384229523-62444388bc68',
          alt: 'Ingredientes cervejeiros'
        }
      },
      {
        ...createTextImageBlock(1),
        heading: 'Tap Room e experiências',
        content: 'Visite nosso Tap Room e experimente nossas cervejas direto da fonte, acompanhadas de harmonizações especialmente desenvolvidas para realçar cada sabor. Oferecemos tours pela fábrica, cursos de degustação e eventos exclusivos para os amantes da boa cerveja.',
        image: {
          src: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7',
          alt: 'Tap room'
        }
      },
      {
        ...createVideoBlock(1),
        title: 'Cultura cervejeira',
        heading: 'A história da cerveja e nosso papel nela',
        videoUrl: 'https://www.youtube.com/watch?v=U9tHCZ5FCF0',
        description: 'Uma breve jornada pela história milenar da cerveja e como nossa cervejaria se insere nessa tradição, respeitando o passado enquanto olha para o futuro.'
      },
      {
        ...createBenefitsBlock(2),
        heading: 'Diferenciais da cerveja artesanal',
        benefits: [
          {
            id: uuidv4(),
            title: 'Sabor Autêntico',
            description: 'Sem aditivos ou pasteurização que alteram o sabor',
            icon: 'ThumbsUp'
          },
          {
            id: uuidv4(),
            title: 'Ingredientes Naturais',
            description: 'Apenas malte, lúp, água e levedura',
            icon: 'Leaf'
          },
          {
            id: uuidv4(),
            title: 'Produção em Pequena Escala',
            description: 'Atenção aos detalhes e controle de qualidade rigoroso',
            icon: 'Eye'
          },
          {
            id: uuidv4(),
            title: 'Economia Local',
            description: 'Apoio a produtores e fornecedores da região',
            icon: 'Home'
          }
        ]
      },
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Qual a diferença entre cerveja artesanal e industrial?',
            answer: 'Cervejas artesanais são produzidas em pequena escala, com foco na qualidade e no sabor, usando apenas ingredientes naturais e processos que preservam as características originais da bebida.'
          },
          {
            id: uuidv4(),
            question: 'Como devo armazenar a cerveja?',
            answer: 'Em local fresco (entre 10°C e 15°C), sem exposição à luz direta e preferencialmente na posição vertical para minimizar a oxidação.'
          },
          {
            id: uuidv4(),
            question: 'Todas as cervejas contêm glúten?',
            answer: 'A maioria das cervejas contém glúten, mas temos opções produzidas com grãos alternativos para pessoas com sensibilidade ao glúten.'
          },
          {
            id: uuidv4(),
            question: 'Vocês realizam entregas?',
            answer: 'Sim, entregamos para todo o Brasil com embalagens especiais que garantem a integridade e frescor das cervejas.'
          }
        ]
      },
      {
        ...createCTABlock(1),
        heading: 'Experimente o verdadeiro sabor da cerveja',
        content: 'Assine nosso clube e receba mensalmente uma seleção exclusiva das nossas melhores cervejas, incluindo lançamentos e edições limitadas.',
        buttonText: 'Conhecer o clube',
        buttonUrl: '#club'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Bebidas - Sucos Naturais',
    category: 'beverages',
    thumbnail: 'https://images.unsplash.com/photo-1546173159-315724a31696',
    blocks: [
      // Add at least 10 blocks here
      {
        ...createHeroBlock(1),
        heading: 'Nutrição Líquida em Cada Gole',
        subheading: 'Sucos prensados a frio, 100% naturais e funcionais',
        backgroundImage: 'https://images.unsplash.com/photo-1546173159-315724a31696',
        buttonText: 'Descobrir sabores',
        buttonUrl: '#flavors'
      },
      {
        ...createTextBlock(1),
        heading: 'Puramente natural',
        content: '<p>Nossos sucos são feitos exclusivamente com frutas, vegetais e superalimentos orgânicos, sem adição de água, açúcar, conservantes ou qualquer tipo de aditivo artificial. Utilizamos o método de extração por prensagem a frio, que preserva todos os nutrientes, enzimas e sabores originais dos ingredientes.</p><p>Cada garrafa contém o equivalente a aproximadamente 1kg de frutas e vegetais frescos, oferecendo uma forma prática e deliciosa de complementar sua nutrição diária.</p>'
      },
      {
        ...createVideoBlock(1),
        title: 'Do campo à garrafa',
        heading: 'Nosso processo de produção',
        videoUrl: 'https://www.youtube.com/watch?v=AUNg55TbGBw',
        description: 'Conheça todo o processo, desde a seleção dos ingredientes orgânicos até o envase e preservação dos sucos por meio da prensagem a frio.'
      },
      {
        ...createFeaturesBlock(3),
        heading: 'Nossas linhas',
        features: [
          {
            id: uuidv4(),
            title: 'Detox',
            description: 'Combinações para desintoxicar e revitalizar',
            icon: 'RefreshCw'
          },
          {
            id: uuidv4(),
            title: 'Energia',
            description: 'Boost natural para seu dia',
            icon: 'Zap'
          },
          {
            id: uuidv4(),
            title: 'Imunidade',
            description: 'Fortalecimento do sistema imunológico',
            icon: 'Shield'
          }
        ]
      },
      {
        ...createGalleryBlock(1),
        title: 'Sabores e benefícios',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1622597467836-f3e6707e1bf6',
            alt: 'Suco verde',
            caption: 'Green Power - maçã, couve, pepino, gengibre e limão'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1547514701-42782101795e',
            alt: 'Suco laranja',
            caption: 'Sunshine - laranja, cenoura, cúrcuma e maracujá'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
            alt: 'Suco vermelho',
            caption: 'Red Boost - beterraba, morango, maçã e limão'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d',
            alt: 'Suco roxo',
            caption: 'Antioxidant - açaí, mirtilo, banana e amora'
          }
        ]
      },
      {
        ...createImageTextBlock(1),
        heading: 'Prensagem a frio',
        content: 'Diferente da centrifugação convencional, a prensagem a frio não gera calor ou atrito, evitando a oxidação e preservando nutrientes sensíveis como enzimas e vitaminas. O resultado é um suco mais nutritivo, saboroso e com vida útil natural mais longa, sem necessidade de pasteurização ou conservantes.',
        image: {
          src: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd',
          alt: 'Processo de prensagem a frio'
        }
      },
      {
        ...createTextImageBlock(1),
        heading: 'Ingredientes orgânicos',
        content: 'Trabalhamos em parceria com pequenos produtores orgânicos certificados, garantindo ingredientes livres de agrotóxicos e cultivados de forma sustentável. Visitamos regularmente as fazendas para assegurar a qualidade e frescor de tudo que entra em nossos sucos.',
        image: {
          src: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf',
          alt: 'Fazenda orgânica'
        }
      },
      {
        ...createVideoBlock(1),
        title: 'Nutrição na prática',
        heading: 'Como incorporar os sucos em sua rotina',
        videoUrl: 'https://www.youtube.com/watch?v=IvKCEHDpNrI',
        description: 'Nossa nutricionista compartilha dicas para maximizar os benefícios dos sucos, incluindo horários ideais de consumo e combinações com alimentos.'
      },
      {
        ...createBenefitsBlock(2),
        heading: 'Por que escolher sucos prensados a frio',
        benefits: [
          {
            id: uuidv4(),
            title: 'Mais Nutrientes',
            description: 'Preservação de vitaminas, minerais e enzimas vivas',
            icon: 'Droplet'
          },
          {
            id: uuidv4(),
            title: 'Absorção Eficiente',
            description: 'Nutrientes em forma líquida são absorvidos rapidamente',
            icon: 'ArrowUp'
          },
          {
            id: uuidv4(),
            title: 'Sabor Autêntico',
            description: 'O verdadeiro sabor dos ingredientes frescos',
            icon: 'Star'
          },
          {
            id: uuidv4(),
            title: 'Conveniência',
            description: 'Nutrição completa em formato prático para seu dia a dia',
            icon: 'Clock'
          }
        ]
      },
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Qual a validade dos sucos?',
            answer: 'Nossos sucos têm validade de 3 a 5 dias quando mantidos refrigerados entre 2°C e 6°C.'
          },
          {
            id: uuidv4(),
            question: 'Os sucos substituem refeições?',
            answer: 'Embora muito nutritivos, recomendamos os sucos como complemento a uma alimentação balanceada, não como substituto de refeições completas.'
          },
          {
            id: uuidv4(),
            question: 'Como são feitas as entregas?',
            answer: 'Entregamos em caixas térmicas especiais com gelo reciclável que mantém a temperatura ideal até o momento da entrega.'
          },
          {
            id: uuidv4(),
            question: 'Vocês oferecem programa de assinatura?',
            answer: 'Sim, temos programas semanais e quinzenais de entrega com descontos especiais e possibilidade de personalização da seleção.'
          }
        ]
      },
      {
        ...createCTABlock(1),
        heading: 'Comece sua jornada de bem-estar hoje',
        content: 'Experimente nosso kit inicial com 6 sabores diferentes e descubra como a nutrição líquida pode transformar sua saúde e disposição.',
        buttonText: 'Pedir meu kit',
        buttonUrl: '#order'
      }
    ]
  }
];
