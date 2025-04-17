
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash } from 'lucide-react';
import { Template } from '@/types/editor';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';

interface TemplateActionsProps {
  template: Template;
}

export const TemplateActions: React.FC<TemplateActionsProps> = ({ template }) => {
  const { openPreviewDialog, openEditDialog, openDeleteDialog } = useTemplateDialogs();

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Preview button clicked for template:', template.id);
    openPreviewDialog(template);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Edit button clicked for template:', template.id);
    openEditDialog(template);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete button clicked for template:', template.id);
    openDeleteDialog(template);
  };

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handlePreviewClick}
        className="hover:bg-gray-100 transition-colors"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleEditClick}
        className="hover:bg-gray-100 transition-colors"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleDeleteClick}
        className="hover:bg-gray-100 transition-colors"
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
