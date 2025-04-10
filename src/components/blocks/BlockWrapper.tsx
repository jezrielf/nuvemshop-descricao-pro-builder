
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
  
  // Generate style classes for the block
  const styleClasses = getStyleClasses(block);
  
  // Create inline styles for the preview
  const inlineStyles: React.CSSProperties = {};
  
  if (block.style) {
    if (block.style.backgroundColor) inlineStyles.backgroundColor = block.style.backgroundColor;
    if (block.style.textColor) inlineStyles.color = block.style.textColor;
    
    // Add other styles as needed
    if (block.style.textAlign) inlineStyles.textAlign = block.style.textAlign as any;
  }
  
  console.log(`Applied style classes to block ${block.id}:`, styleClasses);
  console.log(`Applied inline styles to block ${block.id}:`, inlineStyles);
  
  return (
    <div 
      className={cn(
        "relative group mb-4 block-panel transition-all",
        isSelected && "block-selected",
        !block.visible && "opacity-50",
        styleClasses
      )}
      style={inlineStyles}
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
