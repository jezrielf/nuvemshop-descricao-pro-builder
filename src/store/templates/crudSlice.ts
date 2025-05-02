import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
import { adminService } from '@/services/admin';
import { supabase } from '@/integrations/supabase/client';

export const createCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice,
  [],
  [],
  TemplateCRUDSlice
> = (set, get) => ({
  createTemplate: async (templateData) => {
    try {
      // Get current authenticated user
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error('Error in createTemplate: Not authenticated', sessionError);
        throw new Error('Authentication required');
      }
      
      const userId = sessionData.session.user.id;
      
      const newTemplate: Omit<Template, 'id'> = {
        ...templateData,
        blocks: templateData.blocks || [],
        // Ensure user_id is explicitly set
        user_id: userId
      };
      
      console.log('Creating template with user_id:', userId);
      const createdTemplate = await adminService.createTemplate(newTemplate);
      
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
      const { templates } = get();
      const templateIndex = templates.findIndex(t => t.id === id);
      
      if (templateIndex === -1) {
        console.error('Template not found for update:', id);
        return null;
      }
      
      const existingTemplate = templates[templateIndex];
      
      // Get current authenticated user
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      
      if (!userId) {
        console.error('Not authenticated for updateTemplate');
        return null;
      }
      
      console.log('Updating template with user_id:', userId);
      const updatedTemplate = await adminService.updateTemplate(id, {
        ...templateData,
        // Preserve user_id from existing template or set it to current user
        user_id: existingTemplate.user_id || userId,
        // Keep existing properties that aren't being updated
        name: templateData.name || existingTemplate.name,
        category: templateData.category || existingTemplate.category,
        blocks: templateData.blocks || existingTemplate.blocks
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
      console.log('Attempting to delete template:', id);
      
      // Get current authenticated user for logging purposes
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      console.log('Current user performing delete:', userId);
      
      await adminService.deleteTemplate(id);
      
      set(state => ({
        templates: state.templates.filter(template => template.id !== id)
      }));
      
      console.log('Template deleted successfully from state');
      return true;
    } catch (error) {
      console.error('Error in deleteTemplate:', error);
      return false;
    }
  }
});
