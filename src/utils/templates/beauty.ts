
import { v4 as uuidv4 } from 'uuid';
import { Template, Block } from '@/types/editor';
import { 
  createHeroBlock, 
  createTextBlock, 
  createImageBlock, 
  createGalleryBlock, 
  createVideoBlock, 
  createImageTextBlock, 
  createTextImageBlock, 
  createCTABlock, 
  createFAQBlock, 
  createFeaturesBlock, 
  createBenefitsBlock 
} from '../blockCreators/blocks';

// Create 3 beauty templates
export const beautyTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Cosméticos - Skincare Natural',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
    blocks: [
      // Hero with natural vibes
      {
        ...createHeroBlock(1),
        heading: 'Beleza Natural e Consciente',
        subheading: 'Produtos para a pele feitos com ingredientes orgânicos e sustentáveis',
        backgroundImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
        buttonText: 'Descobrir produtos',
        buttonUrl: '#products'
      },
      
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'Cuidado real com sua pele',
        content: '<p>Nossa linha de skincare foi desenvolvida para nutrir, proteger e regenerar sua pele utilizando apenas o que a natureza tem de melhor. Sem ingredientes sintéticos, parabenos ou fragrâncias artificiais.</p><p>Cada produto é formulado com ingredientes orgânicos certificados, ativamente benéficos para todos os tipos de pele e testados apenas em voluntários humanos.</p>'
      },
      
      // Video about formulation
      {
        ...createVideoBlock(1),
        title: 'Do campo ao frasco',
        heading: 'Nosso processo de formulação',
        videoUrl: 'https://www.youtube.com/watch?v=gOkLxv0vAOw',
        description: 'Conheça o processo de seleção de ingredientes e formulação de nossos produtos, desde o cultivo orgânico até o envase consciente.'
      },
      
      // Key ingredients
      {
        ...createFeaturesBlock(3),
        heading: 'Ingredientes poderosos',
        features: [
          {
            id: uuidv4(),
            title: 'Ácido Hialurônico Natural',
            description: 'Extraído por biofermentação, hidrata profundamente',
            icon: 'Droplet'
          },
          {
            id: uuidv4(),
            title: 'Vitamina C Estabilizada',
            description: 'De fontes naturais, combate radicais livres',
            icon: 'Sun'
          },
          {
            id: uuidv4(),
            title: 'Óleo de Rosa Mosqueta',
            description: 'Rico em antioxidantes, restaura a barreira cutânea',
            icon: 'Flower'
          }
        ]
      },
      
      // Gallery of products
      {
        ...createGalleryBlock(1),
        title: 'Nossa linha completa',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc',
            alt: 'Sérum facial',
            caption: 'Sérum de Vitamina C - antioxidante'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9',
            alt: 'Creme hidratante',
            caption: 'Hidratante Profundo - todas as peles'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1601299164848-e383f4c362fd',
            alt: 'Tônico facial',
            caption: 'Tônico Equilibrante - sem álcool'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1631730486572-5183819e5736',
            alt: 'Máscara facial',
            caption: 'Máscara Detox - argila verde'
          }
        ]
      },
      
      // Sustainable practices
      {
        ...createImageTextBlock(1),
        heading: 'Compromisso com a sustentabilidade',
        content: 'Todos os nossos produtos são formulados, produzidos e embalados com o menor impacto ambiental possível. Utilizamos embalagens recicláveis ou biodegradáveis, e nossa fábrica funciona com energia solar.',
        image: {
          src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          alt: 'Produção sustentável'
        }
      },
      
      // Skincare routine
      {
        ...createTextImageBlock(1),
        heading: 'Rotina de cuidados simples e eficaz',
        content: 'Acreditamos que uma rotina de skincare não precisa ser complicada para ser eficaz. Nossos produtos são formulados para trabalhar em sinergia e proporcionar resultados visíveis com apenas alguns passos essenciais.',
        image: {
          src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
          alt: 'Rotina de skincare'
        }
      },
      
      // Tutorial video
      {
        ...createVideoBlock(1),
        title: 'Aprenda com especialistas',
        heading: 'Guia completo de skincare',
        videoUrl: 'https://www.youtube.com/watch?v=GiJ9_P8pUCM',
        description: 'Nossa especialista em dermatologia mostra o passo a passo para uma rotina de skincare eficiente para diferentes tipos de pele.'
      },
      
      // Benefits section
      {
        ...createBenefitsBlock(2),
        heading: 'Benefícios do skincare natural',
        benefits: [
          {
            id: uuidv4(),
            title: 'Gentil com a Pele',
            description: 'Menos irritações e sensibilização',
            icon: 'Shield'
          },
          {
            id: uuidv4(),
            title: 'Resultados Duradouros',
            description: 'Trata a causa, não apenas os sintomas',
            icon: 'Clock'
          },
          {
            id: uuidv4(),
            title: 'Melhor para o Planeta',
            description: 'Ingredientes biodegradáveis e embalagens sustentáveis',
            icon: 'Globe'
          },
          {
            id: uuidv4(),
            title: 'Para Toda a Família',
            description: 'Seguro para peles sensíveis e de todas as idades',
            icon: 'Users'
          }
        ]
      },
      
      // Testimonials
      {
        ...createTextBlock(1),
        heading: 'O que nossos clientes dizem',
        content: '<blockquote>"Depois de anos lutando contra irritações e alergias, finalmente encontrei produtos que acalmam minha pele sensível. Faz toda diferença usar ingredientes que realmente nutrem a pele." - Camila R.</blockquote><blockquote>"Nunca acreditei que produtos naturais pudessem ser tão eficazes. Minha pele está mais firme, hidratada e luminosa desde que comecei a usar a linha completa." - Thiago M.</blockquote>'
      },
      
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        questions: [
          {
            id: uuidv4(),
            question: 'Produtos naturais funcionam para pele oleosa?',
            answer: 'Sim! Na verdade, muitos óleos naturais ajudam a equilibrar a produção de oleosidade da pele.'
          },
          {
            id: uuidv4(),
            question: 'Por que os produtos não têm conservantes?',
            answer: 'Utilizamos conservantes naturais como extratos de semente de uva e vitamina E. Além disso, nossas embalagens airless prolongam a vida útil sem necessidade de conservantes sintéticos.'
          },
          {
            id: uuidv4(),
            question: 'Posso usar durante a gravidez?',
            answer: 'Sim, todos os nossos produtos são seguros para gestantes e lactantes. Ainda assim, recomendamos consultar seu médico.'
          },
          {
            id: uuidv4(),
            question: 'Quanto tempo para ver resultados?',
            answer: 'A renovação celular leva aproximadamente 28 dias, por isso recomendamos usar os produtos por pelo menos 4 semanas para avaliar os resultados.'
          }
        ]
      },
      
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Comece sua jornada de cuidados naturais',
        content: 'Experimente nossos produtos com 30 dias de garantia. Se não estiver completamente satisfeito, devolvemos seu dinheiro.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  },
  // Second template - Maquiagem Vegana
  {
    id: uuidv4(),
    name: 'Cosméticos - Maquiagem Vegana',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'Beleza Ética e Colorida',
        subheading: 'Maquiagem vegana de alta performance e pigmentação intensa',
        backgroundImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
        buttonText: 'Ver cores',
        buttonUrl: '#colors'
      },
      
      // Introduction text
      {
        ...createTextBlock(1),
        heading: 'Colorido sem crueldade',
        content: '<p>Nossa linha de maquiagem combina alto poder de pigmentação, longa duração e fórmulas livres de crueldade animal. Cada produto é desenvolvido com ingredientes veganos e ativos naturais que beneficiam sua pele enquanto realçam sua beleza.</p><p>Somos certificados internacionalmente como veganos e cruelty-free, honrando nosso compromisso com a ética e o bem-estar animal.</p>'
      },
      
      // Video block
      {
        ...createVideoBlock(1),
        title: 'Arte e pigmentos',
        heading: 'O processo de criação das nossas cores',
        videoUrl: 'https://www.youtube.com/watch?v=ipUQE8EUPlU',
        description: 'Veja como extraímos e desenvolvemos pigmentos vibrantes a partir de fontes naturais e minerais, sem ingredientes de origem animal.'
      },
      
      // Vegan makeup features
      {
        ...createFeaturesBlock(3),
        heading: 'Por que escolher maquiagem vegana',
        features: [
          {
            id: uuidv4(),
            title: 'Livre de Crueldade',
            description: 'Não testamos em animais em nenhuma etapa',
            icon: 'Heart'
          },
          {
            id: uuidv4(),
            title: 'Rica em Nutrientes',
            description: 'Antioxidantes e vitaminas que cuidam da pele',
            icon: 'Sparkles'
          },
          {
            id: uuidv4(),
            title: 'Alta Performance',
            description: 'Pigmentação intensa e longa duração',
            icon: 'Star'
          }
        ]
      },
      
      // Product gallery
      {
        ...createGalleryBlock(1),
        title: 'Coleção Rainbow',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1503236823255-94609f598e71',
            alt: 'Paleta de sombras',
            caption: 'Paleta Sunset - 12 cores vibrantes'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796',
            alt: 'Batons veganos',
            caption: 'Batons Velvet - acabamento matte'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1627384115471-f71574f6f10a',
            alt: 'Iluminadores',
            caption: 'Iluminadores Glow - efeito natural'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1631214560026-478c0e960005',
            alt: 'Bases líquidas',
            caption: 'Base Second Skin - cobertura média a alta'
          }
        ]
      },
      
      // Image + Text block
      {
        ...createImageTextBlock(1),
        heading: 'Ingredientes que fazem diferença',
        content: 'Substituímos ingredientes de origem animal por alternativas vegetais e minerais que oferecem os mesmos ou melhores resultados. Óleo de argan, manteiga de karité, cera de candelila e pigmentos minerais são alguns dos componentes que tornam nossa maquiagem especial.',
        image: {
          src: 'https://images.unsplash.com/photo-1614859073216-67baab1e3ba5',
          alt: 'Ingredientes naturais'
        }
      },
      
      // Text + Image block
      {
        ...createTextImageBlock(1),
        heading: 'Embalagens conscientes',
        content: 'Nossas embalagens são feitas com materiais reciclados ou biodegradáveis. Apostamos em designs recarregáveis para reduzir o desperdício e estimular o consumo consciente. Pequenas mudanças que fazem grande diferença para o planeta.',
        image: {
          src: 'https://images.unsplash.com/photo-1585236830569-5cf3816540ae',
          alt: 'Embalagens ecológicas'
        }
      },
      
      // Tutorial video
      {
        ...createVideoBlock(1),
        title: 'Tutorial de maquiagem',
        heading: 'Looks de alta performance com produtos veganos',
        videoUrl: 'https://www.youtube.com/watch?v=QAgSMSV87Lo',
        description: 'Nossa maquiadora demonstra como criar looks diversos e impactantes utilizando apenas produtos veganos e cruelty-free.'
      },
      
      // Benefits
      {
        ...createBenefitsBlock(2),
        heading: 'Benefícios para você e o planeta',
        benefits: [
          {
            id: uuidv4(),
            title: 'Pele Mais Saudável',
            description: 'Fórmulas sem ingredientes irritantes comuns',
            icon: 'Smile'
          },
          {
            id: uuidv4(),
            title: 'Consumo Consciente',
            description: 'Cada compra apoia práticas éticas de negócio',
            icon: 'CheckSquare'
          },
          {
            id: uuidv4(),
            title: 'Proteção dos Animais',
            description: 'Zero exploração animal em nossa cadeia produtiva',
            icon: 'Shield'
          },
          {
            id: uuidv4(),
            title: 'Menor Pegada Ambiental',
            description: 'Processos produtivos com baixo impacto ecológico',
            icon: 'Leaf'
          }
        ]
      },
      
      // FAQ
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        questions: [
          {
            id: uuidv4(),
            question: 'Maquiagem vegana tem boa fixação?',
            answer: 'Sim! Nossas fórmulas veganas são desenvolvidas para oferecer alta performance, com pigmentação intensa e longa duração.'
          },
          {
            id: uuidv4(),
            question: 'Como saber se um produto é realmente vegano?',
            answer: 'Todos os nossos produtos possuem certificação Vegan Society e PETA, garantindo que não contêm ingredientes de origem animal e não são testados em animais.'
          },
          {
            id: uuidv4(),
            question: 'Posso usar se tenho pele sensível?',
            answer: 'Nossas fórmulas são desenvolvidas para minimizar riscos de irritação, mas recomendamos sempre fazer um teste de sensibilidade antes do uso completo.'
          },
          {
            id: uuidv4(),
            question: 'Como descartar as embalagens?',
            answer: 'Oferecemos programa de reciclagem onde você pode devolver as embalagens vazias e ganhar descontos em novas compras.'
          }
        ]
      },
      
      // CTA
      {
        ...createCTABlock(1),
        heading: 'Beleza com propósito',
        content: 'Experimente o melhor da maquiagem vegana e descubra que é possível ter alta performance sem comprometer seus valores.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  },
  // Third template - Perfumaria Artesanal
  {
    id: uuidv4(),
    name: 'Cosméticos - Perfumaria Artesanal',
    category: 'beauty',
    thumbnail: 'https://images.unsplash.com/photo-1615289646521-4fd40a38f469',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'Fragrâncias que Contam Histórias',
        subheading: 'Perfumes artesanais criados com óleos essenciais e essências naturais',
        backgroundImage: 'https://images.unsplash.com/photo-1615289646521-4fd40a38f469',
        buttonText: 'Descobrir fragrâncias',
        buttonUrl: '#fragrances'
      },
      
      // Introduction text
      {
        ...createTextBlock(1),
        heading: 'A arte da perfumaria natural',
        content: '<p>Nossas fragrâncias são criadas por mestres perfumistas que combinam técnicas tradicionais com ingredientes sustentáveis e naturais. Cada perfume é uma obra de arte olfativa que evolui ao longo do dia, revelando diferentes notas e sensações.</p><p>Utilizamos óleos essenciais extraídos por métodos artesanais, respeitando o tempo da natureza e as comunidades produtoras ao redor do mundo.</p>'
      },
      
      // Video
      {
        ...createVideoBlock(1),
        title: 'A magia dos perfumes',
        heading: 'Como criamos nossas fragrâncias',
        videoUrl: 'https://www.youtube.com/watch?v=1oWHLaKPjps',
        description: 'Acompanhe o processo de criação de um perfume artesanal, desde a colheita das matérias-primas até a maturação final da fragrância.'
      },
      
      // Features
      {
        ...createFeaturesBlock(3),
        heading: 'O que torna nossos perfumes especiais',
        features: [
          {
            id: uuidv4(),
            title: 'Ingredientes Naturais',
            description: 'Óleos essenciais puros de alta qualidade',
            icon: 'Flower'
          },
          {
            id: uuidv4(),
            title: 'Processos Artesanais',
            description: 'Maceração lenta e maturação prolongada',
            icon: 'Clock'
          },
          {
            id: uuidv4(),
            title: 'Criações Exclusivas',
            description: 'Fragrâncias em edições limitadas',
            icon: 'Star'
          }
        ]
      },
      
      // Gallery
      {
        ...createGalleryBlock(1),
        title: 'Coleção Elementos',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1616262373426-18bfa28bafab',
            alt: 'Perfume Terra',
            caption: 'Terra - notas amadeiradas e especiarias'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1592945403407-9cefa6367589',
            alt: 'Perfume Água',
            caption: 'Água - notas aquáticas e cítricas'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1593487568720-92097fb460fb',
            alt: 'Perfume Ar',
            caption: 'Ar - notas florais e frescas'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1617464985210-8753c09631dd',
            alt: 'Perfume Fogo',
            caption: 'Fogo - notas orientais e âmbar'
          }
        ]
      },
      
      // Image + Text
      {
        ...createImageTextBlock(1),
        heading: 'Ingredientes nobres',
        content: 'Viajamos o mundo em busca dos melhores ingredientes: jasmim colhido ao amanhecer na Índia, bergamota da Calábria, sândalo australiano e vanilla bourbon de Madagascar. Cada matéria-prima é selecionada por sua qualidade excepcional e produzida de forma sustentável.',
        image: {
          src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108',
          alt: 'Ingredientes para perfumes'
        }
      },
      
      // Text + Image
      {
        ...createTextImageBlock(1),
        heading: 'O processo de criação',
        content: 'Cada perfume começa como uma ideia, uma memória ou uma emoção que queremos capturar. Nossos perfumistas trabalham por meses, combinando e ajustando acordes até encontrar a harmonia perfeita. Depois, a fragrância é deixada para maturar por pelo menos três meses antes de ser envasada.',
        image: {
          src: 'https://images.unsplash.com/photo-1618332366536-54cb6f2e7afb',
          alt: 'Laboratório de perfumaria'
        }
      },
      
      // Video tutorial
      {
        ...createVideoBlock(1),
        title: 'A arte de usar perfume',
        heading: 'Como aproveitar ao máximo sua fragrância',
        videoUrl: 'https://www.youtube.com/watch?v=pldqvM4dQ8k',
        description: 'Nosso mestre perfumista compartilha segredos sobre como aplicar, combinar e preservar fragrâncias naturais.'
      },
      
      // Benefits
      {
        ...createBenefitsBlock(2),
        heading: 'Vantagens da perfumaria natural',
        benefits: [
          {
            id: uuidv4(),
            title: 'Complexidade Olfativa',
            description: 'Notas que evoluem e se transformam ao longo do dia',
            icon: 'Layers'
          },
          {
            id: uuidv4(),
            title: 'Benefícios Terapêuticos',
            description: 'Óleos essenciais com propriedades aromaterápicas',
            icon: 'Heart'
          },
          {
            id: uuidv4(),
            title: 'Menos Alergias',
            description: 'Sem corantes e fixadores sintéticos agressivos',
            icon: 'Shield'
          },
          {
            id: uuidv4(),
            title: 'Conexão com a Natureza',
            description: 'Fragrâncias que evocam paisagens e memórias reais',
            icon: 'Mountain'
          }
        ]
      },
      
      // FAQ
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        questions: [
          {
            id: uuidv4(),
            question: 'Perfumes naturais têm boa fixação?',
            answer: 'Sim, embora se comportem diferente dos sintéticos. Em vez de desaparecerem abruptamente, evoluem sutilmente, criando uma experiência olfativa mais completa e duradoura.'
          },
          {
            id: uuidv4(),
            question: 'Como escolher um perfume sem testar pessoalmente?',
            answer: 'Oferecemos kits de amostra com todas as nossas fragrâncias e consultas virtuais com nossos especialistas para ajudar na escolha.'
          },
          {
            id: uuidv4(),
            question: 'Os perfumes são unissex?',
            answer: 'Acreditamos que fragrâncias não têm gênero. Todas as nossas criações podem ser usadas por qualquer pessoa que se conecte com elas.'
          },
          {
            id: uuidv4(),
            question: 'Como conservar perfumes naturais?',
            answer: 'Guarde em local fresco, seco e longe da luz direta. Nossas embalagens em vidro âmbar ajudam a proteger a fragrância.'
          }
        ]
      },
      
      // CTA
      {
        ...createCTABlock(1),
        heading: 'Encontre sua assinatura olfativa',
        content: 'Experimente nossas fragrâncias através de nosso kit descoberta com amostras de todas as coleções.',
        buttonText: 'Adquirir kit de amostras',
        buttonUrl: '#samples'
      }
    ]
  }
];
