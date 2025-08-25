
import React from 'react';
import { useEditorStore } from '@/store/editor';
import BlockTypeSelector from './BlockTypeSelector';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BlockType, ColumnLayout } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators/createBlock';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

const AddBlock: React.FC = () => {
  const { addBlock } = useEditorStore();
  
  const handleSelectType = (type: BlockType) => {
    try {
      const newBlock = createBlock(type, 'full' as ColumnLayout);
      console.log('Creating new block:', newBlock);
      addBlock(newBlock);
    } catch (error) {
      console.error('Error creating block:', error);
    }
  };
  
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="text-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full"
              data-testid="add-block-button"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Bloco
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <BlockTypeSelector onSelectType={handleSelectType} />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-gray-500 mt-2">
          Escolha um tipo de bloco para adicionar conteúdo à sua descrição
        </p>
      </div>
    </div>
  );
};

export default AddBlock;
