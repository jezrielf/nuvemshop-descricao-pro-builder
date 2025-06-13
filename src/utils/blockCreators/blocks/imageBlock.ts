
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createImageBlock = (columns: ColumnLayout): Block => {
  const baseBlock = {
    id: uuidv4(),
    type: 'image' as const,
    title: 'Imagem',
    columns,
    visible: true,
    src: 'https://via.placeholder.com/800x600',
    alt: 'Descrição da imagem',
    caption: 'Legenda da imagem (opcional)',
    style: {}
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock) as Block;
};
