
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
    closeAllDialogs();
    setIsNewDialogOpen(true);
  };
  
  const openPreviewDialog = (template: Template) => {
    console.log('Opening preview dialog for template:', template.id);
    closeAllDialogs();
    setPreviewTemplate(template);
    setIsPreviewDialogOpen(true);
  };
  
  const openEditDialog = (template: Template) => {
    console.log('Opening edit dialog for template:', template.id);
    closeAllDialogs();
    setEditTemplate(template);
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (template: Template, onDeleted?: () => void) => {
    console.log('Opening delete dialog for template:', template.id);
    closeAllDialogs();
    setDeleteTemplate(template);
    setDeleteCallback(() => onDeleted);
    setIsDeleteDialogOpen(true);
  };
  
  const closeAllDialogs = () => {
    setIsNewDialogOpen(false);
    setIsPreviewDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
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
