
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor/blocks/VideoBlock';

export function createVideoBlock(
  videoUrl: string = '',
  heading?: string,
  caption?: string,
  aspectRatio: '16:9' | '4:3' | '1:1' = '16:9'
): VideoBlock {
  return {
    id: uuidv4(),
    type: 'video',
    title: 'Vídeo',
    columns: 1,
    visible: true,
    videoUrl,
    aspectRatio,
    heading,
    caption,
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
