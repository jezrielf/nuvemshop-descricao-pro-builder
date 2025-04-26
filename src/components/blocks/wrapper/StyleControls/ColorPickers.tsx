
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (style: Partial<BlockStyle>) => void;
}

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStyle({ backgroundColor: e.target.value });
  };
  
  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStyle({ textColor: e.target.value });
  };
  
  const handleHeadingColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStyle({ headingColor: e.target.value });
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">Cores</h5>
      
      <div className="space-y-1">
        <Label htmlFor="background-color" className="text-xs">Cor de Fundo</Label>
        <div className="flex items-center">
          <Input 
            id="background-color"
            type="color" 
            value={block.style?.backgroundColor || '#ffffff'} 
            onChange={handleBackgroundColorChange}
            className="h-8 w-12 p-1"
          />
          <Input 
            value={block.style?.backgroundColor || '#ffffff'} 
            onChange={handleBackgroundColorChange}
            className="h-8 flex-1 ml-2"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="text-color" className="text-xs">Cor do Texto</Label>
        <div className="flex items-center">
          <Input 
            id="text-color"
            type="color" 
            value={block.style?.textColor || '#333333'} 
            onChange={handleTextColorChange}
            className="h-8 w-12 p-1"
          />
          <Input 
            value={block.style?.textColor || '#333333'} 
            onChange={handleTextColorChange}
            className="h-8 flex-1 ml-2"
          />
        </div>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="heading-color" className="text-xs">Cor dos Títulos</Label>
        <div className="flex items-center">
          <Input 
            id="heading-color"
            type="color" 
            value={block.style?.headingColor || '#111111'} 
            onChange={handleHeadingColorChange}
            className="h-8 w-12 p-1"
          />
          <Input 
            value={block.style?.headingColor || '#111111'} 
            onChange={handleHeadingColorChange}
            className="h-8 flex-1 ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPickers;
