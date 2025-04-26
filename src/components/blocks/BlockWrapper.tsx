
import React from 'react';
import { BlockBase } from '@/types/editor';
import { generateStyleClasses } from './wrapper/StyleClassGenerator';
import BlockHeader from './wrapper/BlockHeader';
import { cn } from '@/lib/utils';

interface BlockWrapperProps {
  block: BlockBase;
  isPreview?: boolean;
  isEditing?: boolean;
  children: React.ReactNode;
}

const BlockWrapper: React.FC<BlockWrapperProps> = ({ 
  block, 
  isPreview = false,
  isEditing = false,
  children 
}) => {
  const blockClasses = generateStyleClasses(block);
  
  return (
    <div className={cn(
      "block-container relative w-full",
      !isPreview && "p-4 border rounded-lg hover:border-blue-300",
      isPreview && "preview-mode"
    )}>
      {!isPreview && <BlockHeader block={block} />}
      
      <div className={cn(
        "block-content w-full",
        blockClasses.container
      )}>
        {children}
      </div>
    </div>
  );
};

export default BlockWrapper;
