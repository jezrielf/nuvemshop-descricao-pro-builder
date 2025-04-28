
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
    <div className={cn("block-header text-[10px] font-medium flex items-center gap-1", className)}>
      <span className="px-1.5 py-0.5 rounded-sm bg-primary/10 text-primary">
        {blockTypeName}
      </span>
      <span className="truncate max-w-[200px]">{block.title}</span>
    </div>
  );
};

export default BlockHeader;
