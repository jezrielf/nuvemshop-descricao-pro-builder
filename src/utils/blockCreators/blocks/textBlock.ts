import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout, TextBlock } from '@/types/editor/index';

export const createTextBlock = (columns: ColumnLayout, title?: string): TextBlock => {
  return {
    id: uuidv4(),
    type: 'text',
    title: title || 'Bloco de Texto',
    columns,
    visible: true,
    heading: title || 'Título do Texto',
    content: '<p>Insira o conteúdo aqui. Você pode adicionar informações detalhadas sobre seu produto ou serviço.</p>',
    style: {}
  };
};
