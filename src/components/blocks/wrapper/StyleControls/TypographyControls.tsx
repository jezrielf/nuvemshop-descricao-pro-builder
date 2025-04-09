
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TypographyControlsProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const TypographyControls: React.FC<TypographyControlsProps> = ({ block, updateStyle }) => {
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">Tipografia</h5>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="fontFamily">Família da fonte</Label>
          <Select 
            value={block.style?.fontFamily || 'sans'} 
            onValueChange={(value: 'sans' | 'serif' | 'mono') => updateStyle({ fontFamily: value })}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Família da fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sans">Sans-serif</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="mono">Monospace</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fontSize">Tamanho da fonte</Label>
          <Select 
            value={block.style?.fontSize || 'base'} 
            onValueChange={(value: any) => updateStyle({ fontSize: value })}
          >
            <SelectTrigger id="fontSize">
              <SelectValue placeholder="Tamanho da fonte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="xs">Muito pequeno</SelectItem>
              <SelectItem value="sm">Pequeno</SelectItem>
              <SelectItem value="base">Normal</SelectItem>
              <SelectItem value="lg">Grande</SelectItem>
              <SelectItem value="xl">Muito grande</SelectItem>
              <SelectItem value="2xl">Extra grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="textAlign">Alinhamento</Label>
        <Select 
          value={block.style?.textAlign || 'left'} 
          onValueChange={(value: any) => updateStyle({ textAlign: value })}
        >
          <SelectTrigger id="textAlign">
            <SelectValue placeholder="Alinhamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Esquerda</SelectItem>
            <SelectItem value="center">Centro</SelectItem>
            <SelectItem value="right">Direita</SelectItem>
            <SelectItem value="justify">Justificado</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TypographyControls;
