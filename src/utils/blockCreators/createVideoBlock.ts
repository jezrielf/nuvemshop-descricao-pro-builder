
import { v4 as uuidv4 } from 'uuid';
import { Block, BlockType, ColumnLayout } from '@/types/editor';

export const createVideoBlock = (columns: ColumnLayout): Block => {
  return {
    id: uuidv4(),
    type: 'video' as BlockType,
    title: 'Vídeo de demonstração',
    columns,
    visible: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: 'Descrição do vídeo (opcional)',
    aspectRatio: '16:9',
    autoplay: false,
    style: {}
  } as Block;
};
