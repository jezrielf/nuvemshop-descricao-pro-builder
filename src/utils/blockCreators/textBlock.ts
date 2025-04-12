
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, TextBlock } from '@/types/editor';

export const createTextBlock = (columns: number = 1): TextBlock => ({
  id: uuidv4(),
  type: 'text',
  title: 'Bloco de Texto',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Título do Bloco',
  content: 'Adicione seu texto aqui...',
});
