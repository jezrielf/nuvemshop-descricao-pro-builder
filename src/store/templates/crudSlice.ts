
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
import { supabase } from '@/integrations/supabase/client';
import { ProductCategory } from '@/types/editor/products';

export const createCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice,
  [],
  [],
  TemplateCRUDSlice
> = (set, get) => ({
  createTemplate: async (templateData) => {
    try {
      console.log('createTemplate() - Starting template creation');
      
      // Get current authenticated user
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error('Error in createTemplate: Not authenticated', sessionError);
        throw new Error('Authentication required');
      }
      
      const userId = sessionData.session.user.id;
      console.log('createTemplate() - Current user:', userId);
      
      // Create template in Supabase - explicitly type the insert to exclude id
      const { data, error } = await supabase
        .from('templates')
        .insert({
          name: templateData.name,
          category: templateData.category as string,
          blocks: templateData.blocks || [],
          user_id: userId
        } as any) // Use 'as any' to bypass the strict typing for insert
        .select()
        .single();
      
      if (error) {
        console.error('Error creating template in Supabase:', error);
        throw error;
      }
      
      // Convert to Template format
      const newTemplate: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory, // Cast back to ProductCategory
        blocks: Array.isArray(data.blocks) ? data.blocks : [],
        thumbnail: '/placeholder.svg',
        user_id: data.user_id
      };
      
      // Update local state
      set(state => ({
        templates: [...state.templates, newTemplate]
      }));
      
      console.log('createTemplate() - Template created successfully:', newTemplate.id);
      return newTemplate;
    } catch (error) {
      console.error('Error in createTemplate:', error);
      throw error;
    }
  },
  
  updateTemplate: async (id, templateData) => {
    try {
      console.log('updateTemplate() - Updating template:', id);
      
      // Get current authenticated user
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      
      if (!userId) {
        console.error('Not authenticated for updateTemplate');
        throw new Error('Authentication required');
      }
      
      // Update template in Supabase
      const { data, error } = await supabase
        .from('templates')
        .update({
          name: templateData.name,
          category: templateData.category as string, // Cast to string for database
          blocks: templateData.blocks,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating template in Supabase:', error);
        throw error;
      }
      
      // Convert to Template format
      const updatedTemplate: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory, // Cast back to ProductCategory
        blocks: Array.isArray(data.blocks) ? data.blocks : [],
        thumbnail: '/placeholder.svg',
        user_id: data.user_id
      };
      
      // Update local state
      const { templates } = get();
      const templateIndex = templates.findIndex(t => t.id === id);
      
      if (templateIndex !== -1) {
        const newTemplates = [...templates];
        newTemplates[templateIndex] = updatedTemplate;
        set({ templates: newTemplates });
      }
      
      console.log('updateTemplate() - Template updated successfully');
      return updatedTemplate;
    } catch (error) {
      console.error('Error in updateTemplate:', error);
      throw error;
    }
  },
  
  deleteTemplate: async (id) => {
    try {
      console.log('deleteTemplate() - Deleting template:', id);
      
      // Delete template from Supabase
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting template from Supabase:', error);
        throw error;
      }
      
      // Update local state
      set(state => ({
        templates: state.templates.filter(template => template.id !== id)
      }));
      
      console.log('deleteTemplate() - Template deleted successfully');
      return true;
    } catch (error) {
      console.error('Error in deleteTemplate:', error);
      throw error;
    }
  }
});
