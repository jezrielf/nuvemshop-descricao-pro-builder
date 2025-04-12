
import React from 'react';
import { BlockBase } from '@/types/editor';
import { Grip } from 'lucide-react';

interface BlockHeaderProps {
  block: BlockBase;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ block }) => {
  return (
    <>
      <div className="absolute left-2 top-2 z-10 drag-handle">
        <Grip className="h-5 w-5" />
      </div>
      
      <div className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
        <span>{block.title || block.type}</span>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{block.columns} coluna(s)</span>
      </div>
    </>
  );
};

export default BlockHeader;
