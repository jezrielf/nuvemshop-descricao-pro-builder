
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, GalleryBlock } from '@/types/editor';

export const createGalleryBlock = (columns: number = 1): GalleryBlock => ({
  id: uuidv4(),
  type: 'gallery',
  title: 'Bloco de Galeria',
  columns: columns as ColumnLayout,
  visible: true,
  images: [
    { id: uuidv4(), src: 'URL da Imagem 1', alt: 'Texto Alternativo 1', caption: 'Legenda 1' },
    { id: uuidv4(), src: 'URL da Imagem 2', alt: 'Texto Alternativo 2', caption: 'Legenda 2' },
  ],
});
