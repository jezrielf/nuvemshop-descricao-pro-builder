
import React from 'react';
import { useEditorStore } from '@/store/editor';
import { cn } from '@/lib/utils';
import { BlockBase } from '@/types/editor';
import BlockActions from './wrapper/BlockActions';
import StyleControls from './wrapper/StyleControls';
import BlockHeader from './wrapper/BlockHeader';
import { getStyleClasses } from './wrapper/StyleClassGenerator';

interface BlockWrapperProps {
  block: BlockBase;
  children: React.ReactNode;
  isEditing?: boolean;
}

const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children, isEditing = false }) => {
  const { selectedBlockId, selectBlock } = useEditorStore();
  
  const isSelected = selectedBlockId === block.id;
  
  const handleSelectBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(block.id);
  };
  
  // We don't apply any style classes to the editor blocks themselves
  // These will only be used in the preview
  
  return (
    <div 
      className={cn(
        "relative group mb-4 block-panel transition-all",
        isSelected && "block-selected",
        !block.visible && "opacity-50"
      )}
      onClick={handleSelectBlock}
      data-block-id={block.id}
      data-has-custom-style={!!block.style}
    >
      <BlockHeader block={block} />
      
      <div className="flex items-center space-x-1">
        <BlockActions block={block} />
        <StyleControls block={block} />
      </div>
      
      <div className="pt-8 pb-2 px-2">
        {children}
      </div>
    </div>
  );
};

export default BlockWrapper;
