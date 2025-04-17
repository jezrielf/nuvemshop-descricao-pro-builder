
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor/blocks/video';
import { ColumnLayout } from '@/types/editor/base';

export function createVideoBlock(
  videoUrl: string = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  heading: string = 'Video Title',
  description?: string,
  aspectRatio: '16:9' | '4:3' | '1:1' = '16:9'
): VideoBlock {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo',
    columns: 1 as ColumnLayout,
    visible: true,
    videoUrl,
    aspectRatio,
    heading,
    description,
    autoplay: true,
    style: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      headingColor: '#000000',
      padding: 'md',
      blockSpacing: 'md'
    }
  };
}
