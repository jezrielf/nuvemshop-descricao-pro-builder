
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import GradientPicker from './GradientPicker';
import FontPicker from './FontPicker';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Paint, GalleryThumbnails, Gradient } from 'lucide-react';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

// Predefined solid colors
const predefinedColors = {
  'Neutral Gray': '#8E9196',
  'Primary Purple': '#9b87f5',
  'Secondary Purple': '#7E69AB',
  'Dark Purple': '#1A1F2C',
  'Light Purple': '#D6BCFA',
  'Soft Green': '#F2FCE2',
  'Soft Yellow': '#FEF7CD',
  'Soft Orange': '#FEC6A1',
  'Soft Purple': '#E5DEFF',
  'Soft Pink': '#FFDEE2',
  'Soft Blue': '#D3E4FD',
  'Ocean Blue': '#0EA5E9',
  'Charcoal Gray': '#403E43',
  'Pure White': '#FFFFFF',
  'Dark Charcoal': '#221F26',
};

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  const [colorMode, setColorMode] = React.useState<'solid' | 'gradient' | 'predefined'>('solid');

  const handleColorChange = (type: 'backgroundColor' | 'textColor' | 'headingColor', value: string) => {
    if (type === 'backgroundColor' && colorMode === 'gradient') {
      // Remove solid background color when using gradient
      const { backgroundColor, ...rest } = block.style;
      updateStyle({ ...rest, backgroundGradient: value });
    } else {
      updateStyle({ [type]: value });
    }
  };

  const handlePredefinedColorSelect = (color: string) => {
    const { backgroundGradient, ...rest } = block.style;
    updateStyle({ ...rest, backgroundColor: color });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h5 className="text-sm font-medium">Cores e Estilos</h5>
        
        <FontPicker style={block.style} updateStyle={updateStyle} />
        
        <div className="space-y-2">
          <Label>Estilo de fundo</Label>
          <ToggleGroup type="single" value={colorMode} onValueChange={(value: 'solid' | 'gradient' | 'predefined') => setColorMode(value)}>
            <ToggleGroupItem value="solid" aria-label="Cor sólida">
              <Paint className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="gradient" aria-label="Gradiente">
              <Gradient className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="predefined" aria-label="Cores pré-definidas">
              <GalleryThumbnails className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {colorMode === 'solid' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`bgcolor-${block.id}`}>Cor de fundo</Label>
              <div className="flex items-center mt-1">
                <Input 
                  id={`bgcolor-${block.id}`}
                  type="color" 
                  value={block.style?.backgroundColor || '#ffffff'} 
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`textcolor-${block.id}`}>Cor do texto</Label>
              <div className="flex items-center mt-1">
                <Input 
                  id={`textcolor-${block.id}`}
                  type="color" 
                  value={block.style?.textColor || '#000000'} 
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
          </div>
        )}

        {colorMode === 'gradient' && (
          <GradientPicker style={block.style} updateStyle={updateStyle} />
        )}

        {colorMode === 'predefined' && (
          <div className="space-y-2">
            <Label>Cores pré-definidas</Label>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(predefinedColors).map(([name, color]) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={name}
                  onClick={() => handlePredefinedColorSelect(color)}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="col-span-2">
          <Label htmlFor={`headingcolor-${block.id}`}>Cor dos títulos</Label>
          <div className="flex items-center mt-1">
            <Input 
              id={`headingcolor-${block.id}`}
              type="color" 
              value={block.style?.headingColor || '#000000'} 
              onChange={(e) => handleColorChange('headingColor', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickers;
