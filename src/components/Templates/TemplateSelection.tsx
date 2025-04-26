
import React from 'react';
import { useTemplateStore } from '@/store/templates';
import TemplatePreview from './TemplatePreview';
import { Template } from '@/types/editor';

interface TemplateSelectionProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onSelectTemplate }) => {
  const { templates, categories, selectedCategory, setSelectedCategory } = useTemplateStore();

  // Filter templates by selected category
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value as any)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <TemplatePreview 
            key={template.id} 
            template={template}
            onPreview={onSelectTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
