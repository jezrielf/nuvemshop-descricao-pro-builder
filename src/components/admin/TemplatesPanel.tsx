import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Template, ProductCategory, Block, BlockType } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '@/utils/blockCreators';

// Import refactored components
import TemplateList from './templates/TemplateList';
import TemplateSearch from './templates/TemplateSearch';
import TemplatePreviewDialog from './templates/TemplatePreviewDialog';
import TemplateEditDialog from './templates/TemplateEditDialog';
import TemplateDeleteDialog from './templates/TemplateDeleteDialog';
import NewTemplateDialog from './templates/NewTemplateDialog';
import Pagination from './templates/Pagination';
import { getCategoryName, getAllProductCategories } from './templates/utils';

const TemplatesPanel: React.FC = () => {
  const { templates: allTemplates, categories } = useTemplateStore();
  const [templates, setTemplates] = useState<Template[]>(allTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editedTemplate, setEditedTemplate] = useState<Partial<Template>>({});
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: '',
    category: 'other' as ProductCategory,
    blocks: []
  });
  const { toast } = useToast();

  // Block type options for template creation
  const blockTypes: BlockType[] = [
    'hero', 'features', 'benefits', 'specifications', 'text',
    'image', 'gallery', 'imageText', 'textImage', 'faq', 'cta'
  ];

  useEffect(() => {
    // Filter templates based on search and category
    let filtered = [...allTemplates];
    
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(template => 
        template.category === selectedCategory
      );
    }
    
    setTemplates(filtered);
  }, [allTemplates, searchTerm, selectedCategory]);

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
    // This would delete the template in a real application
    setIsDeleteDialogOpen(false);
    toast({
      title: "Template excluído",
      description: `O template "${selectedTemplate?.name}" foi excluído com sucesso.`,
    });
  };

  const handleEditConfirm = () => {
    // This would update the template in a real application
    setIsEditDialogOpen(false);
    toast({
      title: "Template atualizado",
      description: `O template "${editedTemplate.name}" foi atualizado com sucesso.`,
    });
  };

  const handleCreateTemplate = () => {
    // Validate form
    if (!newTemplate.name || !newTemplate.category) {
      toast({
        title: "Erro ao criar template",
        description: "Nome e categoria são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Create a new template
    const createdTemplate: Template = {
      id: uuidv4(),
      name: newTemplate.name as string,
      category: newTemplate.category as ProductCategory,
      blocks: newTemplate.blocks || [],
      thumbnail: ''
    };

    // This would add the template to the store in a real application
    setIsNewTemplateDialogOpen(false);
    setNewTemplate({
      name: '',
      category: 'other' as ProductCategory,
      blocks: []
    });
    
    toast({
      title: "Template criado",
      description: `O template "${createdTemplate.name}" foi criado com sucesso.`,
    });
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Gerenciar Templates</h2>
        <Button onClick={() => setIsNewTemplateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>
      
      <TemplateSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        getCategoryName={getCategoryName}
      />
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <TemplateList
            templates={templates}
            onView={handleViewTemplate}
            onEdit={handleEditTemplate}
            onDelete={handleDeleteClick}
            getCategoryName={getCategoryName}
          />
        </div>
      </Card>

      <Pagination
        onPrevious={() => {}}
        onNext={() => {}}
        isPreviousDisabled={true}
        isNextDisabled={true}
      />

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
    </div>
  );
};

export default TemplatesPanel;
