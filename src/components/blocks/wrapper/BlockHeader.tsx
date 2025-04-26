
import React, { useState } from 'react';
import { BlockBase } from '@/types/editor';
import { Grip, Eye, EyeOff, Copy, Trash, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editor';
import StyleControls from './StyleControls';
import { getBlockTypeDisplayName } from '@/utils/blockTypeInfo';

interface BlockHeaderProps {
  block: BlockBase;
}

const BlockHeader: React.FC<BlockHeaderProps> = ({ block }) => {
  const { updateBlock, duplicateBlock, deleteBlock } = useEditorStore();
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const toggleVisibility = () => {
    updateBlock(block.id, { visible: !block.visible });
  };
  
  const handleDuplicate = () => {
    duplicateBlock(block.id);
  };
  
  const handleDelete = () => {
    deleteBlock(block.id);
  };
  
  return (
    <div className="flex items-center justify-between py-1 px-2 bg-gray-100 rounded-t-lg border-b mb-2">
      <div className="flex items-center">
        <Grip className="h-4 w-4 mr-2 text-gray-400 cursor-move" />
        <div className="text-sm font-medium">{block.title || getBlockTypeDisplayName(block.type)}</div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleVisibility}
          title={block.visible ? "Esconder" : "Mostrar"}
        >
          {block.visible ? 
            <Eye className="h-4 w-4" /> : 
            <EyeOff className="h-4 w-4" />
          }
        </Button>
        
        <StyleControls block={block} />
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleDuplicate}
          title="Duplicar"
        >
          <Copy className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleDelete}
          title="Excluir"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default BlockHeader;
