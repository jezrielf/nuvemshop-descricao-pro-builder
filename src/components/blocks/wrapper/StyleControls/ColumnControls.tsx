
import React from 'react';
import { BlockBase } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ColumnControlsProps {
  block: BlockBase;
  updateStyle: (styleUpdates: any) => void;
}

const ColumnControls: React.FC<ColumnControlsProps> = ({ block, updateStyle }) => {
  const currentColumns = String(block.columns || 'full');
  
  // Definir quais tipos de bloco suportam controle de colunas
  const supportsColumns = ['gallery', 'benefits', 'features'].includes(block.type);
  
  if (!supportsColumns) {
    return null;
  }
  
  const handleColumnChange = (value: string) => {
    // Convert string values back to appropriate types
    let columnValue: string | number = value;
    if (value === '1' || value === '2' || value === '3' || value === '4') {
      columnValue = parseInt(value);
    }
    updateStyle({ columns: columnValue });
  };
  
  return (
    <div className="space-y-1">
      <Label className="text-[8px] font-medium">Layout de Colunas</Label>
      <Select value={currentColumns} onValueChange={handleColumnChange}>
        <SelectTrigger className="h-6 text-[8px]">
          <SelectValue placeholder="Selecionar colunas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="full">1 Coluna</SelectItem>
          <SelectItem value="2">2 Colunas</SelectItem>
          <SelectItem value="3">3 Colunas</SelectItem>
          {block.type === 'features' && (
            <SelectItem value="4">4 Colunas</SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ColumnControls;
