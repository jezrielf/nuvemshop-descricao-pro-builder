
import React, { useState } from 'react';
import { BlockBase } from '@/types/editor';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ColorPickersProps {
  block: BlockBase;
  updateStyle: (styleUpdates: any) => void;
}

// Lista de gradientes pré-definidos
const presetGradients = [
  { name: "Nenhum", value: "none" },
  { name: "Azul", value: "linear-gradient(135deg, #0088cc 0%, #005580 100%)" },
  { name: "Azul Suave", value: "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)" },
  { name: "Cinza", value: "linear-gradient(109.6deg, rgba(240,240,240,1) 11.2%, rgba(250,250,250,1) 91.1%)" },
  { name: "Verde", value: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)" },
  { name: "Verde Suave", value: "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)" },
  { name: "Vermelho", value: "linear-gradient(111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58%)" },
  { name: "Amarelo", value: "linear-gradient(184.1deg, rgba(249,255,182,1) 44.7%, rgba(226,255,172,1) 67.2%)" },
  { name: "Rosa", value: "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)" },
  { name: "Roxo", value: "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)" },
  { name: "Laranja", value: "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)" },
  { name: "Ciano", value: "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)" },
  { name: "Limão", value: "linear-gradient(90deg, hsla(59, 86%, 68%, 1) 0%, hsla(134, 36%, 53%, 1) 100%)" },
  { name: "Sunset", value: "linear-gradient(60deg, #abecd6 0%, #fbed96 100%)" },
];

const ColorPickers: React.FC<ColorPickersProps> = ({ block, updateStyle }) => {
  const [activeTab, setActiveTab] = useState<string>("solid");
  
  const handleBackgroundColorChange = (color: string) => {
    // Se estiver na aba de cor sólida, atualiza backgroundColor e remove gradiente
    if (activeTab === "solid") {
      updateStyle({
        backgroundColor: color,
        backgroundGradient: undefined
      });
    }
  };
  
  const handleGradientSelect = (gradient: string) => {
    // Se for "none", remover backgroundGradient e manter backgroundColor
    if (gradient === "none") {
      updateStyle({
        backgroundGradient: undefined
      });
      return;
    }
    
    // Se for um gradiente válido, atualizar e remover backgroundColor
    updateStyle({
      backgroundGradient: gradient,
      backgroundColor: undefined
    });
  };

  return (
    <div className="space-y-4 pb-4 border-b">
      <h4 className="font-medium text-sm">Cores</h4>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="textColor">Cor do Texto</Label>
          <input 
            type="color" 
            id="textColor" 
            value={block.style?.textColor || '#000000'} 
            onChange={(e) => updateStyle({ textColor: e.target.value })}
            className="h-8 w-full cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <Label>Fundo</Label>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="solid" className="flex-1">Cor Sólida</TabsTrigger>
              <TabsTrigger value="gradient" className="flex-1">Gradiente</TabsTrigger>
            </TabsList>
            
            <TabsContent value="solid" className="pt-2">
              <input 
                type="color" 
                id="backgroundColor" 
                value={block.style?.backgroundColor || '#ffffff'} 
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                className="h-8 w-full cursor-pointer"
              />
            </TabsContent>
            
            <TabsContent value="gradient" className="pt-2">
              <div className="grid grid-cols-2 gap-2">
                {presetGradients.map((gradient, index) => (
                  <div 
                    key={index} 
                    className={`
                      h-10 rounded-md cursor-pointer border transition-all
                      ${block.style?.backgroundGradient === gradient.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
                    `}
                    style={{ 
                      background: gradient.value === 'none' ? '#ffffff' : gradient.value
                    }}
                    onClick={() => handleGradientSelect(gradient.value)}
                  >
                    <div className="h-full w-full flex items-center justify-center">
                      {gradient.value === 'none' && 
                        <span className="text-xs text-gray-500">Nenhum</span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ColorPickers;
