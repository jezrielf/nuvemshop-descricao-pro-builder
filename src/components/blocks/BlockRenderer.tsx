
import React from 'react';
import { Block } from '@/types/editor';
import HeroBlock from './HeroBlock';
import TextBlock from './TextBlock';

interface BlockRendererProps {
  block: Block;
  isPreview?: boolean;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isPreview = false }) => {
  switch (block.type) {
    case 'hero':
      return <HeroBlock block={block} isPreview={isPreview} />;
    case 'text':
      return <TextBlock block={block} isPreview={isPreview} />;
    // Adicione mais cases conforme você implementa novos tipos de blocos
    default:
      return (
        <div className="p-4 border rounded-md bg-gray-100">
          <p className="text-gray-500">Bloco do tipo "{block.type}" não implementado ainda.</p>
        </div>
      );
  }
};

export default BlockRenderer;
