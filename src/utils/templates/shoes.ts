
import { Template } from '@/types/editor';

export const shoesTemplates: Template[] = [
  {
    id: 'shoes-premium-1',
    name: 'Calçados Esportivos',
    category: 'shoes',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#101820',
          backgroundImage: 'linear-gradient(135deg, #101820 0%, #2c3e50 100%)',
          padding: '80px 20px',
          borderRadius: '0',
          textAlign: 'center',
          color: '#ffffff'
        },
        heading: 'Performance Revolucionária',
        subheading: 'Tecnologia de ponta para máximo desempenho, conforto e estilo em cada passada',
        buttonText: 'Descubra a Tecnologia',
        buttonUrl: '#'
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria do Produto',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: '',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
            alt: 'Tênis esportivo vermelho',
            caption: 'Vista lateral - Tecnologia de absorção de impacto'
          },
          {
            src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5',
            alt: 'Detalhe da sola do tênis',
            caption: 'Sola com tecnologia antiderrapante para múltiplas superfícies'
          },
          {
            src: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329',
            alt: 'Tênis em uso durante atividade esportiva',
            caption: 'Performance testada por atletas profissionais'
          }
        ]
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          margin: '0',
          textAlign: 'center'
        },
        content: '<h2 style="font-size: 32px; font-weight: 700; color: #101820; margin-bottom: 30px;">Projetado para Superar Limites</h2><p style="font-size: 18px; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto;">Desenvolvido após anos de pesquisa biomecânica e testes com atletas de elite, nosso tênis esportivo combina tecnologias inovadoras para proporcionar suporte, flexibilidade e resposta imediata em cada movimento. A estrutura dinâmica se adapta ao seu pé, oferecendo estabilidade onde você precisa e flexibilidade onde importa.</p>'
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Tecnologias',
        visible: true,
        columns: '3',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#101820',
          color: '#ffffff',
          margin: '0'
        },
        heading: 'Tecnologias Exclusivas',
        features: [
          {
            icon: '💨',
            title: 'AirFlow System',
            description: 'Sistema de ventilação que mantém os pés secos mesmo durante atividades intensas'
          },
          {
            icon: '🛡️',
            title: 'ImpactShield',
            description: 'Tecnologia de absorção de impacto que protege articulações durante corridas'
          },
          {
            icon: '⚡',
            title: 'PowerBoost',
            description: 'Retorno de energia que proporciona impulso adicional a cada passada'
          },
          {
            icon: '🔄',
            title: 'AdaptFit',
            description: 'Material que se molda ao pé para ajuste perfeito e confortável'
          },
          {
            icon: '🌡️',
            title: 'ThermoControl',
            description: 'Regulação térmica que mantém a temperatura ideal em qualquer clima'
          },
          {
            icon: '🔒',
            title: 'LockGrip',
            description: 'Sistema de cadarços que garante ajuste personalizado e seguro'
          }
        ]
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios Principais',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Projetado para Atletas Exigentes',
        benefits: [
          {
            icon: '🏃',
            title: 'Máxima Performance',
            description: 'Design otimizado para melhorar seu rendimento esportivo'
          },
          {
            icon: '😌',
            title: 'Conforto Superior',
            description: 'Sensação de maciez mesmo após horas de uso contínuo'
          },
          {
            icon: '⏱️',
            title: 'Durabilidade Comprovada',
            description: 'Materiais resistentes testados para suportar uso intenso'
          }
        ]
      },
      {
        id: 'imageText-1',
        type: 'imageText',
        title: 'Design Anatômico',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#f8f9fa',
          margin: '0'
        },
        heading: 'Anatomia de um Tênis Revolucionário',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #444;">Cada componente do nosso tênis foi meticulosamente projetado com base em extensos estudos biomecânicos para oferecer suporte onde você mais precisa. O cabedal leve e respirável trabalha em conjunto com a entressola responsiva para criar uma experiência de corrida suave e natural.</p><p style="font-size: 16px; line-height: 1.8; color: #444; margin-top: 20px;">A estrutura de suporte no médio-pé estabiliza sem comprometer a flexibilidade, permitindo que o pé se movimente naturalmente enquanto recebe o suporte necessário para evitar lesões durante atividades de alto impacto.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa',
          alt: 'Detalhe da anatomia do tênis',
        }
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Especificações Detalhadas',
        specs: [
          { name: 'Peso', value: '285g (tamanho 42)' },
          { name: 'Drop', value: '8mm' },
          { name: 'Cabedal', value: 'Malha engenheirada de alta performance' },
          { name: 'Entressola', value: 'Espuma responsiva com 20% mais retorno de energia' },
          { name: 'Sola', value: 'Borracha de carbono com padrão multidirecional' },
          { name: 'Tecnologias', value: 'AirFlow, ImpactShield, PowerBoost' },
          { name: 'Indicado para', value: 'Corrida de alta performance e treinos intensos' },
          { name: 'Garantia', value: '6 meses contra defeitos de fabricação' }
        ]
      },
      {
        id: 'textImage-1',
        type: 'textImage',
        title: 'Indicação de Uso',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#101820',
          color: '#ffffff',
          margin: '0'
        },
        heading: 'Ideal para Todos os Treinos',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #ffffff;">Versátil por natureza, este tênis foi projetado para oferecer desempenho excepcional em diversas modalidades esportivas. Seja para corridas de longa distância, treinos de alta intensidade ou exercícios de força, ele proporciona a combinação perfeita de amortecimento, estabilidade e resposta.</p><p style="font-size: 16px; line-height: 1.8; color: #ffffff; margin-top: 20px;">A estrutura adaptável permite transições rápidas entre diferentes tipos de movimento, tornando-o o parceiro ideal para atletas que buscam um único tênis para múltiplas atividades.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0',
          alt: 'Atleta treinando com o tênis',
        }
      },
      {
        id: 'video-1',
        type: 'video',
        title: 'Tecnologia em Ação',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          margin: '0'
        },
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        aspectRatio: '16:9',
        title: 'Veja a Tecnologia em Ação',
        description: 'Teste de performance realizado com atletas profissionais',
        autoplay: false,
        muteAudio: true
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Perguntas Frequentes',
        questions: [
          {
            question: 'Este tênis é adequado para corridas de longa distância?',
            answer: 'Sim, ele foi projetado e testado para oferecer suporte e conforto em corridas de até maratona. O sistema de amortecimento progressivo ajuda a reduzir a fadiga muscular em longas distâncias.'
          },
          {
            question: 'Como escolher o tamanho correto?',
            answer: 'Recomendamos escolher meio número acima do seu tamanho habitual, pois o pé tende a expandir durante atividades físicas. Para uma verificação mais precisa, consulte nossa tabela de medidas disponível no site.'
          },
          {
            question: 'Qual a durabilidade média deste tênis?',
            answer: 'Em uso regular para corrida, nossos tênis mantêm suas propriedades de amortecimento por aproximadamente 500-700km, dependendo do peso do usuário, estilo de corrida e superfícies utilizadas.'
          }
        ]
      },
      {
        id: 'cta-1',
        type: 'cta',
        title: 'Chamada Final',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#e63946',
          color: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        heading: 'Eleve sua Performance',
        content: 'Experimente a revolução em calçados esportivos com 30 dias de garantia de satisfação',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
