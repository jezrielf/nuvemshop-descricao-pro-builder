
import React from 'react';
import { Block, BlockType } from '@/types/editor';
import HeroBlock from '../hero/HeroBlock';
import TextBlock from '../text/TextBlock';
import ImageBlock from '../image/ImageBlock';
import GalleryBlock from '../gallery/GalleryBlock';
import FeaturesBlock from '../features/FeaturesBlock';
import BenefitsBlock from '../benefits/BenefitsBlock';
import SpecificationsBlock from '../specifications/SpecificationsBlock';
import ImageTextBlock from '../imageText/ImageTextBlock';
import TextImageBlock from '../textImage/TextImageBlock';
import FAQBlock from '../faq/FAQBlock';
import CTABlock from '../cta/CTABlock';
import VideoBlock from '../video/VideoBlock';
import PlaceholderBlock from '../placeholder/PlaceholderBlock';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

export class BlockRendererFactory {
  static createBlockComponent({ block, isPreview = false }: BlockRendererProps): React.ReactNode {
    if (!block.visible && !isPreview) {
      return null;
    }
    
    try {
      switch (block.type) {
        case 'hero':
          return <HeroBlock block={block} isPreview={isPreview} />;
        case 'text':
          return <TextBlock block={block} isPreview={isPreview} />;
        case 'image':
          return <ImageBlock block={block} isPreview={isPreview} />;
        case 'gallery':
          return <GalleryBlock block={block} isPreview={isPreview} />;
        case 'features':
          return <FeaturesBlock block={block} isPreview={isPreview} />;
        case 'benefits':
          return <BenefitsBlock block={block} isPreview={isPreview} />;
        case 'specifications':
          return <SpecificationsBlock block={block} isPreview={isPreview} />;
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
          console.warn(`Unknown block type: ${block.type}`);
          return <PlaceholderBlock block={block} isPreview={isPreview} />;
      }
    } catch (error) {
      console.error(`Error rendering block of type ${block.type}:`, error);
      return <PlaceholderBlock block={block} isPreview={isPreview} />;
    }
  }
}
