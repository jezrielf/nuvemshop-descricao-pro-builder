
import { useEffect } from 'react';
import { Template } from '@/types/editor';
import { useTemplateStore } from './templates/useTemplateStore';
import { useTemplateFilters } from './templates/useTemplateFilters';
import { useTemplateActions } from './templates/useTemplateActions';
import { useTemplateEditor } from './templates/useTemplateEditor';

export function useTemplateManagement() {
  const {
    templates,
    loadTemplates,
    storeCreateTemplate,
    storeUpdateTemplate,
    storeDeleteTemplate
  } = useTemplateStore();

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
  } = useTemplateFilters(templates);

  const {
    handleViewTemplate,
    handleCreateTemplate,
    handleUpdateTemplate,
    handleDeleteTemplate
  } = useTemplateActions({
    storeCreateTemplate,
    storeUpdateTemplate,
    storeDeleteTemplate
  });

  const {
    selectedTemplate,
    setSelectedTemplate,
    editedTemplate,
    setEditedTemplate,
    newTemplate,
    setNewTemplate,
    handleAddBlock,
    handleRemoveBlock
  } = useTemplateEditor();

  // Carregar templates quando o componente montar
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

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
