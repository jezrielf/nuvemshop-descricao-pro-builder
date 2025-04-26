
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
import templateService from '@/services/admin/templateService';

export const createCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice
> = (set, get) => ({
  templates: [],
  
  addTemplate: (template: Template) => {
    set(state => ({
      templates: [...state.templates, template]
    }));
  },
  
  updateTemplate: (id: string, template: Partial<Template>) => {
    set(state => ({
      templates: state.templates.map(t => 
        t.id === id ? { ...t, ...template } : t
      )
    }));
  },
  
  deleteTemplate: (id: string) => {
    set(state => ({
      templates: state.templates.filter(t => t.id !== id)
    }));
  },
  
  applyTemplate: (template: Template) => {
    templateService.applyTemplate(template);
  },
  
  createTemplate: async (template: Omit<Template, "id">) => {
    try {
      const newTemplate = await templateService.createTemplate(template);
      set(state => ({
        templates: [...state.templates, newTemplate]
      }));
      return newTemplate;
    } catch (error) {
      console.error("Failed to create template:", error);
      throw error;
    }
  },
  
  searchTemplates: (query?: string, category?: string | null) => {
    const templates = get().templates;
    
    if (!query && !category) {
      return templates;
    }
    
    return templates.filter(template => {
      const matchesQuery = !query || 
        template.name.toLowerCase().includes(query.toLowerCase()) || 
        (template.description && template.description.toLowerCase().includes(query.toLowerCase()));
      
      const matchesCategory = !category || template.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }
});
