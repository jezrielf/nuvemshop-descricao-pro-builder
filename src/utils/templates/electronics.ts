
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

// Template para Eletrônicos
export const electronicsTemplate: Template = {
  id: 'adv-electronics-1',
  name: 'Smartphone Premium',
  category: 'electronics',
  blocks: [
    {
      id: uuidv4(),
      type: 'hero',
      title: 'Hero',
      columns: 1,
      visible: true,
      heading: 'UltraPhone Pro X',
      subheading: 'Redefina o conceito de smartphone com a mais avançada tecnologia disponível',
      buttonText: 'Explorar Recursos',
      buttonUrl: '#'
    },
    {
      id: uuidv4(),
      type: 'gallery',
      title: 'Galeria',
      columns: 3,
      visible: true,
      images: [
        { id: uuidv4(), src: 'https://images.unsplash.com/photo-1560617544-b4f287789e24', alt: 'Vista frontal', caption: 'Tela Infinita' },
        { id: uuidv4(), src: 'https://images.unsplash.com/photo-1552056739-d4c85c9cd997', alt: 'Câmera', caption: 'Sistema de câmeras profissionais' },
        { id: uuidv4(), src: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f', alt: 'Interface', caption: 'Interface fluida e intuitiva' }
      ]
    },
    {
      id: uuidv4(),
      type: 'specifications',
      title: 'Especificações',
      columns: 1,
      visible: true,
      heading: 'Ficha Técnica',
      specs: [
        { id: uuidv4(), name: 'Processador', value: 'OctaCore 3.2GHz' },
        { id: uuidv4(), name: 'Memória RAM', value: '12GB LPDDR5' },
        { id: uuidv4(), name: 'Armazenamento', value: '256GB/512GB UFS 3.1' },
        { id: uuidv4(), name: 'Tela', value: 'AMOLED 6.7" 120Hz HDR10+' },
        { id: uuidv4(), name: 'Resolução', value: '3200 x 1440 pixels' },
        { id: uuidv4(), name: 'Câmera principal', value: 'Quádrupla 108MP + 48MP + 12MP + 5MP' },
        { id: uuidv4(), name: 'Câmera frontal', value: '32MP com autofoco' },
        { id: uuidv4(), name: 'Bateria', value: '5000mAh com carregamento rápido 65W' },
        { id: uuidv4(), name: 'Sistema', value: 'UltraOS 13 baseado em Android 13' },
        { id: uuidv4(), name: 'Resistência', value: 'IP68 (água e poeira)' },
        { id: uuidv4(), name: 'Dimensões', value: '158.3 x 73.4 x 8.1 mm' },
        { id: uuidv4(), name: 'Peso', value: '189g' }
      ]
    },
    {
      id: uuidv4(),
      type: 'imageText',
      title: 'Imagem e Texto',
      columns: 1,
      visible: true,
      heading: 'Fotografia Profissional em suas Mãos',
      content: 'O sistema de câmeras do UltraPhone Pro X foi desenvolvido em parceria com especialistas em fotografia. A câmera principal de 108MP captura detalhes impressionantes mesmo em condições de pouca luz. Com estabilização óptica avançada e inteligência artificial, suas fotos e vídeos terão qualidade profissional em qualquer situação.',
      image: {
        src: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0',
        alt: 'Sistema de câmeras'
      }
    },
    {
      id: uuidv4(),
      type: 'features',
      title: 'Recursos',
      columns: 2,
      visible: true,
      heading: 'Recursos Exclusivos',
      features: [
        { id: uuidv4(), title: 'UltraDisplay', description: 'Tela AMOLED de 120Hz com HDR10+ e brilho de 1500 nits' },
        { id: uuidv4(), title: 'UltraCharge', description: 'Carregamento completo em apenas 35 minutos' },
        { id: uuidv4(), title: 'UltraSound', description: 'Sistema de áudio estéreo com Dolby Atmos' },
        { id: uuidv4(), title: 'UltraSecure', description: 'Leitor de digital na tela e reconhecimento facial avançado' }
      ]
    },
    {
      id: uuidv4(),
      type: 'textImage',
      title: 'Texto e Imagem',
      columns: 1,
      visible: true,
      heading: 'Desempenho Sem Limites',
      content: 'O processador OctaCore de última geração combinado com 12GB de RAM garante que você possa executar múltiplas tarefas simultaneamente sem qualquer lentidão. Jogos, edição de vídeo, multitarefa pesada - o UltraPhone Pro X lida com tudo isso e muito mais com extrema fluidez.',
      image: {
        src: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb',
        alt: 'Desempenho gráfico'
      }
    },
    {
      id: uuidv4(),
      type: 'faq',
      title: 'FAQ',
      columns: 1,
      visible: true,
      heading: 'Perguntas Frequentes',
      questions: [
        { id: uuidv4(), question: 'O UltraPhone Pro X suporta 5G?', answer: 'Sim, o aparelho é compatível com redes 5G em todas as bandas disponíveis no Brasil.' },
        { id: uuidv4(), question: 'Qual a duração média da bateria?', answer: 'Com uso moderado, a bateria de 5000mAh pode durar facilmente mais de um dia inteiro.' },
        { id: uuidv4(), question: 'O aparelho vem com carregador?', answer: 'Sim, o UltraPhone Pro X inclui o carregador UltraCharge de 65W na caixa.' },
        { id: uuidv4(), question: 'Quantos anos de atualizações são garantidos?', answer: 'Garantimos 4 anos de atualizações de sistema e 5 anos de patches de segurança.' }
      ]
    },
    {
      id: uuidv4(),
      type: 'cta',
      title: 'CTA',
      columns: 1,
      visible: true,
      heading: 'Transforme sua Experiência Mobile',
      content: 'Não se contente com menos do que a excelência. O UltraPhone Pro X redefine o conceito de smartphone premium.',
      buttonText: 'Comprar Agora',
      buttonUrl: '#'
    }
  ]
};
