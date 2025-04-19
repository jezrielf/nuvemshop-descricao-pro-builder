
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createTextBlock = (columns: ColumnLayout, title?: string): Block => {
  return {
    id: uuidv4(),
    type: 'text',
    title: 'Bloco de Texto',
    columns,
    visible: true,
    heading: title || 'Título do Texto',
    content: 'Insira o conteúdo aqui. Você pode adicionar informações detalhadas sobre seu produto ou serviço.',
  } as Block;
};
