
import React from 'react';
import { Block } from '@/types/editor';
import HeroBlock from './HeroBlock';
import TextBlock from './TextBlock';
import FeaturesBlock from './FeaturesBlock';
import BenefitsBlock from './BenefitsBlock';
import SpecificationsBlock from './SpecificationsBlock';
import ImageBlock from './ImageBlock';
import GalleryBlock from './GalleryBlock';
import ImageTextBlock from './ImageTextBlock';
import TextImageBlock from './TextImageBlock';
import FAQBlock from './FAQBlock';
import CTABlock from './CTABlock';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isPreview = false }) => {
  // Safely check if block is valid before accessing its properties
  if (!block || typeof block !== 'object') {
    return (
      <div className="p-4 border rounded-md bg-gray-100">
        <p className="text-gray-500">Bloco inválido</p>
      </div>
    );
  }

  // Ensure the block has a type property before we try to use it
  if (!('type' in block)) {
    return (
      <div className="p-4 border rounded-md bg-gray-100">
        <p className="text-gray-500">Bloco sem tipo definido</p>
      </div>
    );
  }

  // Create a style object based on block.style for the preview
  const previewStyles: React.CSSProperties = {};
  if (isPreview && block.style) {
    if (block.style.backgroundColor) previewStyles.backgroundColor = block.style.backgroundColor;
    if (block.style.textColor) previewStyles.color = block.style.textColor;
    if (block.style.textAlign) previewStyles.textAlign = block.style.textAlign as any;
    
    // Add more style properties as needed
  }

  const renderBlock = () => {
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
  };

  // If it's in preview mode, apply the styles directly to the wrapper
  if (isPreview) {
    return (
      <div style={previewStyles} className="block-preview-container">
        {renderBlock()}
      </div>
    );
  }

  return renderBlock();
};

export default BlockRenderer;
