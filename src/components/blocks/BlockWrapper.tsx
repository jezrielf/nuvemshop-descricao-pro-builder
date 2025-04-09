
import React from 'react';
import { useEditorStore } from '@/store/editor';
import { ChevronDown, ChevronUp, Copy, Grip, Settings, Trash2, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlockBase } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BlockWrapperProps {
  block: BlockBase;
  children: React.ReactNode;
  isEditing?: boolean;
}

const BlockWrapper: React.FC<BlockWrapperProps> = ({ block, children, isEditing = false }) => {
  const { 
    selectedBlockId, 
    selectBlock, 
    removeBlock, 
    duplicateBlock, 
    moveBlockUp, 
    moveBlockDown,
    updateBlock
  } = useEditorStore();
  
  const isSelected = selectedBlockId === block.id;
  
  const handleSelectBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectBlock(block.id);
  };

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateBlock(block.id, { visible: !block.visible });
  };
  
  return (
    <div 
      className={cn(
        "relative group mb-4 block-panel transition-all",
        isSelected && "block-selected",
        !block.visible && "opacity-50"
      )}
      onClick={handleSelectBlock}
    >
      <div className="absolute left-2 top-2 z-10 drag-handle">
        <Grip className="h-5 w-5" />
      </div>
      
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
      
      <div className="pt-8 pb-2 px-2">
        <div className="text-sm font-medium text-gray-500 mb-2 flex items-center justify-between">
          <span>{block.title || block.type}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{block.columns} coluna(s)</span>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default BlockWrapper;
