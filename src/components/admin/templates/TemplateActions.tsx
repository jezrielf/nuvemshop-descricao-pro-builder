
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Template, ProductCategory, BlockType, Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { getAllProductCategories, getCategoryName } from './utils';
import TemplatePreviewDialog from './TemplatePreviewDialog';
import TemplateEditDialog from './TemplateEditDialog';
import TemplateDeleteDialog from './TemplateDeleteDialog';
import NewTemplateDialog from './NewTemplateDialog';
import { DialogProvider, useDialogs } from './dialogs/DialogProvider';

interface TemplateActionsProps {
  editedTemplate: Partial<Template>;
  setEditedTemplate: (template: Partial<Template>) => void;
  newTemplate: Partial<Template>;
  setNewTemplate: (template: Partial<Template>) => void;
  onDeleteTemplate: (template: Template | null) => void;
  onUpdateTemplate: (template: Partial<Template>) => boolean;
  onCreateTemplate: (template: Partial<Template>) => boolean;
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
    onDeleteTemplate(selectedTemplate);
    toggleDialog('isDeleteDialogOpen');
  };

  const handleEditConfirm = () => {
    if (onUpdateTemplate(editedTemplate)) {
      toggleDialog('isEditDialogOpen');
    }
  };

  const handleCreateTemplate = () => {
    if (onCreateTemplate(newTemplate)) {
      toggleDialog('isNewTemplateDialogOpen');
      setNewTemplate({
        name: '',
        category: 'other' as ProductCategory,
        blocks: []
      });
    }
  };

  // The handler for updating new template data with explicit type casting
  const handleNewTemplateChange = (templateData: Partial<Template>) => {
    setNewTemplate(templateData);
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
        onTemplateChange={setEditedTemplate}
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
        template={newTemplate as Template}
        onTemplateChange={handleNewTemplateChange}
        onCreateTemplate={handleCreateTemplate}
        onAddBlock={onAddBlock}
        onRemoveBlock={onRemoveBlock}
        blockTypes={blockTypes}
        categories={getAllProductCategories()}
        getCategoryName={getCategoryName}
      />
    </>
  );
};

export default TemplateActions;
