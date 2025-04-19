
import React from 'react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editor';
import { BlockType, ColumnLayout } from '@/types/editor';
import { PlusCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import BlockTypeSelector from './BlockTypeSelector';
import BlockConfigForm from './BlockConfigForm';
import { blockTypeInfo } from '@/utils/blockTypeInfo';
import { createBlock } from '@/utils/blockCreators';

const AddBlock: React.FC = () => {
  const { addBlock } = useEditorStore();
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<BlockType | null>(null);
  const [columns, setColumns] = React.useState<ColumnLayout>('full');
  const { toast } = useToast();
  
  const handleAddBlock = () => {
    if (!selectedType) return;
    
    try {
      const blockData = createBlock(selectedType, columns);
      
      if (blockData) {
        // Convert this block to the expected type for addBlock
        const blockToAdd = {
          ...blockData,
          type: selectedType,
          title: blockData.title,
          columns: columns,
          visible: true
        };
        
        addBlock(blockToAdd);
        
        toast({
          title: "Bloco adicionado",
          description: `${blockTypeInfo[selectedType].name} foi adicionado à sua descrição.`,
        });
        
        setSelectedType(null);
        setColumns('full');
        setOpen(false);
      }
    } catch (error) {
      console.error('Error creating block:', error);
      
      toast({
        title: "Erro ao adicionar bloco",
        description: `Não foi possível criar o bloco do tipo ${selectedType}.`,
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="my-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full border-dashed flex items-center justify-center py-6">
            <PlusCircle className="mr-2 h-5 w-5" />
            Adicionar Bloco
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {!selectedType ? (
            <BlockTypeSelector onSelectType={setSelectedType} />
          ) : (
            <BlockConfigForm 
              selectedType={selectedType}
              columns={columns}
              onColumnsChange={setColumns}
              onBack={() => setSelectedType(null)}
              onAddBlock={handleAddBlock}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddBlock;
