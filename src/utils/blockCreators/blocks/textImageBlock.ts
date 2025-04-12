
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createTextImageBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
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
};
