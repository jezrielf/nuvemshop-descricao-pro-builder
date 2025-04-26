
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline } from 'lucide-react';

interface TypographyControlsProps {
  block: BlockBase;
  updateStyle: (style: Partial<BlockStyle>) => void;
}

const TypographyControls: React.FC<TypographyControlsProps> = ({ block, updateStyle }) => {
  const handleFontFamilyChange = (value: string) => {
    updateStyle({ fontFamily: value });
  };

  const handleFontSizeChange = (value: string) => {
    updateStyle({ fontSize: value });
  };

  const handleFontWeightChange = (value: string) => {
    updateStyle({ fontWeight: value });
  };

  const handleHeadingWeightChange = (value: string) => {
    updateStyle({ headingWeight: value });
  };

  const toggleBold = () => {
    updateStyle({
      fontWeight: block.style?.fontWeight === 'bold' ? 'normal' : 'bold',
    });
  };

  const toggleItalic = () => {
    updateStyle({
      fontStyle: block.style?.fontStyle === 'italic' ? 'normal' : 'italic',
    });
  };

  const toggleUnderline = () => {
    updateStyle({
      textDecoration: block.style?.textDecoration === 'underline' ? undefined : 'underline',
    });
  };

  const handleTextAlignChange = (value: 'left' | 'center' | 'right' | 'justify') => {
    updateStyle({ textAlign: value });
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">Tipografia</h5>

      <div className="space-y-2">
        <Label htmlFor="font-family" className="text-xs">Fonte</Label>
        <Select 
          value={block.style?.fontFamily || 'sans'} 
          onValueChange={handleFontFamilyChange}
        >
          <SelectTrigger id="font-family" className="h-8">
            <SelectValue placeholder="Escolher fonte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sans">Sans-serif</SelectItem>
            <SelectItem value="serif">Serif</SelectItem>
            <SelectItem value="mono">Monospace</SelectItem>
            <SelectItem value="playfair">Playfair Display</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="font-size" className="text-xs">Tamanho da fonte</Label>
          <Select 
            value={block.style?.fontSize || 'base'} 
            onValueChange={handleFontSizeChange}
          >
            <SelectTrigger id="font-size" className="h-8">
              <SelectValue placeholder="Tamanho" />
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
        
        <div className="space-y-1">
          <Label htmlFor="text-align" className="text-xs">Alinhamento</Label>
          <Select 
            value={block.style?.textAlign || 'left'} 
            onValueChange={(value) => handleTextAlignChange(value as 'left' | 'center' | 'right' | 'justify')}
          >
            <SelectTrigger id="text-align" className="h-8">
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

      <div className="space-y-1">
        <Label className="text-xs">Estilo</Label>
        <div className="flex space-x-2">
          <Button 
            type="button" 
            size="sm"
            variant={block.style?.fontWeight === 'bold' ? 'default' : 'outline'}
            onClick={toggleBold}
            className="flex-1 h-8"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            size="sm"
            variant={block.style?.fontStyle === 'italic' ? 'default' : 'outline'}
            onClick={toggleItalic}
            className="flex-1 h-8"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            size="sm"
            variant={block.style?.textDecoration === 'underline' ? 'default' : 'outline'}
            onClick={toggleUnderline}
            className="flex-1 h-8"
          >
            <Underline className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="heading-weight" className="text-xs">Peso dos Títulos</Label>
        <Select 
          value={block.style?.headingWeight || 'bold'} 
          onValueChange={handleHeadingWeightChange}
        >
          <SelectTrigger id="heading-weight" className="h-8">
            <SelectValue placeholder="Peso do Título" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="semibold">Semi-bold</SelectItem>
            <SelectItem value="bold">Bold</SelectItem>
            <SelectItem value="extrabold">Extra Bold</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TypographyControls;
