
import React from 'react';
import { BlockBase } from '@/types/editor';
import { getBlockTypeDisplayName } from '@/utils/blockTypeInfo';
import { cn } from '@/lib/utils';

interface BlockHeaderProps {
  block: BlockBase;
  className?: string;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ block, className }) => {
  const blockTypeName = getBlockTypeDisplayName(block.type);
  
  return (
    <div className={cn("block-header text-xs font-medium flex items-center gap-2", className)}>
      <span className="px-2 py-1 rounded-sm bg-primary/10 text-primary">
        {blockTypeName}
      </span>
      <span className="truncate max-w-[200px]">{block.title}</span>
    </div>
  );
};

export default BlockHeader;
