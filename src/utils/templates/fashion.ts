
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const fashionTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Moda de Luxo',
    category: 'clothing',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    blocks: [
      // Banner Principal Moderno
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          background: 'linear-gradient(135deg, hsl(260, 50%, 12%) 0%, hsl(280, 60%, 20%) 50%, hsl(300, 40%, 8%) 100%)',
          padding: '140px 60px',
          textAlign: 'center',
          borderRadius: '32px',
          boxShadow: '0 32px 120px hsl(260, 50%, 8% / 0.4), 0 0 60px hsl(280, 60%, 20% / 0.3)',
          border: '1px solid hsl(280, 40%, 25%)',
          color: 'hsl(0, 0%, 98%)',
          position: 'relative',
          overflow: 'hidden'
        },
        heading: 'Luxo Contemporâneo',
        subheading: 'Coleção exclusiva que redefine elegância através de design inovador, materiais premium e sustentabilidade consciente',
        buttonText: 'Explorar Coleção',
        buttonUrl: '#'
      },
      
      // Galeria Moderna
      {
        id: uuidv4(),
        type: 'gallery',
        title: 'Galeria da Coleção',
        visible: true,
        columns: '3',
        style: {
          padding: '100px 60px',
          background: 'linear-gradient(180deg, hsl(0, 0%, 99%) 0%, hsl(260, 20%, 97%) 100%)',
          borderRadius: '24px',
          margin: '80px 0',
          boxShadow: '0 24px 80px hsl(260, 30%, 85% / 0.2)',
          border: '1px solid hsl(260, 20%, 90%)'
        },
        heading: 'Peças de Destaque',
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
      
      // Benefícios Premium
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Diferenciais da Marca',
        visible: true,
        columns: '3',
        style: {
          padding: '120px 60px',
          background: 'linear-gradient(135deg, hsl(260, 40%, 8%) 0%, hsl(280, 50%, 15%) 50%, hsl(300, 30%, 6%) 100%)',
          borderRadius: '28px',
          margin: '80px 0',
          border: '1px solid hsl(280, 30%, 20%)',
          color: 'hsl(0, 0%, 95%)',
          boxShadow: '0 32px 100px hsl(260, 40%, 5% / 0.5)'
        },
        heading: 'Excelência em Cada Detalhe',
        benefits: [
          {
            id: uuidv4(),
            icon: '💎',
            title: 'Criação Exclusiva',
            description: 'Peças únicas desenvolvidas por designers premiados internacionalmente com técnicas inovadoras'
          },
          {
            id: uuidv4(),
            icon: '🏆',
            title: 'Qualidade Superior',
            description: 'Materiais importados de origem controlada e processos de fabricação que garantem durabilidade excepcional'
          },
          {
            id: uuidv4(),
            icon: '🌍',
            title: 'Sustentabilidade Avançada',
            description: 'Compromisso com o futuro através de práticas eco-conscientes e cadeia de produção carbono neutro'
          }
        ]
      },
      
      // Seção Materiais Premium
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Materiais Premium',
        visible: true,
        columns: 'full',
        style: {
          padding: '100px 60px',
          background: 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(260, 30%, 98%) 100%)',
          borderRadius: '24px',
          margin: '80px 0',
          border: '1px solid hsl(260, 20%, 92%)',
          boxShadow: '0 20px 60px hsl(260, 20%, 80% / 0.15)'
        },
        heading: 'Tecidos de Origem Controlada',
        content: '<p style="font-size: 20px; line-height: 1.8; color: hsl(260, 15%, 25%); margin-bottom: 32px;">Selecionamos exclusivamente os mais refinados tecidos do mundo, cada um escolhido por suas propriedades únicas e qualidade excepcional. Nossa curadoria inclui sedas italianas, cashmere mongol, algodão egípcio de fibra extra-longa e linhos irlandeses.</p><p style="font-size: 18px; line-height: 1.7; color: hsl(260, 10%, 35%);">Cada material passa por rigorosos testes de qualidade e certificações de sustentabilidade, garantindo que você vista não apenas beleza, mas também responsabilidade ambiental.</p>',
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
