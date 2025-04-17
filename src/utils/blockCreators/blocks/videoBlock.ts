
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor';
import { ColumnLayout } from '@/types/editor/base';

export const createVideoBlock = (columns: ColumnLayout = 1): VideoBlock => {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Video',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    heading: 'Video Title',
    description: 'This is a video description',
    autoplay: false,
    aspectRatio: '16:9',
    columns,
    visible: true
  };
};
