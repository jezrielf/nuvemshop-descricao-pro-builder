
import React from 'react';
import { VideoBlock } from '@/types/editor';
import { parseYouTubeUrl } from './utils/videoUrlParser';

interface VideoPreviewProps {
  block: VideoBlock;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ block }) => {
  const { videoUrl, title, description, autoplay = true, caption } = block;
  const { embedUrl, isValid } = parseYouTubeUrl(videoUrl, autoplay);

  if (!isValid) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-500">URL de vídeo inválida</p>
      </div>
    );
  }

  const aspectRatioClass = block.aspectRatio === '4:3' 
    ? 'aspect-[4/3]' 
    : block.aspectRatio === '1:1'
      ? 'aspect-square'
      : 'aspect-video';

  return (
    <div className="space-y-4">
      {block.heading && (
        <h2 className="text-2xl font-bold">{block.heading}</h2>
      )}
      <div className={`${aspectRatioClass} overflow-hidden rounded-md`}>
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      {caption && (
        <p className="text-sm text-gray-600 italic">{caption}</p>
      )}
      {description && (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
      )}
    </div>
  );
};

export default VideoPreview;
