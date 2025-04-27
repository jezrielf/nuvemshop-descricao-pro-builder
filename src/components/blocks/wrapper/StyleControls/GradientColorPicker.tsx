
import React, { useState } from 'react';
import { BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GradientColorPickerProps {
  style: BlockStyle;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const GRADIENT_DIRECTIONS = [
  { value: 'to right', label: 'Horizontal →' },
  { value: 'to left', label: '← Horizontal' },
  { value: 'to bottom', label: 'Vertical ↓' },
  { value: 'to top', label: '↑ Vertical' },
  { value: 'to bottom right', label: 'Diagonal ↘' },
  { value: 'to bottom left', label: 'Diagonal ↙' },
  { value: 'to top right', label: 'Diagonal ↗' },
  { value: 'to top left', label: 'Diagonal ↖' },
];

// Predefined gradients as examples
const PRESET_GRADIENTS = {
  sunset: { startColor: '#ee9ca7', endColor: '#ffdde1', direction: 'to right' },
  ocean: { startColor: '#4ac1e0', endColor: '#5d52c7', direction: 'to right' },
  forest: { startColor: '#7cdf7c', endColor: '#c3f386', direction: 'to right' },
  purple: { startColor: '#d386f3', endColor: '#8047b8', direction: 'to right' },
  golden: { startColor: '#e6b980', endColor: '#eacda3', direction: 'to top' },
};

export const GradientColorPicker: React.FC<GradientColorPickerProps> = ({ style, updateStyle }) => {
  // Extract existing gradient values or set defaults
  const currentGradient = style.backgroundGradient || 'linear-gradient(to right, #ee9ca7, #ffdde1)';
  
  // Parse the current gradient to extract colors and direction
  const parseGradient = (gradientStr: string) => {
    const matchDirection = gradientStr.match(/linear-gradient\((to [^,]+)/);
    const matchColors = gradientStr.match(/#[a-f0-9]{6}/gi);
    
    return {
      direction: matchDirection ? matchDirection[1] : 'to right',
      startColor: matchColors && matchColors.length > 0 ? matchColors[0] : '#ee9ca7',
      endColor: matchColors && matchColors.length > 1 ? matchColors[1] : '#ffdde1',
    };
  };
  
  const parsedGradient = parseGradient(currentGradient);
  
  const [gradientDirection, setGradientDirection] = useState(parsedGradient.direction);
  const [startColor, setStartColor] = useState(parsedGradient.startColor);
  const [endColor, setEndColor] = useState(parsedGradient.endColor);
  
  const updateGradient = () => {
    const newGradient = `linear-gradient(${gradientDirection}, ${startColor}, ${endColor})`;
    updateStyle({ backgroundGradient: newGradient });
  };
  
  const handleDirectionChange = (value: string) => {
    setGradientDirection(value);
    setTimeout(updateGradient, 0);
  };
  
  const handleColorChange = (type: 'start' | 'end', value: string) => {
    if (type === 'start') {
      setStartColor(value);
    } else {
      setEndColor(value);
    }
    setTimeout(updateGradient, 0);
  };
  
  const handlePresetSelect = (preset: keyof typeof PRESET_GRADIENTS) => {
    const { startColor, endColor, direction } = PRESET_GRADIENTS[preset];
    setStartColor(startColor);
    setEndColor(endColor);
    setGradientDirection(direction);
    setTimeout(updateGradient, 0);
  };
  
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <div 
          className="h-16 rounded-md border w-full mb-2"
          style={{ background: `linear-gradient(${gradientDirection}, ${startColor}, ${endColor})` }}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <Label htmlFor="startColor">Cor inicial</Label>
          <div className="flex items-center gap-2 mt-1">
            <div 
              className="w-8 h-8 rounded border"
              style={{ backgroundColor: startColor }}
            />
            <Input
              id="startColor"
              type="color"
              value={startColor}
              onChange={(e) => handleColorChange('start', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="endColor">Cor final</Label>
          <div className="flex items-center gap-2 mt-1">
            <div 
              className="w-8 h-8 rounded border"
              style={{ backgroundColor: endColor }}
            />
            <Input
              id="endColor"
              type="color"
              value={endColor}
              onChange={(e) => handleColorChange('end', e.target.value)}
              className="h-8 w-full"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gradientDirection">Direção</Label>
        <Select
          value={gradientDirection}
          onValueChange={handleDirectionChange}
        >
          <SelectTrigger id="gradientDirection">
            <SelectValue placeholder="Selecione a direção" />
          </SelectTrigger>
          <SelectContent>
            {GRADIENT_DIRECTIONS.map((direction) => (
              <SelectItem key={direction.value} value={direction.value}>
                {direction.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label>Gradientes pré-definidos</Label>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(PRESET_GRADIENTS).map(([name, gradient]) => (
            <button
              key={name}
              className="w-8 h-8 rounded border hover:scale-110 transition-transform"
              style={{ background: `linear-gradient(${gradient.direction}, ${gradient.startColor}, ${gradient.endColor})` }}
              title={name.charAt(0).toUpperCase() + name.slice(1)}
              onClick={() => handlePresetSelect(name as keyof typeof PRESET_GRADIENTS)}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientColorPicker;
