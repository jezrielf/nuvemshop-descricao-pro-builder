
import { v4 as uuidv4 } from 'uuid';
import { VideoBlock } from '@/types/editor/blocks/video';
import { ColumnLayout } from '@/types/editor/base';

export function createVideoBlock(
  videoUrlOrColumns: string | ColumnLayout = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  headingOrVideoUrl?: string,
  description?: string,
  aspectRatio: '16:9' | '4:3' | '1:1' = '16:9'
): VideoBlock {
  // Check if first argument is a number (columns) or string (videoUrl)
  let columns: ColumnLayout = 1;
  let videoUrl: string = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  let heading: string = 'Video Title';
  
  if (typeof videoUrlOrColumns === 'number') {
    // First argument is columns
    columns = videoUrlOrColumns as ColumnLayout;
    
    // If second argument is object with options
    if (headingOrVideoUrl && typeof headingOrVideoUrl === 'object') {
      const options = headingOrVideoUrl as any;
      videoUrl = options.videoUrl || videoUrl;
      heading = options.heading || heading;
      description = options.description || description;
      aspectRatio = options.aspectRatio || aspectRatio;
    } else if (typeof headingOrVideoUrl === 'string') {
      // Second argument is videoUrl
      videoUrl = headingOrVideoUrl;
    }
  } else {
    // First argument is videoUrl
    videoUrl = videoUrlOrColumns as string;
    // Second argument is heading
    heading = headingOrVideoUrl || 'Video Title';
  }

  return {
    id: uuidv4(),
    type: 'video',
    title: heading, // Using heading as title for consistency
    columns: columns,
    visible: true,
    videoUrl,
    aspectRatio,
    heading,
    description,
    autoplay: false,
    style: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      headingColor: '#000000',
      padding: 'md',
      blockSpacing: 'md'
    }
  };
}
