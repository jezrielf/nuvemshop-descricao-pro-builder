
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
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="font-medium">Personalização do Bloco</h4>
                  <p className="text-xs text-muted-foreground">Personalize as cores e estilos do seu bloco</p>
                </div>
                
                <ColorPickers block={block} updateStyle={updateStyle} />
                <TypographyControls block={block} updateStyle={updateStyle} />
                <SpacingControls block={block} updateStyle={updateStyle} />
                <BorderShadowControls block={block} updateStyle={updateStyle} />
              </div>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          Personalizar aparência
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StyleControls;
