
import React from 'react';
import { useEditorStore } from '@/store/editor';
import BlockTypeSelector from './BlockTypeSelector';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const AddBlock: React.FC = () => {
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="text-center">
        <BlockTypeSelector>
          <Button 
            variant="outline" 
            className="w-full"
            data-testid="add-block-button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Bloco
          </Button>
        </BlockTypeSelector>
        <p className="text-xs text-gray-500 mt-2">
          Escolha um tipo de bloco para adicionar conteúdo à sua descrição
        </p>
      </div>
    </div>
  );
};

export default AddBlock;
