
import React from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor/blocks/video';

interface VideoBlockProps {
  block: VideoBlockType;
  isPreview?: boolean;
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ block, isPreview = false }) => {
  const { videoUrl, aspectRatio = '16:9', description, autoplay = false, muteAudio = true } = block;
  
  // Calculate aspect ratio class
  const aspectRatioClass = () => {
    switch (aspectRatio) {
      case '4:3':
        return 'aspect-w-4 aspect-h-3';
      case '1:1':
        return 'aspect-w-1 aspect-h-1';
      case '16:9':
      default:
        return 'aspect-w-16 aspect-h-9';
    }
  };
  
  // Extract video ID if it's a YouTube URL
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Match YouTube URL patterns
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    
    if (match && match[1]) {
      // Format parameters for embed URL
      const params = new URLSearchParams({
        autoplay: autoplay ? '1' : '0',
        mute: muteAudio ? '1' : '0',
        rel: '0',
      });
      
      return `https://www.youtube.com/embed/${match[1]}?${params.toString()}`;
    }
    
    // Return original URL if not a YouTube link
    return url;
  };
  
  if (!videoUrl) {
    return (
      <div 
        className="bg-gray-100 border border-gray-200 rounded-md p-6 text-center"
        style={{ ...block.style }}
      >
        <p className="text-gray-500">
          {isPreview ? "Vídeo (URL não definida)" : "Adicione uma URL de vídeo"}
        </p>
      </div>
    );
  }
  
  const embedUrl = getYoutubeEmbedUrl(videoUrl);
  
  return (
    <div 
      className="video-block w-full"
      style={{ ...block.style }}
    >
      <div className={`${aspectRatioClass()} w-full`}>
        <iframe
          className="rounded-md w-full h-full"
          src={embedUrl}
          title={block.title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      
      {description && (
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default VideoBlock;
