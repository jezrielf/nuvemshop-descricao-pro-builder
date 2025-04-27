
import React, { useEffect } from 'react';
import { Block } from '@/types/editor';
import { BlockRendererFactory } from './factory/BlockRendererFactory';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isPreview = false }) => {
  // Log block rendering for debugging
  useEffect(() => {
    if (!isPreview) {
      console.log(`Rendering block of type: ${block.type} with ID: ${block.id}`);
      if (block.style) {
        console.log(`Block style properties:`, block.style);
      }
    }
  }, [block, isPreview]);

  return (
    <React.Fragment>
      {BlockRendererFactory.createBlockComponent({ block, isPreview })}
    </React.Fragment>
  );
};

export default BlockRenderer;
