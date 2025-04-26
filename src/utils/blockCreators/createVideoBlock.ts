
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createVideoBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo',
    columns,
    visible: true,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    aspectRatio: '16:9',
    autoplay: false,
    muteAudio: true,
    heading: 'Assista ao nosso vídeo',
    style: {}
  } as Block;
};
