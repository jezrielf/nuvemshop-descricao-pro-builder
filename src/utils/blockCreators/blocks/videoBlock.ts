
import { VideoBlock } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const createVideoBlock = (columns = 1 as 1 | 2 | 3 | 4): VideoBlock => {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo',
    columns,
    visible: true,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default video URL (example)
    autoplay: true,
    description: 'Descrição do vídeo (opcional)'
  };
};
