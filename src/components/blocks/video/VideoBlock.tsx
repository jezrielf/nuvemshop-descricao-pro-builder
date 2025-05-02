
import React from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor';
import { cn } from '@/lib/utils';
import BlockWrapper from '../BlockWrapper';

interface VideoBlockProps {
  block: VideoBlockType;
  isPreview?: boolean;
}

// Helper function to extract YouTube video ID
const getYoutubeVideoId = (url: string): string | null => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

// Helper function to extract Vimeo video ID
const getVimeoVideoId = (url: string): string | null => {
  const regExp = /vimeo\.com\/(?:video\/)?([0-9]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const VideoBlock: React.FC<VideoBlockProps> = ({ block, isPreview = false }) => {
  const { videoUrl, aspectRatio = '16:9', title, description, autoplay = false, muteAudio = true } = block;
  
  // Determine video source
  let embedUrl = '';
  let videoType = '';
  
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    const videoId = getYoutubeVideoId(videoUrl);
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&mute=${muteAudio ? '1' : '0'}&rel=0`;
      videoType = 'youtube';
    }
  } else if (videoUrl.includes('vimeo.com')) {
    const videoId = getVimeoVideoId(videoUrl);
    if (videoId) {
      embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? '1' : '0'}&muted=${muteAudio ? '1' : '0'}`;
      videoType = 'vimeo';
    }
  }
  
  // Set aspect ratio style
  let aspectRatioClass = 'pb-[56.25%]'; // Default 16:9
  if (aspectRatio === '4:3') {
    aspectRatioClass = 'pb-[75%]';
  } else if (aspectRatio === '1:1') {
    aspectRatioClass = 'pb-[100%]';
  }

  return (
    <BlockWrapper block={block} isEditing={!isPreview}>
      <div className="w-full">
        {title && <h3 className="text-2xl font-semibold mb-4">{title}</h3>}
        {description && <p className="mb-4 text-gray-600">{description}</p>}
        
        <div className={cn("relative w-full overflow-hidden", aspectRatioClass)}>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={title || "Embedded video"}
            ></iframe>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">URL de vídeo inválida ou não suportada</p>
            </div>
          )}
        </div>
      </div>
    </BlockWrapper>
  );
};

export { VideoBlock };
export default VideoBlock;
