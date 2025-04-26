
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createTextVideoBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'textVideo',
    title: 'Texto e Vídeo',
    columns,
    visible: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    aspectRatio: '16:9',
    autoplay: false,
    muteAudio: true,
    headline: 'Título da seção',
    content: '<p>Escreva aqui o conteúdo explicativo do seu produto. Descreva características, benefícios e diferenciais. Este texto aparecerá ao lado do vídeo.</p>',
    buttonText: 'Saiba mais',
    buttonUrl: '#',
    style: {}
  } as Block;
};
