
import React, { useState, useEffect } from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';

interface VideoBlockProps {
  block: VideoBlockType;
  isPreview?: boolean;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ block, isPreview = false }) => {
  const [embedUrl, setEmbedUrl] = useState<string>('');
  
  useEffect(() => {
    // Extract video ID from YouTube URL
    const getYouTubeEmbedUrl = (url: string) => {
      // Handle different formats of YouTube URLs
      const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?/]+)/;
      const match = url.match(regExp);
      
      if (match && match[1]) {
        // Form embed URL with autoplay and mute parameters
        // Note: YouTube requires 'mute=1' for autoplay to work
        const videoId = match[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=${block.autoplay ? '1' : '0'}&mute=${block.autoplay ? '1' : '0'}&rel=0`;
      }
      
      return '';
    };
    
    setEmbedUrl(getYouTubeEmbedUrl(block.videoUrl));
  }, [block.videoUrl, block.autoplay]);
  
  if (!embedUrl) {
    return (
      <BlockWrapper block={block} isEditing={!isPreview}>
        <div className="bg-gray-100 p-4 rounded text-center">
          <p>URL de vídeo inválida</p>
        </div>
      </BlockWrapper>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={!isPreview}>
      <div className="video-container">
        {block.title && (
          <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
        )}
        
        <div className="aspect-w-16 aspect-h-9 mb-3">
          <iframe
            src={embedUrl}
            title={block.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded"
          ></iframe>
        </div>
        
        {block.description && (
          <p className="text-gray-600">{block.description}</p>
        )}
      </div>
    </BlockWrapper>
  );
};

export default VideoBlock;
