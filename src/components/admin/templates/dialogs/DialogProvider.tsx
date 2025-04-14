
import React, { createContext, useContext, useState } from 'react';
import { Template } from '@/types/editor';

interface DialogState {
  isPreviewOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isNewTemplateDialogOpen: boolean;
}

interface DialogContextType {
  dialogState: DialogState;
  selectedTemplate: Template | null;
  toggleDialog: (dialogKey: keyof DialogState) => void;
  setSelectedTemplate: (template: Template | null) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isPreviewOpen: false,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    isNewTemplateDialogOpen: false
  });

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const toggleDialog = (dialogKey: keyof DialogState) => {
    setDialogState(prev => ({
      ...prev,
      [dialogKey]: !prev[dialogKey]
    }));
  };

  return (
    <DialogContext.Provider
      value={{
        dialogState,
        selectedTemplate,
        toggleDialog,
        setSelectedTemplate
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogs = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogs must be used within a DialogProvider');
  }
  return context;
};

export default DialogProvider;
