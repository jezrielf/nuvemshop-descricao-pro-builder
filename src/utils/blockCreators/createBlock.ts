
import { v4 as uuidv4 } from 'uuid';
import { BlockType, Block, ColumnLayout } from '@/types/editor';

export const createBlock = (type: BlockType, columns: ColumnLayout = 1): Block => {
  const newId = uuidv4();
  
  switch (type) {
    case 'hero':
      return {
        id: newId,
        type: 'hero',
        title: 'Banner Principal',
        columns,
        visible: true,
        heading: 'Título do Banner',
        subheading: 'Subtítulo ou chamada secundária para o seu produto',
        buttonText: 'Saiba Mais',
        buttonUrl: '#',
      } as Block;
      
    case 'text':
      return {
        id: newId,
        type: 'text',
        title: 'Bloco de Texto',
        columns,
        visible: true,
        heading: 'Título do Texto',
        content: 'Insira o conteúdo aqui. Você pode adicionar informações detalhadas sobre seu produto ou serviço.',
      } as Block;
      
    case 'features':
      return {
        id: newId,
        type: 'features',
        title: 'Recursos',
        columns,
        visible: true,
        heading: 'Principais Recursos',
        features: [
          {
            id: uuidv4(),
            title: 'Recurso 1',
            description: 'Descrição do recurso 1',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Recurso 2',
            description: 'Descrição do recurso 2',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Recurso 3',
            description: 'Descrição do recurso 3',
            icon: '✓'
          }
        ]
      } as Block;
      
    case 'benefits':
      return {
        id: newId,
        type: 'benefits',
        title: 'Benefícios',
        columns,
        visible: true,
        heading: 'Benefícios',
        benefits: [
          {
            id: uuidv4(),
            title: 'Benefício 1',
            description: 'Descrição do benefício 1',
            icon: '✓'
          },
          {
            id: uuidv4(),
            title: 'Benefício 2',
            description: 'Descrição do benefício 2',
            icon: '✓'
          }
        ]
      } as Block;
      
    case 'specifications':
      return {
        id: newId,
        type: 'specifications',
        title: 'Especificações',
        columns,
        visible: true,
        heading: 'Especificações Técnicas',
        specs: [
          {
            id: uuidv4(),
            name: 'Material',
            value: 'Alumínio'
          },
          {
            id: uuidv4(),
            name: 'Dimensões',
            value: '10 x 20 x 5 cm'
          },
          {
            id: uuidv4(),
            name: 'Peso',
            value: '500g'
          }
        ]
      } as Block;
      
    case 'image':
      return {
        id: newId,
        type: 'image',
        title: 'Imagem',
        columns,
        visible: true,
        src: 'https://via.placeholder.com/800x600',
        alt: 'Descrição da imagem',
        caption: 'Legenda da imagem (opcional)'
      } as Block;
      
    case 'gallery':
      return {
        id: newId,
        type: 'gallery',
        title: 'Galeria',
        columns,
        visible: true,
        images: [
          {
            id: uuidv4(),
            src: 'https://via.placeholder.com/800x600',
            alt: 'Imagem 1',
            caption: 'Legenda 1'
          },
          {
            id: uuidv4(),
            src: 'https://via.placeholder.com/800x600',
            alt: 'Imagem 2',
            caption: 'Legenda 2'
          },
          {
            id: uuidv4(),
            src: 'https://via.placeholder.com/800x600',
            alt: 'Imagem 3',
            caption: 'Legenda 3'
          }
        ]
      } as Block;
      
    case 'imageText':
      return {
        id: newId,
        type: 'imageText',
        title: 'Imagem + Texto',
        columns,
        visible: true,
        image: {
          src: 'https://via.placeholder.com/800x600',
          alt: 'Descrição da imagem'
        },
        heading: 'Título da Seção',
        content: 'Texto da seção. Adicione aqui detalhes sobre seu produto.'
      } as Block;
      
    case 'textImage':
      return {
        id: newId,
        type: 'textImage',
        title: 'Texto + Imagem',
        columns,
        visible: true,
        image: {
          src: 'https://via.placeholder.com/800x600',
          alt: 'Descrição da imagem'
        },
        heading: 'Título da Seção',
        content: 'Texto da seção. Adicione aqui detalhes sobre seu produto.'
      } as Block;
      
    case 'faq':
      return {
        id: newId,
        type: 'faq',
        title: 'Perguntas Frequentes',
        columns,
        visible: true,
        heading: 'Perguntas Frequentes',
        questions: [
          {
            id: uuidv4(),
            question: 'Qual é o prazo de entrega?',
            answer: 'O prazo médio de entrega é de 5 a 7 dias úteis.'
          },
          {
            id: uuidv4(),
            question: 'Como posso rastrear meu pedido?',
            answer: 'Você receberá um código de rastreamento por e-mail após o envio.'
          },
          {
            id: uuidv4(),
            question: 'Posso trocar o produto?',
            answer: 'Sim, você tem até 7 dias após o recebimento para solicitar a troca.'
          }
        ]
      } as Block;
      
    case 'cta':
      return {
        id: newId,
        type: 'cta',
        title: 'Chamada para Ação',
        columns,
        visible: true,
        heading: 'Pronto para começar?',
        content: 'Experimente nosso produto agora mesmo e descubra a diferença.',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      } as Block;
      
    default:
      return {
        id: newId,
        type: 'text',
        title: 'Texto Padrão',
        columns,
        visible: true,
        heading: 'Título Padrão',
        content: 'Conteúdo padrão.'
      } as Block;
  }
};
