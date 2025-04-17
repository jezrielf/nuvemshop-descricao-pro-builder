
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
import { v4 as uuidv4 } from 'uuid';
import { serializeBlocks } from './utils';
import { adminService } from '@/services/adminService';

export const createCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice,
  [],
  [],
  TemplateCRUDSlice
> = (set, get) => ({
  createTemplate: async (templateData) => {
    try {
      const newTemplate: Template = {
        ...templateData,
        id: uuidv4()
      };
      
      await adminService.createTemplate(newTemplate);
      
      set(state => ({
        templates: [...state.templates, newTemplate]
      }));
      
      return newTemplate;
    } catch (error) {
      console.error('Error in createTemplate:', error);
      throw error;
    }
  },
  
  updateTemplate: async (id, templateData) => {
    try {
      const { templates } = get();
      const templateIndex = templates.findIndex(t => t.id === id);
      
      if (templateIndex === -1) return null;
      
      const updatedTemplate: Template = {
        ...templates[templateIndex],
        ...templateData
      };
      
      await adminService.updateTemplate(id, {
        name: updatedTemplate.name,
        category: updatedTemplate.category,
        blocks: updatedTemplate.blocks
      });
      
      const newTemplates = [...templates];
      newTemplates[templateIndex] = updatedTemplate;
      set({ templates: newTemplates });
      
      return updatedTemplate;
    } catch (error) {
      console.error('Error in updateTemplate:', error);
      return null;
    }
  },
  
  deleteTemplate: async (id) => {
    try {
      await adminService.deleteTemplate(id);
      
      set(state => ({
        templates: state.templates.filter(template => template.id !== id)
      }));
      
      return true;
    } catch (error) {
      console.error('Error in deleteTemplate:', error);
      return false;
    }
  }
});
