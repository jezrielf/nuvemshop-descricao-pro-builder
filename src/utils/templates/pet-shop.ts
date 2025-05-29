
import { v4 as uuidv4 } from 'uuid';
import { Template } from '@/types/editor';

console.log('Loading pet-shop templates...');

export const petShopTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Pet Shop Premium',
    category: 'other',
    thumbnail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    blocks: [
      // Banner Principal
      {
        id: uuidv4(),
        type: 'hero',
        title: 'Banner Principal',
        visible: true,
        columns: 'full',
        style: {
          backgroundColor: '#fef3c7',
          textColor: '#92400e',
          padding: '80px 20px',
          textAlign: 'center'
        },
        heading: 'Tudo Para o Seu Melhor Amigo',
        subheading: 'Produtos premium para pets que proporcionam saúde, diversão e bem-estar para cães, gatos e outros animais de estimação',
        buttonText: 'Ver Produtos',
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
        heading: 'Categorias de Produtos',
        images: [
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
            alt: 'Gato fofo',
            caption: 'Linha para Gatos'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
            alt: 'Filhote de gato',
            caption: 'Produtos para Filhotes'
          },
          {
            id: uuidv4(),
            src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
            alt: 'Pet feliz',
            caption: 'Acessórios e Brinquedos'
          }
        ]
      },
      
      // Benefícios em 3 colunas
      {
        id: uuidv4(),
        type: 'benefits',
        title: 'Vantagens dos Nossos Produtos',
        visible: true,
        columns: 3,
        style: {
          padding: '60px 20px',
          backgroundColor: '#fffbeb'
        },
        heading: 'Por Que Seu Pet Merece o Melhor',
        benefits: [
          {
            id: uuidv4(),
            icon: '🐕',
            title: 'Saúde e Nutrição',
            description: 'Rações premium e suplementos que garantem uma vida longa e saudável para seu pet'
          },
          {
            id: uuidv4(),
            icon: '🎾',
            title: 'Diversão Garantida',
            description: 'Brinquedos interativos que estimulam a mente e mantêm seu pet ativo e feliz'
          },
          {
            id: uuidv4(),
            icon: '🏥',
            title: 'Cuidados Veterinários',
            description: 'Produtos de higiene e saúde recomendados por veterinários especialistas'
          }
        ]
      },
      
      // Imagem + Texto
      {
        id: uuidv4(),
        type: 'imageText',
        title: 'Nutrição Premium',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Alimentação de Qualidade Superior',
        content: 'Nossas rações são desenvolvidas com ingredientes naturais e balanceamento nutricional perfeito para cada fase da vida do seu pet. Proteínas de alta qualidade, vitaminas essenciais e minerais que fortalecem o sistema imunológico e garantem energia para brincadeiras o dia todo.',
        image: {
          src: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
          alt: 'Pet saudável e feliz'
        }
      },
      
      // Texto + Imagem
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Cuidados Diários',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#fffbeb'
        },
        heading: 'Higiene e Cuidados Especializados',
        content: 'Oferecemos uma linha completa de produtos para higiene e cuidados diários: shampoos especiais, escovas dentais, produtos para limpeza de ouvidos e muito mais. Tudo desenvolvido especificamente para a pele e pelo sensível dos animais.',
        image: {
          src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
          alt: 'Cuidados com pet'
        }
      },
      
      // Recursos em 2 colunas
      {
        id: uuidv4(),
        type: 'features',
        title: 'Características dos Produtos',
        visible: true,
        columns: 2,
        layout: 'vertical',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Diferenciais da Nossa Loja',
        features: [
          {
            id: uuidv4(),
            icon: '🍖',
            title: 'Ingredientes Naturais',
            description: 'Rações sem conservantes artificiais, corantes ou aromatizantes químicos'
          },
          {
            id: uuidv4(),
            icon: '🎯',
            title: 'Produtos Específicos',
            description: 'Linhas especializadas para cada espécie, idade e necessidade especial'
          },
          {
            id: uuidv4(),
            icon: '📦',
            title: 'Entrega Rápida',
            description: 'Produtos pesados entregues em casa com agilidade e cuidado'
          },
          {
            id: uuidv4(),
            icon: '👨‍⚕️',
            title: 'Aprovação Veterinária',
            description: 'Todos os produtos aprovados e recomendados por veterinários'
          }
        ]
      },
      
      // Especificações
      {
        id: uuidv4(),
        type: 'specifications',
        title: 'Informações dos Produtos',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#fffbeb'
        },
        heading: 'Detalhes da Linha Pet',
        specs: [
          { name: 'Rações', value: 'Premium, Super Premium, Orgânica (1kg, 3kg, 10kg, 15kg)' },
          { name: 'Idade', value: 'Filhotes, Adultos, Idosos (7+ anos)' },
          { name: 'Porte', value: 'Mini, Pequeno, Médio, Grande, Gigante' },
          { name: 'Necessidades Especiais', value: 'Light, Hipoalergênica, Digestão Sensível' },
          { name: 'Brinquedos', value: 'Materiais atóxicos, Resistentes, Educativos' },
          { name: 'Higiene', value: 'pH balanceado, Hipoalergênicos, Sem parabenos' },
          { name: 'Acessórios', value: 'Coleiras, Guias, Camas, Comedouros' },
          { name: 'Garantia', value: 'Satisfação garantida ou dinheiro de volta' }
        ]
      },
      
      // Texto + Imagem (adicional)
      {
        id: uuidv4(),
        type: 'textImage',
        title: 'Atendimento Especializado',
        visible: true,
        columns: 'full',
        style: {
          padding: '60px 20px',
          backgroundColor: '#ffffff'
        },
        heading: 'Consultoria Especializada Para Seu Pet',
        content: 'Nossa equipe inclui veterinários e especialistas em comportamento animal que podem orientar você na escolha dos produtos ideais. Oferecemos consultoria gratuita para ajudar na transição alimentar, escolha de brinquedos educativos e produtos de cuidado.',
        image: {
          src: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
          alt: 'Consulta veterinária'
        }
      },
      
      // Imagem standalone
      {
        id: uuidv4(),
        type: 'image',
        title: 'Pets Felizes',
        visible: true,
        columns: 'full',
        style: {
          padding: '40px 20px',
          backgroundColor: '#fffbeb',
          textAlign: 'center'
        },
        src: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
        alt: 'Pet feliz e saudável',
        caption: 'A felicidade do seu pet é nossa prioridade'
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
        heading: 'Dúvidas Sobre Cuidados Pet',
        questions: [
          {
            question: 'Como escolher a ração ideal para meu pet?',
            answer: 'Considere a idade, porte, nível de atividade e necessidades especiais. Nossa equipe oferece consultoria gratuita para ajudar na escolha perfeita.'
          },
          {
            question: 'Vocês entregam produtos pesados como ração?',
            answer: 'Sim! Temos entrega especializada para produtos pesados, com agendamento e entrega até a porta de casa, sem custo adicional para compras acima de R$ 99.'
          },
          {
            question: 'Os brinquedos são seguros para filhotes?',
            answer: 'Absolutamente! Todos os brinquedos são feitos com materiais atóxicos e testados para segurança. Temos linhas específicas para cada faixa etária.'
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
          backgroundColor: '#92400e',
          textColor: '#ffffff',
          textAlign: 'center'
        },
        heading: 'Faça Seu Pet Mais Feliz Hoje',
        content: 'Descubra nossa linha completa de produtos premium. Frete grátis em compras acima de R$ 99 e consultoria veterinária gratuita.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      }
    ]
  }
];

console.log(`pet-shop templates loaded: ${petShopTemplates.length} templates`);
petShopTemplates.forEach((template, index) => {
  console.log(`  ${index + 1}. ${template.name} - ${template.blocks.length} blocks`);
});
