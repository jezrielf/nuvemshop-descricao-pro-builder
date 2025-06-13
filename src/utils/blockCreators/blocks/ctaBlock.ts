
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createCTABlock = (columns: ColumnLayout): Block => {
  const baseBlock = {
    id: uuidv4(),
    type: 'cta' as const,
    title: 'Chamada para Ação',
    columns,
    visible: true,
    heading: 'Pronto para começar?',
    content: 'Experimente nosso produto agora mesmo e descubra a diferença.',
    buttonText: 'Comprar Agora',
    buttonUrl: '#'
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock) as Block;
};
