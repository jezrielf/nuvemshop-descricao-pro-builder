import { Template } from '@/types/editor';

export const electronicsTemplates: Template[] = [
  {
    id: 'electronic-product-1',
    name: 'Eletrônico Moderno',
    category: 'electronics',
    thumbnail: '/templates/electronics/electronic-product-1.png',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center',
          borderRadius: '0'
        },
        heading: 'Descubra a Inovação',
        subheading: 'A mais recente tecnologia ao seu alcance',
        buttonText: 'Ver Mais',
        buttonUrl: '#'
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa'
        },
        content: '<p>Explore os recursos avançados e o design elegante do nosso mais recente produto eletrônico. Projetado para oferecer desempenho superior e facilidade de uso.</p>'
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Imagem do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#fff',
          textAlign: 'center'
        },
        src: '/templates/electronics/electronic-product-1-image.png',
        alt: 'Produto eletrônico',
        caption: 'Imagem do produto em destaque'
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Recursos Avançados',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fff'
        },
        heading: 'Recursos Principais',
        features: [
          {
            id: 'feature-1',
            title: 'Desempenho Superior',
            description: 'Processamento rápido e eficiente para todas as suas necessidades.',
            icon: '🚀'
          },
          {
            id: 'feature-2',
            title: 'Design Inovador',
            description: 'Estética moderna e ergonômica para uma experiência de usuário aprimorada.',
            icon: '💡'
          },
          {
            id: 'feature-3',
            title: 'Conectividade Total',
            description: 'Compatível com todos os seus dispositivos e plataformas favoritas.',
            icon: '🔗'
          }
        ]
      }
    ]
  },
  {
    id: 'electronic-gadget-2',
    name: 'Gadget Tecnológico',
    category: 'electronics',
    thumbnail: '/templates/electronics/electronic-gadget-2.png',
    blocks: [
      {
        id: 'hero-2',
        type: 'hero',
        title: 'Novo Gadget',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center',
          borderRadius: '0'
        },
        heading: 'A Tecnologia do Futuro',
        subheading: 'Um gadget que vai revolucionar o seu dia a dia',
        buttonText: 'Compre Já',
        buttonUrl: '#'
      },
      {
        id: 'image-2',
        type: 'image',
        title: 'Imagem do Gadget',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#fff',
          textAlign: 'center'
        },
        src: '/templates/electronics/electronic-gadget-2-image.png',
        alt: 'Gadget tecnológico',
        caption: 'Conheça o novo gadget'
      },
      {
        id: 'text-2',
        type: 'text',
        title: 'Descrição Detalhada',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa'
        },
        content: '<p>Descubra como este gadget pode transformar a sua rotina. Com funcionalidades inovadoras e design compacto, ele é perfeito para quem busca praticidade e eficiência.</p>'
      },
      {
        id: 'benefits-2',
        type: 'benefits',
        title: 'Benefícios Exclusivos',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fff'
        },
        heading: 'Por que escolher este gadget?',
        benefits: [
          {
            id: 'benefit-1',
            title: 'Praticidade',
            description: 'Facilidade de uso e portabilidade para o seu dia a dia.',
            icon: '👍'
          },
          {
            id: 'benefit-2',
            title: 'Inovação',
            description: 'Tecnologia de ponta para uma experiência única.',
            icon: '✨'
          },
          {
            id: 'benefit-3',
            title: 'Eficiência',
            description: 'Otimize suas tarefas e ganhe tempo com este gadget.',
            icon: '⏱️'
          }
        ]
      }
    ]
  },
  {
    id: 'smart-home-device-3',
    name: 'Dispositivo para Casa Inteligente',
    category: 'electronics',
    thumbnail: '/templates/electronics/smart-home-device-3.png',
    blocks: [
      {
        id: 'hero-3',
        type: 'hero',
        title: 'Casa Inteligente',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#dc3545',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center',
          borderRadius: '0'
        },
        heading: 'Transforme sua Casa',
        subheading: 'Controle total ao alcance da sua mão',
        buttonText: 'Saiba Mais',
        buttonUrl: '#'
      },
      {
        id: 'image-3',
        type: 'image',
        title: 'Imagem do Dispositivo',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#fff',
          textAlign: 'center'
        },
        src: '/templates/electronics/smart-home-device-3-image.png',
        alt: 'Dispositivo para casa inteligente',
        caption: 'Controle sua casa com facilidade'
      },
      {
        id: 'text-3',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa'
        },
        content: '<p>Automatize sua casa com este dispositivo inteligente. Controle a iluminação, temperatura e segurança com apenas alguns toques no seu smartphone.</p>'
      },
      {
        id: 'specifications-3',
        type: 'specifications',
        title: 'Especificações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fff'
        },
        heading: 'Detalhes do Produto',
        specs: [
          {
            id: 'spec-1',
            name: 'Conectividade',
            value: 'Wi-Fi, Bluetooth'
          },
          {
            id: 'spec-2',
            name: 'Compatibilidade',
            value: 'iOS, Android'
          },
          {
            id: 'spec-3',
            name: 'Alimentação',
            value: 'Bivolt'
          }
        ]
      }
    ]
  },
  {
    id: 'high-end-audio-4',
    name: 'Áudio de Alta Qualidade',
    category: 'electronics',
    thumbnail: '/templates/electronics/high-end-audio-4.png',
    blocks: [
      {
        id: 'hero-4',
        type: 'hero',
        title: 'Áudio Premium',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#343a40',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center',
          borderRadius: '0'
        },
        heading: 'Qualidade Sonora Impecável',
        subheading: 'Experimente a música como nunca antes',
        buttonText: 'Descubra',
        buttonUrl: '#'
      },
      {
        id: 'image-4',
        type: 'image',
        title: 'Imagem do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#fff',
          textAlign: 'center'
        },
        src: '/templates/electronics/high-end-audio-4-image.png',
        alt: 'Equipamento de áudio de alta qualidade',
        caption: 'Som perfeito em cada detalhe'
      },
      {
        id: 'text-4',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa'
        },
        content: '<p>Mergulhe em um mundo de áudio cristalino com este equipamento de alta qualidade. Desfrute de cada nota e nuance com precisão e clareza incomparáveis.</p>'
      },
      {
        id: 'gallery-4',
        type: 'gallery',
        title: 'Galeria de Imagens',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fff'
        },
        heading: 'Detalhes do Produto',
        images: [
          {
            id: 'gallery-image-1',
            src: '/templates/electronics/high-end-audio-4-gallery-1.png',
            alt: 'Detalhe do áudio',
            caption: 'Design elegante'
          },
          {
            id: 'gallery-image-2',
            src: '/templates/electronics/high-end-audio-4-gallery-2.png',
            alt: 'Componentes internos',
            caption: 'Tecnologia avançada'
          }
        ]
      }
    ]
  },
  {
    id: 'gaming-laptop-5',
    name: 'Laptop Gamer de Última Geração',
    category: 'electronics',
    thumbnail: '/templates/electronics/gaming-laptop-5.png',
    blocks: [
      {
        id: 'hero-5',
        type: 'hero',
        title: 'Laptop Gamer',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#6c757d',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center',
          borderRadius: '0'
        },
        heading: 'Domine o Jogo',
        subheading: 'Desempenho extremo para gamers exigentes',
        buttonText: 'Ver Especificações',
        buttonUrl: '#'
      },
      {
        id: 'image-5',
        type: 'image',
        title: 'Imagem do Laptop',
        visible: true,
        columns: 'full',
        style: {
          padding: '20px',
          backgroundColor: '#fff',
          textAlign: 'center'
        },
        src: '/templates/electronics/gaming-laptop-5-image.png',
        alt: 'Laptop gamer de última geração',
        caption: 'Prepare-se para a ação'
      },
      {
        id: 'text-5',
        type: 'text',
        title: 'Descrição do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa'
        },
        content: '<p>Experimente o poder e a velocidade deste laptop gamer de última geração. Com gráficos avançados e processamento ultrarrápido, você estará pronto para qualquer desafio.</p>'
      },
      {
        id: 'video-5',
        type: 'video',
        title: 'Vídeo do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fff'
        },
        videoUrl: 'https://www.youtube.com/watch?v=your_youtube_video_id',
        aspectRatio: '16:9',
        autoplay: false,
        muteAudio: true
      }
    ]
  }
];
