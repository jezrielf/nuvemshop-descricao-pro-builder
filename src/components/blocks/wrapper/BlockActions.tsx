
import React from 'react';
import { BlockBase } from '@/types/editor';
import { ChevronDown, ChevronUp, Copy, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEditorStore } from '@/store/editor';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface BlockActionsProps {
  block: BlockBase;
}

const BlockActions: React.FC<BlockActionsProps> = ({ block }) => {
  const { 
    removeBlock, 
    duplicateBlock, 
    moveBlockUp, 
    moveBlockDown,
    updateBlock
  } = useEditorStore();
  
  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateBlock(block.id, { visible: !block.visible });
  };

  return (
    <div className="block-actions">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={toggleVisibility}>
              {block.visible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {block.visible ? 'Ocultar bloco' : 'Mostrar bloco'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => {
              e.stopPropagation();
              moveBlockUp(block.id);
            }}>
              <ChevronUp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mover para cima</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => {
              e.stopPropagation();
              moveBlockDown(block.id);
            }}>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Mover para baixo</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => {
              e.stopPropagation();
              duplicateBlock(block.id);
            }}>
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Duplicar</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => {
              e.stopPropagation();
              removeBlock(block.id);
            }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remover</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default BlockActions;
