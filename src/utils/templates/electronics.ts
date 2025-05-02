
import { Template } from '@/types/editor';

export const electronicsTemplates: Template[] = [
  {
    id: 'electronics-premium-1',
    name: 'Eletrônicos de Alta Performance',
    category: 'electronics',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#121212',
          padding: '80px 20px',
          borderRadius: '0',
          textAlign: 'center',
          color: '#ffffff'
        },
        heading: 'Inovação Tecnológica em Suas Mãos',
        subheading: 'Design futurista, desempenho incomparável e tecnologia de última geração',
        buttonText: 'Explorar Tecnologia',
        buttonUrl: '#'
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Sobre o Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        content: '<h2 style="font-size: 36px; font-weight: 600; color: #121212; margin-bottom: 24px;">Redefinindo o Futuro da Tecnologia</h2><p style="font-size: 18px; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto;">Desenvolvido por uma equipe de engenheiros visionários, nosso dispositivo de última geração combina performance excepcional, design minimalista e funcionalidades inovadoras que transformarão sua experiência digital. Cada componente foi meticulosamente selecionado e testado para garantir máxima eficiência e durabilidade.</p>'
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Recursos Avançados',
        visible: true,
        columns: '3',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f5f5f7',
          margin: '0'
        },
        heading: 'Recursos Revolucionários',
        features: [
          {
            icon: '⚡',
            title: 'Processador Quantum',
            description: 'Desempenho até 3x mais rápido que a geração anterior'
          },
          {
            icon: '🔋',
            title: 'Bateria Infinita',
            description: 'Até 24 horas de uso contínuo com uma única carga'
          },
          {
            icon: '🔒',
            title: 'Segurança Avançada',
            description: 'Sistema biométrico múltiplo para proteção total'
          },
          {
            icon: '💧',
            title: 'Resistência Total',
            description: 'Proteção IP68 contra água e poeira'
          },
          {
            icon: '🌐',
            title: 'Conectividade Suprema',
            description: 'Suporte a Wi-Fi 6E e Bluetooth 5.3 para transferências ultrarrápidas'
          },
          {
            icon: '🎮',
            title: 'Experiência Imersiva',
            description: 'Engine gráfico avançado para conteúdo visual impressionante'
          }
        ]
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
            src: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece',
            alt: 'Vista frontal do dispositivo',
            caption: 'Design minimalista com tela edge-to-edge'
          },
          {
            src: 'https://images.unsplash.com/photo-1601944179066-29786cb9d32a',
            alt: 'Vista traseira do dispositivo',
            caption: 'Acabamento premium em alumínio aeroespacial'
          },
          {
            src: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
            alt: 'Dispositivo em uso',
            caption: 'Interface intuitiva para máxima produtividade'
          }
        ]
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Especificações Técnicas',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f5f5f7',
          margin: '0'
        },
        heading: 'Especificações Técnicas Detalhadas',
        specs: [
          { name: 'Processador', value: 'Quantum Core X9, 12 núcleos, 5.2GHz' },
          { name: 'Memória', value: '16GB LPDDR5X' },
          { name: 'Armazenamento', value: 'SSD NVMe 1TB' },
          { name: 'Tela', value: 'AMOLED 6.7", 120Hz, HDR10+, 1500 nits' },
          { name: 'Câmera Principal', value: 'Tripla 50MP + 48MP + 12MP com estabilização óptica' },
          { name: 'Câmera Frontal', value: '32MP com sensor ToF' },
          { name: 'Bateria', value: '5000mAh com carregamento rápido 100W' },
          { name: 'Sistema Operacional', value: 'TechOS 5.0 com 4 anos de atualizações garantidas' },
          { name: 'Segurança', value: 'Leitor de impressões digitais ultrassônico, reconhecimento facial 3D' },
          { name: 'Conectividade', value: '5G, Wi-Fi 6E, Bluetooth 5.3, NFC, GPS de alta precisão' },
          { name: 'Dimensões', value: '158.2 x 75.6 x 7.8mm' },
          { name: 'Peso', value: '189g' }
        ]
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Benefícios Exclusivos',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#121212',
          color: '#ffffff',
          margin: '0'
        },
        heading: 'Experiência Superior',
        benefits: [
          {
            icon: '⚙️',
            title: 'Automação Inteligente',
            description: 'IA adaptativa que aprende seus hábitos e otimiza a performance'
          },
          {
            icon: '🌙',
            title: 'Modo Noturno Avançado',
            description: 'Proteção ocular com tecnologia de redução de luz azul certificada'
          },
          {
            icon: '🔥',
            title: 'Sistema de Refrigeração',
            description: 'Tecnologia de dissipação térmica para performance constante sem superaquecimento'
          }
        ]
      },
      {
        id: 'imageText-1',
        type: 'imageText',
        title: 'Tecnologia de Câmera',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Fotografia Computacional de Última Geração',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #333;">Nosso sistema de câmera revolucionário combina hardware de ponta com algoritmos avançados de inteligência artificial para produzir imagens de qualidade profissional em qualquer condição de iluminação. A lente principal de 50MP utiliza tecnologia de pixel binning para capturar mais luz, enquanto o sensor ultrawide de 48MP oferece perspectivas impressionantes com mínima distorção.</p><p style="font-size: 16px; line-height: 1.8; color: #333; margin-top: 20px;">O processamento de imagem neural analisa cada foto em tempo real, aplicando otimizações específicas para cada cenário e garantindo resultados perfeitos mesmo nas condições mais desafiadoras.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1551419762-4a3d998f6292',
          alt: 'Sistema de câmera avançada',
        }
      },
      {
        id: 'textImage-1',
        type: 'textImage',
        title: 'Inteligência Artificial',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#f5f5f7',
          margin: '0'
        },
        heading: 'IA Adaptativa para Uma Experiência Personalizada',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #333;">O coração de nosso dispositivo é um sistema de inteligência artificial avançado que se adapta continuamente às suas necessidades e preferências. Através de aprendizado de máquina sofisticado, ele otimiza o uso de energia, prioriza aplicativos relevantes e sugere ações contextuais para maximizar sua produtividade.</p><p style="font-size: 16px; line-height: 1.8; color: #333; margin-top: 20px;">Com processamento local para dados sensíveis e criptografia de ponta a ponta, garantimos que sua privacidade nunca seja comprometida, mesmo enquanto você desfruta dos benefícios da automação inteligente.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a',
          alt: 'Visualização da interface de IA',
        }
      },
      {
        id: 'video-1',
        type: 'video',
        title: 'Demonstração em Vídeo',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#121212',
          margin: '0'
        },
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        aspectRatio: '16:9',
        title: 'Veja a Tecnologia em Ação',
        description: 'Demonstração completa das funcionalidades revolucionárias',
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
        heading: 'Dúvidas Comuns',
        questions: [
          {
            question: 'Qual é o período de garantia?',
            answer: 'Oferecemos garantia premium de 2 anos que cobre defeitos de hardware e suporte técnico prioritário 24/7. Além disso, você pode estender a garantia por até 5 anos com nosso programa de proteção adicional.'
          },
          {
            question: 'O dispositivo é compatível com acessórios de gerações anteriores?',
            answer: 'Sim, mantivemos a compatibilidade com a maioria dos acessórios da geração anterior. Todos os cabos, carregadores e docks com conexão USB-C são totalmente compatíveis, assim como acessórios via Bluetooth e NFC.'
          },
          {
            question: 'A bateria é substituível?',
            answer: 'Como parte de nosso compromisso com a sustentabilidade, projetamos o dispositivo com uma bateria que pode ser substituída por técnicos autorizados, prolongando significativamente a vida útil do produto. Oferecemos também programa de troca com desconto após 2 anos de uso.'
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
          backgroundImage: 'linear-gradient(135deg, #121212 0%, #2d3436 100%)',
          color: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        heading: 'O Futuro da Tecnologia Está Aqui',
        content: 'Seja um dos primeiros a experimentar a próxima geração de dispositivos inteligentes',
        buttonText: 'Reservar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
