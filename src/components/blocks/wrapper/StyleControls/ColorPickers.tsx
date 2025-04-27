
import React from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FontPicker from './FontPicker';
import GradientColorPicker from './GradientColorPicker';
import { PaintBucket, Palette, Grid2X2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

// Predefined solid colors with better organization
const predefinedColors = {
  // Neutrals
  'Pure White': '#FFFFFF',
  'Light Gray': '#F1F1F1',
  'Neutral Gray': '#8E9196',
  'Charcoal Gray': '#403E43',
  'Dark Charcoal': '#221F26',
  
  // Purples
  'Light Purple': '#D6BCFA',
  'Soft Purple': '#E5DEFF',
  'Primary Purple': '#9b87f5',
  'Secondary Purple': '#7E69AB',
  'Dark Purple': '#1A1F2C',
  
  // Blues
  'Soft Blue': '#D3E4FD',
  'Sky Blue': '#33C3F0',
  'Ocean Blue': '#0EA5E9',
  
  // Warm Colors
  'Soft Orange': '#FEC6A1',
  'Soft Pink': '#FFDEE2',
  'Soft Yellow': '#FEF7CD',
  
  // Nature Colors
  'Soft Green': '#F2FCE2',
};

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  const handleColorChange = (type: 'backgroundColor' | 'textColor' | 'headingColor', value: string) => {
    // If changing background color, clear any gradient
    if (type === 'backgroundColor') {
      const { backgroundGradient, ...rest } = block.style;
      updateStyle({ ...rest, [type]: value });
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
      <div className="space-y-4">
        <h5 className="text-sm font-medium">Cores e Estilos</h5>
        
        <FontPicker style={block.style} updateStyle={updateStyle} />
        
        <Tabs defaultValue="solid" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="solid" className="flex items-center gap-1">
                    <PaintBucket className="h-4 w-4" />
                    <span>Sólido</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  Cor sólida de fundo
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="gradient" className="flex items-center gap-1">
                    <Palette className="h-4 w-4" />
                    <span>Gradiente</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  Gradiente personalizado
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <TabsTrigger value="predefined" className="flex items-center gap-1">
                    <Grid2X2 className="h-4 w-4" />
                    <span>Paleta</span>
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  Cores pré-definidas
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TabsList>
          
          <TabsContent value="solid" className="space-y-4 pt-4">
            <div>
              <Label htmlFor={`bgcolor-${block.id}`}>Cor de fundo</Label>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: block.style?.backgroundColor || '#ffffff' }}
                />
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
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: block.style?.textColor || '#000000' }}
                />
                <Input 
                  id={`textcolor-${block.id}`}
                  type="color" 
                  value={block.style?.textColor || '#000000'} 
                  onChange={(e) => handleColorChange('textColor', e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor={`headingcolor-${block.id}`}>Cor dos títulos</Label>
              <div className="flex items-center gap-2 mt-1">
                <div 
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: block.style?.headingColor || '#000000' }}
                />
                <Input 
                  id={`headingcolor-${block.id}`}
                  type="color" 
                  value={block.style?.headingColor || '#000000'} 
                  onChange={(e) => handleColorChange('headingColor', e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="gradient" className="space-y-4 pt-4">
            <GradientColorPicker style={block.style} updateStyle={updateStyle} />
          </TabsContent>
          
          <TabsContent value="predefined" className="pt-4">
            <div className="space-y-3">
              <div>
                <Label>Cores pré-definidas</Label>
                <div className="grid grid-cols-5 gap-3 mt-2">
                  {Object.entries(predefinedColors).map(([name, color]) => (
                    <TooltipProvider key={color}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="w-full h-10 rounded border hover:scale-105 transition-transform"
                            style={{ backgroundColor: color }}
                            onClick={() => handlePredefinedColorSelect(color)}
                            type="button"
                          />
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                          {name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                <div className="text-sm font-medium mb-1">Texto e títulos</div>
                <div className="flex gap-2">
                  <div>
                    <Label htmlFor={`textcolor-predefined-${block.id}`}>Cor do texto</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: block.style?.textColor || '#000000' }}
                      />
                      <Input 
                        id={`textcolor-predefined-${block.id}`}
                        type="color" 
                        value={block.style?.textColor || '#000000'} 
                        onChange={(e) => handleColorChange('textColor', e.target.value)}
                        className="h-7 w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`headingcolor-predefined-${block.id}`}>Cor dos títulos</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: block.style?.headingColor || '#000000' }}
                      />
                      <Input 
                        id={`headingcolor-predefined-${block.id}`}
                        type="color" 
                        value={block.style?.headingColor || '#000000'} 
                        onChange={(e) => handleColorChange('headingColor', e.target.value)}
                        className="h-7 w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ColorPickers;
