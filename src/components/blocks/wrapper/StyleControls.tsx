
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Palette, Settings } from 'lucide-react';
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
import ColumnControls from './StyleControls/ColumnControls';

interface StyleControlsProps {
  block: BlockBase;
}

const StyleControls: React.FC<StyleControlsProps> = ({ block }) => {
  const { updateBlock } = useEditorStore();
  
  const updateStyle = (styleUpdates: Partial<BlockStyle>) => {
    if ('columns' in styleUpdates) {
      // Atualizar a propriedade columns diretamente no bloco
      updateBlock(block.id, { 
        columns: styleUpdates.columns as any
      });
      delete styleUpdates.columns;
    }
    
    if (Object.keys(styleUpdates).length > 0) {
      const currentStyle = block.style || {};
      console.log('Updating block styles:', styleUpdates);
      updateBlock(block.id, { 
        style: {
          ...currentStyle,
          ...styleUpdates
        }
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-blue-100 border border-blue-200 bg-blue-50 shadow-sm"
              >
                <Settings className="h-4 w-4 text-blue-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[520px] p-0">
              <ScrollArea className="h-[400px]">
                <div className="p-3">
                  <div className="border-b pb-2 mb-3">
                    <h4 className="text-[10px] font-semibold text-blue-700">✨ Personalização do Bloco</h4>
                    <p className="text-[8px] text-muted-foreground">Personalize as cores, layout e estilos do seu bloco</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <ColumnControls block={block} updateStyle={updateStyle} />
                      <ColorPickers block={block} updateStyle={updateStyle} />
                      <SpacingControls block={block} updateStyle={updateStyle} />
                    </div>
                    <div className="space-y-3">
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
          <span className="text-[9px] font-medium">🎨 Personalizar Bloco</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StyleControls;
