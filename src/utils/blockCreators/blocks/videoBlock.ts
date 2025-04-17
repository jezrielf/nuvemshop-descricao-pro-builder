
import { v4 as uuidv4 } from 'uuid';
import { Block, ColumnLayout } from '@/types/editor';

export const createVideoBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo',
    columns,
    visible: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Vídeo de demonstração',
    aspectRatio: '16:9',
    autoplay: false,
    description: 'Descrição do vídeo (opcional)',
    style: {}
  } as Block;
};
