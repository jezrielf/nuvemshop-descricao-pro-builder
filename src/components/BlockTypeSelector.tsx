
import React from 'react';
import { BlockType } from '@/types/editor';
import { blockTypeInfo } from '@/utils/blockTypeInfo';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BlockTypeSelectorProps {
  onSelectType: (type: BlockType) => void;
}

const BlockTypeSelector: React.FC<BlockTypeSelectorProps> = ({ onSelectType }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-medium mb-2">Escolha um tipo de bloco</h3>
      <ScrollArea className="h-[300px] pr-3">
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(blockTypeInfo).map((type) => {
            const blockType = type as BlockType;
            const info = blockTypeInfo[blockType];
            return (
              <Button
                key={type}
                variant="outline"
                className="flex flex-col items-center justify-center h-14 text-center p-1"
                onClick={() => onSelectType(blockType)}
              >
                <div className="mb-0.5">{info.icon}</div>
                <span className="text-[11px]">{info.name}</span>
              </Button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BlockTypeSelector;
