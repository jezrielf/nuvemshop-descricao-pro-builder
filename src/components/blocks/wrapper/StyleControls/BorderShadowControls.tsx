
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BorderShadowControlsProps {
  block: BlockBase;
  updateStyle: (style: Partial<BlockStyle>) => void;
}

const BorderShadowControls: React.FC<BorderShadowControlsProps> = ({ block, updateStyle }) => {
  const toggleBorder = (checked: boolean) => {
    updateStyle({
      hasBorder: checked
    });
  };

  const toggleShadow = (checked: boolean) => {
    updateStyle({
      hasShadow: checked
    });
  };

  const handleBorderRadiusChange = (value: string) => {
    updateStyle({
      borderRadius: value
    });
  };

  const handleBorderWidthChange = (value: string) => {
    updateStyle({
      borderWidth: value
    });
  };

  const handleBorderColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateStyle({
      borderColor: e.target.value
    });
  };

  const handleShadowChange = (value: string) => {
    updateStyle({
      boxShadow: value
    });
  };

  // Default values
  const hasBorder = block.style?.hasBorder || false;
  const hasShadow = block.style?.hasShadow || false;
  const borderRadius = block.style?.borderRadius || '0px';
  const borderWidth = block.style?.borderWidth || '1px';
  const borderColor = block.style?.borderColor || '#e2e8f0';
  const boxShadow = block.style?.boxShadow || 'sm';

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">Bordas e Sombras</h5>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="has-border" className="text-xs">Borda</Label>
        <Switch 
          id="has-border" 
          checked={hasBorder} 
          onCheckedChange={toggleBorder}
        />
      </div>

      {hasBorder && (
        <div className="space-y-2 pt-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="border-radius" className="text-xs">Arredondamento</Label>
              <Select 
                value={borderRadius} 
                onValueChange={handleBorderRadiusChange}
              >
                <SelectTrigger id="border-radius" className="h-8">
                  <SelectValue placeholder="Radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0px">Sem arredondamento</SelectItem>
                  <SelectItem value="4px">Pequeno (4px)</SelectItem>
                  <SelectItem value="8px">Médio (8px)</SelectItem>
                  <SelectItem value="12px">Grande (12px)</SelectItem>
                  <SelectItem value="16px">Extra Grande (16px)</SelectItem>
                  <SelectItem value="9999px">Circular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="border-width" className="text-xs">Espessura</Label>
              <Select 
                value={borderWidth} 
                onValueChange={handleBorderWidthChange}
              >
                <SelectTrigger id="border-width" className="h-8">
                  <SelectValue placeholder="Width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1px">Fina (1px)</SelectItem>
                  <SelectItem value="2px">Média (2px)</SelectItem>
                  <SelectItem value="4px">Grossa (4px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="border-color" className="text-xs">Cor da borda</Label>
            <div className="flex items-center">
              <Input 
                id="border-color"
                type="color" 
                value={borderColor} 
                onChange={handleBorderColorChange}
                className="h-8 w-12 p-1"
              />
              <Input 
                value={borderColor} 
                onChange={handleBorderColorChange}
                className="h-8 flex-1 ml-2"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <Label htmlFor="has-shadow" className="text-xs">Sombra</Label>
        <Switch 
          id="has-shadow" 
          checked={hasShadow} 
          onCheckedChange={toggleShadow}
        />
      </div>

      {hasShadow && (
        <div className="space-y-1">
          <Label htmlFor="shadow-size" className="text-xs">Tamanho da sombra</Label>
          <Select 
            value={boxShadow} 
            onValueChange={handleShadowChange}
          >
            <SelectTrigger id="shadow-size" className="h-8">
              <SelectValue placeholder="Shadow" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sm">Pequena</SelectItem>
              <SelectItem value="md">Média</SelectItem>
              <SelectItem value="lg">Grande</SelectItem>
              <SelectItem value="xl">Extra Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default BorderShadowControls;
