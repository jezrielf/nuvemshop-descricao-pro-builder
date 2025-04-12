
import { BlockType, ColumnLayout, Block } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { blockTypeInfo } from './blockTypeInfo';

export const createBlock = (type: BlockType, columns: ColumnLayout): Block | null => {
  // Make sure type is a valid BlockType before proceeding
  if (!Object.keys(blockTypeInfo).includes(type)) {
    console.error(`Invalid block type: ${type}`);
    return null;
  }
  
  // Now that we've validated the type, TypeScript knows it's a valid key
  const info = blockTypeInfo[type];
  const commonProps = {
    id: uuidv4(),
    title: info.name,
    columns,
    visible: true,
  };
  
  switch (type) {
    case 'hero':
      return {
        ...commonProps,
        type: 'hero' as const,
        heading: 'Título Principal',
        subheading: 'Subtítulo com descrição do produto',
        buttonText: 'Saiba Mais',
        buttonUrl: '#'
      };
    
    case 'text':
      return {
        ...commonProps,
        type: 'text' as const,
        heading: 'Título do Texto',
        content: '<p>Digite seu texto aqui. Este é um bloco de texto que você pode personalizar com conteúdo sobre seu produto.</p>'
      };
    
    case 'features':
      return {
        ...commonProps,
        type: 'features' as const,
        heading: 'Recursos do Produto',
        features: [
          {
            id: uuidv4(),
            title: 'Recurso 1',
            description: 'Descrição do recurso 1',
            icon: 'zap'
          },
          {
            id: uuidv4(),
            title: 'Recurso 2',
            description: 'Descrição do recurso 2',
            icon: 'shield'
          }
        ]
      };
    
    case 'benefits':
      return {
        ...commonProps,
        type: 'benefits' as const,
        heading: 'Benefícios',
        benefits: [
          {
            id: uuidv4(),
            title: 'Benefício 1',
            description: 'Descrição do benefício 1',
            icon: 'check'
          },
          {
            id: uuidv4(),
            title: 'Benefício 2',
            description: 'Descrição do benefício 2',
            icon: 'heart'
          }
        ]
      };
    
    case 'specifications':
      return {
        ...commonProps,
        type: 'specifications' as const,
        heading: 'Especificações Técnicas',
        specs: [
          {
            id: uuidv4(),
            name: 'Material',
            value: 'Valor do material'
          },
          {
            id: uuidv4(),
            name: 'Dimensões',
            value: 'Valor das dimensões'
          }
        ]
      };
    
    case 'image':
      return {
        ...commonProps,
        type: 'image' as const,
        src: '',
        alt: 'Imagem do produto',
        caption: 'Legenda da imagem'
      };
    
    case 'gallery':
      return {
        ...commonProps,
        type: 'gallery' as const,
        images: [
          {
            id: uuidv4(),
            src: '',
            alt: 'Imagem 1',
            caption: 'Legenda da imagem 1'
          },
          {
            id: uuidv4(),
            src: '',
            alt: 'Imagem 2',
            caption: 'Legenda da imagem 2'
          }
        ]
      };
    
    case 'imageText':
      return {
        ...commonProps,
        type: 'imageText' as const,
        image: {
          src: '',
          alt: 'Imagem do produto'
        },
        heading: 'Título da Seção',
        content: '<p>Texto com descrição detalhada do produto ou características.</p>'
      };
    
    case 'textImage':
      return {
        ...commonProps,
        type: 'textImage' as const,
        image: {
          src: '',
          alt: 'Imagem do produto'
        },
        heading: 'Título da Seção',
        content: '<p>Texto com descrição detalhada do produto ou características.</p>'
      };
    
    case 'faq':
      return {
        ...commonProps,
        type: 'faq' as const,
        heading: 'Perguntas Frequentes',
        questions: [
          {
            id: uuidv4(),
            question: 'Pergunta 1?',
            answer: 'Resposta para a pergunta 1.'
          },
          {
            id: uuidv4(),
            question: 'Pergunta 2?',
            answer: 'Resposta para a pergunta 2.'
          }
        ]
      };
    
    case 'cta':
      return {
        ...commonProps,
        type: 'cta' as const,
        heading: 'Gostou do Produto?',
        content: '<p>Aproveite as condições especiais e garanta já o seu.</p>',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      };
    
    case 'ai':
      return {
        ...commonProps,
        type: 'ai' as const,
        content: ''
      };
    
    default:
      // Este caso nunca deveria acontecer se a validação acima funcionar
      console.error(`Unhandled block type: ${type}`);
      return null;
  }
};
