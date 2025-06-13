
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout, TextBlock } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createTextBlock = (columns: ColumnLayout, title?: string): TextBlock => {
  const baseBlock = {
    id: uuidv4(),
    type: 'text' as const,
    title: title || 'Bloco de Texto',
    columns,
    visible: true,
    heading: title || 'Título do Texto',
    content: '<p>Insira o conteúdo aqui. Você pode adicionar informações detalhadas sobre seu produto ou serviço.</p>',
    style: {} // Style is now consistently initialized as an empty object
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock);
};
