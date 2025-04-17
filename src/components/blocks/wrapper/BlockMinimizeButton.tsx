
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BlockMinimizeButtonProps {
  isMinimized: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

const BlockMinimizeButton: React.FC<BlockMinimizeButtonProps> = ({ 
  isMinimized, 
  onToggle 
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="z-10"
            aria-label={isMinimized ? "Expandir bloco" : "Minimizar bloco"}
          >
            {isMinimized ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isMinimized ? 'Expandir bloco' : 'Minimizar bloco'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BlockMinimizeButton;
