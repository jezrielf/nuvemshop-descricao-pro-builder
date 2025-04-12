
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createGalleryBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
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
};
