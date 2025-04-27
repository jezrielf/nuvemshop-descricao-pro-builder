
import React from 'react';
import { BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FontPickerProps {
  style: BlockStyle;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

const googleFonts = {
  'default': 'Sistema padrão',
  "'Roboto', sans-serif": 'Roboto',
  "'Open Sans', sans-serif": 'Open Sans',
  "'Lato', sans-serif": 'Lato',
  "'Montserrat', sans-serif": 'Montserrat',
  "'Playfair Display', serif": 'Playfair Display',
  "'Poppins', sans-serif": 'Poppins',
  "'Oswald', sans-serif": 'Oswald',
  "'Source Sans Pro', sans-serif": 'Source Sans Pro',
};

const FontPicker: React.FC<FontPickerProps> = ({ style, updateStyle }) => {
  const handleFontChange = (value: string) => {
    if (value === 'default') {
      const { fontFamily, ...rest } = style;
      updateStyle(rest);
    } else {
      updateStyle({ fontFamily: value });
    }
  };

  return (
    <div className="space-y-2">
      <Label>Fonte</Label>
      <Select
        value={style.fontFamily || 'default'}
        onValueChange={handleFontChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione uma fonte" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(googleFonts).map(([fontFamily, name]) => (
            <SelectItem
              key={fontFamily}
              value={fontFamily}
              style={{ fontFamily }}
              className="text-base py-2"
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontPicker;
