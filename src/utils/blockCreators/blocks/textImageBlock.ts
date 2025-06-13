
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createTextImageBlock = (columns: ColumnLayout): Block => {
  const baseBlock = {
    id: uuidv4(),
    type: 'textImage' as const,
    title: 'Texto + Imagem',
    columns,
    visible: true,
    image: {
      src: 'https://via.placeholder.com/800x600',
      alt: 'Descrição da imagem'
    },
    heading: 'Título da Seção',
    content: 'Texto da seção. Adicione aqui detalhes sobre seu produto.'
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock) as Block;
};
