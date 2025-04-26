
import { StateCreator } from 'zustand';
import { TemplateState, TemplateCRUDSlice } from './types';
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import templateService from '@/services/admin/templateService';

export const createTemplateCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice
> = (set, get) => ({
  addTemplate: (template: Template) => {
    const newTemplate = { ...template, id: template.id || uuidv4() };
    set((state) => ({
      templates: [...state.templates, newTemplate],
    }));

    // Save to backend if available
    try {
      templateService.createTemplate(newTemplate);
    } catch (error) {
      console.error('Error saving template:', error);
    }
  },

  updateTemplate: (id: string, templateUpdate: Partial<Template>) => {
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id ? { ...template, ...templateUpdate } : template
      ),
    }));

    // Update in backend if available
    try {
      templateService.updateTemplate(id, templateUpdate);
    } catch (error) {
      console.error('Error updating template:', error);
    }
  },

  deleteTemplate: (id: string) => {
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id),
    }));

    // Delete from backend if available
    try {
      templateService.deleteTemplate(id);
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  },

  applyTemplate: (template: Template) => {
    if (!template) return;
    
    // Import dynamically to avoid circular dependency
    const { useEditorStore } = require('@/store/editor');
    
    const { createNewDescription, loadDescription } = useEditorStore.getState();
    
    if (template && template.blocks) {
      // Create a new description based on the template
      const templateDescription = {
        id: uuidv4(),
        name: `Descrição baseada em "${template.name}"`,
        blocks: template.blocks ? [...template.blocks] : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: template.category
      };
      
      // Load the new description into the editor
      if (loadDescription) {
        loadDescription(templateDescription);
      } else if (createNewDescription) {
        createNewDescription(templateDescription.name);
      }
    }
  }
});
