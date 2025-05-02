
import { ColumnLayout, VideoBlock } from '@/types/editor';
import { generateUniqueId } from '../../idGenerator';

export const createVideoBlock = (columns: ColumnLayout = 'full', defaultTitle?: string): VideoBlock => {
  return {
    id: generateUniqueId(),
    type: 'video',
    title: defaultTitle || 'Vídeo do Produto',
    visible: true,
    columns: columns,
    style: {
      padding: '40px 20px',
      backgroundColor: '#ffffff'
    },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Default example URL
    aspectRatio: '16:9',
    autoplay: false,
    muteAudio: true
  };
};
