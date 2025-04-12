
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createImageTextBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
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
};
