
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor';
import { ColumnLayout } from '@/types/editor/base';

export const createVideoBlock = (
  columnsOrUrl: ColumnLayout | string = 1,
  optionsOrHeading?: any | string,
  description?: string,
  aspectRatio: '16:9' | '4:3' | '1:1' = '16:9'
): VideoBlock => {
  // Default values
  let columns: ColumnLayout = 1;
  let videoUrl: string = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  let heading: string = 'Video Title';
  let videoDescription: string | undefined = 'This is a video description';
  let videoAspectRatio: '16:9' | '4:3' | '1:1' = aspectRatio;
  let autoplay: boolean = false;
  let caption: string = '';

  // Handle different call patterns
  if (typeof columnsOrUrl === 'string') {
    // Called with (url, heading, description) pattern
    videoUrl = columnsOrUrl;
    heading = optionsOrHeading as string || heading;
    videoDescription = description || videoDescription;
  } else {
    // Called with (columns, options) pattern
    columns = columnsOrUrl as ColumnLayout;
    
    if (typeof optionsOrHeading === 'object') {
      // Extract from options object
      const options = optionsOrHeading || {};
      videoUrl = options.videoUrl || videoUrl;
      heading = options.heading || heading;
      videoDescription = options.description || videoDescription;
      videoAspectRatio = options.aspectRatio || videoAspectRatio;
      autoplay = options.autoplay ?? autoplay;
      caption = options.caption || caption;
    } else if (typeof optionsOrHeading === 'string') {
      // If second arg is string, it's the heading
      heading = optionsOrHeading;
      videoDescription = description || videoDescription;
    }
  }

  return {
    id: uuidv4(),
    type: 'video',
    title: heading,
    videoUrl,
    heading,
    description: videoDescription,
    caption,
    autoplay,
    aspectRatio: videoAspectRatio,
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
