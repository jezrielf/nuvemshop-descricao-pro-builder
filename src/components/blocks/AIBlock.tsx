
import React from 'react';
import { AIBlock as AIBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import AIDescriptionGenerator from '../AIGenerator/AIDescriptionGenerator';

interface AIBlockProps {
  block: AIBlockType;
  isPreview?: boolean;
}

const AIBlock: React.FC<AIBlockProps> = ({ block, isPreview = false }) => {
  if (isPreview) {
    return (
      <div className="p-4 border border-dashed border-purple-200 rounded bg-purple-50 text-center">
        <p className="text-purple-700">Bloco Gerador de IA - Disponível na Edição</p>
      </div>
    );
  }

  return (
    <BlockWrapper block={block}>
      <AIDescriptionGenerator />
    </BlockWrapper>
  );
};

export default AIBlock;
