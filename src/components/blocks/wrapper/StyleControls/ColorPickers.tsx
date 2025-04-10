
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  const handleColorChange = (type: 'backgroundColor' | 'textColor', value: string) => {
    // Garantir que a cor seja atualizada imediatamente
    updateStyle({ [type]: value });
    
    // Registrar a mudança para fins de depuração
    console.log(`Updating ${type} to ${value} for block ${block.id}`);
  };

  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">Cores</h5>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="bgcolor">Cor de fundo</Label>
          <div className="flex items-center mt-1">
            <Input 
              id="bgcolor"
              type="color" 
              value={block.style?.backgroundColor || '#ffffff'} 
              onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="textcolor">Cor do texto</Label>
          <div className="flex items-center mt-1">
            <Input 
              id="textcolor"
              type="color" 
              value={block.style?.textColor || '#000000'} 
              onChange={(e) => handleColorChange('textColor', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickers;
