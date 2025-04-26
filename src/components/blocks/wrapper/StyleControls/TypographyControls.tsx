
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

// List of popular Google fonts
const googleFonts = [
  { name: 'Sans-serif (padrão)', value: 'sans' },
  { name: 'Serif', value: 'serif' },
  { name: 'Monospace', value: 'mono' },
  { name: 'Roboto', value: 'Roboto' },
  { name: 'Open Sans', value: 'Open Sans' },
  { name: 'Lato', value: 'Lato' },
  { name: 'Montserrat', value: 'Montserrat' },
  { name: 'Raleway', value: 'Raleway' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Oswald', value: 'Oswald' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro' },
  { name: 'Playfair Display', value: 'Playfair Display' },
  { name: 'Ubuntu', value: 'Ubuntu' },
  { name: 'Merriweather', value: 'Merriweather' },
];

const TypographyControls: React.FC<TypographyControlsProps> = ({ block, updateStyle }) => {
  // Add font to document head if it's a Google Font
  React.useEffect(() => {
    if (block.style?.fontFamily && block.style.fontFamily !== 'sans' && 
        block.style.fontFamily !== 'serif' && block.style.fontFamily !== 'mono') {
      
      const fontName = block.style.fontFamily;
      const fontLink = document.createElement('link');
      fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@400;700&display=swap`;
      fontLink.rel = 'stylesheet';
      
      // Check if this font is already loaded
      const existingLink = document.querySelector(`link[href="${fontLink.href}"]`);
      if (!existingLink) {
        document.head.appendChild(fontLink);
      }
    }
  }, [block.style?.fontFamily]);

  const handleFontFamilyChange = (value: string) => {
    console.log('Changing font family to:', value);
    updateStyle({ fontFamily: value });
  };
  
  const handleFontSizeChange = (value: string) => {
    console.log('Changing font size to:', value);
    updateStyle({ fontSize: value });
  };
  
  const handleTextAlignChange = (value: string) => {
    console.log('Changing text align to:', value);
    // Ensure the value is one of the allowed types for textAlign
    const textAlign = value as 'left' | 'center' | 'right' | 'justify';
    updateStyle({ textAlign });
  };
  
  const handleFontWeightChange = (value: string) => {
    console.log('Changing font weight to:', value);
    updateStyle({ fontWeight: value });
  };
  
  const handleFontStyleChange = (value: string) => {
    console.log('Changing font style to:', value);
    updateStyle({ fontStyle: value });
  };
  
  const handleTextDecorationChange = (value: string) => {
    console.log('Changing text decoration to:', value);
    updateStyle({ textDecoration: value });
  };
  
  const handleHeadingWeightChange = (value: string) => {
    console.log('Changing heading weight to:', value);
    updateStyle({ headingWeight: value });
  };
  
  return (
    <div className="space-y-2">
      <h5 className="text-sm font-medium">Tipografia</h5>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="fontFamily">Família da fonte</Label>
          <Select 
            value={block.style?.fontFamily || 'sans'} 
            onValueChange={handleFontFamilyChange}
          >
            <SelectTrigger id="fontFamily">
              <SelectValue placeholder="Família da fonte" />
            </SelectTrigger>
            <SelectContent>
              {googleFonts.map((font) => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={font.value !== 'sans' && font.value !== 'serif' && font.value !== 'mono' ? 
                    { fontFamily: font.value } : undefined}
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="fontSize">Tamanho da fonte</Label>
          <Select 
            value={block.style?.fontSize || 'base'} 
            onValueChange={handleFontSizeChange}
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
          onValueChange={handleTextAlignChange}
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
          <ToggleGroup type="single" value={block.style?.fontWeight || 'normal'} onValueChange={handleFontWeightChange}>
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
          <ToggleGroup type="single" value={block.style?.fontStyle || 'normal'} onValueChange={handleFontStyleChange}>
            <ToggleGroupItem value="normal" aria-label="Normal">
              <span className="mr-2">Aa</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Itálico">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <ToggleGroup type="single" value={block.style?.textDecoration || 'none'} onValueChange={handleTextDecorationChange}>
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
          onValueChange={handleHeadingWeightChange}
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
