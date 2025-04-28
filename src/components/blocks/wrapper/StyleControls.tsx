
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { useEditorStore } from '@/store/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import ColorPickers from './StyleControls/ColorPickers';
import TypographyControls from './StyleControls/TypographyControls';
import SpacingControls from './StyleControls/SpacingControls';
import BorderShadowControls from './StyleControls/BorderShadowControls';

interface StyleControlsProps {
  block: BlockBase;
}

const StyleControls: React.FC<StyleControlsProps> = ({ block }) => {
  const { updateBlock } = useEditorStore();
  
  const updateStyle = (styleUpdates: Partial<BlockStyle>) => {
    const currentStyle = block.style || {};
    console.log('Updating block styles:', styleUpdates);
    updateBlock(block.id, { 
      style: {
        ...currentStyle,
        ...styleUpdates
      }
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Palette className="h-3 w-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[520px] p-2">
              <ScrollArea className="h-[400px] pr-2">
                <div>
                  <div className="border-b pb-1 mb-2">
                    <h4 className="text-[9px] font-medium">Personalização do Bloco</h4>
                    <p className="text-[8px] text-muted-foreground">Personalize as cores e estilos do seu bloco</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <ColorPickers block={block} updateStyle={updateStyle} />
                      <SpacingControls block={block} updateStyle={updateStyle} />
                    </div>
                    <div className="space-y-2">
                      <TypographyControls block={block} updateStyle={updateStyle} />
                      <BorderShadowControls block={block} updateStyle={updateStyle} />
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[8px]">Personalizar aparência</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StyleControls;

