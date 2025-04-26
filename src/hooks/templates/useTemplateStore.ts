
import { useTemplateStore as useZustandTemplateStore } from '@/store/templates';
import { useEffect } from 'react';
import { Template } from '@/types/editor';
import templateService from '@/services/admin/templateService';

export function useTemplateStore() {
  const {
    templates,
    loadTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplatesByCategory,
    applyTemplate
  } = useZustandTemplateStore();

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // Wrapper for creating a template with logging
  const createTemplate = async (templateData: Omit<Template, "id">) => {
    console.log("Creating template:", templateData);
    const result = await templateService.createTemplate(templateData);
    
    // Add the template to the store after creating it
    if (result) {
      addTemplate(result);
    }
    
    console.log("Template created with ID:", result?.id);
    return result;
  };

  // Wrapper for updating a template with logging
  const updateTemplateWithLog = async (id: string, templateData: Partial<Template>) => {
    console.log("Updating template:", id, templateData);
    const result = await templateService.updateTemplate(id, templateData);
    
    // Update the template in the store
    if (result) {
      updateTemplate(id, templateData);
    }
    
    console.log("Template updated:", result);
    return result;
  };

  // Simple search function for templates
  const searchTemplates = (query = '', category: string | null = null) => {
    return templates.filter(template => {
      const matchesQuery = !query || 
        template.name.toLowerCase().includes(query.toLowerCase()) || 
        (template.description && template.description.toLowerCase().includes(query.toLowerCase()));
        
      const matchesCategory = !category || template.category === category;
      
      return matchesQuery && matchesCategory;
    });
  };

  return {
    templates,
    loadTemplates,
    createTemplate,
    updateTemplate: updateTemplateWithLog,
    deleteTemplate,
    getTemplatesByCategory,
    searchTemplates,
    applyTemplate
  };
}
