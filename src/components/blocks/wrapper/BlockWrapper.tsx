
import React, { memo } from 'react';
import { BlockBase } from '@/types/editor';
import { generateStyleClasses } from './StyleClassGenerator';
import BlockHeader from './BlockHeader';
import { cn } from '@/lib/utils';

interface BlockWrapperProps {
  block: BlockBase;
  isPreview?: boolean;
  children: React.ReactNode;
}

const BlockWrapper: React.FC<BlockWrapperProps> = memo(({ 
  block, 
  isPreview = false, 
  children 
}) => {
  const blockClasses = generateStyleClasses(block);
  
  return (
    <div className={cn(
      "block-container relative w-full",
      !isPreview && "p-3 border rounded-lg hover:border-blue-300",
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
});

BlockWrapper.displayName = 'BlockWrapper';

export default BlockWrapper;
