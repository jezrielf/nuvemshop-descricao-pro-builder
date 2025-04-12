
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, ImageTextBlock } from '@/types/editor';

export const createImageTextBlock = (columns: number = 1): ImageTextBlock => ({
  id: uuidv4(),
  type: 'imageText',
  title: 'Bloco de Imagem e Texto',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Título do Bloco',
  content: 'Seu conteúdo aqui...',
  image: { src: 'URL da Imagem', alt: 'Texto Alternativo' },
});
