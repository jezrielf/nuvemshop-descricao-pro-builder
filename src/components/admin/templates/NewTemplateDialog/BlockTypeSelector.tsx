
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BlockType } from '@/types/editor';

interface BlockTypeSelectorProps {
  blockTypes: BlockType[];
  onAddBlock: (type: BlockType) => void;
}

const BlockTypeSelector: React.FC<BlockTypeSelectorProps> = ({ blockTypes, onAddBlock }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {blockTypes.map(type => (
        <Button 
          key={type} 
          variant="outline" 
          size="sm"
          onClick={() => onAddBlock(type)}
        >
          <Plus className="h-3 w-3 mr-1" /> {type}
        </Button>
      ))}
    </div>
  );
};

export default BlockTypeSelector;
