
import React from 'react';
import { BlockBase } from '@/types/editor';
import { getBlockTypeDisplayName, blockTypeInfo } from '@/utils/blockTypeInfo';
import { extractBlockTitle, formatBlockTitle } from '@/utils/blockTitleExtractor';
import * as LucideIcons from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface BlockHeaderProps {
  block: BlockBase;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ block }) => {
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
  const renderBlockTypeIcon = (iconName: string) => {
    // Check if we have a Portuguese name to map
    const englishName = iconMapping[iconName] || iconName;
    
    // Convert kebab-case to PascalCase for Lucide icon names
    const iconKey = englishName.split('-').map(
      part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
    ).join('');
    
    // @ts-ignore - Dynamically accessing icons from lucide-react
    const IconComponent = LucideIcons[iconKey];
    
    return IconComponent ? <IconComponent size={16} /> : null;
  };
  
  const blockTypeDisplay = getBlockTypeDisplayName(block.type);
  const blockIcon = blockTypeInfo[block.type].icon;
  
  // Extract block title and format it
  const blockTitle = extractBlockTitle(block as any);
  const displayTitle = formatBlockTitle(blockTypeDisplay, blockTitle);
  const hasLongTitle = blockTitle && blockTitle.length > 25;
  
  return (
    <div className="flex items-center">
      <div className="flex items-center mr-3 flex-1 min-w-0">
        <span className="mr-1.5 flex-shrink-0">
          {renderBlockTypeIcon(blockIcon)}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium truncate">
                {displayTitle}
              </span>
            </TooltipTrigger>
            {hasLongTitle && (
              <TooltipContent side="bottom" align="start" className="max-w-xs">
                <p className="break-words">
                  {blockTypeDisplay} - {blockTitle}
                </p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="ml-auto flex-shrink-0">
        {block.visible ? (
          <Eye size={14} className="text-gray-500" />
        ) : (
          <EyeOff size={14} className="text-gray-400" />
        )}
      </div>
    </div>
  );
};

export default BlockHeader;
