
import React from 'react';
import { BlockBase } from '@/types/editor';
import BlockHeader from './wrapper/BlockHeader';
import BlockActions from './wrapper/BlockActions';
import StyleControls from './wrapper/StyleControls';
import AIBlockControls from './AIBlockControls';

interface BlockWrapperProps {
  block: BlockBase;
  children: React.ReactNode;
}

const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children }) => {
  return (
    <div className="group relative border border-transparent hover:border-gray-200 rounded-lg transition-all">
      <BlockHeader block={block} />
      
      <div className="relative">
        {children}
        
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-md p-1 shadow-sm">
          <StyleControls block={block} />
          <BlockActions block={block} />
        </div>
      </div>
      
      {/* Add AI controls specifically for AI blocks */}
      {block.type === 'ai' && (
        <div className="p-3 border-t border-gray-100">
          <AIBlockControls blockId={block.id} currentBlock={block as any} />
        </div>
      )}
    </div>
  );
};

export default BlockWrapper;
