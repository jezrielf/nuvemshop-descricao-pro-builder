
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createSpecificationsBlock = (columns: ColumnLayout): Block => {
  const baseBlock = {
    id: uuidv4(),
    type: 'specifications' as const,
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
    ],
    style: {}
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock) as Block;
};
