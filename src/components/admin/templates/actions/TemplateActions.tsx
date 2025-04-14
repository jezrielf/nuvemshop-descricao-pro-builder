
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Template, ProductCategory, BlockType } from '@/types/editor';
import { useDialogs } from '../dialogs/DialogProvider';
import TemplateDialogs from './TemplateDialogs';

interface TemplateActionsProps {
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

const TemplateActions: React.FC<TemplateActionsProps> = ({
  editedTemplate,
  setEditedTemplate,
  newTemplate,
  setNewTemplate,
  onDeleteTemplate,
  onUpdateTemplate,
  onCreateTemplate,
  onAddBlock,
  onRemoveBlock
}) => {
  const { toggleDialog } = useDialogs();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Gerenciar Templates</h2>
        <Button onClick={() => toggleDialog('isNewTemplateDialogOpen')}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      <TemplateDialogs 
        editedTemplate={editedTemplate}
        setEditedTemplate={setEditedTemplate}
        newTemplate={newTemplate}
        setNewTemplate={setNewTemplate}
        onDeleteTemplate={onDeleteTemplate}
        onUpdateTemplate={onUpdateTemplate}
        onCreateTemplate={onCreateTemplate}
        onAddBlock={onAddBlock}
        onRemoveBlock={onRemoveBlock}
      />
    </>
  );
};

export default TemplateActions;
