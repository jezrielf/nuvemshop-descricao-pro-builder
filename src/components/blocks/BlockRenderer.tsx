import React from 'react';
import { Block } from '@/types/editor';
import HeroBlock from './HeroBlock';
import TextBlock from './TextBlock';
import FeaturesBlock from './FeaturesBlock';
import BenefitsBlock from './BenefitsBlock';
import SpecificationsBlock from './SpecificationsBlock';
import ImageBlock from './ImageBlock';
import GalleryBlock from './gallery';
import ImageTextBlock from './ImageTextBlock';
import TextImageBlock from './TextImageBlock';
import FAQBlock from './FAQBlock';
import CTABlock from './CTABlock';
import VideoBlock from './VideoBlock';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isPreview = false }) => {
  switch (block.type) {
    case 'hero':
      return <HeroBlock block={block} isPreview={isPreview} />;
    case 'text':
      return <TextBlock block={block} isPreview={isPreview} />;
    case 'features':
      return <FeaturesBlock block={block} isPreview={isPreview} />;
    case 'benefits':
      return <BenefitsBlock block={block} isPreview={isPreview} />;
    case 'specifications':
      return <SpecificationsBlock block={block} isPreview={isPreview} />;
    case 'image':
      return <ImageBlock block={block} isPreview={isPreview} />;
    case 'gallery':
      return <GalleryBlock block={block} isPreview={isPreview} />;
    case 'imageText':
      return <ImageTextBlock block={block} isPreview={isPreview} />;
     case 'textImage':
      return <TextImageBlock block={block} isPreview={isPreview} />;
    case 'faq':
      return <FAQBlock block={block} isPreview={isPreview} />;
    case 'cta':
      return <CTABlock block={block} isPreview={isPreview} />;
    case 'video':
      return <VideoBlock block={block} isPreview={isPreview} />;
    default:
      return <p>Unknown block type: {block.type}</p>;
  }
};

export default BlockRenderer;

