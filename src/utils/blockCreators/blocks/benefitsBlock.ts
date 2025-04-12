
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createBenefitsBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'benefits',
    title: 'Benefícios',
    columns,
    visible: true,
    heading: 'Benefícios',
    benefits: [
      {
        id: uuidv4(),
        title: 'Benefício 1',
        description: 'Descrição do benefício 1',
        icon: '✓'
      },
      {
        id: uuidv4(),
        title: 'Benefício 2',
        description: 'Descrição do benefício 2',
        icon: '✓'
      }
    ]
  } as Block;
};
