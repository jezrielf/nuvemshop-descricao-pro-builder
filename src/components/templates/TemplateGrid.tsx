
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Template } from '@/types/editor';
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
  isLoading: boolean;
  categoryNames: Record<string, string>;
  onSelectTemplate: (template: Template) => void;
  getThumbnail: (template: Template) => string;
  isAdvancedTemplate: (id: string) => boolean;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  isLoading,
  categoryNames,
  onSelectTemplate,
  getThumbnail,
  isAdvancedTemplate,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Carregando templates...</span>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="col-span-2 text-center py-8">
        <p className="text-muted-foreground">Nenhum template encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          categoryNames={categoryNames}
          onSelectTemplate={onSelectTemplate}
          getThumbnail={getThumbnail}
          isAdvancedTemplate={isAdvancedTemplate}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
