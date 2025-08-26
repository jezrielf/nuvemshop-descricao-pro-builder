
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const fashionTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Moda de Luxo',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          background: 'linear-gradient(135deg, hsl(220, 13%, 97%) 0%, hsl(220, 9%, 93%) 100%)',
          padding: '120px 40px',
          textAlign: 'center',
          borderRadius: '24px',
          boxShadow: '0 24px 80px hsl(220, 13%, 69% / 0.18)',
          border: '1px solid hsl(220, 13%, 89%)'
        },
        heading: 'Elegância Atemporal',
        subheading: 'Nova coleção de roupas premium com design exclusivo e materiais sustentáveis que definem o futuro da moda',
        buttonText: 'Ver Coleção',
        buttonUrl: '#'
      },
      
      // Galeria em 3 colunas
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria da Coleção',
        visible: true,
        columns: '3',
        style: {
          padding: '80px 40px',
          backgroundColor: 'hsl(0, 0%, 100%)',
          borderRadius: '16px',
          margin: '40px 0',
          boxShadow: '0 8px 32px hsl(220, 13%, 69% / 0.08)'
        },
        heading: 'Destaques da Nova Coleção',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3',
            alt: 'Modelo vestindo casaco premium',
            caption: 'Casaco Inverno Premium'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e',
            alt: 'Detalhe de tecido premium',
            caption: 'Tecido Exclusivo Importado'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
            alt: 'Vestido elegante',
            caption: 'Vestido de Festa Coleção Primavera'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Diferenciais da Marca',
        visible: true,
        columns: '3',
        style: {
          padding: '80px 40px',
          background: 'linear-gradient(135deg, hsl(220, 13%, 97%) 0%, hsl(220, 13%, 95%) 100%)',
          borderRadius: '16px',
          margin: '40px 0',
          border: '1px solid hsl(220, 13%, 89%)'
        },
        heading: 'Por Que Escolher Nossa Marca',
        benefits: [
          {
            id: uuidv4(),
            icon: '✨',
            title: 'Design Exclusivo',
            description: 'Peças desenvolvidas por estilistas renomados com atenção aos mínimos detalhes'
          },
          {
            id: uuidv4(),
            icon: '🧵',
            title: 'Materiais Premium',
            description: 'Utilizamos apenas tecidos de alta qualidade que garantem conforto e durabilidade'
          },
          {
            id: uuidv4(),
            icon: '🌿',
            title: 'Sustentabilidade',
            description: 'Produção consciente com materiais eco-friendly e processos responsáveis'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Materiais Premium',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Tecidos Exclusivos de Origem Controlada',
        content: 'Selecionamos cuidadosamente os melhores tecidos do mundo para criar peças que não apenas parecem premium, mas também proporcionam conforto e durabilidade excepcionais. Do algodão egípcio à seda italiana, cada material é escolhido pela sua qualidade superior e características únicas que fazem toda a diferença no resultado final.',
        image: {
          src: 'https://images.unsplash.com/photo-1464699511458-87e156ad3a97',
          alt: 'Tecido premium de alta qualidade'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Processo Artesanal',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
        },
        heading: 'Tradição Artesanal em Cada Peça',
        content: 'Nossas peças são confeccionadas por artesãos altamente qualificados que dominam técnicas tradicionais passadas por gerações. Cada item recebe atenção meticulosa, com costuras feitas à mão e acabamentos precisos que só anos de experiência podem proporcionar. Este compromisso com a excelência se traduz em peças de qualidade incomparável.',
        image: {
          src: 'https://images.unsplash.com/photo-1591382386627-349b692688ff',
          alt: 'Artesão trabalhando em peça de roupa'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características da Coleção',
        visible: true,
        columns: '2',
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Características Exclusivas',
        features: [
          {
            id: uuidv4(),
            icon: '🧵',
            title: 'Costuras Reforçadas',
            description: 'Técnicas especiais para maior durabilidade e acabamento perfeito'
          },
          {
            id: uuidv4(),
            icon: '🌡️',
            title: 'Conforto Térmico',
            description: 'Tecidos que se adaptam à temperatura corporal para máximo conforto'
          },
          {
            id: uuidv4(),
            icon: '💧',
            title: 'Repelente à Água',
            description: 'Tratamento especial que protege contra líquidos e manchas'
          },
          {
            id: uuidv4(),
            icon: '👔',
            title: 'Ajuste Perfeito',
            description: 'Modelagem estudada para valorizar todas as silhuetas'
          }
        ]
      },
      
      // Especificações
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Detalhes do Produto',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#f8f9fa'
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
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Cuidados Especiais',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Como Preservar a Qualidade',
        content: 'Para garantir que suas peças mantenham a beleza e qualidade por anos, desenvolvemos um guia completo de cuidados. Recomendamos lavagem delicada, secagem natural e armazenamento adequado. Nossa equipe de atendimento está sempre disponível para orientações personalizadas sobre cuidados específicos para cada tecido.',
        image: {
          src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
          alt: 'Cuidados com roupas premium'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Coleção Completa',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1604176424472-9d7e12de566c',
        alt: 'Modelo apresentando item da coleção completa',
        caption: 'Novo lançamento - Disponível em todas as lojas'
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
        heading: 'Perguntas Frequentes',
        questions: [
          {
            question: 'Como garantir a durabilidade das peças?',
            answer: 'Recomendamos seguir as instruções de lavagem na etiqueta. Em geral, lave em água fria com detergente suave, evite usar alvejante e seque naturalmente para preservar as fibras e cores.'
          },
          {
            question: 'Vocês oferecem ajustes personalizados?',
            answer: 'Sim, oferecemos serviços de ajuste para todos os produtos da coleção premium. Visite uma de nossas lojas com sua peça para uma consulta com nossos alfaiates especializados.'
          },
          {
            question: 'Qual a política de devolução?',
            answer: 'Aceitamos devoluções em até 30 dias após a compra, desde que o produto esteja em perfeitas condições, com etiquetas originais e acompanhado da nota fiscal.'
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
          backgroundColor: '#000000',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Eleve seu Guarda-Roupa ao Próximo Nível',
        content: 'Descubra a coleção completa em nossas lojas ou faça sua compra online com frete grátis para todo o Brasil',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];
