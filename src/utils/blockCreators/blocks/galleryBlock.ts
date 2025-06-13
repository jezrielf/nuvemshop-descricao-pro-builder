
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createGalleryBlock = (columns: ColumnLayout): Block => {
  const baseBlock = {
    id: uuidv4(),
    type: 'gallery' as const,
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
      }
    ],
    style: {}
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock) as Block;
};
