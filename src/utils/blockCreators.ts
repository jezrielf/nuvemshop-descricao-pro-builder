
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
    type,
    title: info.name,
    columns,
    visible: true,
  };
  
  switch (type) {
    case 'hero':
      return {
        ...commonProps,
        heading: 'Título Principal',
        subheading: 'Subtítulo com descrição do produto',
        buttonText: 'Saiba Mais',
        buttonUrl: '#'
      };
    
    case 'text':
      return {
        ...commonProps,
        heading: 'Título do Texto',
        content: '<p>Digite seu texto aqui. Este é um bloco de texto que você pode personalizar com conteúdo sobre seu produto.</p>'
      };
    
    case 'features':
      return {
        ...commonProps,
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
        src: '',
        alt: 'Imagem do produto',
        caption: 'Legenda da imagem'
      };
    
    case 'gallery':
      return {
        ...commonProps,
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
        heading: 'Gostou do Produto?',
        content: '<p>Aproveite as condições especiais e garanta já o seu.</p>',
        buttonText: 'Comprar Agora',
        buttonUrl: '#'
      };
    
    default:
      // Ensure type safety by adding generic block
      return {
        ...commonProps,
        heading: 'Default Heading',
        content: 'Default Content',
        buttonText: 'Default Button'
      } as Block;
  }
};
