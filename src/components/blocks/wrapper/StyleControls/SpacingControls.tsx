
import React from 'react';
import { BlockBase, BlockStyle, BlockSpacing } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SpacingControlsProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const SpacingControls: React.FC<SpacingControlsProps> = ({ block, updateStyle }) => {
  const handlePaddingChange = (value: string) => {
    console.log('Changing padding to:', value);
    updateStyle({ padding: value });
  };

  const handleMarginChange = (value: string) => {
    console.log('Changing margin to:', value);
    updateStyle({ margin: value });
  };

  const handleBlockSpacingChange = (value: BlockSpacing) => {
    console.log('Changing block spacing to:', value);
    updateStyle({ blockSpacing: value });
  };

  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">Espaçamento</h5>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="padding">Padding</Label>
          <Select 
            value={block.style?.padding || 'md'} 
            onValueChange={handlePaddingChange}
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
            onValueChange={handleMarginChange}
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
      
      {/* Controle para espaçamento entre blocos */}
      <div className="mt-3">
        <Label htmlFor="blockSpacing">Espaçamento entre blocos</Label>
        <Select 
          value={block.style?.blockSpacing || 'medium'} 
          onValueChange={(value) => handleBlockSpacingChange(value as BlockSpacing)}
        >
          <SelectTrigger id="blockSpacing">
            <SelectValue placeholder="Espaçamento entre blocos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Nenhum (conectados)</SelectItem>
            <SelectItem value="small">Pequeno</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="large">Grande</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SpacingControls;
