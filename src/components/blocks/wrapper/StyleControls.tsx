
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Palette, Settings, Sparkles } from 'lucide-react';
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
      updateBlock(block.id, { 
        columns: styleUpdates.columns as any
      });
      delete styleUpdates.columns;
    }
    
    if (Object.keys(styleUpdates).length > 0) {
      const currentStyle = block.style || {};
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
                className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 border-2 border-gradient-to-r from-blue-200 to-purple-200 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg animate-pulse"
              >
                <div className="relative">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <Sparkles className="h-2 w-2 text-purple-600 absolute -top-1 -right-1" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[560px] p-0">
              <ScrollArea className="h-[450px]">
                <div className="p-4">
                  <div className="border-b pb-3 mb-4 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-t-lg">
                    <div className="flex items-center space-x-2">
                      <Palette className="h-5 w-5 text-blue-600" />
                      <h4 className="text-[12px] font-bold text-blue-700">✨ Personalização Premium do Bloco</h4>
                    </div>
                    <p className="text-[10px] text-purple-600 mt-1">
                      Personalize cores, layout, colunas e estilos avançados do seu bloco
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Destaque para controle de colunas */}
                    <div className="mb-4">
                      <ColumnControls block={block} updateStyle={updateStyle} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <ColorPickers block={block} updateStyle={updateStyle} />
                        <SpacingControls block={block} updateStyle={updateStyle} />
                      </div>
                      <div className="space-y-3">
                        <TypographyControls block={block} updateStyle={updateStyle} />
                        <BorderShadowControls block={block} updateStyle={updateStyle} />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-[10px] font-bold">🎨 ✨ Personalização Premium</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default StyleControls;
