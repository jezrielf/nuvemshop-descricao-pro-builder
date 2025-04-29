
import React, { useState } from 'react';
import TemplateGrid from './TemplateGrid';
import CategoryFilter from './CategoryFilter';
import TemplateSelection from './TemplateSelection';
import { Template } from '@/types/editor/base';

interface TemplateSelectorProps {
  onSelectTemplate?: (template: Template) => void;
  showHeader?: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onSelectTemplate,
  showHeader = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSelectTemplate = (template: Template) => {
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {showHeader && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Escolha um template</h2>
          <p className="text-muted-foreground">
            Selecione um modelo para começar sua descrição de produto
          </p>
        </div>
      )}
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="flex-grow overflow-hidden mt-4">
        <TemplateSelection onSelectTemplate={handleSelectTemplate} />
      </div>
    </div>
  );
};

export default TemplateSelector;
