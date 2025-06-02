
import React from 'react';
import { BlockBase } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ColumnControlsProps {
  block: BlockBase;
  updateStyle: (styleUpdates: any) => void;
}

const ColumnControls: React.FC<ColumnControlsProps> = ({
  block,
  updateStyle
}) => {
  const currentColumns = String(block.columns || 'full');

  // Todos os tipos de bloco agora suportam controle de colunas
  const supportsColumns = true;
  
  if (!supportsColumns) {
    return null;
  }

  const handleColumnChange = (value: string) => {
    let columnValue: string | number = value;
    if (value === '1' || value === '2' || value === '3' || value === '4') {
      columnValue = parseInt(value);
    }
    
    updateStyle({
      columns: columnValue
    });
  };

  const getColumnOptions = () => {
    const baseOptions = [
      { value: 'full', label: '1 Coluna' },
      { value: '2', label: '2 Colunas' },
      { value: '3', label: '3 Colunas' },
    ];

    // Adicionar 4 colunas para tipos específicos
    if (['features', 'benefits', 'gallery'].includes(block.type)) {
      baseOptions.push({ value: '4', label: '4 Colunas' });
    }

    return baseOptions;
  };

  return (
    <div className="space-y-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          ⭐ Premium
        </Badge>
        <Label className="text-[12px] font-bold text-blue-700">Layout de Colunas</Label>
      </div>
      <Select value={currentColumns} onValueChange={handleColumnChange}>
        <SelectTrigger className="h-8 text-[12px] border-blue-300 focus:border-blue-500">
          <SelectValue placeholder="Selecionar colunas" />
        </SelectTrigger>
        <SelectContent>
          {getColumnOptions().map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-[10px] text-blue-600 italic">
        Altere o número de colunas para adaptar o layout às suas necessidades
      </p>
    </div>
  );
};

export default ColumnControls;
