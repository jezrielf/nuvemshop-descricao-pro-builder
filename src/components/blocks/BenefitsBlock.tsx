
import React from 'react';
import { BenefitsBlock as BenefitsBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import AIContentGenerator from '../AIGenerator/AIContentGenerator';
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
    const newBenefits = [...(block.benefits || []), { id: uuidv4(), title: 'Novo Benefício', description: 'Descrição do benefício' }];
    updateBlock(block.id, { benefits: newBenefits });
  };
  
  const handleRemoveBenefit = (index: number) => {
    const newBenefits = [...(block.benefits || [])];
    newBenefits.splice(index, 1);
    updateBlock(block.id, { benefits: newBenefits });
  };
  
  const handleUpdateBenefitTitle = (index: number, title: string) => {
    const newBenefits = [...(block.benefits || [])];
    newBenefits[index] = { ...newBenefits[index], title };
    updateBlock(block.id, { benefits: newBenefits });
  };
  
  const handleUpdateBenefitDescription = (index: number, description: string) => {
    const newBenefits = [...(block.benefits || [])];
    newBenefits[index] = { ...newBenefits[index], description };
    updateBlock(block.id, { benefits: newBenefits });
  };
  
  // Handler para benefícios gerados por IA
  const handleGeneratedBenefits = (content: string) => {
    try {
      let benefitsArray = JSON.parse(content);
      
      // Garantir que cada benefício tem um ID
      benefitsArray = benefitsArray.map((benefit: any) => {
        if (!benefit.id) {
          return { ...benefit, id: uuidv4() };
        }
        return benefit;
      });
      
      updateBlock(block.id, { benefits: benefitsArray });
    } catch (e) {
      console.error("Erro ao processar benefícios gerados:", e);
    }
  };
  
  // Classes de grid responsivas baseadas no número de colunas
  const getGridClasses = () => {
    if (!isPreview) return 'grid-cols-1';
    
    switch (block.columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1';
    }
  };
  
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{block.heading}</h2>
          <div className={`grid ${getGridClasses()} gap-6`}>
            {block.benefits && block.benefits.map((benefit, index) => (
              <div key={benefit.id || index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <BlockWrapper block={block} isEditing={isEditing}>
      <div className="p-4 border rounded-md">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium">Título</label>
            </div>
            <Input
              value={block.heading}
              onChange={(e) => handleUpdateHeading(e.target.value)}
              placeholder="Digite o título dos benefícios"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Benefícios</h3>
            <AIContentGenerator 
              onGeneratedContent={handleGeneratedBenefits}
              type="benefits"
              placeholder="Descreva seu produto para gerar benefícios"
            />
          </div>
          
          <div className="space-y-4 mt-2">
            {block.benefits && block.benefits.map((benefit, index) => (
              <div key={benefit.id || index} className="border p-3 rounded-md bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">Benefício {index + 1}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleRemoveBenefit(index)}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Título</label>
                    <Input
                      value={benefit.title}
                      onChange={(e) => handleUpdateBenefitTitle(index, e.target.value)}
                      placeholder="Título do benefício"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Descrição</label>
                    <Textarea
                      value={benefit.description}
                      onChange={(e) => handleUpdateBenefitDescription(index, e.target.value)}
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
              className="w-full flex items-center justify-center" 
              onClick={handleAddBenefit}
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Adicionar Benefício
            </Button>
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default BenefitsBlock;
