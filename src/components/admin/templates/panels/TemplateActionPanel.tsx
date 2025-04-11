
import React from 'react';
import { Template } from '@/types/editor';
import { BlockType } from '@/types/editor';
import TemplateActions from '../../templates/TemplateActions';

interface TemplateActionPanelProps {
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

const TemplateActionPanel: React.FC<TemplateActionPanelProps> = ({
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
  return (
    <TemplateActions
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
  );
};

export default TemplateActionPanel;
