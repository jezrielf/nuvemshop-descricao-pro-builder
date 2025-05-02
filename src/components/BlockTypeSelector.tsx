
import React from 'react';
import { BlockType } from '@/types/editor';
import { blockTypeInfo } from '@/utils/blockTypeInfo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as LucideIcons from 'lucide-react';

interface BlockTypeSelectorProps {
  onSelectType: (type: BlockType) => void;
}

const BlockTypeSelector: React.FC<BlockTypeSelectorProps> = ({ onSelectType }) => {
  // Mapping Portuguese icon names to English Lucide names
  const iconMapping: Record<string, string> = {
    'relogio': 'Clock',
    'gota': 'Droplet',
    'estrela': 'Star',
    'filtro': 'Filter',
    'escudo': 'ShieldCheck',
    'verificado': 'CheckCircle',
    'raio': 'Zap',
    'lixo': 'Trash',
    'ajustes': 'Settings',
    'controles': 'Sliders',
    'positivo': 'ThumbsUp',
  };
  
  // Helper function to dynamically render Lucide icons by name
  const renderIcon = (iconName: string) => {
    // Check if we have a Portuguese name to map
    const englishName = iconMapping[iconName] || iconName;
    
    // Convert to PascalCase for Lucide icon names
    const iconKey = englishName.split('-').map(
      part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join('');
    
    // @ts-ignore - Dynamically accessing icons from lucide-react
    const IconComponent = LucideIcons[iconKey];
    
    return IconComponent ? <IconComponent size={16} /> : null;
  };
  
  return (
    <div className="space-y-1">
      <h3 className="text-[10px] font-medium mb-1">Escolha um tipo de bloco</h3>
      <ScrollArea className="h-[280px] pr-3">
        <div className="grid grid-cols-3 gap-1">
          {Object.keys(blockTypeInfo).map((type) => {
            const blockType = type as BlockType;
            const info = blockTypeInfo[blockType];
            return (
              <Button
                key={type}
                variant="outline"
                className="flex flex-col items-center justify-center h-12 text-center p-1"
                onClick={() => onSelectType(blockType)}
              >
                <div className="mb-0.5 text-[10px]">{renderIcon(info.icon)}</div>
                <span className="text-[10px]">{info.name}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BlockTypeSelector;
