
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createCarouselBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'carousel',
    title: 'Carrossel de Imagens',
    columns,
    visible: true,
    images: [
      {
        id: uuidv4(),
        src: 'https://via.placeholder.com/800x400',
        alt: 'Imagem 1',
        caption: 'Legenda da imagem 1'
      },
      {
        id: uuidv4(),
        src: 'https://via.placeholder.com/800x400',
        alt: 'Imagem 2',
        caption: 'Legenda da imagem 2'
      },
      {
        id: uuidv4(),
        src: 'https://via.placeholder.com/800x400',
        alt: 'Imagem 3',
        caption: 'Legenda da imagem 3'
      }
    ],
    autoplay: true,
    autoplaySpeed: 3000,
    showArrows: true,
    showDots: true,
    infinite: true,
    style: {}
  } as Block;
};
