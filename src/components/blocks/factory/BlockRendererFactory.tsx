
import React from 'react';
import { Block, BlockType } from '@/types/editor';
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

interface BlockRendererOptions {
  block: Block;
  isPreview?: boolean;
}

/**
 * Factory class for rendering different block types
 */
export class BlockRendererFactory {
  /**
   * Creates the appropriate block component based on block type
   */
  public static createBlockComponent({ block, isPreview = false }: BlockRendererOptions): React.ReactNode {
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
      default:
        return (
          <div className="p-4 border rounded-md bg-gray-100">
            <p className="text-gray-500">Bloco do tipo "{(block as any).type}" não implementado ainda.</p>
          </div>
        );
    }
  }

  /**
   * Validates if a block is valid before rendering
   */
  public static isValidBlock(block: any): boolean {
    return block && typeof block === 'object';
  }

  /**
   * Validates if a block has a valid type
   */
  public static hasValidType(block: any): boolean {
    return 'type' in block;
  }

  /**
   * Creates an error component for invalid blocks
   */
  public static createErrorComponent(message: string): React.ReactNode {
    return (
      <div className="p-4 border rounded-md bg-gray-100">
        <p className="text-gray-500">{message}</p>
      </div>
    );
  }
}
