
import { useState, useCallback } from 'react';
import { Template } from '@/types/editor';

interface UseTemplateDialogsState {
  isNewDialogOpen: boolean;
  isPreviewDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  previewTemplate: Template | null;
  editTemplate: Template | null;
  deleteTemplate: Template | null;
  deleteCallback: (() => void) | null;
}

export const useTemplateDialogs = () => {
  const [state, setState] = useState<UseTemplateDialogsState>({
    isNewDialogOpen: false,
    isPreviewDialogOpen: false,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    previewTemplate: null,
    editTemplate: null,
    deleteTemplate: null,
    deleteCallback: null,
  });

  const openNewDialog = useCallback(() => {
    setState(prev => ({ ...prev, isNewDialogOpen: true }));
  }, []);

  const openPreviewDialog = useCallback((template: Template) => {
    setState(prev => ({ 
      ...prev, 
      isPreviewDialogOpen: true, 
      previewTemplate: template 
    }));
  }, []);

  const openEditDialog = useCallback((template: Template) => {
    setState(prev => ({ 
      ...prev, 
      isEditDialogOpen: true, 
      editTemplate: template 
    }));
  }, []);

  const openDeleteDialog = useCallback((template: Template, callback?: () => void) => {
    setState(prev => ({ 
      ...prev, 
      isDeleteDialogOpen: true, 
      deleteTemplate: template,
      deleteCallback: callback || null
    }));
  }, []);

  const closeAllDialogs = useCallback(() => {
    setState({
      isNewDialogOpen: false,
      isPreviewDialogOpen: false,
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
      previewTemplate: null,
      editTemplate: null,
      deleteTemplate: null,
      deleteCallback: null,
    });
  }, []);

  return {
    ...state,
    openNewDialog,
    openPreviewDialog,
    openEditDialog,
    openDeleteDialog,
    closeAllDialogs,
  };
};
