
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, TextImageBlock } from '@/types/editor';

export const createTextImageBlock = (columns: number = 1): TextImageBlock => ({
  id: uuidv4(),
  type: 'textImage',
  title: 'Bloco de Texto e Imagem',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Título do Bloco',
  content: 'Seu conteúdo aqui...',
  image: { src: 'URL da Imagem', alt: 'Texto Alternativo' },
});
