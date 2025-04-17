
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

// Create 3 clothing templates
export const clothingTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Moda Casual - Coleção Verão',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    blocks: [
      // Hero with summer vibes
      {
        ...createHeroBlock(1),
        heading: 'Nova Coleção Verão 2025',
        subheading: 'Looks leves e confortáveis para dias ensolarados',
        backgroundImage: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
        buttonText: 'Ver coleção completa',
        buttonUrl: '#collection'
      },
      // Video presentation
      {
        ...createVideoBlock(1),
        title: 'Fashion Film',
        heading: 'Bastidores da coleção',
        videoUrl: 'https://www.youtube.com/watch?v=7MBBLv5STY4',
        description: 'Assista ao fashion film da nossa nova coleção, gravado nas praias paradisíacas do Nordeste brasileiro.'
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'A essência do verão brasileiro',
        content: '<p>Nossa coleção Verão 2025 é uma celebração das cores e texturas brasileiras. Desenvolvida com tecidos leves e naturais, traz conforto e estilo para os dias mais quentes do ano.</p><p>Inspirada na diversidade das nossas praias, cada peça carrega um pouco da energia e vivacidade do verão tropical.</p>'
      },
      // Features highlight
      {
        ...createFeaturesBlock(3),
        heading: 'Diferenciais da coleção',
        features: [
          {
            id: uuidv4(),
            title: 'Algodão Orgânico',
            description: 'Tecidos naturais e sustentáveis',
            icon: 'Leaf'
          },
          {
            id: uuidv4(),
            title: 'Proteção UV',
            description: 'Tratamento especial que protege sua pele',
            icon: 'Sun'
          },
          {
            id: uuidv4(),
            title: 'Tingimento Natural',
            description: 'Cores vibrantes sem produtos químicos nocivos',
            icon: 'Palette'
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
            src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
            alt: 'Modelo feminino com vestido leve',
            caption: 'Vestido Brisa - 100% algodão'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b',
            alt: 'Modelo masculino com camisa linho',
            caption: 'Camisa Ondas - linho natural'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b',
            alt: 'Conjunto feminino',
            caption: 'Conjunto Areia - algodão e linho'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1554568218-0f1715e72254',
            alt: 'Acessórios de praia',
            caption: 'Acessórios complementares'
          }
        ]
      },
      // Product with image and text
      {
        ...createImageTextBlock(1),
        heading: 'Linha Praia',
        content: 'Nossa linha exclusiva para a praia combina proteção solar, secagem rápida e estilo imbatível. Perfeita para quem quer curtir o verão com conforto e elegância.',
        image: {
          src: 'https://images.unsplash.com/photo-1565537222174-2a43ca1c3462',
          alt: 'Modelo com roupa de praia'
        }
      },
      // Sustainability section
      {
        ...createTextImageBlock(1),
        heading: 'Moda Consciente',
        content: 'Todas as peças são produzidas com materiais sustentáveis e processos que respeitam o meio ambiente. Trabalhamos com comunidades locais e garantimos condições justas de trabalho.',
        image: {
          src: 'https://images.unsplash.com/photo-1571366343168-631c5bcca7a4',
          alt: 'Produção sustentável de roupas'
        }
      },
      // Another video for styling tips
      {
        ...createVideoBlock(1),
        title: 'Dicas de styling',
        heading: 'Como montar looks versáteis',
        videoUrl: 'https://www.youtube.com/watch?v=5YQexHTYRcA',
        description: 'Nossa stylist ensina como criar múltiplos looks com poucas peças da coleção, ideal para viagens e dia a dia.'
      },
      // Benefits of the collection
      {
        ...createBenefitsBlock(2),
        heading: 'Vantagens da nossa coleção',
        benefits: [
          {
            id: uuidv4(),
            title: 'Conforto Térmico',
            description: 'Tecidos que regulam a temperatura corporal',
            icon: 'Thermometer'
          },
          {
            id: uuidv4(),
            title: 'Fácil Manutenção',
            description: 'Peças de secagem rápida e que não precisam ser passadas',
            icon: 'Shirt'
          },
          {
            id: uuidv4(),
            title: 'Versatilidade',
            description: 'Combina facilmente entre si e com itens que você já tem',
            icon: 'Shuffle'
          },
          {
            id: uuidv4(),
            title: 'Durabilidade',
            description: 'Costura reforçada e materiais de qualidade',
            icon: 'Clock'
          }
        ]
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Dúvidas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Qual o prazo de entrega?',
            answer: 'Entregamos em todo o Brasil em até 7 dias úteis.'
          },
          {
            id: uuidv4(),
            question: 'As peças são fiéis ao tamanho da tabela?',
            answer: 'Sim, seguimos a tabela brasileira de tamanhos. Caso tenha dúvidas, consulte nossas medidas detalhadas.'
          },
          {
            id: uuidv4(),
            question: 'Como devo lavar as peças?',
            answer: 'Recomendamos lavagem a frio e secagem natural para preservar as cores e tecidos.'
          },
          {
            id: uuidv4(),
            question: 'Posso trocar se não servir?',
            answer: 'Sim, oferecemos troca gratuita em até 30 dias após a compra.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Prepare-se para o verão',
        content: 'Aproveite nosso lançamento com condições especiais e frete grátis para todo o Brasil.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Moda Fitness - Linha Performance',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'Performance e Estilo',
        subheading: 'Roupas tecnológicas para superar seus limites',
        backgroundImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
        buttonText: 'Explorar coleção',
        buttonUrl: '#collection'
      },
      // Video presentation
      {
        ...createVideoBlock(1),
        title: 'Tecnologia em movimento',
        heading: 'Conheça nossa tecnologia exclusiva',
        videoUrl: 'https://www.youtube.com/watch?v=UBhdBu3k0zo',
        description: 'Veja como nossas roupas são testadas em laboratório e por atletas profissionais para garantir máxima performance.'
      },
      // Features highlight
      {
        ...createFeaturesBlock(3),
        heading: 'Tecnologias exclusivas',
        features: [
          {
            id: uuidv4(),
            title: 'DrySense™',
            description: 'Tecido que seca 3x mais rápido que algodão comum',
            icon: 'Droplet'
          },
          {
            id: uuidv4(),
            title: 'UltraStretch™',
            description: 'Elasticidade em 4 direções para movimento sem restrições',
            icon: 'Move'
          },
          {
            id: uuidv4(),
            title: 'CoolBreeze™',
            description: 'Tecnologia de ventilação estratégica',
            icon: 'Wind'
          }
        ]
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'Desenvolvido por atletas para atletas',
        content: '<p>Nossa linha Performance foi desenvolvida em colaboração com atletas profissionais de diferentes modalidades. Cada peça é testada em condições reais para garantir conforto e funcionalidade.</p><p>Utilizamos tecnologias avançadas para criar roupas que ajudam você a ir além, sem abrir mão do estilo.</p>'
      },
      // Gallery showcase
      {
        ...createGalleryBlock(1),
        title: 'Linha completa',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1518310383802-640c2de311b6',
            alt: 'Legging feminina performance',
            caption: 'Legging UltraFit - compressão moderada'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
            alt: 'Top esportivo',
            caption: 'Top CrossTrain - suporte máximo'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1539794830467-1f1755804d13',
            alt: 'Camiseta masculina dryfit',
            caption: 'Camiseta SpeedRunner - 100% poliamida'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0',
            alt: 'Bermuda masculina',
            caption: 'Bermuda UltraRun - com bolsos fechados'
          }
        ]
      },
      // Product with image and text
      {
        ...createImageTextBlock(1),
        heading: 'Linha para corrida',
        content: 'Nossas roupas para corrida combinam leveza e suporte. Com tecidos que não causam atrito e detalhes refletivos para treinos noturnos, você pode se concentrar apenas em superar seus limites.',
        image: {
          src: 'https://images.unsplash.com/photo-1528629297340-d1d466945dc5',
          alt: 'Corredora com roupa técnica'
        }
      },
      // Text and image 
      {
        ...createTextImageBlock(1),
        heading: 'Linha Musculação',
        content: 'Desenvolvida para oferecer suporte e liberdade de movimento, nossa linha para musculação tem tecidos reforçados nos pontos de maior tensão e elasticidade para acompanhar cada movimento.',
        image: {
          src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
          alt: 'Homem treinando com roupas técnicas'
        }
      },
      // Benefits of tech clothing
      {
        ...createBenefitsBlock(2),
        heading: 'Benefícios das roupas técnicas',
        benefits: [
          {
            id: uuidv4(),
            title: 'Melhor Performance',
            description: 'Tecidos que trabalham a seu favor, não contra você',
            icon: 'BarChart'
          },
          {
            id: uuidv4(),
            title: 'Maior Conforto',
            description: 'Menos atrito, menos irritação na pele',
            icon: 'ThumbsUp'
          },
          {
            id: uuidv4(),
            title: 'Durabilidade',
            description: 'Mantém aparência e desempenho mesmo após muitas lavagens',
            icon: 'RefreshCw'
          },
          {
            id: uuidv4(),
            title: 'Controle Térmico',
            description: 'Mantém a temperatura corporal equilibrada',
            icon: 'Thermometer'
          }
        ]
      },
      // Another video for workout tips
      {
        ...createVideoBlock(1),
        title: 'Fitness em foco',
        heading: 'Treinos exclusivos com nossos embaixadores',
        videoUrl: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
        description: 'Aprenda exercícios eficientes para diferentes objetivos com os atletas que testam e aprovam nossas roupas.'
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Como escolher o tamanho correto?',
            answer: 'Nossas peças têm compressão moderada. Se preferir um ajuste mais confortável, recomendamos escolher um número acima.'
          },
          {
            id: uuidv4(),
            question: 'O material causa alergia?',
            answer: 'Não, utilizamos materiais hipoalergênicos e testamos todas as peças para garantir o conforto.'
          },
          {
            id: uuidv4(),
            question: 'Como devo lavar as roupas técnicas?',
            answer: 'Lavagem em máquina com água fria, sem amaciante e secagem natural para preservar as tecnologias.'
          },
          {
            id: uuidv4(),
            question: 'As peças desbotam?',
            answer: 'Nosso processo de tingimento avançado garante cores duradouras mesmo após muitas lavagens.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Eleve seu treino',
        content: 'Invista em roupas que fazem diferença na sua performance. Compre hoje e receba em casa com frete grátis.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Moda Infantil - Diversão e Conforto',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'Pequenos Exploradores',
        subheading: 'Roupas que acompanham todas as aventuras',
        backgroundImage: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7',
        buttonText: 'Ver coleção',
        buttonUrl: '#collection'
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'Pensado para crianças, aprovado pelos pais',
        content: '<p>Nossa linha infantil combina cores vibrantes, estampas divertidas e tecidos resistentes que sobrevivem a todas as brincadeiras. Criamos peças que as crianças amam usar e que os pais aprovam pela qualidade e praticidade.</p><p>Cada detalhe é pensado para oferecer conforto, segurança e liberdade de movimento.</p>'
      },
      // Video presentation
      {
        ...createVideoBlock(1),
        title: 'Diversão em movimento',
        heading: 'Nossas roupas em ação',
        videoUrl: 'https://www.youtube.com/watch?v=L6CAosPlfcY',
        description: 'Assista ao nosso vídeo de campanha e veja como nossas roupas resistem a todas as aventuras infantis!'
      },
      // Features highlight
      {
        ...createFeaturesBlock(3),
        heading: 'Por que os pais amam',
        features: [
          {
            id: uuidv4(),
            title: 'Super Resistente',
            description: 'Reforços nos joelhos e cotovelos',
            icon: 'Shield'
          },
          {
            id: uuidv4(),
            title: 'Fácil de Vestir',
            description: 'Aberturas estratégicas e elásticos confortáveis',
            icon: 'ThumbsUp'
          },
          {
            id: uuidv4(),
            title: 'Fácil de Limpar',
            description: 'Tecidos que não mancham facilmente',
            icon: 'Droplets'
          }
        ]
      },
      // Gallery showcase
      {
        ...createGalleryBlock(1),
        title: 'Coleção Aventura',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1622782262245-bfcc97d38270',
            alt: 'Conjunto infantil menino',
            caption: 'Conjunto Explorador - 2 a 8 anos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1549291352-1f6032d8139c',
            alt: 'Vestido infantil',
            caption: 'Vestido Borboleta - 2 a 10 anos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1627382972524-50affd230e78',
            alt: 'Calça infantil',
            caption: 'Calça Aventura - com reforço nos joelhos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1560506840-ec148e82a907',
            alt: 'Jaqueta infantil',
            caption: 'Jaqueta Chuva Colorida - impermeável'
          }
        ]
      },
      // Products with image and text
      {
        ...createImageTextBlock(1),
        heading: 'Coleção Escola',
        content: 'Uniformes confortáveis e peças complementares que simplificam a rotina escolar. Tecidos duráveis que mantêm a aparência mesmo após muitas lavagens e brincadeiras no intervalo.',
        image: {
          src: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
          alt: 'Crianças com uniformes escolares'
        }
      },
      // Benefits section
      {
        ...createBenefitsBlock(2),
        heading: 'Benefícios das nossas roupas infantis',
        benefits: [
          {
            id: uuidv4(),
            title: 'Crescimento Prolongado',
            description: 'Sistemas que permitem ajustes conforme a criança cresce',
            icon: 'ArrowUp'
          },
          {
            id: uuidv4(),
            title: 'Sem Irritações',
            description: 'Tecidos testados dermatologicamente',
            icon: 'Heart'
          },
          {
            id: uuidv4(),
            title: 'Lavagem Prática',
            description: 'Tecidos que secam rapidamente',
            icon: 'Droplet'
          },
          {
            id: uuidv4(),
            title: 'Segurança',
            description: 'Sem botões pequenos ou cordões perigosos',
            icon: 'Lock'
          }
        ]
      },
      // Text and image section
      {
        ...createTextImageBlock(1),
        heading: 'Linha Baby',
        content: 'Para os pequeninos, criamos peças extremamente macias, com aberturas estratégicas para facilitar as trocas. Todos os tecidos são livres de produtos químicos nocivos e testados para garantir a segurança da pele sensível dos bebês.',
        image: {
          src: 'https://images.unsplash.com/photo-1543342384-1f1350e27861',
          alt: 'Roupas de bebê'
        }
      },
      // Another video for tips
      {
        ...createVideoBlock(1),
        title: 'Dicas práticas',
        heading: 'Como montar um guarda-roupa funcional para crianças',
        videoUrl: 'https://www.youtube.com/watch?v=qHSaZnrUhO0',
        description: 'Nossa especialista compartilha dicas para criar um guarda-roupa prático que facilita o dia a dia e estimula a independência das crianças.'
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Como acertar o tamanho?',
            answer: 'Utilizamos a tabela brasileira de tamanhos infantis. Para mais precisão, consulte as medidas em centímetros na página de cada produto.'
          },
          {
            id: uuidv4(),
            question: 'As roupas encolhem na lavagem?',
            answer: 'Não, nossos tecidos passam por pré-lavagem industrial que previne o encolhimento posterior.'
          },
          {
            id: uuidv4(),
            question: 'Vocês oferecem opções unissex?',
            answer: 'Sim, temos uma linha completa de peças unissex com cores e estampas neutras.'
          },
          {
            id: uuidv4(),
            question: 'As tintas das estampas são seguras?',
            answer: 'Utilizamos apenas tintas certificadas, livres de substâncias nocivas e testadas dermatologicamente.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Vista a aventura',
        content: 'Renove o guarda-roupa dos pequenos com peças que duram mais e que eles adoram usar.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  }
];
