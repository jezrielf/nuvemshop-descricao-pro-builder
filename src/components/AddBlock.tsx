
import React from 'react';
import { useEditorStore } from '@/store/editor';
import BlockTypeSelector from './BlockTypeSelector';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BlockType } from '@/types/editor';
import { blockTypeInfo } from '@/utils/blockTypeInfo';

const AddBlock: React.FC = () => {
  const { addBlock } = useEditorStore();

  const handleSelectType = (type: BlockType) => {
    const info = blockTypeInfo[type];
    addBlock({
      type,
      title: info.name,
      columns: 'full' as const,
      visible: true
    });
  };

  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="text-center">
        <BlockTypeSelector onSelectType={handleSelectType} />
        <p className="text-xs text-gray-500 mt-2">
          Escolha um tipo de bloco para adicionar conteúdo à sua descrição
        </p>
      </div>
    </div>
  );
};

export default AddBlock;
