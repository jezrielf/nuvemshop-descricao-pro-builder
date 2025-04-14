
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Trash, Edit } from 'lucide-react';
import { Template } from '@/types/editor';

interface TemplateActionsProps {
  template: Template;
  onView: (template: Template) => void;
  onEdit: (template: Template) => void;
  onDelete: (template: Template) => void;
}

export const TemplateActions: React.FC<TemplateActionsProps> = ({
  template,
  onView,
  onEdit,
  onDelete
}) => {
  // Adicionar verificação de segurança para template
  if (!template || !template.id) {
    console.error("Template inválido em TemplateActions:", template);
    return null;
  }

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onView(template)}
        title="Visualizar"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onEdit(template)}
        title="Editar"
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => onDelete(template)}
        title="Excluir"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
