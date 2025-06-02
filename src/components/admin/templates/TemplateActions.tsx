
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Template } from '@/types/editor';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';

interface TemplateActionsProps {
  template: Template;
  onTemplateDeleted?: () => void;
}

export const TemplateActions: React.FC<TemplateActionsProps> = ({ 
  template,
  onTemplateDeleted
}) => {
  const { openPreviewDialog, openEditDialog, openDeleteDialog } = useTemplateDialogs();

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('TemplateActions.handlePreviewClick() - Template:', template.name);
    openPreviewDialog(template);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('TemplateActions.handleEditClick() - Template:', template.name);
    openEditDialog(template);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('TemplateActions.handleDeleteClick() - Template:', template.name);
    openDeleteDialog(template, onTemplateDeleted);
  };

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handlePreviewClick}
        title="Visualizar template"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleEditClick}
        title="Editar template"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleDeleteClick}
        className="text-destructive hover:bg-destructive/10"
        title="Excluir template"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
