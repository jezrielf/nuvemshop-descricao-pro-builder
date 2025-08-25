
import React from 'react';
import { useEditorStore } from '@/store/editor';
import { cn } from '@/lib/utils';
import { BlockBase } from '@/types/editor';
import BlockActions from './wrapper/BlockActions';
import StyleControls from './wrapper/StyleControls';
import BlockHeader from './wrapper/BlockHeader';
import { getStyleClasses } from './wrapper/StyleClassGenerator';
import BlockMinimizeButton from './wrapper/BlockMinimizeButton';
import { useBlockMinimization } from './hooks/useBlockMinimization';

interface BlockWrapperProps {
  block: BlockBase;
  children: React.ReactNode;
  isEditing?: boolean;
}

const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children, isEditing = false }) => {
  const { selectedBlockId, selectBlock } = useEditorStore();
  const { isMinimized, toggleMinimize } = useBlockMinimization(block.id);
  
  // Relaxed validation - ensure block has minimal required properties
  const isValid = block && 
                  block.id && 
                  block.type && 
                  typeof block.visible === 'boolean' && 
                  block.columns !== undefined;
  
  // Use local style reference without mutating the original block
  const blockStyle = block.style || {};
  
  const isSelected = selectedBlockId === block.id;
  
  const handleSelectBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(block.id);
    // Auto-expand when selected for editing
    if (isMinimized) {
      toggleMinimize(e);
    }
  };
  
  // If the block is invalid, show an error state but be more forgiving
  if (!isValid) {
    console.error('Invalid block in BlockWrapper:', block);
    return (
      <div className="border border-red-300 bg-red-50 rounded-md p-4 mb-4">
        <p className="text-red-600 font-medium">Bloco inválido</p>
        <p className="text-sm text-red-500">Este bloco está com problemas e precisa ser substituído.</p>
        <pre className="text-xs mt-2 bg-white p-2 rounded">{JSON.stringify(block, null, 2)}</pre>
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "relative group mb-4 block-panel transition-all duration-200 ease-in-out block-wrapper",
        isSelected && "block-selected ring-2 ring-blue-500",
        !block.visible && "opacity-50",
        isMinimized && "h-14 overflow-hidden cursor-pointer hover:bg-gray-50"
      )}
      onClick={isMinimized ? handleSelectBlock : undefined}
      data-block-id={block.id}
      data-has-custom-style={!!blockStyle}
      data-minimized={isMinimized}
    >
      <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
        <BlockHeader block={block} />
        <BlockMinimizeButton isMinimized={isMinimized} onToggle={toggleMinimize} />
      </div>
      
      {!isMinimized && (
        <>
          <div className="flex items-center space-x-1 p-2 bg-gray-25">
            <BlockActions block={block} />
            <StyleControls block={block} />
          </div>
          
          <div className="pt-4 pb-2 px-2" onClick={handleSelectBlock}>
            {children}
          </div>
        </>
      )}
    </div>
  );
};

export default BlockWrapper;
