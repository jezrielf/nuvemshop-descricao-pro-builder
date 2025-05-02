
import { Template } from '@/types/editor';

export const fashionTemplates: Template[] = [
  {
    id: 'clothing-premium-1',
    name: 'Moda de Luxo',
    category: 'clothing',
    thumbnail: '/placeholder.svg',
    blocks: [
      {
        id: 'hero-1',
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#f5f5f5',
          padding: '80px 20px',
          borderRadius: '0px',
          textAlign: 'center'
        },
        heading: 'Elegância Atemporal',
        subheading: 'Nova coleção de roupas premium com design exclusivo e materiais sustentáveis',
        buttonText: 'Ver Coleção',
        buttonUrl: '#'
      },
      {
        id: 'gallery-1',
        type: 'gallery',
        title: 'Galeria da Coleção',
        visible: true,
        columns: '3',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: '',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3',
            alt: 'Modelo vestindo casaco premium',
            caption: 'Casaco Inverno Premium'
          },
          {
            src: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e',
            alt: 'Detalhe de tecido premium',
            caption: 'Tecido exclusivo importado'
          },
          {
            src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
            alt: 'Vestido elegante',
            caption: 'Vestido de festa coleção primavera'
          }
        ]
      },
      {
        id: 'text-1',
        type: 'text',
        title: 'Sobre a Coleção',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff',
          margin: '40px 0',
          textAlign: 'center'
        },
        content: '<h2 style="font-size: 32px; font-weight: 300; color: #333; margin-bottom: 30px;">A Arte da Alta Costura</h2><p style="font-size: 18px; line-height: 1.8; color: #555; max-width: 800px; margin: 0 auto;">Nossa nova coleção celebra a elegância atemporal através de peças cuidadosamente desenhadas e confeccionadas com os mais finos materiais. Cada item representa a perfeita harmonia entre estilo contemporâneo e técnicas tradicionais de costura.</p>'
      },
      {
        id: 'imageText-1',
        type: 'imageText',
        title: 'Materiais Premium',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          margin: '0'
        },
        heading: 'Tecidos Exclusivos',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #555;">Selecionamos cuidadosamente os melhores tecidos do mundo para criar peças que não apenas parecem premium, mas também proporcionam conforto e durabilidade excepcionais. Do algodão egípcio à seda italiana, cada material é escolhido pela sua qualidade superior e características únicas.</p><p style="font-size: 16px; line-height: 1.8; color: #555; margin-top: 20px;">Nossa dedicação à excelência se estende a cada detalhe, desde os botões até as costuras, garantindo que cada peça mantenha sua beleza por anos.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1464699511458-87e156ad3a97',
          alt: 'Tecido premium de alta qualidade',
        }
      },
      {
        id: 'benefits-1',
        type: 'benefits',
        title: 'Diferencias de Qualidade',
        visible: true,
        columns: '3',
        style: {
          padding: '80px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Por que Escolher Nossa Marca',
        benefits: [
          {
            icon: '✨',
            title: 'Design Exclusivo',
            description: 'Peças criadas por designers premiados internacionalmente'
          },
          {
            icon: '🌿',
            title: 'Sustentável',
            description: 'Materiais ecológicos e processos de produção responsáveis'
          },
          {
            icon: '👌',
            title: 'Acabamento Perfeito',
            description: 'Cada peça é minuciosamente inspecionada para garantir qualidade'
          }
        ]
      },
      {
        id: 'textImage-1',
        type: 'textImage',
        title: 'Processo Artesanal',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f5f5f5',
          margin: '0'
        },
        heading: 'Tradição Artesanal em Cada Peça',
        content: '<p style="font-size: 16px; line-height: 1.8; color: #555;">Nossas peças são confeccionadas por artesãos altamente qualificados que dominam técnicas tradicionais passadas por gerações. Cada item recebe atenção meticulosa, com costuras feitas à mão e acabamentos precisos que só anos de experiência podem proporcionar.</p><p style="font-size: 16px; line-height: 1.8; color: #555; margin-top: 20px;">Este compromisso com a excelência artesanal se traduz em peças de qualidade incomparável que mantêm sua forma e beleza mesmo após anos de uso.</p>',
        image: {
          src: 'https://images.unsplash.com/photo-1591382386627-349b692688ff',
          alt: 'Artesão trabalhando em peça de roupa',
        }
      },
      {
        id: 'features-1',
        type: 'features',
        title: 'Características da Coleção',
        visible: true,
        columns: '4',
        layout: 'vertical',
        style: {
          padding: '80px 20px',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        heading: 'Características Exclusivas',
        features: [
          {
            icon: '🧵',
            title: 'Costuras Reforçadas',
            description: 'Técnicas especiais para maior durabilidade'
          },
          {
            icon: '🌡️',
            title: 'Conforto Térmico',
            description: 'Tecidos que se adaptam à temperatura corporal'
          },
          {
            icon: '💧',
            title: 'Repelente à Água',
            description: 'Tratamento especial que protege contra líquidos'
          },
          {
            icon: '👔',
            title: 'Ajuste Perfeito',
            description: 'Modelagem estudada para valorizar silhuetas'
          }
        ]
      },
      {
        id: 'specifications-1',
        type: 'specifications',
        title: 'Detalhes do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa',
          margin: '0'
        },
        heading: 'Especificações do Tecido',
        specs: [
          { name: 'Composição', value: '95% Algodão Egípcio, 5% Elastano' },
          { name: 'Gramatura', value: '180g/m²' },
          { name: 'Origem', value: 'Itália' },
          { name: 'Certificações', value: 'GOTS, OEKO-TEX' },
          { name: 'Lavagem', value: 'À mão ou máquina em ciclo delicado (30°C)' },
          { name: 'Secagem', value: 'Na horizontal à sombra' }
        ]
      },
      {
        id: 'image-1',
        type: 'image',
        title: 'Coleção Completa',
        visible: true,
        columns: 'full',
        style: {
          padding: '0',
          backgroundColor: '#ffffff',
          margin: '0'
        },
        src: 'https://images.unsplash.com/photo-1604176424472-9d7e12de566c',
        alt: 'Modelo apresentando item da coleção completa',
        caption: 'Novo lançamento - Disponível em todas as lojas'
      },
      {
        id: 'faq-1',
        type: 'faq',
        title: 'Perguntas Frequentes',
        visible: true,
        columns: 'full',
        style: {
          padding: '80px 20px',
          backgroundColor: '#ffffff',
          margin: '20px 0'
        },
        heading: 'Perguntas Frequentes',
        questions: [
          {
            question: 'Como garantir a durabilidade das peças?',
            answer: 'Recomendamos seguir as instruções de lavagem na etiqueta. Em geral, lave em água fria com detergente suave, evite usar alvejante e seque naturalmente para preservar as fibras e cores.'
          },
          {
            question: 'Vocês oferecem ajustes personalizados?',
            answer: 'Sim, oferecemos serviços de ajuste para todos os produtos da coleção premium. Visite uma de nossas lojas com sua peça para uma consulta com nossos alfaiates.'
          },
          {
            question: 'Qual a política de devolução?',
            answer: 'Aceitamos devoluções em até 30 dias após a compra, desde que o produto esteja em perfeitas condições, com etiquetas originais e acompanhado da nota fiscal.'
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
          backgroundColor: '#000000',
          color: '#ffffff',
          margin: '0',
          textAlign: 'center'
        },
        heading: 'Eleve seu Guarda-Roupa',
        content: 'Descubra a coleção completa em nossas lojas ou faça sua compra online com frete grátis',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
