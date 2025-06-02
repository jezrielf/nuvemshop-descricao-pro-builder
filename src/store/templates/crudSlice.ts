
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
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
      
      const { data, error } = await supabase
        .from('templates')
        .insert([{
          name: templateData.name,
          category: templateData.category,
          blocks: templateData.blocks || [],
          user_id: userId
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      const createdTemplate: Template = {
        id: data.id,
        name: data.name,
        category: data.category as any,
        blocks: Array.isArray(data.blocks) ? data.blocks : [],
        user_id: data.user_id
      };
      
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
      
      const { data, error } = await supabase
        .from('templates')
        .update({
          name: templateData.name || existingTemplate.name,
          category: templateData.category || existingTemplate.category,
          blocks: templateData.blocks || existingTemplate.blocks
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      const updatedTemplate: Template = {
        id: data.id,
        name: data.name,
        category: data.category as any,
        blocks: Array.isArray(data.blocks) ? data.blocks : [],
        user_id: data.user_id
      };
      
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
      
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
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
