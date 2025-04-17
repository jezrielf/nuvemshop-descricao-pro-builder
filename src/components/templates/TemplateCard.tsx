
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Template } from '@/types/editor';

interface TemplateCardProps {
  template: Template;
  onSelectTemplate: (template: Template) => void;
  categoryNames: Record<string, string>;
  getTemplateThumbnail: (template: Template) => string;
  isAdvancedTemplate: (id: string) => boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelectTemplate,
  categoryNames,
  getTemplateThumbnail,
  isAdvancedTemplate,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="bg-gray-100 h-32 flex items-center justify-center overflow-hidden">
        <img 
          src={getTemplateThumbnail(template)} 
          alt={template.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Se a imagem falhar, substitui por uma padrão
            e.currentTarget.src = 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{template.name}</h3>
          {isAdvancedTemplate(template.id) && (
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
