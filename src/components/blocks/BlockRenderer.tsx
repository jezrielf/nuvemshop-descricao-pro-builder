
import React from 'react';
import { Block } from '@/types/editor';
import { BlockRendererFactory } from './factory/BlockRendererFactory';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isPreview = false }) => {
  return (
    <React.Fragment>
      {BlockRendererFactory.createBlockComponent({ block, isPreview })}
    </React.Fragment>
  );
};

export default BlockRenderer;
