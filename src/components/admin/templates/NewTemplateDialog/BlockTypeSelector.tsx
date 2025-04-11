
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BlockType } from '@/types/editor';

interface BlockTypeSelectorProps {
  blockTypes: BlockType[];
  onAddBlock: (type: BlockType) => void;
}

const BlockTypeSelector: React.FC<BlockTypeSelectorProps> = ({ blockTypes, onAddBlock }) => {
  // Helper function for displaying more readable block type names
  const getBlockTypeName = (type: BlockType): string => {
    const typeNames: Record<BlockType, string> = {
      hero: 'Banner Principal',
      features: 'Características',
      benefits: 'Benefícios',
      specifications: 'Especificações',
      text: 'Texto',
      image: 'Imagem',
      gallery: 'Galeria',
      imageText: 'Imagem e Texto',
      textImage: 'Texto e Imagem',
      faq: 'Perguntas e Respostas',
      cta: 'Chamada para Ação'
    };
    
    return typeNames[type] || type;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {blockTypes.map(type => (
        <Button 
          key={type} 
          variant="outline" 
          size="sm"
          onClick={() => onAddBlock(type)}
        >
          <Plus className="h-3 w-3 mr-1" /> {getBlockTypeName(type)}
        </Button>
      ))}
    </div>
  );
};

export default BlockTypeSelector;
