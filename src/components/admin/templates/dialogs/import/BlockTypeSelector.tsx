
import React from 'react';
import { BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { Check, X } from 'lucide-react';
import { blockTypeInfo } from '@/utils/blockTypeInfo';

interface BlockTypeSelectorProps {
  blockType: BlockType;
  onTypeChange: (type: BlockType) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const BlockTypeSelector: React.FC<BlockTypeSelectorProps> = ({
  blockType,
  onTypeChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Select
        value={blockType}
        onValueChange={(value) => onTypeChange(value as BlockType)}
      >
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(blockTypeInfo).map(([type, info]) => (
            <SelectItem key={type} value={type}>
              <div className="flex items-center">
                <span className="mr-2">{info.icon}</span>
                <span>{info.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={onSave}>
        <Check className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCancel}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
