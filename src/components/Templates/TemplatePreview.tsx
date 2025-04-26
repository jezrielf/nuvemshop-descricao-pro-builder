
import React from 'react';
import { Template } from '@/types/editor';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Plus } from 'lucide-react';
import { useTemplateStore } from '@/store/templates';

interface TemplatePreviewProps {
  template: Template;
  onPreview: (template: Template) => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, onPreview }) => {
  const { applyTemplate } = useTemplateStore();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div 
        className="h-48 bg-gray-100 overflow-hidden"
        style={{
          backgroundImage: template.thumbnailUrl ? `url(${template.thumbnailUrl})` : undefined,
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}
      >
        {!template.thumbnailUrl && (
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-400">Sem imagem</span>
          </div>
        )}
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium truncate">{template.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">
              {template.description || "Sem descrição"}
            </p>
          </div>
          <Badge variant="outline" className="ml-2 flex-shrink-0">
            {template.category}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onPreview(template)}
        >
          <Eye className="h-3.5 w-3.5 mr-1.5" />
          Visualizar
        </Button>
        
        <Button 
          size="sm"
          onClick={() => applyTemplate(template)}
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" />
          Usar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplatePreview;
