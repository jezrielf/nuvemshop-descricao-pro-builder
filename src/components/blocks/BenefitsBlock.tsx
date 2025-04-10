
import React from 'react';
import { BenefitsBlock as BenefitsBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface BenefitsBlockProps {
  block: BenefitsBlockType;
  isPreview?: boolean;
}

const BenefitsBlock: React.FC<BenefitsBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleAddBenefit = () => {
    const newBenefit = {
      id: uuidv4(),
      title: 'Novo Benefício',
      description: 'Descrição do benefício',
      icon: 'check'
    };
    
    updateBlock(block.id, {
      benefits: [...(block.benefits || []), newBenefit]
    });
  };
  
  const handleUpdateBenefit = (benefitId: string, field: 'title' | 'description' | 'icon', value: string) => {
    const updatedBenefits = block.benefits.map(benefit => {
      if (benefit.id === benefitId) {
        return { ...benefit, [field]: value };
      }
      return benefit;
    });
    
    updateBlock(block.id, { benefits: updatedBenefits });
  };
  
  const handleRemoveBenefit = (benefitId: string) => {
    const updatedBenefits = block.benefits.filter(benefit => benefit.id !== benefitId);
    updateBlock(block.id, { benefits: updatedBenefits });
  };
  
  // Create responsive column classes
  const getColumnsClass = () => {
    switch (block.columns) {
      case 2: return 'md:grid-cols-2';
      case 3: return 'md:grid-cols-3';
      case 4: return 'md:grid-cols-4';
      default: return '';
    }
  };
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">{block.heading}</h2>
        <div className={`grid grid-cols-1 ${getColumnsClass()} gap-6`}>
          {block.benefits && block.benefits.map(benefit => (
            <div key={benefit.id} className="p-4 border rounded-md">
              <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
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
          <h3 className="text-sm font-medium">Benefícios</h3>
          
          {block.benefits && block.benefits.map((benefit, index) => (
            <div key={benefit.id} className="p-3 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Benefício {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveBenefit(benefit.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1">Título</label>
                  <Input
                    value={benefit.title}
                    onChange={(e) => handleUpdateBenefit(benefit.id, 'title', e.target.value)}
                    placeholder="Título do benefício"
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1">Descrição</label>
                  <Textarea
                    value={benefit.description}
                    onChange={(e) => handleUpdateBenefit(benefit.id, 'description', e.target.value)}
                    placeholder="Descrição do benefício"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            onClick={handleAddBenefit}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Adicionar Benefício
          </Button>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default BenefitsBlock;
