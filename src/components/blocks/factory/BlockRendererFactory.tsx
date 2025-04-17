
import React from 'react';
import { Block, BlockType } from '@/types/editor';
import HeroBlock from '../HeroBlock';
import TextBlock from '../TextBlock';
import FeaturesBlock from '../FeaturesBlock';
import BenefitsBlock from '../BenefitsBlock';
import SpecificationsBlock from '../SpecificationsBlock';
import ImageBlock from '../ImageBlock';
import GalleryBlock from '../gallery';
import ImageTextBlock from '../ImageTextBlock';
import TextImageBlock from '../TextImageBlock';
import FAQBlock from '../FAQBlock';
import CTABlock from '../CTABlock';
import VideoBlock from '../VideoBlock';
import { validateBaseBlock, validateBlockByType } from '@/utils/blockCreators/validation';

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
    if (!this.isValidBlock(block)) {
      console.error('Invalid block detected:', block);
      return this.createErrorComponent('Bloco inválido - Estrutura base incorreta');
    }

    if (!this.hasValidType(block)) {
      console.error('Block without valid type:', block);
      return this.createErrorComponent('Bloco sem tipo definido');
    }

    if (!this.hasRequiredProperties(block)) {
      console.error(`Block missing required properties for type ${block.type}:`, block);
      return this.createErrorComponent(`Bloco do tipo "${block.type}" está faltando propriedades obrigatórias`);
    }

    try {
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
          return (
            <div className="p-4 border rounded-md bg-gray-100">
              <p className="text-gray-500">Bloco do tipo "{(block as any).type}" não implementado ainda.</p>
            </div>
          );
      }
    } catch (error) {
      console.error(`Error rendering block of type ${block.type}:`, error);
      return this.createErrorComponent(`Erro ao renderizar bloco do tipo "${block.type}"`);
    }
  }

  /**
   * Validates if a block is valid before rendering
   */
  public static isValidBlock(block: any): boolean {
    return validateBaseBlock(block);
  }

  /**
   * Validates if a block has a valid type
   */
  public static hasValidType(block: any): boolean {
    return 'type' in block && typeof block.type === 'string';
  }

  /**
   * Validates if a block has all the required properties for its type
   */
  public static hasRequiredProperties(block: any): boolean {
    return validateBlockByType(block);
  }

  /**
   * Creates an error component for invalid blocks
   */
  public static createErrorComponent(message: string): React.ReactNode {
    return (
      <div className="p-4 border rounded-md bg-red-50 text-red-600">
        <p className="text-sm font-medium">{message}</p>
        <p className="text-xs mt-1">Tente excluir e adicionar este bloco novamente</p>
      </div>
    );
  }
}
