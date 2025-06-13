
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';
import { deepClone } from '@/utils/deepClone';

export const createHeroBlock = (columns: ColumnLayout): Block => {
  const baseBlock = {
    id: uuidv4(),
    type: 'hero' as const,
    title: 'Banner Principal',
    columns,
    visible: true,
    heading: 'Título do Banner',
    subheading: 'Subtítulo ou chamada secundária para o seu produto',
    buttonText: 'Saiba Mais',
    buttonUrl: '#',
    image: {
      src: 'https://via.placeholder.com/800x600',
      alt: 'Imagem do banner'
    },
    style: {}
  };
  
  // Return a deep copy to ensure no reference sharing
  return deepClone(baseBlock) as Block;
};
