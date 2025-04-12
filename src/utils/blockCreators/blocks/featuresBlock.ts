
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createFeaturesBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'features',
    title: 'Recursos',
    columns,
    visible: true,
    heading: 'Principais Recursos',
    features: [
      {
        id: uuidv4(),
        title: 'Recurso 1',
        description: 'Descrição do recurso 1',
        icon: '✓'
      },
      {
        id: uuidv4(),
        title: 'Recurso 2',
        description: 'Descrição do recurso 2',
        icon: '✓'
      },
      {
        id: uuidv4(),
        title: 'Recurso 3',
        description: 'Descrição do recurso 3',
        icon: '✓'
      }
    ]
  } as Block;
};
