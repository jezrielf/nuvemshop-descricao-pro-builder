
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Template } from '@/types/editor/base';

interface TemplateCardProps {
  template: Template;
  categoryNames: Record<string, string>;
  onSelectTemplate: (template: Template) => void;
  getThumbnail: (template: Template) => string;
  isAdvancedTemplate: (id: string) => boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  categoryNames,
  onSelectTemplate,
  getThumbnail,
  isAdvancedTemplate,
}) => {
  const isAdvanced = isAdvancedTemplate(template.id);
  
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="bg-gray-100 h-32 flex items-center justify-center overflow-hidden">
        {isAdvanced ? (
          <img 
            src={getThumbnail(template)} 
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">
            Preview do Template
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{template.name}</h3>
          {isAdvanced && (
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1 mb-3">
          {categoryNames[template.category] || template.category}
        </p>
        <div className="text-xs text-gray-500 mb-4">
          {template.blocks.length} blocos
        </div>
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onSelectTemplate(template)}
          >
            Usar este template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
