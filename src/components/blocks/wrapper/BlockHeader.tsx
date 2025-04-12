
import React from 'react';
import { BlockBase } from '@/types/editor';

interface BlockHeaderProps {
  block: BlockBase;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ block }) => {
  return (
    <div className="py-1 px-3 text-xs text-gray-500 border-b border-gray-100 flex justify-between">
      <span>{block.title}</span>
      <span>ID: {block.id.slice(0, 8)}</span>
    </div>
  );
};

export default BlockHeader;
