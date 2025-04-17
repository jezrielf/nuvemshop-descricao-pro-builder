
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock, ColumnLayout } from '@/types/editor';

export const createVideoBlock = (columns: ColumnLayout): VideoBlock => {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo',
    columns,
    visible: true,
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default video URL (example)
    autoplay: false,
    heading: 'Título do Vídeo',
    caption: 'Legenda do vídeo',
    description: 'Descrição do vídeo (opcional)',
    aspectRatio: '16:9',
    style: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      headingColor: '#000000',
      padding: 'md',
      blockSpacing: 'md'
    }
  };
};
