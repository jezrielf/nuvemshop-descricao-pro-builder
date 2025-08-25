import React from 'react';
import { Block } from '@/types/editor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ColorPicker } from './ColorPicker';

interface BlockStyleEditorProps {
  block: Block;
  onUpdate: (updates: Partial<Block>) => void;
}

export const BlockStyleEditor: React.FC<BlockStyleEditorProps> = ({ block, onUpdate }) => {
  const handleStyleUpdate = (styleKey: string, value: string) => {
    onUpdate({
      style: {
        ...block.style,
        [styleKey]: value
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Background */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Fundo</h4>
        
        <div>
          <Label htmlFor="backgroundColor">Cor de Fundo</Label>
          <ColorPicker
            value={block.style.backgroundColor || ''}
            onChange={(color) => handleStyleUpdate('backgroundColor', color)}
          />
        </div>
        
        <div>
          <Label htmlFor="backgroundImage">Imagem de Fundo</Label>
          <Input
            id="backgroundImage"
            value={block.style.backgroundImage || ''}
            onChange={(e) => handleStyleUpdate('backgroundImage', e.target.value)}
            placeholder="URL da imagem de fundo..."
          />
        </div>
      </div>

      {/* Text */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Texto</h4>
        
        <div>
          <Label htmlFor="textColor">Cor do Texto</Label>
          <ColorPicker
            value={block.style.textColor || ''}
            onChange={(color) => handleStyleUpdate('textColor', color)}
          />
        </div>
        
        <div>
          <Label htmlFor="fontSize">Tamanho da Fonte</Label>
          <Select 
            value={block.style.fontSize || 'medium'} 
            onValueChange={(value) => handleStyleUpdate('fontSize', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Pequeno</SelectItem>
              <SelectItem value="medium">Médio</SelectItem>
              <SelectItem value="large">Grande</SelectItem>
              <SelectItem value="xlarge">Extra Grande</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="textAlign">Alinhamento</Label>
          <Select 
            value={block.style.textAlign || 'left'} 
            onValueChange={(value) => handleStyleUpdate('textAlign', value)}
          >
            <SelectTrigger>
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

      {/* Spacing */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Espaçamento</h4>
        
        <div>
          <Label htmlFor="padding">Padding</Label>
          <Input
            id="padding"
            value={block.style.padding || ''}
            onChange={(e) => handleStyleUpdate('padding', e.target.value)}
            placeholder="ex: 20px, 1rem, 20px 40px..."
          />
        </div>
        
        <div>
          <Label htmlFor="margin">Margin</Label>
          <Input
            id="margin"
            value={block.style.margin || ''}
            onChange={(e) => handleStyleUpdate('margin', e.target.value)}
            placeholder="ex: 20px, 1rem, 20px 40px..."
          />
        </div>
      </div>

      {/* Border */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Borda</h4>
        
        <div>
          <Label htmlFor="borderRadius">Raio da Borda</Label>
          <Input
            id="borderRadius"
            value={block.style.borderRadius || ''}
            onChange={(e) => handleStyleUpdate('borderRadius', e.target.value)}
            placeholder="ex: 8px, 1rem, 50%..."
          />
        </div>
        
        <div>
          <Label htmlFor="borderWidth">Espessura da Borda</Label>
          <Input
            id="borderWidth"
            value={block.style.borderWidth || ''}
            onChange={(e) => handleStyleUpdate('borderWidth', e.target.value)}
            placeholder="ex: 1px, 2px..."
          />
        </div>
        
        <div>
          <Label htmlFor="borderColor">Cor da Borda</Label>
          <ColorPicker
            value={block.style.borderColor || ''}
            onChange={(color) => handleStyleUpdate('borderColor', color)}
          />
        </div>
      </div>

      {/* Shadow */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Sombra</h4>
        
        <div>
          <Label htmlFor="boxShadow">Box Shadow</Label>
          <Input
            id="boxShadow"
            value={block.style.boxShadow || ''}
            onChange={(e) => handleStyleUpdate('boxShadow', e.target.value)}
            placeholder="ex: 0 4px 6px rgba(0,0,0,0.1)..."
          />
        </div>
      </div>
    </div>
  );
};