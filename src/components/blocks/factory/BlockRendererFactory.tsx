
import React from 'react';
import { Block } from '@/types/editor';

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
    // Verificar se o bloco tem uma propriedade type válida
    if (!block || typeof block !== 'object' || !('type' in block)) {
      console.error('Invalid block:', block);
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded text-red-700">
          Bloco inválido ou mal formado
        </div>
      );
    }
    
    switch (block.type) {
      case 'hero':
        return <HeroBlock block={block as any} isPreview={isPreview} />;
      
      case 'text':
        return <TextBlock block={block as any} isPreview={isPreview} />;
      
      case 'features':
        return <FeaturesBlock block={block as any} isPreview={isPreview} />;
      
      case 'benefits':
        return <BenefitsBlock block={block as any} isPreview={isPreview} />;
      
      case 'specifications':
        return <SpecificationsBlock block={block as any} isPreview={isPreview} />;
      
      case 'image':
        return <ImageBlock block={block as any} isPreview={isPreview} />;
      
      case 'gallery':
        return <GalleryBlock block={block as any} isPreview={isPreview} />;
      
      case 'imageText':
        return <ImageTextBlock block={block as any} isPreview={isPreview} />;
      
      case 'textImage':
        return <TextImageBlock block={block as any} isPreview={isPreview} />;
      
      case 'faq':
        return <FAQBlock block={block as any} isPreview={isPreview} />;
      
      case 'cta':
        return <CTABlock block={block as any} isPreview={isPreview} />;
        
      case 'video':
        return <VideoBlock block={block as any} isPreview={isPreview} />;
        
      case 'videoText':
        return <VideoTextBlock block={block as any} isPreview={isPreview} />;
        
      case 'textVideo':
        return <TextVideoBlock block={block as any} isPreview={isPreview} />;
        
      case 'carousel':
        return <CarouselBlock block={block as any} isPreview={isPreview} />;
      
      default:
        return (
          <div className="p-4 border border-red-300 bg-red-50 rounded text-red-700">
            Bloco desconhecido: {String(block.type)}
          </div>
        );
    }
  }
}
