
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Pencil, Trash2 } from 'lucide-react';
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
  const { openPreviewDialog, openEditDialog, openDeleteDialog } = useTemplateDialogs();
  const { toast } = useToast();

  return (
    <div className="flex justify-end space-x-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => openPreviewDialog(template)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => openEditDialog(template)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => {
          console.log('Delete button clicked for template:', template.id);
          openDeleteDialog(template, onTemplateDeleted);
        }}
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
