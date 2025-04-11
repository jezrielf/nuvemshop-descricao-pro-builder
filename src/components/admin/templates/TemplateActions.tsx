
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Template, ProductCategory, BlockType } from '@/types/editor';
import TemplatePreviewDialog from './TemplatePreviewDialog';
import TemplateEditDialog from './TemplateEditDialog';
import TemplateDeleteDialog from './TemplateDeleteDialog';
import NewTemplateDialog from './NewTemplateDialog';
import { DialogProvider, useDialogs } from './dialogs/DialogProvider';

interface TemplateActionsProps {
  editedTemplate: Template | null;
  setEditedTemplate: (template: Template | null) => void;
  newTemplate: Partial<Template> | null;
  setNewTemplate: (template: Partial<Template> | null) => void;
  onDeleteTemplate: (template: Template) => boolean;
  onUpdateTemplate: (template: Partial<Template>) => boolean;
  onCreateTemplate: (template: Omit<Template, "id">) => boolean;
  onAddBlock: (type: BlockType) => void;
  onRemoveBlock: (blockId: string) => void;
}

// This is the main TemplateActions component that uses the DialogProvider
const TemplateActions: React.FC<TemplateActionsProps> = (props) => {
  return (
    <DialogProvider>
      <TemplateActionsContent {...props} />
    </DialogProvider>
  );
};

// The content component that uses the dialog context
const TemplateActionsContent: React.FC<TemplateActionsProps> = ({
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
    openNewTemplateDialog,
    toggleDialog
  } = useDialogs();

  // Block type options for template creation
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
    if (editedTemplate && onUpdateTemplate(editedTemplate)) {
      toggleDialog('isEditDialogOpen');
    }
  };

  const handleCreateTemplate = () => {
    if (newTemplate) {
      // Cast to required type for the createTemplate function
      const templateToCreate = newTemplate as Omit<Template, "id">;
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

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Gerenciar Templates</h2>
        <Button onClick={openNewTemplateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      <TemplatePreviewDialog
        isOpen={dialogState.isPreviewOpen}
        onOpenChange={() => toggleDialog('isPreviewOpen')}
        template={selectedTemplate}
        getCategoryName={getCategoryName}
      />

      <TemplateEditDialog
        isOpen={dialogState.isEditDialogOpen}
        onOpenChange={() => toggleDialog('isEditDialogOpen')}
        template={editedTemplate}
        onTemplateChange={(template) => setEditedTemplate(template as Template)}
        onSave={handleEditConfirm}
      />

      <TemplateDeleteDialog
        isOpen={dialogState.isDeleteDialogOpen}
        onOpenChange={() => toggleDialog('isDeleteDialogOpen')}
        template={selectedTemplate}
        onConfirm={handleDeleteConfirm}
      />

      <NewTemplateDialog
        isOpen={dialogState.isNewTemplateDialogOpen}
        onOpenChange={() => toggleDialog('isNewTemplateDialogOpen')}
        template={newTemplate || {
          name: '',
          category: 'other' as ProductCategory,
          blocks: []
        }}
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

export default TemplateActions;
