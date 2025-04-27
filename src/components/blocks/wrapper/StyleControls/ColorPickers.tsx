
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  const handleColorChange = (type: 'backgroundColor' | 'textColor' | 'headingColor', value: string) => {
    console.log(`Updated ${type} to ${value} for block ${block.id}`);
    updateStyle({ [type]: value });
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">Cores</h5>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`bgcolor-${block.id}`}>Cor de fundo</Label>
          <div className="flex items-center mt-1">
            <Input 
              id={`bgcolor-${block.id}`}
              type="color" 
              value={block.style?.backgroundColor || '#ffffff'} 
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor={`textcolor-${block.id}`}>Cor do texto</Label>
          <div className="flex items-center mt-1">
            <Input 
              id={`textcolor-${block.id}`}
              type="color" 
              value={block.style?.textColor || '#000000'} 
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
        
        <div className="col-span-2">
          <Label htmlFor={`headingcolor-${block.id}`}>Cor dos títulos</Label>
          <div className="flex items-center mt-1">
            <Input 
              id={`headingcolor-${block.id}`}
              type="color" 
              value={block.style?.headingColor || '#000000'} 
              onChange={(e) => handleColorChange('headingColor', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickers;
