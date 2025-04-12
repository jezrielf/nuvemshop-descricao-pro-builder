
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, ImageBlock } from '@/types/editor';

export const createImageBlock = (columns: number = 1): ImageBlock => ({
  id: uuidv4(),
  type: 'image',
  title: 'Bloco de Imagem',
  columns: columns as ColumnLayout,
  visible: true,
  src: 'URL da Imagem',
  alt: 'Texto Alternativo',
  caption: 'Legenda da Imagem',
});
