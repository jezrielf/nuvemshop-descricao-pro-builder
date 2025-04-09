
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">Cores</h5>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="bgcolor">Cor de fundo</Label>
          <Input 
            id="bgcolor"
            type="color" 
            value={block.style?.backgroundColor || '#ffffff'} 
            onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="textcolor">Cor do texto</Label>
          <Input 
            id="textcolor"
            type="color" 
            value={block.style?.textColor || '#000000'} 
            onChange={(e) => updateStyle({ textColor: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPickers;
