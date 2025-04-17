
import React from 'react';
import { Template } from '@/types/editor';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TemplateCard from './TemplateCard';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TemplateGridProps {
  templates: Template[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onSelectTemplate: (template: Template) => void;
  categoryNames: Record<string, string>;
  getTemplateThumbnail: (template: Template) => string;
  isAdvancedTemplate: (id: string) => boolean;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  isLoading,
  error,
  onRefresh,
  onSelectTemplate,
  categoryNames,
  getTemplateThumbnail,
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
        <p className="text-muted-foreground">{error || "Nenhum template encontrado nesta categoria."}</p>
        <Button 
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={onRefresh}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(60vh-120px)] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelectTemplate={onSelectTemplate}
            categoryNames={categoryNames}
            getTemplateThumbnail={getTemplateThumbnail}
            isAdvancedTemplate={isAdvancedTemplate}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TemplateGrid;
