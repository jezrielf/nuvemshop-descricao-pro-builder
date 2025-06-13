
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createFeaturesBlock = (columns: ColumnLayout): Block => {
  const baseBlock = {
    id: uuidv4(),
    type: 'features' as const,
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
    ],
    style: {}
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock) as Block;
};
