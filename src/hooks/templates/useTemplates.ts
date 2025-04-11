
import { useState, useEffect } from 'react';
import { Template } from '@/types/editor';
import { useTemplateStore } from './useTemplateStore';
import { useTemplateFilters } from './useTemplateFilters';
import { useTemplateActions } from './useTemplateActions';
import { useTemplateEditor } from './useTemplateEditor';

export function useTemplates() {
  const {
    templates: allTemplates,
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
  } = useTemplateStore();
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Carregar templates quando o componente montar
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // Use specialized hooks for different functionalities
  const {
    displayedTemplates,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage
  } = useTemplateFilters(allTemplates);

  const {
    handleViewTemplate,
    handleCreateTemplate,
    handleDeleteTemplate,
    handleUpdateTemplate
  } = useTemplateActions({
    storeCreateTemplate: createTemplate,
    storeUpdateTemplate: updateTemplate,
    storeDeleteTemplate: deleteTemplate
  });

  const {
    editedTemplate,
    setEditedTemplate,
    newTemplate,
    setNewTemplate,
    handleAddBlock,
    handleRemoveBlock
  } = useTemplateEditor();

  return {
    allTemplates,
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
