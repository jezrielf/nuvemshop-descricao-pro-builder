import React from 'react';
import { Block } from '@/types/editor';
import { ensureBlockType } from '@/utils/typeConversion';

// Block Types
import HeroBlock from '../HeroBlock';
import TextBlock from '../TextBlock';
import FeaturesBlock from '../FeaturesBlock';
import BenefitsBlock from '../BenefitsBlock';
import SpecificationsBlock from '../SpecificationsBlock';
import ImageBlock from '../ImageBlock';
import GalleryBlock from '../GalleryBlock';
import ImageTextBlock from '../ImageTextBlock';
import TextImageBlock from '../TextImageBlock';
import FAQBlock from '../FAQBlock';
import CTABlock from '../CTABlock';
import VideoBlock from '../VideoBlock';
import VideoTextBlock from '../VideoTextBlock';
import TextVideoBlock from '../TextVideoBlock';
import CarouselBlock from '../CarouselBlock';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

export class BlockRendererFactory {
  static createBlockComponent({ block, isPreview = false }: BlockRendererProps): React.ReactNode {
    // Ensure the block is valid and properly typed
    try {
      // Ensure the block is properly typed before attempting to access properties
      const validBlock = ensureBlockType(block);
      
      // Now we can safely access the type property
      switch (validBlock.type) {
        case 'hero':
          return <HeroBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'text':
          return <TextBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'features':
          return <FeaturesBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'benefits':
          return <BenefitsBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'specifications':
          return <SpecificationsBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'image':
          return <ImageBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'gallery':
          return <GalleryBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'imageText':
          return <ImageTextBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'textImage':
          return <TextImageBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'faq':
          return <FAQBlock block={validBlock as any} isPreview={isPreview} />;
        
        case 'cta':
          return <CTABlock block={validBlock as any} isPreview={isPreview} />;
          
        case 'video':
          return <VideoBlock block={validBlock as any} isPreview={isPreview} />;
          
        case 'videoText':
          return <VideoTextBlock block={validBlock as any} isPreview={isPreview} />;
          
        case 'textVideo':
          return <TextVideoBlock block={validBlock as any} isPreview={isPreview} />;
          
        case 'carousel':
          return <CarouselBlock block={validBlock as any} isPreview={isPreview} />;
        
        default:
          return (
            <div className="p-4 border border-red-300 bg-red-50 rounded text-red-700">
              Bloco desconhecido: {String(validBlock.type)}
            </div>
          );
      }
    } catch (error) {
      console.error("Error rendering block:", error);
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded text-red-700">
          Erro ao renderizar bloco: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      );
    }
  }
}
