
import { useState } from 'react';
import { Template } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';

export function useTemplateDialogs() {
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [editTemplate, setEditTemplate] = useState<Template | null>(null);
  const [deleteTemplate, setDeleteTemplate] = useState<Template | null>(null);
  const [deleteCallback, setDeleteCallback] = useState<(() => void) | undefined>(undefined);
  
  const { toast } = useToast();
  
  const openNewDialog = () => {
    console.log('Opening new template dialog');
    closeAllDialogs(); // Close other dialogs first
    setIsNewDialogOpen(true);
  };
  
  const openPreviewDialog = (template: Template) => {
    if (!template) {
      console.error('Cannot open preview dialog: No template provided');
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir a visualização do template',
        variant: 'destructive'
      });
      return;
    }
    
    console.log('Opening preview dialog for template:', template.id, template.name);
    closeAllDialogs(); // Close other dialogs first
    setPreviewTemplate(template);
    setIsPreviewDialogOpen(true);
  };
  
  const openEditDialog = (template: Template) => {
    if (!template) {
      console.error('Cannot open edit dialog: No template provided');
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir a edição do template',
        variant: 'destructive'
      });
      return;
    }
    
    console.log('Opening edit dialog for template:', template.id, template.name);
    closeAllDialogs(); // Close other dialogs first
    setEditTemplate(template);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (template: Template, onDeleted?: () => void) => {
    if (!template) {
      console.error('Cannot open delete dialog: No template provided');
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir a confirmação de exclusão',
        variant: 'destructive'
      });
      return;
    }
    
    console.log('Opening delete dialog for template:', template.id, template.name);
    closeAllDialogs(); // Close other dialogs first
    setDeleteTemplate(template);
    setDeleteCallback(() => onDeleted);
    setIsDeleteDialogOpen(true);
  };
  
  const closeAllDialogs = () => {
    console.log('Closing all dialogs');
    setIsNewDialogOpen(false);
    setIsPreviewDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setPreviewTemplate(null);
    setEditTemplate(null);
    setDeleteTemplate(null);
    setDeleteCallback(undefined);
  };
  
  return {
    // Dialog states
    isNewDialogOpen,
    isPreviewDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    
    // Template data
    previewTemplate,
    editTemplate,
    deleteTemplate,
    deleteCallback,
    
    // Actions
    openNewDialog,
    openPreviewDialog,
    openEditDialog,
    openDeleteDialog,
    closeAllDialogs
  };
}
