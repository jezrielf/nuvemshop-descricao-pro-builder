
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
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const { toast } = useToast();

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  return (
    <DialogProvider>
      <TemplateActions 
        {...props} 
        onViewTemplate={handleViewTemplate}
        selectedTemplate={selectedTemplate}
      />
    </DialogProvider>
  );
};

export default TemplateActionsProvider;
