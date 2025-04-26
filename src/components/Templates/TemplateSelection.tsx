
import React from 'react';
import { useTemplateStore } from '@/store/templates';
import TemplatePreview from './TemplatePreview';
import { Template } from '@/types/editor';
import { useTemplateUtils } from '../templates/useTemplateUtils';

interface TemplateSelectionProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onSelectTemplate }) => {
  const { templates, categories, selectedCategory, setSelectedCategory } = useTemplateStore();
  const { getCategoryName } = useTemplateUtils();

  // Filter templates by selected category
  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category as any)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {getCategoryName(category as any)}
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
