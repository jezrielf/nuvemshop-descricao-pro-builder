
import { StateCreator } from 'zustand';
import { TemplateState } from './state';
import { Template } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import templateService from '@/services/admin/templateService';

export interface TemplateCRUDSlice {
  createTemplate: (template: Omit<Template, 'id'>) => Promise<Template>;
  updateTemplate: (id: string, template: Partial<Template>) => Promise<Template | null>;
  deleteTemplate: (id: string) => Promise<boolean>;
  applyTemplate: (template: Template) => void;
}

export const createTemplateCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice,
  [],
  [],
  TemplateCRUDSlice
> = (set, get) => ({
  createTemplate: async (templateData) => {
    try {
      const newTemplate = await templateService.createTemplate(templateData);
      
      set((state) => ({
        templates: [...state.templates, newTemplate]
      }));
      
      return newTemplate;
    } catch (error) {
      console.error('Error creating template:', error);
      
      // Fallback to local creation if API fails
      const fallbackTemplate: Template = {
        id: uuidv4(),
        ...templateData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      set((state) => ({
        templates: [...state.templates, fallbackTemplate]
      }));
      
      return fallbackTemplate;
    }
  },
  
  updateTemplate: async (id, templateData) => {
    try {
      const updatedTemplate = await templateService.updateTemplate(id, templateData);
      
      set((state) => ({
        templates: state.templates.map((template) =>
          template.id === id ? { ...template, ...updatedTemplate } : template
        )
      }));
      
      return updatedTemplate;
    } catch (error) {
      console.error(`Error updating template ${id}:`, error);
      
      // Fallback to local update if API fails
      set((state) => ({
        templates: state.templates.map((template) =>
          template.id === id
            ? { ...template, ...templateData, updatedAt: new Date().toISOString() }
            : template
        )
      }));
      
      return { ...get().templates.find((t) => t.id === id)!, ...templateData };
    }
  },
  
  deleteTemplate: async (id) => {
    try {
      await templateService.deleteTemplate(id);
      
      set((state) => ({
        templates: state.templates.filter((template) => template.id !== id)
      }));
      
      return true;
    } catch (error) {
      console.error(`Error deleting template ${id}:`, error);
      
      // Fallback to local deletion if API fails
      set((state) => ({
        templates: state.templates.filter((template) => template.id !== id)
      }));
      
      return true;
    }
  },
  
  applyTemplate: (template) => {
    templateService.applyTemplate(template);
  }
});

export { createTemplateCRUDSlice as createCRUDSlice };
