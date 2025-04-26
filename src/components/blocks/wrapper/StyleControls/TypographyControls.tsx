
import React from 'react';
import { BlockBase } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface TypographyControlsProps {
  block: BlockBase;
  updateStyle: (styleUpdates: any) => void;
}

// Google Fonts populares organizadas por categoria
const fontFamilies = [
  { value: 'inherit', label: 'Padrão do site' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Tahoma, sans-serif', label: 'Tahoma' },
  { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Garamond, serif', label: 'Garamond' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Brush Script MT, cursive', label: 'Brush Script MT' },
  // Google Fonts - Sans Serif
  { value: '\'Roboto\', sans-serif', label: 'Roboto' },
  { value: '\'Open Sans\', sans-serif', label: 'Open Sans' },
  { value: '\'Lato\', sans-serif', label: 'Lato' },
  { value: '\'Montserrat\', sans-serif', label: 'Montserrat' },
  { value: '\'Raleway\', sans-serif', label: 'Raleway' },
  { value: '\'Poppins\', sans-serif', label: 'Poppins' },
  { value: '\'Source Sans Pro\', sans-serif', label: 'Source Sans Pro' },
  { value: '\'Noto Sans\', sans-serif', label: 'Noto Sans' },
  // Google Fonts - Serif
  { value: '\'Merriweather\', serif', label: 'Merriweather' },
  { value: '\'Playfair Display\', serif', label: 'Playfair Display' },
  { value: '\'Lora\', serif', label: 'Lora' },
  { value: '\'Noto Serif\', serif', label: 'Noto Serif' },
  { value: '\'Crimson Text\', serif', label: 'Crimson Text' },
  // Google Fonts - Display
  { value: '\'Lobster\', cursive', label: 'Lobster' },
  { value: '\'Pacifico\', cursive', label: 'Pacifico' },
  { value: '\'Abril Fatface\', cursive', label: 'Abril Fatface' },
  { value: '\'Bebas Neue\', sans-serif', label: 'Bebas Neue' },
  { value: '\'Dancing Script\', cursive', label: 'Dancing Script' },
];

const fontWeights = [
  { value: 'normal', label: 'Normal (400)' },
  { value: 'medium', label: 'Médio (500)' },
  { value: 'semibold', label: 'Semi-negrito (600)' },
  { value: 'bold', label: 'Negrito (700)' },
];

const fontSizes = [
  { value: '12px', label: 'Muito pequeno' },
  { value: '14px', label: 'Pequeno' },
  { value: '16px', label: 'Normal' },
  { value: '18px', label: 'Médio' },
  { value: '20px', label: 'Grande' },
  { value: '24px', label: 'Muito grande' },
  { value: '30px', label: 'Enorme' },
  { value: '36px', label: 'Gigante' },
  { value: '48px', label: 'Mega' }
];

const headingFontWeights = [
  { value: 'normal', label: 'Normal (400)' },
  { value: 'medium', label: 'Médio (500)' },
  { value: 'semibold', label: 'Semi-negrito (600)' },
  { value: 'bold', label: 'Negrito (700)' },
];

const textAlignOptions = [
  { value: 'left', label: 'Esquerda' },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Direita' },
  { value: 'justify', label: 'Justificado' },
];

const fontSizePx = {
  min: 12,
  max: 48,
  default: 16
};

const TypographyControls: React.FC<TypographyControlsProps> = ({ block, updateStyle }) => {
  const [fontSize, setFontSize] = React.useState<number>(
    block.style?.fontSize 
      ? parseInt(block.style.fontSize) 
      : fontSizePx.default
  );

  const handleFontSizeChange = (values: number[]) => {
    const newSize = values[0];
    setFontSize(newSize);
    updateStyle({ fontSize: `${newSize}px` });
  };

  return (
    <div className="space-y-4 pb-4 border-b">
      <h4 className="font-medium text-sm">Tipografia</h4>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Fonte</Label>
          <Select 
            value={block.style?.fontFamily || 'inherit'} 
            onValueChange={(value) => updateStyle({ fontFamily: value })}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Selecione uma fonte" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontSize">Tamanho da Fonte</Label>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Slider
                value={[fontSize]}
                min={fontSizePx.min}
                max={fontSizePx.max}
                step={1}
                onValueChange={handleFontSizeChange}
              />
            </div>
            <div className="w-12 text-right">{fontSize}px</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontWeight">Peso da Fonte</Label>
          <Select 
            value={block.style?.fontWeight || 'normal'} 
            onValueChange={(value) => updateStyle({ fontWeight: value })}
          >
            <SelectTrigger id="fontWeight">
              <SelectValue placeholder="Peso normal" />
            </SelectTrigger>
            <SelectContent>
              {fontWeights.map((weight) => (
                <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="textAlign">Alinhamento</Label>
          <Select 
            value={block.style?.textAlign || 'left'} 
            onValueChange={(value) => updateStyle({ textAlign: value })}
          >
            <SelectTrigger id="textAlign">
              <SelectValue placeholder="Alinhado à esquerda" />
            </SelectTrigger>
            <SelectContent>
              {textAlignOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="headingColor">Cor dos Títulos</Label>
          <input 
            type="color"
            id="headingColor"
            value={block.style?.headingColor || '#000000'}
            onChange={(e) => updateStyle({ headingColor: e.target.value })}
            className="h-8 w-full cursor-pointer"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="headingWeight">Peso dos Títulos</Label>
          <Select 
            value={block.style?.headingWeight || 'bold'} 
            onValueChange={(value) => updateStyle({ headingWeight: value })}
          >
            <SelectTrigger id="headingWeight">
              <SelectValue placeholder="Peso negrito" />
            </SelectTrigger>
            <SelectContent>
              {headingFontWeights.map((weight) => (
                <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TypographyControls;
