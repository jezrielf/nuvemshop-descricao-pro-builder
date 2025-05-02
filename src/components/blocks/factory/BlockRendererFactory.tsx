
import React from 'react';
import { Block, BlockType } from '@/types/editor';
import HeroBlock from '@/components/blocks/HeroBlock';
import TextBlock from '@/components/blocks/TextBlock';
import ImageBlock from '@/components/blocks/ImageBlock';
import { VideoBlock } from '@/components/blocks/video/VideoBlock';
import FeaturesBlock from '@/components/blocks/FeaturesBlock';
import BenefitsBlock from '@/components/blocks/BenefitsBlock';
import SpecificationsBlock from '@/components/blocks/SpecificationsBlock';
import ImageTextBlock from '@/components/blocks/ImageTextBlock';
import TextImageBlock from '@/components/blocks/TextImageBlock';
import FAQBlock from '@/components/blocks/FAQBlock';
import CTABlock from '@/components/blocks/CTABlock';
import GalleryBlock from '@/components/blocks/GalleryBlock';

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
        case 'video':
          return <VideoBlock block={block} isPreview={isPreview} />;
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
        case 'gallery':
          return <GalleryBlock block={block} isPreview={isPreview} />;
        default:
          console.warn(`Block type ${block.type} not implemented yet`);
          return (
            <div className="p-4 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-500">
                Bloco do tipo "{block.type}" ainda não implementado.
              </p>
            </div>
          );
      }
    } catch (error) {
      console.error(`Error rendering block of type ${block.type}:`, error);
      return (
        <div className="p-4 border border-red-200 rounded-md bg-red-50">
          <p className="text-sm text-red-500">
            Erro ao renderizar bloco do tipo "{block.type}".
          </p>
        </div>
      );
    }
  }
}
