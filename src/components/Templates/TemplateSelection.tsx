
import React from 'react';
import { useTemplateStore } from '@/store/templates';
import TemplatePreview from './TemplatePreview';
import { Template } from '@/types/editor';

interface TemplateSelectionProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onSelectTemplate }) => {
  const { templates, categories, selectedCategory, selectCategory } = useTemplateStore();
  
  // Get templates for the selected category
  const filteredTemplates = selectedCategory
    ? templates.filter(t => t.category === selectedCategory)
    : templates;
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => selectCategory(null)}
            className={`px-3 py-1.5 text-sm rounded-full ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            Todos
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              className={`px-3 py-1.5 text-sm rounded-full capitalize ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-4">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            onClick={() => onSelectTemplate(template)}
            className="cursor-pointer"
          >
            <TemplatePreview template={template} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
