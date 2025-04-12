
import React from 'react';
import { AIBlock as AIBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';

interface AIBlockProps {
  block: AIBlockType;
  isPreview?: boolean;
}

const AIBlock: React.FC<AIBlockProps> = ({ block, isPreview = false }) => {
  // Apply different styles based on layout selected
  const getLayoutClasses = () => {
    switch (block.layout) {
      case 'modern':
        return 'bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl shadow-sm';
      case 'creative':
        return 'bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl shadow-md';
      case 'corporate':
        return 'bg-gradient-to-b from-blue-50 to-slate-50 rounded-lg border border-gray-200';
      default:
        return 'bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg';
    }
  };

  // Apply different text styles based on color scheme
  const getColorScheme = () => {
    switch (block.colorScheme) {
      case 'vibrant':
        return {
          heading: 'text-violet-700',
          subheading: 'text-purple-600',
          text: 'text-gray-800'
        };
      case 'pastel':
        return {
          heading: 'text-pink-700',
          subheading: 'text-pink-600',
          text: 'text-gray-700'
        };
      case 'monochrome':
        return {
          heading: 'text-gray-800',
          subheading: 'text-gray-700',
          text: 'text-gray-600'
        };
      default:
        return {
          heading: 'text-purple-800',
          subheading: 'text-indigo-600',
          text: 'text-gray-700'
        };
    }
  };

  const layoutClasses = getLayoutClasses();
  const colorScheme = getColorScheme();

  // Render the content in the preview mode
  const renderContent = () => (
    <div className={`p-6 ${layoutClasses}`}>
      {block.heading && (
        <h2 className={`text-2xl font-bold mb-3 ${colorScheme.heading}`}>
          {block.heading}
        </h2>
      )}
      
      {block.subheading && (
        <h3 className={`text-lg font-medium mb-4 opacity-80 ${colorScheme.subheading}`}>
          {block.subheading}
        </h3>
      )}
      
      {block.imageUrl && (
        <div className="my-5">
          <img 
            src={block.imageUrl} 
            alt={block.heading || 'Imagem gerada por IA'} 
            className="w-full h-auto rounded-md shadow-md" 
          />
        </div>
      )}
      
      <div 
        className={`prose max-w-none ${colorScheme.text}`}
        dangerouslySetInnerHTML={{ __html: block.content || '' }}
      />
      
      <div className="mt-4 text-sm text-right">
        <em>Conteúdo gerado por IA</em>
      </div>
    </div>
  );

  // Use the BlockWrapper for editor mode, or render content directly in preview mode
  return isPreview ? (
    renderContent()
  ) : (
    <BlockWrapper block={block}>
      {renderContent()}
    </BlockWrapper>
  );
};

export default AIBlock;
