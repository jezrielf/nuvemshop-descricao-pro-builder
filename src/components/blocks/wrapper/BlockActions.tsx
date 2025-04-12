
import React from 'react';
import { BlockBase } from '@/types/editor';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface BlockActionsProps {
  block: BlockBase;
}

const BlockActions: React.FC<BlockActionsProps> = ({ block }) => {
  const { duplicateBlock, removeBlock, moveBlockUp, moveBlockDown } = useEditorStore();
  
  return (
    <div className="flex space-x-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        title="Duplicar bloco"
        onClick={() => duplicateBlock(block.id)}
      >
        <Copy className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        title="Mover para cima"
        onClick={() => moveBlockUp(block.id)}
      >
        <ArrowUp className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        title="Mover para baixo"
        onClick={() => moveBlockDown(block.id)}
      >
        <ArrowDown className="h-3 w-3" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-red-500"
        title="Remover bloco"
        onClick={() => removeBlock(block.id)}
      >
        <Trash2 className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default BlockActions;
