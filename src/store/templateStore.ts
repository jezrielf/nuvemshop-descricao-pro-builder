
import { create } from 'zustand';
import { Template, ProductCategory } from '@/types/editor';
import { getAllTemplates } from '@/utils/templates';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

interface TemplateState {
  templates: Template[];
  categories: string[];
  selectedCategory: string | null;
  customCategories: string[];
  loadTemplates: () => void;
  selectCategory: (category: string | null) => void;
  getTemplatesByCategory: (category: string | null) => Template[];
  searchTemplates: (searchTerm: string, category: string | null) => Template[];
  createTemplate: (template: Omit<Template, "id">) => Template;
  updateTemplate: (id: string, template: Partial<Template>) => Template | null;
  deleteTemplate: (id: string) => boolean;
  addCustomCategory: (category: string) => boolean;
}

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  categories: [],
  selectedCategory: null,
  customCategories: [],
  
  loadTemplates: async () => {
    try {
      // First load templates from utils (default templates)
      const defaultTemplates = getAllTemplates();
      console.log('Loading default templates, total count:', defaultTemplates.length);
      
      // Then try to load user templates from Supabase
      const { data: userTemplates, error } = await supabase
        .from('templates')
        .select('*');
      
      if (error) {
        console.error('Error loading templates from database:', error);
      }
      
      // Combine default templates with user templates
      const allTemplates = [
        ...defaultTemplates,
        ...(userTemplates || [])
      ];
      
      console.log('Total templates loaded:', allTemplates.length);
      
      // Extract categories from templates
      const templateCategories = Array.from(
        new Set(allTemplates.map(template => template.category))
      );
      
      // Also load custom categories from Supabase
      const { data: customCats, error: catError } = await supabase
        .from('template_categories')
        .select('name');
      
      if (catError) {
        console.error('Error loading custom categories:', catError);
      }
      
      const customCategories = (customCats || []).map(cat => cat.name);
      
      // Combine all categories
      const allCategories = Array.from(
        new Set([...templateCategories, ...customCategories])
      );
      
      set({
        templates: allTemplates,
        categories: allCategories,
        customCategories: customCategories
      });
    } catch (error) {
      console.error('Error in loadTemplates:', error);
      set({
        templates: [],
        categories: [],
        customCategories: []
      });
    }
  },
  
  selectCategory: (category) => {
    set({ selectedCategory: category });
    console.log('Categoria selecionada:', category);
  },
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    if (!category) {
      console.log('Retornando todos os templates:', templates.length);
      return templates;
    }
    const filteredTemplates = templates.filter(template => template.category === category);
    console.log(`Retornando templates da categoria ${category}:`, filteredTemplates.length);
    return filteredTemplates;
  },
  
  searchTemplates: (searchTerm, category) => {
    const { templates } = get();
    let filtered = [...templates];
    
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(template => template.category === category);
    }
    
    return filtered;
  },

  createTemplate: async (templateData) => {
    const newTemplate: Template = {
      id: uuidv4(),
      ...templateData
    };

    try {
      // Save to Supabase
      const { data, error } = await supabase
        .from('templates')
        .insert({
          id: newTemplate.id,
          name: newTemplate.name,
          category: newTemplate.category,
          blocks: newTemplate.blocks
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error creating template in database:', error);
        // Continue with local state update even if db save fails
      } else {
        console.log('Template created in database:', data);
      }
      
      // Update local state
      set(state => ({
        templates: [...state.templates, newTemplate]
      }));

      console.log('Template created:', newTemplate.name);
      return newTemplate;
    } catch (error) {
      console.error('Error in createTemplate:', error);
      // Still return the template even if db save fails
      // Update local state
      set(state => ({
        templates: [...state.templates, newTemplate]
      }));
      return newTemplate;
    }
  },

  updateTemplate: async (id, templateData) => {
    let updatedTemplate: Template | null = null;

    try {
      set(state => {
        const updatedTemplates = state.templates.map(template => {
          if (template.id === id) {
            updatedTemplate = { ...template, ...templateData };
            return updatedTemplate;
          }
          return template;
        });

        return { templates: updatedTemplates };
      });

      if (updatedTemplate) {
        // Save to Supabase
        const { error } = await supabase
          .from('templates')
          .upsert({
            id: updatedTemplate.id,
            name: updatedTemplate.name,
            category: updatedTemplate.category,
            blocks: updatedTemplate.blocks
          });
        
        if (error) {
          console.error('Error updating template in database:', error);
        } else {
          console.log('Template updated in database:', updatedTemplate.name);
        }
      }

      console.log('Template updated:', updatedTemplate?.name);
      return updatedTemplate;
    } catch (error) {
      console.error('Error in updateTemplate:', error);
      return updatedTemplate;
    }
  },

  deleteTemplate: async (id) => {
    let success = false;

    try {
      set(state => {
        const filteredTemplates = state.templates.filter(template => {
          if (template.id === id) {
            success = true;
            return false;
          }
          return true;
        });

        return { templates: filteredTemplates };
      });

      if (success) {
        // Delete from Supabase
        const { error } = await supabase
          .from('templates')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error('Error deleting template from database:', error);
        } else {
          console.log('Template deleted from database:', id);
        }
      }

      console.log('Template deleted, success:', success);
      return success;
    } catch (error) {
      console.error('Error in deleteTemplate:', error);
      return success;
    }
  },
  
  addCustomCategory: async (category) => {
    if (!category.trim()) return false;
    
    try {
      // Add to Supabase
      const { error } = await supabase
        .from('template_categories')
        .insert({ name: category.trim() });
      
      if (error) {
        console.error('Error adding custom category to database:', error);
        return false;
      }
      
      // Update local state
      set(state => {
        const updatedCategories = [...state.categories];
        const updatedCustomCategories = [...state.customCategories];
        
        if (!updatedCategories.includes(category)) {
          updatedCategories.push(category);
        }
        
        if (!updatedCustomCategories.includes(category)) {
          updatedCustomCategories.push(category);
        }
        
        return { 
          categories: updatedCategories,
          customCategories: updatedCustomCategories
        };
      });
      
      console.log('Custom category added:', category);
      return true;
    } catch (error) {
      console.error('Error in addCustomCategory:', error);
      return false;
    }
  }
}));
