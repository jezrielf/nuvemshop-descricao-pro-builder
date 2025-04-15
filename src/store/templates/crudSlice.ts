
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { serializeBlocks } from './utils';

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
      
      const { error } = await supabase
        .from('templates')
        .insert({
          id: newTemplate.id,
          name: newTemplate.name,
          category: newTemplate.category,
          blocks: serializeBlocks(newTemplate.blocks)
        });
      
      if (error) {
        console.error('Error saving template to database:', error);
        throw error;
      }
      
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
      
      const { error } = await supabase
        .from('templates')
        .update({
          name: updatedTemplate.name,
          category: updatedTemplate.category,
          blocks: serializeBlocks(updatedTemplate.blocks),
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating template in database:', error);
        throw error;
      }
      
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
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting template from database:', error);
        throw error;
      }
      
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
