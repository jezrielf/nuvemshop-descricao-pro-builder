
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createHeroBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'hero',
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
  } as Block;
};
