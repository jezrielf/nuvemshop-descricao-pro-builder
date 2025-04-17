
import React, { useState, useEffect } from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor';
import { parseYouTubeUrl } from './utils/videoUrlParser';

interface VideoPreviewProps {
  block: VideoBlockType;
  editorPreview?: boolean;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ block, editorPreview = false }) => {
  const [embedInfo, setEmbedInfo] = useState({ embedUrl: '', isValid: false });
  
  useEffect(() => {
    const result = parseYouTubeUrl(block.videoUrl, block.autoplay);
    setEmbedInfo(result);
  }, [block.videoUrl, block.autoplay]);

  if (!embedInfo.isValid) {
    return (
      <div className={`bg-gray-100 p-4 rounded text-center ${editorPreview ? 'mt-4 border rounded-md' : ''}`}>
        {block.videoUrl ? (
          <p className="text-red-600 text-sm">URL de vídeo inválida. Por favor, use uma URL válida do YouTube.</p>
        ) : (
          <p>URL de vídeo inválida</p>
        )}
      </div>
    );
  }
  
  const videoPlayerClasses = editorPreview 
    ? "mt-4 border rounded-md p-4" 
    : "video-container";
  
  const previewTitle = editorPreview ? (
    <h4 className="text-sm font-medium mb-2">Pré-visualização</h4>
  ) : block.title ? (
    <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
  ) : null;

  return (
    <div className={videoPlayerClasses}>
      {previewTitle}
      
      <div className="aspect-w-16 aspect-h-9 mb-3">
        <iframe
          src={embedInfo.embedUrl}
          title={editorPreview ? "Pré-visualização do vídeo" : block.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded"
        ></iframe>
      </div>
      
      {!editorPreview && block.description && (
        <p className="text-gray-600">{block.description}</p>
      )}
    </div>
  );
};

export default VideoPreview;
