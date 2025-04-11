
import React, { useEffect } from 'react';
import { useTemplateStore } from '@/store/templateStore';
import TemplateActions from './templates/TemplateActions';
import TemplateFiltering from './templates/TemplateFiltering';
import { Template, ProductCategory, BlockType } from '@/types/editor';
import { getCategoryName } from './templates/utils';
import { useToast } from '@/hooks/use-toast';
import { createBlock } from '@/utils/blockCreators';

const TemplatesPanel: React.FC = () => {
  const { toast } = useToast();
  const {
    templates,
    loadTemplates,
  } = useTemplateStore();

  // State for templates management
  const [displayedTemplates, setDisplayedTemplates] = React.useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [editedTemplate, setEditedTemplate] = React.useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = React.useState<Partial<Template> | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const itemsPerPage = 10;

  // Categories derived from templates
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(templates.map(template => template.category))
    );
    return uniqueCategories;
  }, [templates]);

  // Load templates when component mounts
  useEffect(() => {
    console.log('TemplatesPanel mounted, loading templates...');
    loadTemplates();
  }, [loadTemplates]);

  // Filter templates based on search and category
  useEffect(() => {
    console.log('Filtering templates with search term:', searchTerm, 'and category:', selectedCategory);
    let filtered = [...templates];
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }
    
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
    // Ensure current page is still valid
    const validCurrentPage = Math.min(currentPage, totalPages || 1);
    if (validCurrentPage !== currentPage) {
      setCurrentPage(validCurrentPage);
    }
    
    // Paginate results
    const start = (validCurrentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedTemplates(filtered.slice(start, end));
    
    console.log('Filtered templates count:', filtered.length);
    console.log('Displayed templates (paginated):', filtered.slice(start, end).length);
  }, [templates, searchTerm, selectedCategory, currentPage]);

  // Template actions
  const handleViewTemplate = (template: Template) => {
    console.log('Viewing template:', template.name);
    setSelectedTemplate(template);
  };

  const handleCreateTemplate = (templateData: Omit<Template, "id">) => {
    try {
      const store = useTemplateStore.getState();
      const newTemplate = store.createTemplate(templateData);
      
      toast({
        title: "Template criado",
        description: `Template "${newTemplate.name}" foi criado com sucesso!`,
      });
      
      setNewTemplate(null);
      return true;
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleUpdateTemplate = (templateData: Partial<Template>) => {
    try {
      if (!templateData.id) {
        throw new Error('Template ID is required');
      }
      
      const store = useTemplateStore.getState();
      const updatedTemplate = store.updateTemplate(templateData.id, templateData);
      
      if (updatedTemplate) {
        toast({
          title: "Template atualizado",
          description: `Template "${updatedTemplate.name}" foi atualizado com sucesso!`,
        });
        setEditedTemplate(null);
        return true;
      }
      
      throw new Error('Template não encontrado');
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: "Erro ao atualizar template",
        description: "Ocorreu um erro ao atualizar o template.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleDeleteTemplate = (template: Template) => {
    try {
      const store = useTemplateStore.getState();
      const success = store.deleteTemplate(template.id);
      
      if (success) {
        toast({
          title: "Template excluído",
          description: `Template "${template.name}" foi excluído com sucesso!`,
        });
        return true;
      }
      
      throw new Error('Template não encontrado');
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Erro ao excluir template",
        description: "Ocorreu um erro ao excluir o template.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddBlock = (blockType: BlockType) => {
    if (editedTemplate) {
      const block = createBlock(blockType, 1);
      if (block) {
        setEditedTemplate({
          ...editedTemplate,
          blocks: [...(editedTemplate.blocks || []), block]
        });
      }
    } else if (newTemplate) {
      const block = createBlock(blockType, 1);
      if (block) {
        setNewTemplate({
          ...newTemplate,
          blocks: [...(newTemplate.blocks || []), block]
        });
      }
    }
  };

  const handleRemoveBlock = (blockId: string) => {
    if (editedTemplate) {
      setEditedTemplate({
        ...editedTemplate,
        blocks: editedTemplate.blocks.filter(block => block.id !== blockId)
      });
    } else if (newTemplate && newTemplate.blocks) {
      setNewTemplate({
        ...newTemplate,
        blocks: newTemplate.blocks.filter(block => block.id !== blockId)
      });
    }
  };

  console.log('Rendering TemplatesPanel with templates count:', templates.length);

  return (
    <div className="space-y-6">
      <TemplateActions
        editedTemplate={editedTemplate}
        setEditedTemplate={(template) => setEditedTemplate(template as Template | null)}
        newTemplate={newTemplate}
        setNewTemplate={setNewTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        onCreateTemplate={handleCreateTemplate}
        onAddBlock={handleAddBlock}
        onRemoveBlock={handleRemoveBlock}
      />
      
      <TemplateFiltering
        displayedTemplates={displayedTemplates}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        onViewTemplate={handleViewTemplate}
        onEditTemplate={(template) => {
          setSelectedTemplate(template);
          setEditedTemplate({...template});
        }}
        onDeleteTemplate={handleDeleteTemplate}
        currentPage={currentPage}
        totalPages={totalPages}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        getCategoryName={getCategoryName}
      />
    </div>
  );
};

export default TemplatesPanel;
