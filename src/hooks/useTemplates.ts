
import { useState, useEffect } from 'react';
import { Template, ProductCategory } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export function useTemplates() {
  const { templates: allTemplates, categories, loadTemplates } = useTemplateStore();
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

    // Create a new template
    const createdTemplate: Template = {
      id: uuidv4(),
      name: templateData.name as string,
      category: templateData.category as ProductCategory,
      blocks: templateData.blocks || [],
      thumbnail: ''
    };

    // In a real application, this would save to the database
    toast({
      title: "Template criado",
      description: `O template "${createdTemplate.name}" foi criado com sucesso.`,
    });
    
    return true;
  };

  const handleDeleteTemplate = (template: Template | null) => {
    if (!template) return;
    
    // This would delete the template in a real application
    toast({
      title: "Template excluído",
      description: `O template "${template?.name}" foi excluído com sucesso.`,
    });
  };

  const handleUpdateTemplate = (templateData: Partial<Template>) => {
    if (!templateData.name || !templateData.category) {
      toast({
        title: "Erro ao atualizar template",
        description: "Nome e categoria são obrigatórios.",
        variant: "destructive"
      });
      return false;
    }
    
    // This would update the template in a real application
    toast({
      title: "Template atualizado",
      description: `O template "${templateData.name}" foi atualizado com sucesso.`,
    });
    
    return true;
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
    handleNextPage
  };
}
