import { v4 as uuidv4 } from 'uuid';
import { Template, Block } from '@/types/editor';
import { createHeroBlock } from '../blockCreators/blocks/heroBlock';
import { createTextBlock } from '../blockCreators/blocks/textBlock';
import { createImageBlock } from '../blockCreators/blocks/imageBlock';
import { createGalleryBlock } from '../blockCreators/blocks/galleryBlock';
import { createVideoBlock } from '../blockCreators/createVideoBlock';
import { createImageTextBlock } from '../blockCreators/blocks/imageTextBlock';
import { createTextImageBlock } from '../blockCreators/blocks/textImageBlock';
import { createCTABlock } from '../blockCreators/blocks/ctaBlock';
import { createFAQBlock } from '../blockCreators/blocks/faqBlock';
import { createFeaturesBlock } from '../blockCreators/blocks/featuresBlock';
import { createBenefitsBlock } from '../blockCreators/blocks/benefitsBlock';

// Create 3 water purifier templates
export const waterPurifiersTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Purificadores - Tecnologia Avançada',
    category: 'water-purifiers',
    thumbnail: 'https://images.unsplash.com/photo-1616903021236-5e758009e226',
    blocks: [
      // Hero section
      createHeroBlock(1, {
        heading: 'Água Pura, Vida Saudável',
        subheading: 'Purificadores com tecnologia avançada para a saúde de toda família',
        backgroundImage: 'https://images.unsplash.com/photo-1616903021236-5e758009e226',
        buttonText: 'Conhecer modelos',
        buttonUrl: '#models'
      }),
      // Text introduction
      createTextBlock(1, {
        heading: 'A importância da água pura',
        content: '<p>A água é essencial para nossa saúde e bem-estar, mas a qualidade da água que consumimos pode variar consideravelmente. Nossos purificadores utilizam tecnologias avançadas de filtração para remover impurezas, contaminantes e garantir que sua família tenha acesso à água mais pura e saudável possível.</p><p>Desenvolvidos com os mais rigorosos padrões de qualidade, nossos sistemas não apenas purificam a água, mas também preservam minerais essenciais e otimizam o pH para maior benefício à saúde.</p>'
      }),
      // Product demonstration video
      createVideoBlock(
        'https://www.youtube.com/watch?v=5SuU_2dAJ8w',
        'Como funcionam nossos purificadores',
        'Veja em detalhes os estágios de purificação e como nossos sistemas removem eficientemente contaminantes invisíveis presentes na água.'
      ),
      // Product categories
      createFeaturesBlock(3, {
        heading: 'Linhas de produtos',
        features: [
          {
            id: uuidv4(),
            title: 'Residencial',
            description: 'Soluções para casas e apartamentos',
            icon: 'Home'
          },
          {
            id: uuidv4(),
            title: 'Corporativo',
            description: 'Sistemas para escritórios e empresas',
            icon: 'Briefcase'
          },
          {
            id: uuidv4(),
            title: 'Industrial',
            description: 'Purificação em larga escala',
            icon: 'Factory'
          }
        ]
      }),
      // Product showcase gallery
      createGalleryBlock(1, {
        title: 'Conheça nossos modelos',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1581152201559-102f942bb949',
            alt: 'Purificador de bancada',
            caption: 'Pure Counter - design compacto para bancadas'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1585314540237-62ca9d58e184',
            alt: 'Filtro de parede',
            caption: 'Wall Pure - instalação discreta em parede'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1510333337682-fdd0eba357a4',
            alt: 'Sistema sob pia',
            caption: 'Under Sink Pro - purificação completa e invisível'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1601995539576-c34ebd347a3f',
            alt: 'Dispensador corporativo',
            caption: 'Office Pro - para ambientes de trabalho'
          }
        ]
      }),
      // Featured product with image and text
      createImageTextBlock(1, {
        heading: 'Tecnologia MultiStage™',
        content: 'Nosso sistema patenteado de filtração em múltiplos estágios remove eficientemente partículas, cloro, metais pesados, bactérias, vírus e mais de 200 contaminantes químicos, preservando minerais essenciais e garantindo o equilíbrio perfeito entre pureza e saúde.',
        image: {
          src: 'https://images.unsplash.com/photo-1555439799-d780be50ba23',
          alt: 'Tecnologia de filtração'
        }
      }),
      // Comparison with other methods
      createTextImageBlock(1, {
        heading: 'Além da filtração convencional',
        content: 'Diferente de filtros simples que apenas reduzem cloro e algumas partículas, nossos sistemas oferecem purificação completa que elimina contaminantes microscópicos, produtos químicos industriais, resíduos farmacêuticos e até mesmo microplásticos, cada vez mais presentes na água potável.',
        image: {
          src: 'https://images.unsplash.com/photo-1604537466608-109fa2f16c3b',
          alt: 'Comparação de métodos de filtração'
        }
      }),
      // Installation video
      createVideoBlock(
        'https://www.youtube.com/watch?v=aJ7kQ1DMOC8',
        'Como instalar seu purificador',
        'Guia passo a passo de instalação dos nossos principais modelos, mostrando como é simples ter água pura em sua casa ou escritório.'
      ),
      // Benefits section
      createBenefitsBlock(2, {
        heading: 'Benefícios da água realmente pura',
        benefits: [
          {
            id: uuidv4(),
            title: 'Saúde Digestiva',
            description: 'Água livre de contaminantes que podem irritar o sistema digestivo',
            icon: 'Heart'
          },
          {
            id: uuidv4(),
            title: 'Economia',
            description: 'Muito mais econômico que água engarrafada',
            icon: 'DollarSign'
          },
          {
            id: uuidv4(),
            title: 'Sabor Superior',
            description: 'Bebidas e alimentos com sabor melhor e mais puro',
            icon: 'Coffee'
          },
          {
            id: uuidv4(),
            title: 'Sustentabilidade',
            description: 'Redução drástica no uso de plástico descartável',
            icon: 'Leaf'
          }
        ]
      }),
      // Scientific basis
      createTextBlock(1, {
        heading: 'Ciência e certificações',
        content: '<p>Nossos purificadores são testados e certificados por laboratórios independentes, atendendo aos mais rigorosos padrões internacionais como NSF/ANSI 42, 53 e 401. Trabalhamos em colaboração com universidades e centros de pesquisa para continuar evoluindo nossas tecnologias de purificação.</p><p>Cada lote de produção passa por testes de qualidade que verificam a eficiência na remoção de mais de 250 contaminantes diferentes, garantindo consistência e confiabilidade em cada produto.</p>'
      }),
      // FAQ section
      createFAQBlock(1, {
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Qual a frequência de troca dos filtros?',
            answer: 'Dependendo do modelo, nossos filtros duram entre 6 e 12 meses, ou entre 3.000 e 5.000 litros. Um indicador inteligente avisa quando é hora da substituição.'
          },
          {
            id: uuidv4(),
            question: 'A instalação é complicada?',
            answer: 'Não, a maioria dos nossos modelos possui instalação simplificada que pode ser feita pelo próprio usuário. Para modelos mais complexos, oferecemos serviço de instalação profissional.'
          },
          {
            id: uuidv4(),
            question: 'Os minerais são removidos da água?',
            answer: 'Nossos sistemas são projetados para remover contaminantes prejudiciais enquanto preservam minerais benéficos como cálcio, magnésio e potássio.'
          },
          {
            id: uuidv4(),
            question: 'Qual a garantia dos produtos?',
            answer: 'Oferecemos garantia de 5 anos para a maioria dos componentes e 2 anos para peças eletrônicas e de desgaste natural.'
          }
        ]
      }),
      // Call to action
      createCTABlock(1, {
        heading: 'Invista na saúde da sua família',
        content: 'Adquira agora seu purificador e comece a desfrutar dos benefícios da água verdadeiramente pura. Parcelamento em até 12x e frete grátis.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Purificadores - Filtros Ecológicos',
    category: 'water-purifiers',
    thumbnail: 'https://images.unsplash.com/photo-1629233651751-9a638a1b5380',
    blocks: [
      // Add at least 10 blocks here
      createHeroBlock(1, {
        heading: 'Purificação Sustentável',
        subheading: 'Filtros ecológicos que respeitam você e o planeta',
        backgroundImage: 'https://images.unsplash.com/photo-1629233651751-9a638a1b5380',
        buttonText: 'Descobrir soluções',
        buttonUrl: '#solutions'
      }),
      createTextBlock(1, {
        heading: 'Água pura, planeta limpo',
        content: '<p>Nossos filtros ecológicos combinam eficiência de purificação com responsabilidade ambiental. Desenvolvemos produtos que não apenas fornecem água limpa e saudável, mas também minimizam o impacto ambiental em cada etapa, do processo de fabricação ao descarte dos componentes.</p><p>Utilizamos materiais biodegradáveis, recicláveis e de baixo impacto, além de processos produtivos que consomem menos energia e água.</p>'
      }),
      createVideoBlock(
        'https://www.youtube.com/watch?v=_GvV_BaFNM4',
        'Conheça nosso processo ecológico',
        'Um tour por nossa fábrica sustentável e processos de produção que reduzem significativamente o impacto ambiental.'
      ),
      createFeaturesBlock(3, {
        heading: 'Filtração natural',
        features: [
          {
            id: uuidv4(),
            title: 'Carvão Ativado de Coco',
            description: 'Material renovável e altamente eficiente',
            icon: 'Droplet'
          },
          {
            id: uuidv4(),
            title: 'Cerâmica Natural',
            description: 'Filtração microbiológica sem químicos',
            icon: 'Filter'
          },
          {
            id: uuidv4(),
            title: 'Minerais Naturais',
            description: 'Remineralização com pedras vulcânicas',
            icon: 'Mountain'
          }
        ]
      }),
      createGalleryBlock(1, {
        title: 'Linha ecológica',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1594916107158-c5d9c285b258',
            alt: 'Filtro de cerâmica',
            caption: 'EcoCeramic - filtração natural'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1523362628745-0c100150b504',
            alt: 'Filtro de bancada',
            caption: 'GreenPure - design sustentável'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1598000268072-30eca455834a',
            alt: 'Sistema gravitacional',
            caption: 'EcoFlow - sem eletricidade ou pressão'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1664014155984-e3d95a1d60e1',
            alt: 'Garrafa filtrante',
            caption: 'EcoBottle - para uso em movimento'
          }
        ]
      }),
      createImageTextBlock(1, {
        heading: 'Materiais sustentáveis',
        content: 'Nossas carcaças são feitas com plástico biodegradável derivado de milho ou plástico 100% reciclado. Os elementos filtrantes utilizam carvão ativado de casca de coco, cerâmica natural e outros materiais renováveis que oferecem excelente capacidade de filtração com mínimo impacto ambiental.',
        image: {
          src: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab0',
          alt: 'Materiais ecológicos'
        }
      }),
      createTextImageBlock(1, {
        heading: 'Programa de reciclagem',
        content: 'Oferecemos um programa de logística reversa onde você pode retornar seus filtros usados para reciclagem adequada. Para cada filtro devolvido, você recebe desconto na compra do próximo e ainda contribui para a redução do impacto ambiental, pois reaproveitamos mais de 90% dos componentes.',
        image: {
          src: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b',
          alt: 'Reciclagem de filtros'
        }
      }),
      createVideoBlock(
        'https://www.youtube.com/watch?v=S3Cq1GhTmfM',
        'Como nossos produtos ajudam comunidades',
        'Para cada produto vendido, doamos um filtro básico para comunidades sem acesso à água potável. Conheça alguns dos projetos que apoiamos.'
      ),
      createBenefitsBlock(2, {
        heading: 'Vantagens da filtração ecológica',
        benefits: [
          {
            id: uuidv4(),
            title: 'Filtração Natural',
            description: 'Sem produtos químicos adicionados no processo',
            icon: 'Leaf'
          },
          {
            id: uuidv4(),
            title: 'Baixo Consumo',
            description: 'Sistemas que não desperdiçam água ou energia',
            icon: 'Battery'
          },
          {
            id: uuidv4(),
            title: 'Componentes Recicláveis',
            description: 'Menor impacto no descarte',
            icon: 'RefreshCw'
          },
          {
            id: uuidv4(),
            title: 'Carbono Neutro',
            description: 'Compensamos 100% das emissões de produção',
            icon: 'Cloud'
          }
        ]
      }),
      createFAQBlock(1, {
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Filtros ecológicos são tão eficientes quanto os convencionais?',
            answer: 'Sim, nossos filtros ecológicos atingem os mesmos padrões de filtração dos convencionais, removendo eficientemente contaminantes químicos e microbiológicos.'
          },
          {
            id: uuidv4(),
            question: 'Como descartar corretamente os filtros usados?',
            answer: 'Você pode enviar para nosso programa de reciclagem ou seguir nossas instruções para separação correta dos componentes para descarte local.'
          },
          {
            id: uuidv4(),
            question: 'Qual a vida útil dos filtros ecológicos?',
            answer: 'Nossos filtros duram em média 6 meses ou 2.000 litros, dependendo da qualidade da água de entrada e frequência de uso.'
          },
          {
            id: uuidv4(),
            question: 'Os filtros ecológicos são mais caros?',
            answer: 'Inicialmente podem ter um custo ligeiramente maior, mas o programa de retorno com desconto e a maior durabilidade tornam o custo-benefício muito vantajoso a longo prazo.'
          }
        ]
      }),
      createCTABlock(1, {
        heading: 'Água pura para você, um planeta limpo para todos',
        content: 'Adquira seu filtro ecológico hoje e faça parte da revolução por um consumo mais consciente e sustentável.',
        buttonText: 'Comprar com impacto positivo',
        buttonUrl: '#shop'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Purificadores - Sistemas Residenciais Completos',
    category: 'water-purifiers',
    thumbnail: 'https://images.unsplash.com/photo-1577109231779-8023a4c860ff',
    blocks: [
      // Add at least 10 blocks here
      createHeroBlock(1, {
        heading: 'Água Pura em Toda Sua Casa',
        subheading: 'Sistemas integrados de purificação para cada ponto de uso',
        backgroundImage: 'https://images.unsplash.com/photo-1577109231779-8023a4c860ff',
        buttonText: 'Conhecer soluções',
        buttonUrl: '#solutions'
      }),
      createTextBlock(1, {
        heading: 'Purificação completa, conforto total',
        content: '<p>Nossos sistemas residenciais completos oferecem água purificada em todos os pontos de uso da sua casa - cozinha, banheiros, chuveiros e até mesmo para eletrodomésticos. Projetados para eliminar a mais ampla gama de contaminantes, estes sistemas garantem que toda água que toca você e sua família seja pura e saudável.</p><p>Combinamos diferentes tecnologias de filtração para criar uma solução personalizada para as necessidades específicas da água da sua região e do seu estilo de vida.</p>'
      }),
      createVideoBlock(
        'https://www.youtube.com/watch?v=c6OsV1LmH60',
        'Solução integrada',
        'Uma visão detalhada de como os diferentes componentes do sistema trabalham juntos para purificar a água em toda sua residência.'
      ),
      createFeaturesBlock(3, {
        heading: 'Componentes do sistema',
        features: [
          {
            id: uuidv4(),
            title: 'Pré-filtração',
            description: 'Remove sedimentos, ferrugem e partículas',
            icon: 'Filter'
          },
          {
            id: uuidv4(),
            title: 'Purificação Central',
            description: 'Elimina contaminantes químicos e biológicos',
            icon: 'Shield'
          },
          {
            id: uuidv4(),
            title: 'Pontos de Uso Específicos',
            description: 'Filtração adicional para necessidades particulares',
            icon: 'Target'
          }
        ]
      }),
      createGalleryBlock(1, {
        title: 'Nossas soluções',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1511207538754-e8555f2bc8a5',
            alt: 'Sistema de entrada',
            caption: 'Whole House - proteção desde a entrada de água'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
            alt: 'Filtro de chuveiro',
            caption: 'ShowerPure - água filtrada para banho'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357',
            alt: 'Sistema de cozinha',
            caption: 'KitchenElite - água ultrapura na cozinha'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1567507145544-6c574251af51',
            alt: 'Painel de controle',
            caption: 'SmartControl - monitoramento inteligente'
          }
        ]
      }),
      createImageTextBlock(1, {
        heading: 'Personalização completa',
        content: 'Cada residência é única, assim como a qualidade da água que chega até ela. Por isso, realizamos uma análise detalhada da água da sua região e das necessidades específicas da sua família antes de projetar um sistema personalizado. Nossos engenheiros consideram fatores como tamanho da casa, número de moradores e até mesmo condições médicas específicas.',
        image: {
          src: 'https://images.unsplash.com/photo-1523151594509-49ded8a270f9',
          alt: 'Análise personalizada'
        }
      }),
      createTextImageBlock(1, {
        heading: 'Tecnologia Smart Water',
        content: 'Nossos sistemas mais avançados incluem monitoramento em tempo real da qualidade da água, uso e status dos filtros. Através de um aplicativo, você pode acompanhar a eficiência do sistema, receber alertas de manutenção preventiva e até mesmo controlar o consumo de água para uma gestão mais sustentável dos recursos.',
        image: {
          src: 'https://images.unsplash.com/photo-1619468610623-9b0602e8d930',
          alt: 'App de monitoramento'
        }
      }),
      createVideoBlock(
        'https://www.youtube.com/watch?v=Z9SxWpZt0TE',
        'Como implementamos seu sistema',
        'Acompanhe o processo de instalação profissional, desde o planejamento inicial até os testes finais de qualidade da água.'
      ),
      createBenefitsBlock(2, {
        heading: 'Benefícios para toda a casa',
        benefits: [
          {
            id: uuidv4(),
            title: 'Proteção Completa',
            description: 'Água purificada em cada torneira e chuveiro',
            icon: 'Home'
          },
          {
            id: uuidv4(),
            title: 'Maior Vida Útil',
            description: 'Eletrodomésticos e encanamentos protegidos de sedimentos e cloro',
            icon: 'Clock'
          },
          {
            id: uuidv4(),
            title: 'Pele e Cabelo Saudáveis',
            description: 'Água livre de cloro e contaminantes irritantes nos banhos',
            icon: 'Smile'
          },
          {
            id: uuidv4(),
            title: 'Economia a Longo Prazo',
            description: 'Fim da necessidade de água engarrafada',
            icon: 'DollarSign'
          }
        ]
      }),
      createFAQBlock(1, {
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'O sistema requer muita manutenção?',
            answer: 'A manutenção é simplificada, com troca de filtros geralmente a cada 6-12 meses dependendo do uso. Nosso sistema smart alerta automaticamente quando é hora da manutenção.'
          },
          {
            id: uuidv4(),
            question: 'A instalação é muito invasiva?',
            answer: 'Nossa equipe especializada realiza a instalação com mínima interferência na sua rotina, geralmente em 1-2 dias dependendo da complexidade do sistema.'
          },
          {
            id: uuidv4(),
            question: 'O sistema afeta a pressão da água?',
            answer: 'Nossos sistemas são projetados para manter ou até melhorar a pressão original, com bombas de reforço incluídas quando necessário.'
          },
          {
            id: uuidv4(),
            question: 'Qual o investimento para um sistema completo?',
            answer: 'O investimento varia conforme o tamanho da casa e a complexidade do sistema. Oferecemos opções de financiamento que frequentemente custam menos que o gasto mensal com água engarrafada.'
          }
        ]
      }),
      createCTABlock(1, {
        heading: 'Transforme a qualidade da água em toda sua casa',
        content: 'Agende uma consulta gratuita com um de nossos especialistas para análise da água e projeto personalizado para sua residência.',
        buttonText: 'Agendar consulta gratuita',
        buttonUrl: '#schedule'
      }
    ]
  }
];
