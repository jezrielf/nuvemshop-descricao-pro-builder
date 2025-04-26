
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SpacingControlsProps {
  block: BlockBase;
  updateStyle: (style: Partial<BlockStyle>) => void;
}

const SpacingControls: React.FC<SpacingControlsProps> = ({ block, updateStyle }) => {
  const handleSpacingChange = (value: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
    updateStyle({
      blockSpacing: value
    });
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">Espaçamento</h5>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="block-spacing" className="text-xs">Tamanho do Espaçamento</Label>
          <Select 
            value={block.style?.blockSpacing || 'md'} 
            onValueChange={(value) => handleSpacingChange(value as 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl')}
          >
            <SelectTrigger id="block-spacing" className="h-8">
              <SelectValue placeholder="Selecionar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Nenhum</SelectItem>
              <SelectItem value="xs">Extra Pequeno</SelectItem>
              <SelectItem value="sm">Pequeno</SelectItem>
              <SelectItem value="md">Médio</SelectItem>
              <SelectItem value="lg">Grande</SelectItem>
              <SelectItem value="xl">Extra Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SpacingControls;
