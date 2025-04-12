
import React from 'react';
import { Block } from '@/types/editor';
import { BlockRendererFactory } from './factory/BlockRendererFactory';
import { getStylesFromBlock } from '@/utils/styleConverter';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isPreview = false }) => {
  try {
    // Validate the block before rendering
    if (!BlockRendererFactory.isValidBlock(block)) {
      return BlockRendererFactory.createErrorComponent('Bloco inválido');
    }

    // Ensure the block has a type property
    if (!BlockRendererFactory.hasValidType(block)) {
      return BlockRendererFactory.createErrorComponent('Bloco sem tipo definido');
    }

    // Ensure the block has required properties for its type
    if (!BlockRendererFactory.hasRequiredProperties(block)) {
      return BlockRendererFactory.createErrorComponent(`Bloco do tipo "${block.type}" está faltando propriedades obrigatórias`);
    }

    // Create a style object based on block.style for the preview
    const previewStyles: React.CSSProperties = {};
    if (isPreview && block.style) {
      // When in preview mode, convert all block styles to inline styles
      const styleString = getStylesFromBlock(block);
      
      // Parse the style string into a CSSProperties object
      if (styleString) {
        const styleEntries = styleString.split(';').filter(Boolean).map(style => {
          const [property, value] = style.split(':').map(s => s.trim());
          return [property, value];
        });
        
        styleEntries.forEach(([prop, value]) => {
          if (prop && value) {
            // Convert kebab-case to camelCase for React inline styles
            const camelProp = prop.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
            (previewStyles as any)[camelProp] = value;
          }
        });
      }
    }

    // If it's in preview mode, apply the styles directly to the wrapper
    if (isPreview) {
      // Determine the block spacing class
      const blockSpacingClass = block.style?.blockSpacing === 'none' ? 'mb-0' : '';
      
      return (
        <div 
          style={previewStyles} 
          className={`block-preview-container ${blockSpacingClass}`}
          data-block-type={block.type}
        >
          {BlockRendererFactory.createBlockComponent({ block, isPreview })}
        </div>
      );
    }

    return BlockRendererFactory.createBlockComponent({ block, isPreview });
  } catch (error) {
    console.error('Error rendering block:', error);
    return BlockRendererFactory.createErrorComponent(`Erro ao renderizar bloco: ${(error as Error).message}`);
  }
};

export default BlockRenderer;

