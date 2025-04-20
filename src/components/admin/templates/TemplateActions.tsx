
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

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="ghost" 
        size="small"
        onClick={() => openPreviewDialog(template)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="small"
        onClick={() => openEditDialog(template)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="small"
        onClick={() => openDeleteDialog(template)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
