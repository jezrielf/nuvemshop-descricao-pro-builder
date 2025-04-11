
import { useState, useEffect, useCallback } from 'react';
import { Template, ProductCategory, BlockType } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';
import { useToast } from '@/hooks/use-toast';
import { createBlock } from '@/utils/blockCreators';

export function useTemplateManagement() {
  const {
    templates,
    loadTemplates,
    createTemplate: storeCreateTemplate,
    updateTemplate: storeUpdateTemplate,
    deleteTemplate: storeDeleteTemplate
  } = useTemplateStore();

  const [displayedTemplates, setDisplayedTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editedTemplate, setEditedTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState<Partial<Template> | null>({
    name: '',
    category: 'other' as ProductCategory,
    blocks: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 10;

  // Categorias derivadas dos templates
  const categories = Array.from(
    new Set(templates.map(template => template.category))
  );

  // Carregar templates quando o componente montar
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // Filtrar templates baseado em busca e categoria
  useEffect(() => {
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
    
    // Garantir que a página atual ainda é válida
    const validCurrentPage = Math.min(currentPage, totalPages || 1);
    if (validCurrentPage !== currentPage) {
      setCurrentPage(validCurrentPage);
    }
    
    // Paginar resultados
    const start = (validCurrentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedTemplates(filtered.slice(start, end));
  }, [templates, searchTerm, selectedCategory, currentPage, itemsPerPage]);

  // Ações de template
  const handleViewTemplate = useCallback((template: Template) => {
    setSelectedTemplate(template);
  }, []);

  const handleCreateTemplate = useCallback((templateData: Omit<Template, "id">) => {
    try {
      const newTemplate = storeCreateTemplate(templateData);
      
      toast({
        title: "Template criado",
        description: `Template "${newTemplate.name}" foi criado com sucesso!`,
      });
      
      setNewTemplate({
        name: '',
        category: 'other' as ProductCategory,
        blocks: []
      });
      return true;
    } catch (error) {
      console.error('Erro ao criar template:', error);
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template.",
        variant: "destructive",
      });
      return false;
    }
  }, [storeCreateTemplate, toast]);

  const handleUpdateTemplate = useCallback((templateData: Template) => {
    try {
      const updatedTemplate = storeUpdateTemplate(templateData.id, templateData);
      
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
      console.error('Erro ao atualizar template:', error);
      toast({
        title: "Erro ao atualizar template",
        description: "Ocorreu um erro ao atualizar o template.",
        variant: "destructive",
      });
      return false;
    }
  }, [storeUpdateTemplate, toast]);

  const handleDeleteTemplate = useCallback((template: Template) => {
    try {
      const success = storeDeleteTemplate(template.id);
      
      if (success) {
        toast({
          title: "Template excluído",
          description: `Template "${template.name}" foi excluído com sucesso!`,
        });
        return true;
      }
      
      throw new Error('Template não encontrado');
    } catch (error) {
      console.error('Erro ao excluir template:', error);
      toast({
        title: "Erro ao excluir template",
        description: "Ocorreu um erro ao excluir o template.",
        variant: "destructive",
      });
      return false;
    }
  }, [storeDeleteTemplate, toast]);

  const handleAddBlock = useCallback((blockType: BlockType) => {
    const block = createBlock(blockType, 1);
    if (block) {
      if (editedTemplate) {
        setEditedTemplate({
          ...editedTemplate,
          blocks: [...editedTemplate.blocks, block]
        });
      } else if (newTemplate) {
        setNewTemplate({
          ...newTemplate,
          blocks: [...(newTemplate.blocks || []), block]
        });
      }
    }
  }, [editedTemplate, newTemplate]);

  const handleRemoveBlock = useCallback((blockId: string) => {
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
  }, [editedTemplate, newTemplate]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  return {
    templates,
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
    handleUpdateTemplate,
    handleDeleteTemplate,
    handlePreviousPage,
    handleNextPage,
    handleAddBlock,
    handleRemoveBlock
  };
}
