
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
import { adminService } from '@/services/admin';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

export const createCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice,
  [],
  [],
  TemplateCRUDSlice
> = (set, get) => ({
  createTemplate: async (templateData) => {
    try {
      console.log('Creating template in store:', templateData);
      const newTemplate: Omit<Template, 'id'> = {
        ...templateData,
        blocks: templateData.blocks || []
      };
      
      const createdTemplate = await adminService.createTemplate(newTemplate);
      console.log('Template created successfully:', createdTemplate);
      
      set(state => ({
        templates: [...state.templates, createdTemplate]
      }));
      
      return createdTemplate;
    } catch (error) {
      console.error('Error in createTemplate:', error);
      throw error;
    }
  },
  
  updateTemplate: async (id, templateData) => {
    try {
      console.log('Updating template in store:', id, templateData);
      const { templates } = get();
      const templateIndex = templates.findIndex(t => t.id === id);
      
      if (templateIndex === -1) {
        console.error('Template not found for update:', id);
        return null;
      }
      
      const existingTemplate = templates[templateIndex];
      console.log('Existing template:', existingTemplate);
      
      const updatedTemplate = await adminService.updateTemplate(id, {
        ...templateData,
        // Keep existing properties that aren't being updated
        name: templateData.name || existingTemplate.name,
        category: templateData.category || existingTemplate.category,
        blocks: templateData.blocks || existingTemplate.blocks
      });
      
      console.log('Template updated successfully:', updatedTemplate);
      
      if (updatedTemplate) {
        const newTemplates = [...templates];
        newTemplates[templateIndex] = updatedTemplate;
        set({ templates: newTemplates });
      }
      
      return updatedTemplate;
    } catch (error) {
      console.error('Error in updateTemplate:', error);
      return null;
    }
  },
  
  deleteTemplate: async (id) => {
    try {
      console.log('Deleting template in store:', id);
      await adminService.deleteTemplate(id);
      console.log('Template deleted successfully');
      
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
