
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createImageBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'image',
    title: 'Imagem',
    columns,
    visible: true,
    src: 'https://via.placeholder.com/800x600',
    alt: 'Descrição da imagem',
    caption: 'Legenda da imagem (opcional)',
    style: {}
  } as Block;
};
