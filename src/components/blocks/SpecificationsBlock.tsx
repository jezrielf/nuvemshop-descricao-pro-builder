
import React from 'react';
import { SpecificationsBlock as SpecBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface SpecificationsBlockProps {
  block: SpecBlockType;
  isPreview?: boolean;
}

const SpecificationsBlock: React.FC<SpecificationsBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleAddSpec = () => {
    const newSpec = {
      id: uuidv4(),
      name: 'Nova Especificação',
      value: 'Valor'
    };
    
    updateBlock(block.id, {
      specs: [...(block.specs || []), newSpec]
    });
  };
  
  const handleUpdateSpec = (specId: string, field: 'name' | 'value', value: string) => {
    const updatedSpecs = block.specs.map(spec => {
      if (spec.id === specId) {
        return { ...spec, [field]: value };
      }
      return spec;
    });
    
    updateBlock(block.id, { specs: updatedSpecs });
  };
  
  const handleRemoveSpec = (specId: string) => {
    const updatedSpecs = block.specs.filter(spec => spec.id !== specId);
    updateBlock(block.id, { specs: updatedSpecs });
  };
  
  // Create responsive column classes for two-column layout on desktop
  const getColumnsClass = () => {
    if (typeof block.columns === 'number' || typeof block.columns === 'string') {
      // Convert to number if it's a string number or already a number
      const columnsNumber = typeof block.columns === 'string' 
        ? parseInt(block.columns, 10) 
        : block.columns;
      
      // Check if columnsNumber is NaN or less than or equal to 1
      if (isNaN(columnsNumber) || columnsNumber <= 1) {
        return '';
      }
      return 'md:grid-cols-2';
    }
    return '';
  };
  
  // Preview mode
  if (isPreview) {
    // Check if columns is a number or can be converted to a number
    const columnsNumber = typeof block.columns === 'number' 
      ? block.columns 
      : typeof block.columns === 'string' && !isNaN(parseInt(block.columns, 10))
        ? parseInt(block.columns, 10)
        : 1;
    
    if (columnsNumber > 1) {
      // Two-column layout for specifications
      return (
        <div className="w-full p-4">
          <h2 className="text-2xl font-bold mb-4">{block.heading}</h2>
          <div className={`grid grid-cols-1 ${getColumnsClass()} gap-4`}>
            {block.specs && block.specs.map((spec) => (
              <div key={spec.id} className="border rounded-md p-3">
                <div className="font-medium">{spec.name}</div>
                <div>{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      // Traditional table layout for single column
      return (
        <div className="w-full p-4">
          <h2 className="text-2xl font-bold mb-4">{block.heading}</h2>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <tbody>
                {block.specs && block.specs.map((spec, index) => (
                  <tr key={spec.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3 border-b font-medium">{spec.name}</td>
                    <td className="p-3 border-b">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
  
  // Edit mode
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Título da Seção</label>
          <Input
            value={block.heading}
            onChange={(e) => handleUpdateHeading(e.target.value)}
            placeholder="Digite o título da seção"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Especificações</h3>
          
          {block.specs && block.specs.map((spec, index) => (
            <div key={spec.id} className="p-3 border rounded-md bg-gray-50 flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-xs mb-1">Nome</label>
                <Input
                  value={spec.name}
                  onChange={(e) => handleUpdateSpec(spec.id, 'name', e.target.value)}
                  placeholder="Nome da especificação"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-xs mb-1">Valor</label>
                <Input
                  value={spec.value}
                  onChange={(e) => handleUpdateSpec(spec.id, 'value', e.target.value)}
                  placeholder="Valor da especificação"
                />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                className="mt-4"
                onClick={() => handleRemoveSpec(spec.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={handleAddSpec}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Adicionar Especificação
          </Button>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default SpecificationsBlock;
