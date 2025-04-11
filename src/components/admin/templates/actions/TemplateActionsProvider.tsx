
import React from 'react';
import { Template, ProductCategory, BlockType } from '@/types/editor';
import { DialogProvider } from '../dialogs/DialogProvider';
import TemplateActions from './TemplateActions';

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
  return (
    <DialogProvider>
      <TemplateActions {...props} />
    </DialogProvider>
  );
};

export default TemplateActionsProvider;
