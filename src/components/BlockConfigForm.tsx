
import React from 'react';
import { BlockType, ColumnLayout } from '@/types/editor';
import { blockTypeInfo } from '@/utils/blockTypeInfo';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BlockConfigFormProps {
  selectedType: BlockType;
  columns: ColumnLayout;
  onColumnsChange: (columns: ColumnLayout) => void;
  onBack: () => void;
  onAddBlock: () => void;
}

const BlockConfigForm: React.FC<BlockConfigFormProps> = ({
  selectedType,
  columns,
  onColumnsChange,
  onBack,
  onAddBlock
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium">{blockTypeInfo[selectedType].name}</h3>
        <p className="text-sm text-gray-500">{blockTypeInfo[selectedType].description}</p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Número de Colunas</label>
        <Select
          value={columns.toString()}
          onValueChange={(value) => onColumnsChange(value as ColumnLayout)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o número de colunas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Coluna</SelectItem>
            <SelectItem value="2">2 Colunas</SelectItem>
            <SelectItem value="3">3 Colunas</SelectItem>
            <SelectItem value="4">4 Colunas</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack}>
          Voltar
        </Button>
        <Button size="sm" onClick={onAddBlock}>
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default BlockConfigForm;
