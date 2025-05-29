
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

console.log('Loading eletronicos templates...');

export const eletronicoTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Eletrônicos Premium',
    category: 'electronics',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#1a1a2e',
          textColor: '#ffffff',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Tecnologia de Ponta ao Seu Alcance',
        subheading: 'Descubra nossa linha premium de eletrônicos com qualidade superior e design inovador para transformar sua experiência digital',
        buttonText: 'Explorar Produtos',
        buttonUrl: '#'
      },
      
      // Galeria em 3 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria de Produtos',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Nossa Linha de Produtos',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
            alt: 'Laptop moderno',
            caption: 'Computadores Portáteis'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
            alt: 'Placa de circuito',
            caption: 'Componentes Avançados'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
            alt: 'Setup completo',
            caption: 'Estações de Trabalho'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens dos Nossos Eletrônicos',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Por Que Escolher Nossos Produtos',
        benefits: [
          {
            id: uuidv4(),
            icon: '⚡',
            title: 'Alta Performance',
            description: 'Processadores de última geração que garantem velocidade e eficiência em todas as tarefas'
          },
          {
            id: uuidv4(),
            icon: '🛡️',
            title: 'Garantia Estendida',
            description: 'Cobertura completa de 3 anos com suporte técnico especializado 24/7'
          },
          {
            id: uuidv4(),
            icon: '🌱',
            title: 'Eco-Friendly',
            description: 'Produtos sustentáveis com certificação ambiental e baixo consumo energético'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Inovação Tecnológica',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Tecnologia que Transforma Vidas',
        content: 'Nossos eletrônicos incorporam as mais recentes inovações tecnológicas, desde processadores quânticos até inteligência artificial avançada. Cada produto é projetado para superar expectativas e oferecer uma experiência única que simplifica e enriquece sua vida digital.',
        image: {
          src: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
          alt: 'Tecnologia avançada'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Design Premiado',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Design que Impressiona e Funciona',
        content: 'Nossos produtos combinam estética moderna com funcionalidade excepcional. Cada detalhe é cuidadosamente pensado para criar dispositivos elegantes que se integram perfeitamente ao seu estilo de vida, mantendo sempre o foco na usabilidade e performance.',
        image: {
          src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
          alt: 'Design elegante'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Recursos Técnicos',
        visible: true,
        columns: 2,
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Características Avançadas',
        features: [
          {
            id: uuidv4(),
            icon: '💾',
            title: 'Armazenamento SSD',
            description: 'Memória ultra-rápida com capacidade de até 2TB para todos os seus arquivos'
          },
          {
            id: uuidv4(),
            icon: '🔋',
            title: 'Bateria Duradoura',
            description: 'Autonomia de até 15 horas com carregamento rápido em 30 minutos'
          },
          {
            id: uuidv4(),
            icon: '📱',
            title: 'Conectividade Total',
            description: 'Wi-Fi 6E, Bluetooth 5.3 e USB-C com Thunderbolt 4'
          },
          {
            id: uuidv4(),
            icon: '🎮',
            title: 'Gráficos Avançados',
            description: 'Placa de vídeo dedicada para gaming e criação de conteúdo'
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
          backgroundColor: '#f8f9fa'
        },
        heading: 'Detalhes Técnicos Completos',
        specs: [
          { name: 'Processador', value: 'Intel Core i9-13900H ou AMD Ryzen 9 7940HS' },
          { name: 'Memória RAM', value: '32GB DDR5 5600MHz (expansível até 64GB)' },
          { name: 'Armazenamento', value: 'SSD NVMe PCIe 4.0 de 1TB + Slot adicional' },
          { name: 'Placa de Vídeo', value: 'NVIDIA RTX 4070 8GB GDDR6X' },
          { name: 'Tela', value: '15.6" 4K OLED 120Hz com suporte HDR' },
          { name: 'Sistema Operacional', value: 'Windows 11 Pro ou Linux Ubuntu' },
          { name: 'Dimensões', value: '35.7 x 24.5 x 1.8 cm' },
          { name: 'Peso', value: '1.8kg' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Suporte Especializado',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Suporte Técnico de Excelência',
        content: 'Nossa equipe de especialistas está disponível 24/7 para ajudar você a aproveitar ao máximo seu equipamento. Oferecemos suporte remoto, tutoriais personalizados e atualizações automáticas para garantir que você esteja sempre com a versão mais recente e segura.',
        image: {
          src: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
          alt: 'Suporte técnico especializado'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Qualidade Premium',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
        alt: 'Produto eletrônico premium',
        caption: 'Qualidade excepcional em cada detalhe'
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
        heading: 'Dúvidas Mais Comuns',
        questions: [
          {
            question: 'Qual a garantia dos produtos?',
            answer: 'Todos os nossos eletrônicos vêm com garantia de 3 anos, incluindo defeitos de fabricação e suporte técnico completo.'
          },
          {
            question: 'Vocês fazem upgrades e manutenção?',
            answer: 'Sim! Oferecemos serviço de upgrade de componentes e manutenção preventiva em nossa rede de assistências técnicas autorizadas.'
          },
          {
            question: 'Os produtos são compatíveis com software profissional?',
            answer: 'Absolutamente. Nossos equipamentos são certificados para rodar software profissional de design, desenvolvimento, edição de vídeo e muito mais.'
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
          backgroundColor: '#1a1a2e',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Eleve Sua Experiência Digital',
        content: 'Descubra o futuro da tecnologia hoje mesmo. Frete grátis, parcelamento sem juros e suporte premium incluído.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`eletronicos templates loaded: ${eletronicoTemplates.length} templates`);
eletronicoTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
