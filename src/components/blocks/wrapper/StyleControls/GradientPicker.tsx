
import React from 'react';
import { BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GradientPickerProps {
  style: BlockStyle;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const predefinedGradients = {
  none: 'Sem gradiente',
  sunset: 'linear-gradient(to right, #ee9ca7, #ffdde1)',
  ocean: 'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)',
  forest: 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)',
  purple: 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)',
  warmth: 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
  golden: 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)',
  sky: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
};

const GradientPicker: React.FC<GradientPickerProps> = ({ style, updateStyle }) => {
  const handleGradientChange = (value: string) => {
    if (value === 'none') {
      // Remove gradient if none is selected
      const { backgroundGradient, ...rest } = style;
      updateStyle(rest);
    } else {
      updateStyle({ backgroundGradient: value });
    }
  };

  return (
    <div className="space-y-2">
      <Label>Gradiente de fundo</Label>
      <Select
        value={style.backgroundGradient || 'none'}
        onValueChange={handleGradientChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione um gradiente" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(predefinedGradients).map(([key, gradient]) => (
            <SelectItem
              key={key}
              value={key === 'none' ? 'none' : gradient}
              className="relative"
            >
              <div className="flex items-center gap-2">
                {key !== 'none' && (
                  <div
                    className="w-6 h-6 rounded border"
                    style={{ background: gradient }}
                  />
                )}
                {key === 'none' ? 'Sem gradiente' : key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default GradientPicker;
