
import React from 'react';
import { VideoTextBlock } from '@/types/editor/blocks';
import BlockWrapper from './wrapper/BlockWrapper';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import RichTextEditor from './editors/RichTextEditor';
import { useEditorStore } from '@/store/editor';

interface VideoTextBlockProps {
  block: VideoTextBlock;
  isPreview?: boolean;
}

const VideoTextBlockComponent: React.FC<VideoTextBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock } = useEditorStore();

  const handleContentChange = (content: string) => {
    if (isPreview) return;
    
    updateBlock(block.id, { content });
  };

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPreview) return;
    
    updateBlock(block.id, { heading: e.target.value });
  };

  const getAspectRatioValue = () => {
    switch (block.aspectRatio) {
      case '16:9':
        return 16 / 9;
      case '4:3':
        return 4 / 3;
      case '1:1':
        return 1;
      default:
        return 16 / 9;
    }
  };

  const getEmbedUrl = (url: string) => {
    // YouTube URL handling
    if (url.includes('youtube.com/watch')) {
      const videoId = new URL(url).searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}${block.autoplay ? '?autoplay=1&mute=1' : ''}`;
      }
    }
    
    // Already an embed URL
    if (url.includes('youtube.com/embed')) {
      return url + (block.autoplay ? '?autoplay=1&mute=1' : '');
    }
    
    // YouTube short URL
    if (url.includes('youtu.be/')) {
      const videoId = url.split('/').pop();
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}${block.autoplay ? '?autoplay=1&mute=1' : ''}`;
      }
    }

    // Vimeo URL handling
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}${block.autoplay ? '?autoplay=1&muted=1' : ''}`;
      }
    }
    
    return url;
  };

  return (
    <BlockWrapper block={block} isPreview={isPreview}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="video-section">
          <AspectRatio ratio={getAspectRatioValue()}>
            <iframe
              src={getEmbedUrl(block.videoUrl)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-md"
              loading="lazy"
            />
          </AspectRatio>
        </div>

        <div className="text-section">
          {isPreview ? (
            <>
              <h3 className="text-xl font-bold mb-3" style={{ color: block.style?.headingColor || 'inherit' }}>
                {block.heading}
              </h3>
              <div dangerouslySetInnerHTML={{ __html: block.content }} />
            </>
          ) : (
            <>
              <input
                type="text"
                value={block.heading || ''}
                onChange={handleHeadingChange}
                placeholder="Título da seção"
                className="text-xl font-bold mb-3 w-full border-b border-gray-300 focus:outline-none focus:border-blue-500"
                style={{ color: block.style?.headingColor || 'inherit' }}
              />
              <RichTextEditor
                value={block.content}
                onChange={handleContentChange}
                placeholder="Adicione o conteúdo aqui..."
              />
            </>
          )}
        </div>
      </div>
    </BlockWrapper>
  );
};

export default VideoTextBlockComponent;
