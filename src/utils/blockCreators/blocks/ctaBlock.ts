
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createCTABlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'cta',
    title: 'Chamada para Ação',
    columns,
    visible: true,
    heading: 'Pronto para começar?',
    content: 'Experimente nosso produto agora mesmo e descubra a diferença.',
    buttonText: 'Comprar Agora',
    buttonUrl: '#'
  } as Block;
};
