
import { useState, useEffect } from 'react';
import { Template, ProductCategory, BlockType } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '@/utils/blockCreators';

export function useTemplates() {
  const { 
    templates: allTemplates, 
    categories, 
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  } = useTemplateStore();
  
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [displayedTemplates, setDisplayedTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editedTemplate, setEditedTemplate] = useState<Partial<Template>>({});
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: '',
    category: 'other' as ProductCategory,
    blocks: []
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  
  const { toast } = useToast();

  useEffect(() => {
    // Load templates when hook is initialized
    loadTemplates();
  }, [loadTemplates]);

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
    
    setFilteredTemplates(filtered);
    
    // Calculate total pages
    setTotalPages(Math.max(1, Math.ceil(filtered.length / itemsPerPage)));
    
    // Reset to first page when filters change
    if (currentPage > Math.ceil(filtered.length / itemsPerPage)) {
      setCurrentPage(1);
    }
  }, [allTemplates, searchTerm, selectedCategory, itemsPerPage, currentPage]);

  useEffect(() => {
    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedTemplates(filteredTemplates.slice(startIndex, endIndex));
  }, [filteredTemplates, currentPage, itemsPerPage]);

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    return template;
  };

  const handleCreateTemplate = (templateData: Partial<Template>) => {
    // Validate form
    if (!templateData.name || !templateData.category) {
      toast({
        title: "Erro ao criar template",
        description: "Nome e categoria são obrigatórios.",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Create a new template with the store function
      createTemplate({
        name: templateData.name,
        category: templateData.category as ProductCategory,
        blocks: templateData.blocks || [],
        thumbnail: templateData.thumbnail || ''
      });

      toast({
        title: "Template criado",
        description: `O template "${templateData.name}" foi criado com sucesso.`,
      });
      
      // Reset the new template form
      setNewTemplate({
        name: '',
        category: 'other' as ProductCategory,
        blocks: []
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleDeleteTemplate = (template: Template | null) => {
    if (!template) return;
    
    try {
      // Delete the template using the store function
      deleteTemplate(template.id);
      
      toast({
        title: "Template excluído",
        description: `O template "${template.name}" foi excluído com sucesso.`,
      });
      
      // Clear selected template if it was deleted
      if (selectedTemplate?.id === template.id) {
        setSelectedTemplate(null);
      }
    } catch (error) {
      toast({
        title: "Erro ao excluir template",
        description: "Ocorreu um erro ao excluir o template.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateTemplate = (templateData: Partial<Template>) => {
    if (!templateData.id || !templateData.name || !templateData.category) {
      toast({
        title: "Erro ao atualizar template",
        description: "ID, nome e categoria são obrigatórios.",
        variant: "destructive"
      });
      return false;
    }
    
    try {
      // Update the template using the store function
      const updated = updateTemplate(templateData.id, templateData);
      
      if (updated) {
        toast({
          title: "Template atualizado",
          description: `O template "${templateData.name}" foi atualizado com sucesso.`,
        });
        
        // Update selected template if it was updated
        if (selectedTemplate?.id === templateData.id) {
          setSelectedTemplate(updated);
        }
        
        return true;
      } else {
        throw new Error("Template não encontrado");
      }
    } catch (error) {
      toast({
        title: "Erro ao atualizar template",
        description: "Ocorreu um erro ao atualizar o template.",
        variant: "destructive"
      });
      return false;
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

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return {
    allTemplates,
    filteredTemplates,
    displayedTemplates,
    selectedTemplate,
    setSelectedTemplate,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    editedTemplate,
    setEditedTemplate,
    newTemplate,
    setNewTemplate,
    categories,
    currentPage,
    totalPages,
    handleViewTemplate,
    handleCreateTemplate,
    handleDeleteTemplate,
    handleUpdateTemplate,
    handlePreviousPage,
    handleNextPage,
    handleAddBlock,
    handleRemoveBlock
  };
}
