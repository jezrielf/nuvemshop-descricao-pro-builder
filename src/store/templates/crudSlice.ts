
import { StateCreator } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Template, ProductCategory } from '@/types/editor';
import { TemplateState, TemplateCRUDSlice } from './types';
import { v4 as uuidv4 } from 'uuid';

export const createCRUDSlice: StateCreator<
  TemplateState & TemplateCRUDSlice,
  [],
  [],
  TemplateCRUDSlice
> = (set, get) => ({
  // Carregar templates
  loadTemplates: async () => {
    try {
      console.log('TemplateCRUDSlice: Loading templates from Supabase');
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading templates:', error);
        throw new Error(`Erro ao carregar templates: ${error.message}`);
      }

      const templates: Template[] = data.map(template => ({
        id: template.id,
        name: template.name,
        category: template.category as ProductCategory,
        blocks: Array.isArray(template.blocks) ? template.blocks : []
      }));

      console.log('TemplateCRUDSlice: Templates loaded successfully:', templates.length);
      set({ templates });
      return templates;
    } catch (error: any) {
      console.error('TemplateCRUDSlice: Error loading templates:', error);
      throw error;
    }
  },

  // Criar template
  createTemplate: async (template: Omit<Template, 'id'>) => {
    try {
      console.log('TemplateCRUDSlice: Creating template:', template);
      
      const templateId = uuidv4();
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('templates')
        .insert({
          id: templateId,
          name: template.name,
          category: template.category as string,
          blocks: template.blocks,
          created_at: now,
          updated_at: now
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating template:', error);
        throw new Error(`Erro ao criar template: ${error.message}`);
      }

      const newTemplate: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks: Array.isArray(data.blocks) ? data.blocks : []
      };

      const { templates } = get();
      set({ templates: [newTemplate, ...templates] });

      console.log('TemplateCRUDSlice: Template created successfully:', newTemplate);
      return newTemplate;
    } catch (error: any) {
      console.error('TemplateCRUDSlice: Error creating template:', error);
      throw error;
    }
  },

  // Atualizar template
  updateTemplate: async (id: string, updates: Partial<Template>) => {
    try {
      console.log('TemplateCRUDSlice: Updating template:', id, updates);
      
      const { data, error } = await supabase
        .from('templates')
        .update({
          name: updates.name,
          category: updates.category as string,
          blocks: updates.blocks,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating template:', error);
        throw new Error(`Erro ao atualizar template: ${error.message}`);
      }

      const updatedTemplate: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks: Array.isArray(data.blocks) ? data.blocks : []
      };

      const { templates } = get();
      const updatedTemplates = templates.map(t => t.id === id ? updatedTemplate : t);
      set({ templates: updatedTemplates });

      console.log('TemplateCRUDSlice: Template updated successfully:', updatedTemplate);
      return updatedTemplate;
    } catch (error: any) {
      console.error('TemplateCRUDSlice: Error updating template:', error);
      throw error;
    }
  },

  // Deletar template
  deleteTemplate: async (id: string) => {
    try {
      console.log('TemplateCRUDSlice: Deleting template:', id);
      
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting template:', error);
        throw new Error(`Erro ao deletar template: ${error.message}`);
      }

      const { templates } = get();
      const filteredTemplates = templates.filter(t => t.id !== id);
      set({ templates: filteredTemplates });

      console.log('TemplateCRUDSlice: Template deleted successfully');
      return true;
    } catch (error: any) {
      console.error('TemplateCRUDSlice: Error deleting template:', error);
      throw error;
    }
  },

  // Buscar templates
  searchTemplates: (query: string, category?: string | null) => {
    const { templates } = get();
    
    let filtered = templates;
    
    if (category) {
      filtered = filtered.filter(template => template.category === category);
    }
    
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(lowercaseQuery) ||
        template.category.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    return filtered;
  }
});
