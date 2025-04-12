
import { v4 as uuidv4 } from 'uuid';
import { ColumnLayout, SpecificationsBlock } from '@/types/editor';

export const createSpecificationsBlock = (columns: number = 1): SpecificationsBlock => ({
  id: uuidv4(),
  type: 'specifications',
  title: 'Bloco de Especificações',
  columns: columns as ColumnLayout,
  visible: true,
  heading: 'Especificações do Produto',
  specs: [
    { id: uuidv4(), name: 'Especificação 1', value: 'Valor 1' },
    { id: uuidv4(), name: 'Especificação 2', value: 'Valor 2' },
  ],
});
