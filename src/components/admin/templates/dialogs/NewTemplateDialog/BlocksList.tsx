
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Block } from '@/types/editor';

interface BlocksListProps {
  blocks: Block[];
  onRemoveBlock: (blockId: string) => void;
}

const BlocksList: React.FC<BlocksListProps> = ({ blocks, onRemoveBlock }) => {
  if (!blocks || blocks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhum bloco adicionado. Use os botões acima para adicionar blocos ao template.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => (
        <div 
          key={block.id} 
          className="flex items-center justify-between p-2 border rounded bg-muted/50"
        >
          <div className="flex items-center">
            <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
              {index + 1}
            </span>
            <span className="font-medium">{block.type}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              {block.title}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onRemoveBlock(block.id)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default BlocksList;
