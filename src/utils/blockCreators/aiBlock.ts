
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, AIBlock } from '@/types/editor';

export const createAIBlock = (columns: number = 1): AIBlock => {
  return {
    id: uuidv4(),
    type: 'ai',
    title: 'Conteúdo Gerado por IA',
    columns: columns as ColumnLayout,
    visible: true,
    content: '',
    heading: 'Conteúdo Gerado por IA',
    subheading: 'Este conteúdo foi gerado automaticamente usando inteligência artificial',
    layout: 'modern',
    colorScheme: 'default'
  };
};
