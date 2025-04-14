
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

  const handleView = () => {
    if (template && template.id) {
      onView(template);
    }
  };

  const handleEdit = () => {
    if (template && template.id) {
      onEdit(template);
    }
  };

  const handleDelete = () => {
    if (template && template.id) {
      onDelete(template);
    }
  };

  return (
    <div className="flex justify-end space-x-1 sm:space-x-2">
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleView}
        title="Visualizar"
        className="h-8 w-8 p-0 sm:w-auto sm:px-2"
      >
        <Eye className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Ver</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleEdit}
        title="Editar"
        className="h-8 w-8 p-0 sm:w-auto sm:px-2"
      >
        <Edit className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Editar</span>
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleDelete}
        title="Excluir"
        className="h-8 w-8 p-0 sm:w-auto sm:px-2"
      >
        <Trash className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Excluir</span>
      </Button>
    </div>
  );
};
