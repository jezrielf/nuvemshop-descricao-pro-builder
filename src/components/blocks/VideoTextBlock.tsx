
import React from 'react';
import { VideoTextBlock } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import RichTextEditor from './editors/RichTextEditor';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useEditorStore } from '@/store/editor';

interface VideoTextBlockProps {
  block: VideoTextBlock;
  isPreview?: boolean;
  interactive?: boolean;
}

const VideoTextBlockComponent: React.FC<VideoTextBlockProps> = ({
  block,
  isPreview = false,
  interactive = true
}) => {
  const { updateBlock } = useEditorStore();

  const onContentChange = (content: string) => {
    updateBlock(block.id, {
      ...block,
      content
    });
  };

  const onHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(block.id, {
      ...block,
      heading: e.target.value
    });
  };

  const onVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateBlock(block.id, {
      ...block,
      videoUrl: e.target.value
    });
  };

  const getEmbedUrl = (url: string): string => {
    // Convert YouTube URLs to embed format
    const youtubeRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Convert Vimeo URLs to embed format
    const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/[^/]+\/videos\/|)(\d+)(?:|\/\?))/i;
    const vimeoMatch = url.match(vimeoRegex);
    
    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    // Return the original URL if no match
    return url;
  };

  // Determine aspect ratio class
  const getAspectRatioValue = (ratio: string): number => {
    switch (ratio) {
      case '16:9': return 16 / 9;
      case '4:3': return 4 / 3;
      case '1:1': return 1;
      default: return 16 / 9;
    }
  };

  // Get embed URL from the video URL
  const embedUrl = getEmbedUrl(block.videoUrl);

  return (
    <BlockWrapper block={block} isPreview={isPreview}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Video Section */}
        <div className="video-section">
          {!isPreview && interactive ? (
            <div className="space-y-4">
              <input
                type="text"
                value={block.videoUrl}
                onChange={onVideoUrlChange}
                placeholder="URL do vídeo (YouTube ou Vimeo)"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {block.videoUrl && (
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <AspectRatio ratio={getAspectRatioValue(block.aspectRatio || '16:9')}>
                    <iframe
                      src={embedUrl}
                      title="Video Player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </AspectRatio>
                </div>
              )}
            </div>
          ) : (
            block.videoUrl && (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <AspectRatio ratio={getAspectRatioValue(block.aspectRatio || '16:9')}>
                  <iframe
                    src={`${embedUrl}${block.autoplay ? '?autoplay=1' : ''}${block.muteAudio ? '&mute=1' : ''}`}
                    title="Video Player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </AspectRatio>
              </div>
            )
          )}
        </div>

        {/* Text Section */}
        <div className="text-section">
          {!isPreview && interactive ? (
            <div className="space-y-4">
              <input
                type="text"
                value={block.heading || ''}
                onChange={onHeadingChange}
                placeholder="Título da seção"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <RichTextEditor
                value={block.content}
                onChange={onContentChange}
                placeholder="Conteúdo da descrição..."
              />
            </div>
          ) : (
            <div>
              {block.heading && <h3 className="text-xl font-semibold mb-3">{block.heading}</h3>}
              <div dangerouslySetInnerHTML={{ __html: block.content }} />
            </div>
          )}
        </div>
      </div>
    </BlockWrapper>
  );
};

export default VideoTextBlockComponent;
