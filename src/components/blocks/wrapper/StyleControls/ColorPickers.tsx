
import React, { useState } from 'react';
import { BlockBase, BlockStyle } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (updates: Partial<BlockStyle>) => void;
}

// Predefined gradient list
const gradients = [
  { name: 'Sunset', value: 'linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)' },
  { name: 'Blue Lagoon', value: 'linear-gradient(90deg, #65c7f7 0%, #0052d4 100%)' },
  { name: 'Warm Flame', value: 'linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)' },
  { name: 'Night Fade', value: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' },
  { name: 'Spring Warmth', value: 'linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)' },
  { name: 'Deep Blue', value: 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)' },
  { name: 'Sunny Morning', value: 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)' },
  { name: 'Citrus Peel', value: 'linear-gradient(90deg, hsla(59, 86%, 68%, 1) 0%, hsla(134, 36%, 53%, 1) 100%)' },
  { name: 'Ocean View', value: 'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)' },
  { name: 'Purple Haze', value: 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)' },
  { name: 'Nature Green', value: 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)' },
  { name: 'Dusty Rose', value: 'linear-gradient(90deg, rgb(245,152,168) 0%, rgb(246,237,178) 100%)' },
];

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  const [gradientType, setGradientType] = useState('linear');
  const [gradientDirection, setGradientDirection] = useState('90deg');
  const [color1, setColor1] = useState('#ff9a9e');
  const [color2, setColor2] = useState('#fad0c4');
  
  const handleColorChange = (type: 'backgroundColor' | 'textColor' | 'headingColor', value: string) => {
    console.log(`Updated ${type} to ${value} for block ${block.id}`);
    updateStyle({ [type]: value });
  };

  const handleGradientChange = (gradient: string) => {
    updateStyle({ backgroundColor: gradient });
  };
  
  const buildCustomGradient = () => {
    const gradient = `${gradientType}-gradient(${gradientDirection}, ${color1} 0%, ${color2} 100%)`;
    handleGradientChange(gradient);
  };

  return (
    <div className="space-y-3">
      <h5 className="text-sm font-medium">Cores</h5>
      
      <Tabs defaultValue="solid" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solid">Cores Sólidas</TabsTrigger>
          <TabsTrigger value="gradient">Gradientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solid">
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <Label htmlFor={`bgcolor-${block.id}`}>Cor de fundo</Label>
              <div className="flex items-center mt-1">
                <Input 
                  id={`bgcolor-${block.id}`}
                  type="color" 
                  value={block.style?.backgroundColor?.startsWith('#') ? block.style?.backgroundColor : '#ffffff'} 
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
        </TabsContent>
        
        <TabsContent value="gradient" className="pt-2 space-y-4">
          <div>
            <Label>Gradientes Predefinidos</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {gradients.map((gradient, index) => (
                <div 
                  key={index}
                  className="h-10 rounded cursor-pointer transition-transform hover:scale-105 hover:shadow-md"
                  style={{ background: gradient.value }}
                  onClick={() => handleGradientChange(gradient.value)}
                  title={gradient.name}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Gradiente Personalizado</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="color1" className="text-xs">Cor 1</Label>
                <Input 
                  id="color1" 
                  type="color" 
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="h-8 w-full"
                />
              </div>
              <div>
                <Label htmlFor="color2" className="text-xs">Cor 2</Label>
                <Input 
                  id="color2" 
                  type="color" 
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="h-8 w-full"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="gradientType" className="text-xs">Tipo</Label>
                <select
                  id="gradientType"
                  value={gradientType}
                  onChange={(e) => setGradientType(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="gradientDirection" className="text-xs">Direção</Label>
                <select
                  id="gradientDirection"
                  value={gradientDirection}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                >
                  <option value="90deg">→ Direita</option>
                  <option value="270deg">← Esquerda</option>
                  <option value="0deg">↑ Cima</option>
                  <option value="180deg">↓ Baixo</option>
                  <option value="45deg">↗ Diagonal</option>
                  <option value="135deg">↘ Diagonal</option>
                </select>
              </div>
            </div>
            
            <div className="mt-2 h-10 rounded" style={{ background: `${gradientType}-gradient(${gradientDirection}, ${color1} 0%, ${color2} 100%)` }}></div>
            
            <Button onClick={buildCustomGradient} className="w-full mt-2">
              Aplicar Gradiente
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColorPickers;
