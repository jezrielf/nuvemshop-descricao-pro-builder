
import React from 'react';
import { Template } from '@/types/editor';
import { BlockType } from '@/types/editor';
import TemplateActions from './TemplateActions';
import DialogProvider from '../dialogs/DialogProvider';

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
  // Wrap the TemplateActions component with the DialogProvider
  return (
    <DialogProvider>
      <TemplateActions {...props} />
    </DialogProvider>
  );
};

export default TemplateActionsProvider;
