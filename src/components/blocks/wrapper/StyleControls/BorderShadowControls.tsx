
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BorderShadowControlsProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const BorderShadowControls: React.FC<BorderShadowControlsProps> = ({ block, updateStyle }) => {
  const handleBorderToggle = (checked: boolean) => {
    console.log('Toggling border to:', checked);
    updateStyle({ hasBorder: checked });
  };

  const handleBorderColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Changing border color to:', e.target.value);
    updateStyle({ borderColor: e.target.value });
  };

  const handleShadowToggle = (checked: boolean) => {
    console.log('Toggling shadow to:', checked);
    updateStyle({ hasShadow: checked });
  };

  const handleBorderRadiusChange = (value: string) => {
    console.log('Changing border radius to:', value);
    updateStyle({ borderRadius: value });
  };

  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">Borda e Sombra</h5>
      <div className="flex items-center justify-between">
        <Label htmlFor="hasBorder">Borda</Label>
        <Switch 
          id="hasBorder"
          checked={block.style?.hasBorder || false} 
          onCheckedChange={handleBorderToggle}
        />
      </div>
      
      {block.style?.hasBorder && (
        <div>
          <Label htmlFor="borderColor">Cor da borda</Label>
          <Input 
            id="borderColor"
            type="color" 
            value={block.style?.borderColor || '#e5e7eb'} 
            onChange={handleBorderColorChange}
          />
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <Label htmlFor="hasShadow">Sombra</Label>
        <Switch 
          id="hasShadow"
          checked={block.style?.hasShadow || false} 
          onCheckedChange={handleShadowToggle}
        />
      </div>
      
      <div>
        <Label htmlFor="borderRadius">Arredondamento</Label>
        <Select 
          value={block.style?.borderRadius || 'md'} 
          onValueChange={handleBorderRadiusChange}
        >
          <SelectTrigger id="borderRadius">
            <SelectValue placeholder="Arredondamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="xs">Muito pequeno</SelectItem>
            <SelectItem value="sm">Pequeno</SelectItem>
            <SelectItem value="md">Médio</SelectItem>
            <SelectItem value="lg">Grande</SelectItem>
            <SelectItem value="xl">Muito grande</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BorderShadowControls;
