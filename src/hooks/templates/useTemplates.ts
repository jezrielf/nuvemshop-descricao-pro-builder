
import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  // Usar useRef para controlar se a carga já aconteceu
  const templatesLoaded = useRef(false);

  // Carregar templates apenas uma vez quando o componente montar
  useEffect(() => {
    if (!templatesLoaded.current) {
      console.log("Loading templates...");
      loadTemplates();
      templatesLoaded.current = true;
    }
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
    handleViewTemplate: storeViewTemplate,
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

  // Add debug logs
  useEffect(() => {
    console.log("Templates loaded in useTemplates hook:", allTemplates.length);
    console.log("Displayed templates:", displayedTemplates.length);
    
    // Verificar templates vazios ou inválidos
    const invalidTemplates = allTemplates.filter(t => !t || !t.name || !t.category);
    if (invalidTemplates.length > 0) {
      console.warn("Templates inválidos encontrados:", invalidTemplates);
    }
  }, [allTemplates, displayedTemplates]);

  const handleViewTemplate = useCallback((template: Template) => {
    if (!template || !template.id || !template.name) {
      console.error("Tentativa de visualizar template inválido:", template);
      return;
    }
    
    console.log("Viewing template:", template.name);
    setSelectedTemplate(template);
    return storeViewTemplate(template);
  }, [storeViewTemplate]);

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
