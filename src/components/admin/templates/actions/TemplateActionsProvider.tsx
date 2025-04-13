
import React, { useState } from 'react';
import { Template, BlockType } from '@/types/editor';
import TemplateActions from './TemplateActions';
import { DialogProvider } from '../dialogs/DialogProvider';
import { useToast } from '@/hooks/use-toast';

interface TemplateActionsProviderProps {
  editedTemplate: Template | null;
  setEditedTemplate: (template: Template | null) => void;
  newTemplate: Partial<Template> | null;
  setNewTemplate: (template: Partial<Template> | null) => void;
  onDeleteTemplate: (template: Template) => boolean;
  onUpdateTemplate: (template: Template) => boolean;
  onCreateTemplate: (template: Omit<Template, "id">) => boolean;
  onAddBlock: (type: BlockType) => void;
  onRemoveBlock: (blockId: string) => void;
}

const TemplateActionsProvider: React.FC<TemplateActionsProviderProps> = (props) => {
  // We don't need to use these variables if TemplateActions doesn't expect them
  // Remove the state and function that aren't needed by TemplateActions
  const { toast } = useToast();

  return (
    <DialogProvider>
      <TemplateActions {...props} />
    </DialogProvider>
  );
};

export default TemplateActionsProvider;
