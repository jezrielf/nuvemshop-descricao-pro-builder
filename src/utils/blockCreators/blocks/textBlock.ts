
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout, TextBlock } from '@/types/editor';

export const createTextBlock = (columns: ColumnLayout, title?: string): Block => {
  return {
    id: uuidv4(),
    type: 'text',
    title: title || 'Bloco de Texto',
    columns,
    visible: true,
    heading: title || 'Título do Texto',
    content: '<p>Insira o conteúdo aqui. Você pode adicionar informações detalhadas sobre seu produto ou serviço.</p>',
    style: {} // Adding style property to ensure block has all required properties
  } as TextBlock;
};
