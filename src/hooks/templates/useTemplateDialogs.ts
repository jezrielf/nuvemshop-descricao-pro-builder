
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
    console.log('useTemplateDialogs.openNewDialog() - Opening new template dialog');
    closeAllDialogs();
    setIsNewDialogOpen(true);
  };
  
  const openPreviewDialog = (template: Template) => {
    if (!template) {
      console.error('useTemplateDialogs.openPreviewDialog() - No template provided');
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir a visualização do template',
        variant: 'destructive'
      });
      return;
    }
    
    console.log('useTemplateDialogs.openPreviewDialog() - Opening preview for:', template.name);
    closeAllDialogs();
    setPreviewTemplate(template);
    setIsPreviewDialogOpen(true);
  };
  
  const openEditDialog = (template: Template) => {
    if (!template) {
      console.error('useTemplateDialogs.openEditDialog() - No template provided');
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir a edição do template',
        variant: 'destructive'
      });
      return;
    }
    
    console.log('useTemplateDialogs.openEditDialog() - Opening edit for:', template.name);
    closeAllDialogs();
    setEditTemplate(template);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (template: Template, onDeleted?: () => void) => {
    if (!template) {
      console.error('useTemplateDialogs.openDeleteDialog() - No template provided');
      toast({
        title: 'Erro',
        description: 'Não foi possível abrir a confirmação de exclusão',
        variant: 'destructive'
      });
      return;
    }
    
    console.log('useTemplateDialogs.openDeleteDialog() - Opening delete confirmation for:', template.name);
    closeAllDialogs();
    setDeleteTemplate(template);
    setDeleteCallback(() => onDeleted);
    setIsDeleteDialogOpen(true);
  };
  
  const closeAllDialogs = () => {
    console.log('useTemplateDialogs.closeAllDialogs() - Closing all dialogs');
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
