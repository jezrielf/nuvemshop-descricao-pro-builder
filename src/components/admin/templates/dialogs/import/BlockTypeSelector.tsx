
import React from 'react';
import { BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, X } from 'lucide-react';

interface BlockTypeSelectorProps {
  blockType: BlockType;
  onTypeChange: (type: BlockType) => void;
  onSave: () => void;
  onCancel: () => void;
}

const availableBlockTypes: {type: BlockType, label: string}[] = [
  { type: 'hero', label: 'Banner Principal' },
  { type: 'text', label: 'Texto' },
  { type: 'features', label: 'Recursos' },
  { type: 'benefits', label: 'Benefícios' },
  { type: 'specifications', label: 'Especificações' },
  { type: 'image', label: 'Imagem' },
  { type: 'gallery', label: 'Galeria' },
  { type: 'imageText', label: 'Imagem + Texto' },
  { type: 'textImage', label: 'Texto + Imagem' },
  { type: 'faq', label: 'Perguntas Frequentes' },
  { type: 'cta', label: 'Chamada para Ação' },
  { type: 'video', label: 'Vídeo' },
];

export const BlockTypeSelector: React.FC<BlockTypeSelectorProps> = ({
  blockType,
  onTypeChange,
  onSave,
  onCancel
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Select 
        value={blockType}
        onValueChange={(value) => onTypeChange(value as BlockType)}
      >
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {availableBlockTypes.map(blockType => (
            <SelectItem key={blockType.type} value={blockType.type}>
              {blockType.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onSave}
      >
        <Check className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost"
        size="icon"
        onClick={onCancel}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
