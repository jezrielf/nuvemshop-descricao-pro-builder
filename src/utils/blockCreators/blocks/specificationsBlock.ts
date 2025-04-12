
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createSpecificationsBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'specifications',
    title: 'Especificações',
    columns,
    visible: true,
    heading: 'Especificações Técnicas',
    specs: [
      {
        id: uuidv4(),
        name: 'Material',
        value: 'Alumínio'
      },
      {
        id: uuidv4(),
        name: 'Dimensões',
        value: '10 x 20 x 5 cm'
      },
      {
        id: uuidv4(),
        name: 'Peso',
        value: '500g'
      }
    ]
  } as Block;
};
