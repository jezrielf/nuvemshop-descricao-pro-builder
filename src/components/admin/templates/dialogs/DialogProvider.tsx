
import React, { createContext, useContext, useState } from 'react';
import { Template } from '@/types/editor';

interface DialogState {
  isPreviewOpen: boolean;
  isDeleteDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isNewTemplateDialogOpen: boolean;
}

interface DialogContextType {
  selectedTemplate: Template | null;
  dialogState: DialogState;
  setSelectedTemplate: (template: Template | null) => void;
  openPreview: (template: Template) => void;
  openEditDialog: (template: Template) => void;
  openDeleteDialog: (template: Template) => void;
  openNewTemplateDialog: () => void;
  closeAllDialogs: () => void;
  toggleDialog: (dialog: keyof DialogState) => void;
}

const initialDialogState: DialogState = {
  isPreviewOpen: false,
  isDeleteDialogOpen: false,
  isEditDialogOpen: false,
  isNewTemplateDialogOpen: false,
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialogs = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogs must be used within a DialogProvider');
  }
  return context;
};

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [dialogState, setDialogState] = useState<DialogState>(initialDialogState);

  const openPreview = (template: Template) => {
    setSelectedTemplate(template);
    setDialogState({ ...initialDialogState, isPreviewOpen: true });
  };

  const openEditDialog = (template: Template) => {
    setSelectedTemplate(template);
    setDialogState({ ...initialDialogState, isEditDialogOpen: true });
  };

  const openDeleteDialog = (template: Template) => {
    setSelectedTemplate(template);
    setDialogState({ ...initialDialogState, isDeleteDialogOpen: true });
  };

  const openNewTemplateDialog = () => {
    setDialogState({ ...initialDialogState, isNewTemplateDialogOpen: true });
  };

  const closeAllDialogs = () => {
    setDialogState(initialDialogState);
  };

  const toggleDialog = (dialog: keyof DialogState) => {
    setDialogState(prev => ({
      ...initialDialogState,
      [dialog]: !prev[dialog]
    }));
  };

  return (
    <DialogContext.Provider
      value={{
        selectedTemplate,
        dialogState,
        setSelectedTemplate,
        openPreview,
        openEditDialog,
        openDeleteDialog,
        openNewTemplateDialog,
        closeAllDialogs,
        toggleDialog
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};
