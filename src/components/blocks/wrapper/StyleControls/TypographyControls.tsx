
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';

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

      <div>
        <Label htmlFor="fontWeight">Estilo do texto</Label>
        <div className="flex space-x-2 mt-1">
          <ToggleGroup type="single" value={block.style?.fontWeight || 'normal'} onValueChange={(value) => updateStyle({ fontWeight: value as any })}>
            <ToggleGroupItem value="normal" aria-label="Normal">Normal</ToggleGroupItem>
            <ToggleGroupItem value="medium" aria-label="Médio">Médio</ToggleGroupItem>
            <ToggleGroupItem value="semibold" aria-label="Semi-negrito">Semi</ToggleGroupItem>
            <ToggleGroupItem value="bold" aria-label="Negrito">Negrito</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div>
        <Label>Formatação</Label>
        <div className="flex items-center space-x-2 mt-1">
          <ToggleGroup type="single" value={block.style?.fontStyle || 'normal'} onValueChange={(value) => updateStyle({ fontStyle: value as any })}>
            <ToggleGroupItem value="normal" aria-label="Normal">
              <span className="mr-2">Aa</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Itálico">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <ToggleGroup type="single" value={block.style?.textDecoration || 'none'} onValueChange={(value) => updateStyle({ textDecoration: value as any })}>
            <ToggleGroupItem value="none" aria-label="Sem decoração">
              <span className="mr-2">Aa</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Sublinhado">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div>
        <Label htmlFor="headingWeight">Estilo dos títulos</Label>
        <Select 
          value={block.style?.headingWeight || 'bold'} 
          onValueChange={(value: any) => updateStyle({ headingWeight: value })}
        >
          <SelectTrigger id="headingWeight">
            <SelectValue placeholder="Estilo dos títulos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="semibold">Semi-negrito</SelectItem>
            <SelectItem value="bold">Negrito</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TypographyControls;
