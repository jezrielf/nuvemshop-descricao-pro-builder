
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

// Create 3 fitness templates
export const fitnessTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Fitness - Equipamento de Treinamento',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
    blocks: [
      // Hero section
      {
        ...createHeroBlock(1),
        heading: 'Equipamentos para Performance Máxima',
        subheading: 'Ferramentas profissionais para transformar seu treino e seus resultados',
        backgroundImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
        buttonText: 'Ver equipamentos',
        buttonUrl: '#equipment'
      },
      // Text introduction
      {
        ...createTextBlock(1),
        heading: 'Desenvolvido por atletas para atletas',
        content: '<p>Nossa linha de equipamentos de treinamento foi criada em colaboração com atletas profissionais e especialistas em biomecânica. Cada produto é testado em condições reais de uso para garantir durabilidade, segurança e eficácia.</p><p>Utilizamos materiais premium e processos de fabricação avançados para oferecer ferramentas que realmente fazem diferença em sua performance.</p>'
      },
      // Product demonstration video
      {
        ...createVideoBlock(1),
        title: 'Veja em ação',
        heading: 'Nossos equipamentos em uso',
        videoUrl: 'https://www.youtube.com/watch?v=1fCmLDg6T-k',
        description: 'Demonstração dos nossos equipamentos sendo utilizados por atletas profissionais, com explicação das funcionalidades e benefícios.'
      },
      // Product categories
      {
        ...createFeaturesBlock(3),
        heading: 'Categorias de produtos',
        features: [
          {
            id: uuidv4(),
            title: 'Treinamento Funcional',
            description: 'Kettlebells, medicine balls e bandas elásticas',
            icon: 'Activity'
          },
          {
            id: uuidv4(),
            title: 'Musculação',
            description: 'Barras, anilhas e suportes de alta resistência',
            icon: 'Dumbbell'
          },
          {
            id: uuidv4(),
            title: 'Cardio',
            description: 'Equipamentos para treinamento intervalado de alta intensidade',
            icon: 'Heart'
          }
        ]
      },
      // Product showcase gallery
      {
        ...createGalleryBlock(1),
        title: 'Linha profissional',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1598289431512-b91c5f145f24',
            alt: 'Kettlebells de competição',
            caption: 'Kettlebells - aço balístico'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1583454155184-870a1f63aebc',
            alt: 'Barra olímpica',
            caption: 'Barra olímpica - 20kg'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1630699144867-37acbaf7342e',
            alt: 'Anilhas bumper',
            caption: 'Anilhas bumper - padrão olímpico'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1598266663439-2056e6900339',
            alt: 'Corda naval',
            caption: 'Corda naval - 15m'
          }
        ]
      },
      // Featured product with image and text
      {
        ...createImageTextBlock(1),
        heading: 'Sistema modular de treinamento',
        content: 'Nosso sistema exclusivo permite que você monte um ginásio completo em espaços reduzidos. Com componentes intercambiáveis e design compacto, é a solução ideal para treinar em casa ou em pequenos estúdios.',
        image: {
          src: 'https://images.unsplash.com/photo-1616279967983-ec413476e824',
          alt: 'Sistema modular de treinamento'
        }
      },
      // Materials section
      {
        ...createTextImageBlock(1),
        heading: 'Materiais de qualidade superior',
        content: 'Utilizamos apenas materiais selecionados como aço forjado, alumínio aeronáutico e polímeros de alta resistência. Nossas empunhaduras são desenvolvidas com tecnologia antideslizante e materiais hipoalergênicos para conforto e segurança em qualquer intensidade de treino.',
        image: {
          src: 'https://images.unsplash.com/photo-1618859437030-61444d4414b0',
          alt: 'Detalhe dos materiais'
        }
      },
      // Training tutorial video
      {
        ...createVideoBlock(1),
        title: 'Treine como um profissional',
        heading: 'Exercícios fundamentais',
        videoUrl: 'https://www.youtube.com/watch?v=X4ZOGObFo80',
        description: 'Nosso head coach demonstra exercícios essenciais e técnicas corretas para maximizar seus resultados com nossos equipamentos.'
      },
      // Benefits section
      {
        ...createBenefitsBlock(2),
        heading: 'Vantagens dos nossos equipamentos',
        benefits: [
          {
            id: uuidv4(),
            title: 'Durabilidade Superior',
            description: 'Construídos para durar mesmo sob uso intenso',
            icon: 'Shield'
          },
          {
            id: uuidv4(),
            title: 'Ergonomia Avançada',
            description: 'Design que respeita a biomecânica natural do corpo',
            icon: 'UserCheck'
          },
          {
            id: uuidv4(),
            title: 'Versatilidade',
            description: 'Múltiplas possibilidades de exercícios com cada equipamento',
            icon: 'Layers'
          },
          {
            id: uuidv4(),
            title: 'Garantia Vitalícia',
            description: 'Confiamos tanto na qualidade que oferecemos garantia por toda a vida',
            icon: 'Clock'
          }
        ]
      },
      // Customer testimonials
      {
        ...createTextBlock(1),
        heading: 'O que os profissionais dizem',
        content: '<blockquote>"Depois de testar praticamente todos os equipamentos do mercado, escolhi exclusivamente esta marca para meu centro de treinamento. A qualidade é incomparável." - Carlos R., preparador físico de atletas olímpicos</blockquote><blockquote>"A durabilidade e precisão destes equipamentos fazem toda diferença para atletas de alto rendimento. São ferramentas que potencializam o treinamento." - Fernanda M., fisioterapeuta esportiva</blockquote>'
      },
      // FAQ section
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Os equipamentos são indicados para iniciantes?',
            answer: 'Sim, embora sejam de nível profissional, todos os equipamentos podem ser utilizados por iniciantes com a orientação adequada.'
          },
          {
            id: uuidv4(),
            question: 'Qual o espaço necessário para montar um ginásio completo?',
            answer: 'Com nosso sistema modular, é possível montar um ginásio funcional completo em apenas 10m².'
          },
          {
            id: uuidv4(),
            question: 'Oferecem orientação para montagem?',
            answer: 'Sim, além do manual detalhado, disponibilizamos vídeos tutoriais e suporte técnico por videoconferência.'
          },
          {
            id: uuidv4(),
            question: 'Como funciona a garantia vitalícia?',
            answer: 'Cobrimos qualquer defeito de fabricação por toda a vida do produto. Basta entrar em contato com nosso suporte apresentando o comprovante de compra.'
          }
        ]
      },
      // Call to action
      {
        ...createCTABlock(1),
        heading: 'Leve seu treino para o próximo nível',
        content: 'Invista em equipamentos que farão diferença real em seus resultados. Frete grátis para todo o Brasil.',
        buttonText: 'Comprar agora',
        buttonUrl: '#shop'
      }
    ]
  },
  // Additional fitness templates would be added here
  {
    id: uuidv4(),
    name: 'Fitness - Estúdio de Treinamento',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
    blocks: [
      // Add blocks for this template (at least 10)
      {
        ...createHeroBlock(1),
        heading: 'Transforme seu Corpo, Transforme sua Vida',
        subheading: 'Treinamento personalizado e método exclusivo para resultados reais',
        backgroundImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f',
        buttonText: 'Agende uma aula',
        buttonUrl: '#schedule'
      },
      {
        ...createTextBlock(1),
        heading: 'Método científico, resultados comprovados',
        content: '<p>Nosso estúdio combina as mais avançadas metodologias de treinamento com acompanhamento individualizado. Trabalhamos com grupos reduzidos e planos personalizados para garantir que cada aluno alcance seus objetivos.</p><p>Nossa equipe é formada por profissionais com formação superior e especializações, constantemente atualizados com as últimas pesquisas em ciência do exercício.</p>'
      },
      {
        ...createVideoBlock(1),
        title: 'Conheça o método',
        heading: 'Treinamento integrado para resultados completos',
        videoUrl: 'https://www.youtube.com/watch?v=zBBYbg1ZUlo',
        description: 'Veja como nosso método exclusivo combina diferentes modalidades para maximizar resultados e minimizar riscos de lesões.'
      },
      {
        ...createFeaturesBlock(3),
        heading: 'Modalidades oferecidas',
        features: [
          {
            id: uuidv4(),
            title: 'Treinamento Funcional',
            description: 'Movimentos integrados para eficiência no dia a dia',
            icon: 'Activity'
          },
          {
            id: uuidv4(),
            title: 'HIIT',
            description: 'Treinamento intervalado de alta intensidade',
            icon: 'Zap'
          },
          {
            id: uuidv4(),
            title: 'Strength Training',
            description: 'Foco em ganho de força e massa muscular',
            icon: 'Dumbbell'
          }
        ]
      },
      {
        ...createGalleryBlock(1),
        title: 'Nosso espaço',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f',
            alt: 'Área de treinamento funcional',
            caption: 'Área de treinamento com equipamentos exclusivos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df',
            alt: 'Área de musculação',
            caption: 'Zona de força com equipamentos de ponta'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1',
            alt: 'Estúdio de pilates',
            caption: 'Espaço dedicado para treinos de mobilidade'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1623874514711-0f321325f318',
            alt: 'Vestiários',
            caption: 'Vestiários espaçosos e bem equipados'
          }
        ]
      },
      {
        ...createImageTextBlock(1),
        heading: 'Avaliação completa e planejamento',
        content: 'Antes de iniciar seu treinamento, realizamos uma avaliação física e funcional detalhada. Analisamos composição corporal, resistência cardiovascular, força, flexibilidade e padrões de movimento para criar um plano totalmente personalizado.',
        image: {
          src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c',
          alt: 'Processo de avaliação'
        }
      },
      {
        ...createTextImageBlock(1),
        heading: 'Equipe especializada',
        content: 'Nossos profissionais são selecionados não apenas por sua formação técnica, mas também pela capacidade de motivar e conectar-se com os alunos. Acreditamos que o relacionamento entre treinador e aluno é fundamental para o sucesso do programa.',
        image: {
          src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
          alt: 'Treinador e aluno'
        }
      },
      {
        ...createVideoBlock(1),
        title: 'Depoimentos reais',
        heading: 'Histórias de transformação',
        videoUrl: 'https://www.youtube.com/watch?v=v_YsF54K-ik',
        description: 'Conheça as histórias inspiradoras de alguns dos nossos alunos e como o programa transformou não apenas seus corpos, mas suas vidas.'
      },
      {
        ...createBenefitsBlock(2),
        heading: 'Por que escolher nosso estúdio',
        benefits: [
          {
            id: uuidv4(),
            title: 'Acompanhamento Próximo',
            description: 'Máximo de 4 alunos por professor',
            icon: 'Users'
          },
          {
            id: uuidv4(),
            title: 'Tecnologia Avançada',
            description: 'Monitoramento de progresso por aplicativo',
            icon: 'Smartphone'
          },
          {
            id: uuidv4(),
            title: 'Horários Flexíveis',
            description: 'Funcionamento de segunda a domingo, das 6h às 22h',
            icon: 'Clock'
          },
          {
            id: uuidv4(),
            title: 'Abordagem Integrada',
            description: 'Treinamento, nutrição e recuperação',
            icon: 'LifeBouy'
          }
        ]
      },
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'Preciso ter experiência prévia com exercícios?',
            answer: 'Não, nosso método é adaptado para todos os níveis de condicionamento, desde iniciantes até atletas avançados.'
          },
          {
            id: uuidv4(),
            question: 'Quantas vezes por semana devo treinar?',
            answer: 'Recomendamos de 3 a 5 treinos por semana, dependendo dos seus objetivos e disponibilidade.'
          },
          {
            id: uuidv4(),
            question: 'Vocês oferecem orientação nutricional?',
            answer: 'Sim, temos nutricionistas esportivos em nossa equipe para um acompanhamento completo.'
          },
          {
            id: uuidv4(),
            question: 'Como funciona o período de adaptação?',
            answer: 'Os primeiros 30 dias são dedicados à adaptação, com progressão gradual de intensidade e volume para garantir segurança e aderência.'
          }
        ]
      },
      {
        ...createCTABlock(1),
        heading: 'Comece sua transformação hoje',
        content: 'Agende uma aula experimental gratuita e conheça nosso método exclusivo. Vagas limitadas.',
        buttonText: 'Quero uma aula grátis',
        buttonUrl: '#free-class'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Fitness - Programa de Treinamento Online',
    category: 'fitness',
    thumbnail: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
    blocks: [
      // Add blocks for this template (at least 10)
      {
        ...createHeroBlock(1),
        heading: 'Resultados Reais, Onde Você Estiver',
        subheading: 'Treinamento personalizado online com acompanhamento profissional',
        backgroundImage: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c',
        buttonText: 'Conhecer programas',
        buttonUrl: '#programs'
      },
      {
        ...createTextBlock(1),
        heading: 'Fitness de qualidade para todos',
        content: '<p>Nosso programa de treinamento online foi desenvolvido para oferecer a mesma qualidade dos nossos treinamentos presenciais, com a flexibilidade que a vida moderna exige. Combinamos tecnologia avançada com metodologia científica para levar resultados a qualquer lugar.</p><p>Cada aluno recebe um plano totalmente personalizado, baseado em seus objetivos, experiência prévia e disponibilidade de equipamentos.</p>'
      },
      {
        ...createVideoBlock(1),
        title: 'Como funciona',
        heading: 'Tecnologia a serviço dos resultados',
        videoUrl: 'https://www.youtube.com/watch?v=sLSEQl8mJ7U',
        description: 'Conheça nossa plataforma exclusiva e veja como funciona o acompanhamento remoto com a mesma qualidade do presencial.'
      },
      {
        ...createFeaturesBlock(3),
        heading: 'Nossos programas',
        features: [
          {
            id: uuidv4(),
            title: 'Transformação Corporal',
            description: '12 semanas de treino para mudança completa',
            icon: 'Repeat'
          },
          {
            id: uuidv4(),
            title: 'Força e Hipertrofia',
            description: 'Foco em ganho de massa muscular e força',
            icon: 'TrendingUp'
          },
          {
            id: uuidv4(),
            title: 'Condicionamento e Saúde',
            description: 'Bem-estar e qualidade de vida',
            icon: 'Heart'
          }
        ]
      },
      {
        ...createGalleryBlock(1),
        title: 'Histórias de sucesso',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1599058950528-6557fa01d3c1',
            alt: 'Antes e depois masculino',
            caption: 'Carlos, 34 anos - 12 semanas de programa'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1608138278545-366680accc66',
            alt: 'Antes e depois feminino',
            caption: 'Marina, 28 anos - 16 semanas de programa'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1612814266697-3c0438b64fcb',
            alt: 'Atleta amador',
            caption: 'Pedro, 42 anos - melhora de desempenho'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3',
            alt: 'Recuperação pós-parto',
            caption: 'Juliana, 35 anos - programa pós-parto'
          }
        ]
      },
      {
        ...createImageTextBlock(1),
        heading: 'App exclusivo',
        content: 'Nosso aplicativo proprietário traz toda a experiência para seu smartphone: vídeos detalhados de cada exercício, acompanhamento de progresso, comunicação direta com seu treinador e ajustes em tempo real do seu programa.',
        image: {
          src: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
          alt: 'App em smartphone'
        }
      },
      {
        ...createTextImageBlock(1),
        heading: 'Suporte nutricional',
        content: 'Além do treinamento, oferecemos orientação nutricional personalizada. Sabemos que nutrição é fundamental para resultados, por isso incluímos planos alimentares adaptados ao seu estilo de vida, preferências e objetivos específicos.',
        image: {
          src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061',
          alt: 'Alimentação saudável'
        }
      },
      {
        ...createVideoBlock(1),
        title: 'Treine em qualquer lugar',
        heading: 'Adaptação para diferentes realidades',
        videoUrl: 'https://www.youtube.com/watch?v=eJRJCV5JF0Q',
        description: 'Veja exemplos de treinos adaptados para diferentes espaços e equipamentos, desde academia completa até treinos apenas com o peso corporal.'
      },
      {
        ...createBenefitsBlock(2),
        heading: 'Vantagens do treinamento online',
        benefits: [
          {
            id: uuidv4(),
            title: 'Flexibilidade de Horários',
            description: 'Treine quando e onde quiser',
            icon: 'Clock'
          },
          {
            id: uuidv4(),
            title: 'Economia',
            description: 'Custo mais acessível que personal trainer',
            icon: 'DollarSign'
          },
          {
            id: uuidv4(),
            title: 'Suporte Contínuo',
            description: 'Comunicação direta com seu treinador',
            icon: 'MessageCircle'
          },
          {
            id: uuidv4(),
            title: 'Adaptação Constante',
            description: 'Programa ajustado semanalmente com base no feedback',
            icon: 'RefreshCw'
          }
        ]
      },
      {
        ...createFAQBlock(1),
        heading: 'Perguntas Frequentes',
        faqs: [
          {
            id: uuidv4(),
            question: 'É necessário ter equipamentos em casa?',
            answer: 'Não necessariamente. Adaptamos o programa com base nos equipamentos que você tem disponíveis, seja em casa, em uma academia ou até mesmo utilizando apenas o peso corporal.'
          },
          {
            id: uuidv4(),
            question: 'Com que frequência o programa é atualizado?',
            answer: 'O programa é revisado e ajustado semanalmente com base no seu feedback e progresso registrado no aplicativo.'
          },
          {
            id: uuidv4(),
            question: 'E se eu tiver dúvidas durante o treino?',
            answer: 'O aplicativo permite enviar mensagens e vídeos diretamente para seu treinador, que responderá em até 24 horas.'
          },
          {
            id: uuidv4(),
            question: 'Posso mudar de programa no meio do processo?',
            answer: 'Sim, nossos programas são flexíveis e podem ser adaptados conforme seus objetivos evoluem ou mudam.'
          }
        ]
      },
      {
        ...createCTABlock(1),
        heading: 'Transforme seu corpo e sua vida',
        content: 'Inscreva-se hoje e ganhe 7 dias de teste gratuito com acesso completo a nossa plataforma.',
        buttonText: 'Começar agora',
        buttonUrl: '#start'
      }
    ]
  }
];
