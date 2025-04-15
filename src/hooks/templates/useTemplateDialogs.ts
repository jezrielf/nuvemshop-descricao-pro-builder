
import { create } from 'zustand';
import { Template } from '@/types/editor';

interface TemplateDialogState {
  previewTemplate: Template | null;
  editTemplate: Template | null;
  deleteTemplate: Template | null;
  isNewDialogOpen: boolean;
  isPreviewDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  openNewDialog: () => void;
  openPreviewDialog: (template: Template) => void;
  openEditDialog: (template: Template) => void;
  openDeleteDialog: (template: Template) => void;
  closeAllDialogs: () => void;
}

export const useTemplateDialogs = create<TemplateDialogState>((set) => ({
  previewTemplate: null,
  editTemplate: null,
  deleteTemplate: null,
  isNewDialogOpen: false,
  isPreviewDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,

  openNewDialog: () => set({ isNewDialogOpen: true }),
  
  openPreviewDialog: (template) => set({ 
    previewTemplate: template,
    isPreviewDialogOpen: true 
  }),
  
  openEditDialog: (template) => set({ 
    editTemplate: template,
    isEditDialogOpen: true 
  }),
  
  openDeleteDialog: (template) => set({ 
    deleteTemplate: template,
    isDeleteDialogOpen: true 
  }),
  
  closeAllDialogs: () => set({
    previewTemplate: null,
    editTemplate: null,
    deleteTemplate: null,
    isNewDialogOpen: false,
    isPreviewDialogOpen: false,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false
  })
}));
