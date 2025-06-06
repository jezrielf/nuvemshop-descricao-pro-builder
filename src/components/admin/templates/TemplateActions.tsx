
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Template } from '@/types/editor';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { useToast } from '@/hooks/use-toast';

interface TemplateActionsProps {
  template: Template;
  onTemplateDeleted?: () => void;
}

export const TemplateActions: React.FC<TemplateActionsProps> = ({ 
  template,
  onTemplateDeleted
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { openPreviewDialog, openEditDialog, openDeleteDialog } = useTemplateDialogs();
  const { toast } = useToast();

  const handlePreviewClick = () => {
    console.log('Preview button clicked for template:', template.id);
    openPreviewDialog(template);
  };

  const handleEditClick = () => {
    console.log('Edit button clicked for template:', template.id);
    openEditDialog(template);
  };

  const handleDeleteClick = () => {
    console.log('Delete button clicked for template:', template.id);
    setIsLoading(true);
    // Small delay to prevent accidental clicks
    setTimeout(() => {
      openDeleteDialog(template, onTemplateDeleted);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handlePreviewClick}
        disabled={isLoading}
        title="Visualizar template"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleEditClick}
        disabled={isLoading}
        title="Editar template"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleDeleteClick}
        disabled={isLoading}
        className="text-destructive hover:bg-destructive/10"
        title="Excluir template"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
