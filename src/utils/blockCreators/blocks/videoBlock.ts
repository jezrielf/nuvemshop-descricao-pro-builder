
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor';
import { ColumnLayout } from '@/types/editor/base';

export const createVideoBlock = (columns: ColumnLayout = 1, options?: any): VideoBlock => {
  const defaultVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const defaultHeading = 'Video Title';
  const defaultDescription = 'This is a video description';
  const defaultAspectRatio = '16:9';

  // Extract options if they exist
  const videoUrl = options?.videoUrl || defaultVideoUrl;
  const heading = options?.heading || defaultHeading;
  const description = options?.description || defaultDescription;
  const aspectRatio = options?.aspectRatio || defaultAspectRatio;
  const autoplay = options?.autoplay ?? false;
  const caption = options?.caption || '';

  return {
    id: uuidv4(),
    type: 'video',
    title: heading,
    videoUrl,
    heading,
    description,
    caption,
    autoplay,
    aspectRatio,
    columns,
    visible: true,
    style: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      headingColor: '#000000',
      padding: 'md',
      blockSpacing: 'md'
    }
  };
};
