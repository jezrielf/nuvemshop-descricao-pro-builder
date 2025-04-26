
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Template } from '@/types/editor';
import TemplateCard from './TemplateCard';
import { Button } from '@/components/ui/button';

interface TemplateGridProps {
  templates: Template[];
  isLoading: boolean;
  categoryNames: Record<string, string>;
  onSelectTemplate: (template: Template) => void;
  getThumbnail: (template: Template) => string;
  isAdvancedTemplate: (id: string) => boolean;
  onRefresh?: () => Promise<void>; // Adicionamos uma prop para recarregar
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  isLoading,
  categoryNames,
  onSelectTemplate,
  getThumbnail,
  isAdvancedTemplate,
  onRefresh
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
      <div className="col-span-2 flex flex-col items-center text-center py-8">
        <p className="text-muted-foreground mb-4">Nenhum template encontrado.</p>
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        )}
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
