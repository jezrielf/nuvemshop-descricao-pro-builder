
import React, { useState } from 'react';
import { useEditorStore } from '@/store/editor';
import { cn } from '@/lib/utils';
import { BlockBase } from '@/types/editor';
import BlockActions from './wrapper/BlockActions';
import StyleControls from './wrapper/StyleControls';
import BlockHeader from './wrapper/BlockHeader';
import { getStyleClasses } from './wrapper/StyleClassGenerator';
import BlockMinimizeButton from './wrapper/BlockMinimizeButton';

interface BlockWrapperProps {
  block: BlockBase;
  children: React.ReactNode;
  isEditing?: boolean;
}

const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children, isEditing = false }) => {
  const { selectedBlockId, selectBlock } = useEditorStore();
  const [isMinimized, setIsMinimized] = useState(false);
  
  const isSelected = selectedBlockId === block.id;
  
  const handleSelectBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(block.id);
  };
  
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(prev => !prev);
  };
  
  // We don't apply any style classes to the editor blocks themselves
  // These will only be used in the preview
  
  return (
    <div 
      className={cn(
        "relative group mb-4 block-panel transition-all",
        isSelected && "block-selected",
        !block.visible && "opacity-50",
        isMinimized && "h-14 overflow-hidden"
      )}
      onClick={handleSelectBlock}
      data-block-id={block.id}
      data-has-custom-style={!!block.style}
      data-minimized={isMinimized}
    >
      <div className="flex items-center justify-between p-2">
        <BlockHeader block={block} />
        <BlockMinimizeButton isMinimized={isMinimized} onToggle={toggleMinimize} />
      </div>
      
      <div className={cn("flex items-center space-x-1", isMinimized && "hidden")}>
        <BlockActions block={block} />
        <StyleControls block={block} />
      </div>
      
      <div className={cn("pt-8 pb-2 px-2", isMinimized && "hidden")}>
        {children}
      </div>
    </div>
  );
};

export default BlockWrapper;
