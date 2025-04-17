
import React from 'react';
import { FeaturesBlock as FeaturesBlockType } from '@/types/editor';
import BlockWrapper from './BlockWrapper';
import { useEditorStore } from '@/store/editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface FeaturesBlockProps {
  block: FeaturesBlockType;
  isPreview?: boolean;
}

const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ block, isPreview = false }) => {
  const { updateBlock, selectedBlockId } = useEditorStore();
  const isEditing = selectedBlockId === block.id && !isPreview;
  
  const handleUpdateHeading = (heading: string) => {
    updateBlock(block.id, { heading });
  };
  
  const handleAddFeature = () => {
    const newFeature = {
      id: uuidv4(),
      title: 'Novo Recurso',
      description: 'Descrição do recurso',
      icon: '✓'
    };
    
    updateBlock(block.id, {
      features: [...(block.features || []), newFeature]
    });
  };
  
  const handleUpdateFeature = (featureId: string, field: 'title' | 'description' | 'icon', value: string) => {
    const updatedFeatures = block.features.map(feature => {
      if (feature.id === featureId) {
        return { ...feature, [field]: value };
      }
      return feature;
    });
    
    updateBlock(block.id, { features: updatedFeatures });
  };
  
  const handleRemoveFeature = (featureId: string) => {
    const updatedFeatures = block.features.filter(feature => feature.id !== featureId);
    updateBlock(block.id, { features: updatedFeatures });
  };
  
  // Create responsive column classes for the preview
  const getColumnsClass = () => {
    // Convert columns from ColumnLayout to a number for grid display
    if (typeof block.columns === 'number') {
      const cols = Math.min(Math.max(block.columns, 1), 4);
      return `md:grid-cols-${cols}`;
    }
    
    // Handle string-based column layouts
    switch(block.columns) {
      case 'full': return ''; // Single column
      case '1/2': return 'md:grid-cols-2';
      case '1/3': return 'md:grid-cols-3';
      case '2/3': return 'md:grid-cols-2';
      case '1/4': return 'md:grid-cols-4';
      case '3/4': return '';
      default: return ''; // Default to single column
    }
  };
  
  // Preview mode
  if (isPreview) {
    return (
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">{block.heading}</h2>
        <div className={`grid grid-cols-1 ${getColumnsClass()} gap-6`}>
          {block.features && block.features.map(feature => (
            <div key={feature.id} className="p-4 border rounded-md">
              <div className={`${block.layout === 'vertical' ? 'text-center mb-2' : 'flex items-start'}`}>
                {feature.icon && (
                  <div className={`text-2xl ${block.layout === 'vertical' ? 'mb-2' : 'mr-3'}`}>
                    {feature.icon}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
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
          <h3 className="text-sm font-medium">Recursos</h3>
          
          {block.features && block.features.map((feature, index) => (
            <div key={feature.id} className="p-3 border rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Recurso {index + 1}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFeature(feature.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs mb-1">Ícone</label>
                  <Input
                    value={feature.icon}
                    onChange={(e) => handleUpdateFeature(feature.id, 'icon', e.target.value)}
                    placeholder="Exemplo: ✓, ★, ✚, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1">Título</label>
                  <Input
                    value={feature.title}
                    onChange={(e) => handleUpdateFeature(feature.id, 'title', e.target.value)}
                    placeholder="Título do recurso"
                  />
                </div>
                
                <div>
                  <label className="block text-xs mb-1">Descrição</label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => handleUpdateFeature(feature.id, 'description', e.target.value)}
                    placeholder="Descrição do recurso"
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
            onClick={handleAddFeature}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Adicionar Recurso
          </Button>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default FeaturesBlock;
