
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
    // Log para debug
    console.log(`BlockRendererFactory: Renderizando bloco ${block.type} (${block.id}), visível: ${block.visible}, preview: ${isPreview}`);
    
    if (!block.visible && !isPreview) {
      console.log(`BlockRendererFactory: Bloco ${block.id} não é visível, retornando null`);
      return null;
    }
    
    try {
      switch (block.type) {
        case 'hero':
          return <HeroBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'text':
          return <TextBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'image':
          return <ImageBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'video':
          return <VideoBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'features':
          return <FeaturesBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'benefits':
          return <BenefitsBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'specifications':
          return <SpecificationsBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'imageText':
          return <ImageTextBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'textImage':
          return <TextImageBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'faq':
          return <FAQBlock key={block.id} block={block} isPreview={isPreview} />;
        case 'cta':
          return <CTABlock key={block.id} block={block} isPreview={isPreview} />;
        case 'gallery':
          return <GalleryBlock key={block.id} block={block} isPreview={isPreview} />;
        default:
          // Type assertion to handle unknown block types
          const unknownBlock = block as Block;
          console.warn(`BlockRendererFactory: Block type ${unknownBlock.type} not implemented yet`);
          return (
            <div className="p-4 border border-gray-200 rounded-md" key={unknownBlock.id}>
              <p className="text-sm text-gray-500">
                Bloco do tipo "{unknownBlock.type}" ainda não implementado.
              </p>
            </div>
          );
      }
    } catch (error) {
      // Type assertion for error handling
      const errorBlock = block as Block;
      console.error(`BlockRendererFactory: Error rendering block of type ${errorBlock.type}:`, error);
      return (
        <div className="p-4 border border-red-200 rounded-md bg-red-50" key={errorBlock.id}>
          <p className="text-sm text-red-500">
            Erro ao renderizar bloco do tipo "{errorBlock.type}".
          </p>
        </div>
      );
    }
  }
}
