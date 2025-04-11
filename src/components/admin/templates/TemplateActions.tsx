
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Template, ProductCategory, BlockType, Block } from '@/types/editor';
import { createBlock } from '@/utils/blockCreators';
import { getAllProductCategories, getCategoryName } from './utils';
import TemplatePreviewDialog from './TemplatePreviewDialog';
import TemplateEditDialog from './TemplateEditDialog';
import TemplateDeleteDialog from './TemplateDeleteDialog';
import NewTemplateDialog from './NewTemplateDialog';

interface TemplateActionsProps {
  selectedTemplate: Template | null;
  setSelectedTemplate: (template: Template | null) => void;
  editedTemplate: Partial<Template>;
  setEditedTemplate: (template: Partial<Template>) => void;
  newTemplate: Partial<Template>;
  setNewTemplate: (template: Partial<Template>) => void;
  onDeleteTemplate: (template: Template | null) => void;
  onUpdateTemplate: (template: Partial<Template>) => boolean;
  onCreateTemplate: (template: Partial<Template>) => boolean;
}

const TemplateActions: React.FC<TemplateActionsProps> = ({
  selectedTemplate,
  setSelectedTemplate,
  editedTemplate,
  setEditedTemplate,
  newTemplate,
  setNewTemplate,
  onDeleteTemplate,
  onUpdateTemplate,
  onCreateTemplate
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);

  // Block type options for template creation
  const blockTypes: BlockType[] = [
    'hero', 'features', 'benefits', 'specifications', 'text',
    'image', 'gallery', 'imageText', 'textImage', 'faq', 'cta'
  ];

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setEditedTemplate({...template});
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (template: Template) => {
    setSelectedTemplate(template);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteTemplate(selectedTemplate);
    setIsDeleteDialogOpen(false);
  };

  const handleEditConfirm = () => {
    if (onUpdateTemplate(editedTemplate)) {
      setIsEditDialogOpen(false);
    }
  };

  const handleCreateTemplate = () => {
    if (onCreateTemplate(newTemplate)) {
      setIsNewTemplateDialogOpen(false);
      setNewTemplate({
        name: '',
        category: 'other' as ProductCategory,
        blocks: []
      });
    }
  };

  const handleAddBlock = (type: BlockType) => {
    if (!newTemplate.blocks) {
      newTemplate.blocks = [];
    }
    
    const block = createBlock(type, 1);
    if (block) {
      setNewTemplate({
        ...newTemplate,
        blocks: [...newTemplate.blocks, block]
      });
    }
  };

  const handleRemoveBlock = (blockId: string) => {
    if (newTemplate.blocks) {
      setNewTemplate({
        ...newTemplate,
        blocks: newTemplate.blocks.filter(block => block.id !== blockId)
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
        <Button onClick={() => setIsNewTemplateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      <TemplatePreviewDialog
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        template={selectedTemplate}
        getCategoryName={getCategoryName}
      />

      <TemplateEditDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        template={editedTemplate}
        onTemplateChange={setEditedTemplate}
        onSave={handleEditConfirm}
      />

      <TemplateDeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        template={selectedTemplate}
        onConfirm={handleDeleteConfirm}
      />

      <NewTemplateDialog
        isOpen={isNewTemplateDialogOpen}
        onOpenChange={setIsNewTemplateDialogOpen}
        template={newTemplate as Template}
        onTemplateChange={handleNewTemplateChange}
        onCreateTemplate={handleCreateTemplate}
        onAddBlock={handleAddBlock}
        onRemoveBlock={handleRemoveBlock}
        blockTypes={blockTypes}
        categories={getAllProductCategories()}
        getCategoryName={getCategoryName}
      />
    </>
  );
};

export default TemplateActions;
