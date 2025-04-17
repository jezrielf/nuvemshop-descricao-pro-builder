
import React from 'react';
import { VideoBlock as VideoBlockType } from '@/types/editor';
import BlockWrapper from '../BlockWrapper';
import VideoForm from './VideoForm';
import VideoPreview from './VideoPreview';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { videoFormSchema } from './videoSchema';
import { VideoFormValues } from './types';

interface VideoBlockProps {
  block: VideoBlockType;
  isPreview?: boolean;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ block, isPreview = false }) => {
  if (isPreview) {
    return (
      <BlockWrapper block={block} isEditing={false}>
        <VideoPreview block={block} />
      </BlockWrapper>
    );
  }

  // Initialize form with block values
  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      videoUrl: block.videoUrl,
      title: block.title,
      description: block.description || '',
      autoplay: block.autoplay ?? true,
      caption: block.caption || ''
    }
  });

  return (
    <BlockWrapper block={block} isEditing={true}>
      <VideoForm block={block} form={form} />
    </BlockWrapper>
  );
};

export default VideoBlock;
