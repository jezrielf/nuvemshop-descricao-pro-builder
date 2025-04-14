
import React from 'react';
import { Template, ProductCategory, BlockType } from '@/types/editor';
import { useDialogs } from '../dialogs/DialogProvider';
import TemplatePreviewDialog from '../dialogs/TemplatePreviewDialog';
import TemplateEditDialog from '../dialogs/TemplateEditDialog';
import TemplateDeleteDialog from '../dialogs/TemplateDeleteDialog';
import NewTemplateDialog from '../dialogs/NewTemplateDialog';
import { getCategoryName } from '../utils';

interface TemplateDialogsProps {
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

const TemplateDialogs: React.FC<TemplateDialogsProps> = ({
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
  const { 
    selectedTemplate, 
    dialogState, 
    toggleDialog
  } = useDialogs();

  // Block types for template creation
  const blockTypes: BlockType[] = [
    'hero', 'features', 'benefits', 'specifications', 'text',
    'image', 'gallery', 'imageText', 'textImage', 'faq', 'cta'
  ];

  const handleDeleteConfirm = () => {
    if (selectedTemplate) {
      onDeleteTemplate(selectedTemplate);
      toggleDialog('isDeleteDialogOpen');
    }
  };

  const handleEditConfirm = () => {
    if (editedTemplate) {
      onUpdateTemplate(editedTemplate);
      toggleDialog('isEditDialogOpen');
    }
  };

  const handleCreateTemplate = () => {
    if (newTemplate) {
      // Convert to the required type for createTemplate function
      const templateToCreate = {
        name: newTemplate.name || '',
        category: newTemplate.category || 'other' as ProductCategory,
        blocks: newTemplate.blocks || []
      };
      
      if (onCreateTemplate(templateToCreate)) {
        toggleDialog('isNewTemplateDialogOpen');
        setNewTemplate({
          name: '',
          category: 'other' as ProductCategory,
          blocks: []
        });
      }
    }
  };

  // Create a safe template object to pass to NewTemplateDialog
  // This ensures all necessary properties are present
  const safeNewTemplate = {
    name: newTemplate?.name || '',
    category: newTemplate?.category || 'other' as ProductCategory,
    blocks: newTemplate?.blocks || []
  };

  return (
    <>
      <TemplatePreviewDialog
        isOpen={dialogState.isPreviewOpen && selectedTemplate !== null}
        onOpenChange={() => toggleDialog('isPreviewOpen')}
        template={selectedTemplate}
        getCategoryName={getCategoryName}
      />

      <TemplateEditDialog
        isOpen={dialogState.isEditDialogOpen && editedTemplate !== null}
        onOpenChange={() => toggleDialog('isEditDialogOpen')}
        template={editedTemplate}
        onTemplateChange={(template) => setEditedTemplate(template as Template)}
        onSave={handleEditConfirm}
      />

      <TemplateDeleteDialog
        isOpen={dialogState.isDeleteDialogOpen && selectedTemplate !== null}
        onOpenChange={() => toggleDialog('isDeleteDialogOpen')}
        template={selectedTemplate}
        onConfirm={handleDeleteConfirm}
      />

      <NewTemplateDialog
        isOpen={dialogState.isNewTemplateDialogOpen}
        onOpenChange={() => toggleDialog('isNewTemplateDialogOpen')}
        template={safeNewTemplate}
        onTemplateChange={setNewTemplate}
        onCreateTemplate={handleCreateTemplate}
        onAddBlock={onAddBlock}
        onRemoveBlock={onRemoveBlock}
        blockTypes={blockTypes}
        categories={['supplements', 'clothing', 'accessories', 'shoes', 'electronics', 'energy', 'other']}
        getCategoryName={getCategoryName}
      />
    </>
  );
};

export default TemplateDialogs;
