
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SpacingControlsProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const SpacingControls: React.FC<SpacingControlsProps> = ({ block, updateStyle }) => {
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">Espaçamento</h5>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="padding">Padding</Label>
          <Select 
            value={block.style?.padding || 'md'} 
            onValueChange={(value: any) => updateStyle({ padding: value })}
          >
            <SelectTrigger id="padding">
              <SelectValue placeholder="Padding" />
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
        <div>
          <Label htmlFor="margin">Margem</Label>
          <Select 
            value={block.style?.margin || 'md'} 
            onValueChange={(value: any) => updateStyle({ margin: value })}
          >
            <SelectTrigger id="margin">
              <SelectValue placeholder="Margem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xs">Muito pequena</SelectItem>
              <SelectItem value="sm">Pequena</SelectItem>
              <SelectItem value="md">Média</SelectItem>
              <SelectItem value="lg">Grande</SelectItem>
              <SelectItem value="xl">Muito grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SpacingControls;
