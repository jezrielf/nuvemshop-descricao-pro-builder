
import React from 'react';
import { BlockBase } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editor';
import { ArrowUp, ArrowDown, Trash } from 'lucide-react';

interface BlockHeaderProps {
  block: BlockBase;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ block }) => {
  const { moveBlockUp, moveBlockDown, removeBlock } = useEditorStore();

  const handleDeleteBlock = () => {
    if (removeBlock) {
      removeBlock(block.id);
    } else {
      console.error('removeBlock function not available in EditorStore');
    }
  };

  return (
    <div className="absolute -top-3 left-0 right-0 flex justify-center">
      <div className="inline-flex items-center p-1 bg-background border rounded-md shadow-sm text-xs">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => moveBlockUp(block.id)}
        >
          <ArrowUp className="h-3 w-3" />
        </Button>
        
        <span className="px-2 font-medium">
          {block.title}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => moveBlockDown(block.id)}
        >
          <ArrowDown className="h-3 w-3" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-destructive hover:text-destructive"
          onClick={handleDeleteBlock}
        >
          <Trash className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default BlockHeader;
