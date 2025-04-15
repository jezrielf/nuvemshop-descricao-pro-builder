
import { create } from 'zustand';
import { Template, ProductCategory, Block } from '@/types/editor';
import { getAllTemplates } from '@/utils/templates';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

// Define the Supabase template data structure
interface SupabaseTemplate {
  id: string;
  name: string;
  category: string;
  blocks: any; // This will be stored as JSON
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

interface TemplateState {
  templates: Template[];
  categories: string[];
  selectedCategory: string | null;
  customCategories: string[];
  loadTemplates: () => Promise<void>;
  selectCategory: (category: string | null) => void;
  getTemplatesByCategory: (category: string | null) => Template[];
  searchTemplates: (searchTerm: string, category: string | null) => Template[];
  createTemplate: (template: Omit<Template, "id">) => Promise<Template>;
  updateTemplate: (id: string, template: Partial<Template>) => Promise<Template | null>;
  deleteTemplate: (id: string) => Promise<boolean>;
  addCustomCategory: (category: string) => Promise<boolean>;
}

// Utility function to convert Supabase template format to our Template type
const convertSupabaseToTemplate = (supaTemplate: SupabaseTemplate): Template => {
  try {
    // Ensure blocks is always an array
    let blocks = [];
    
    if (Array.isArray(supaTemplate.blocks)) {
      blocks = supaTemplate.blocks;
    } else if (typeof supaTemplate.blocks === 'object' && supaTemplate.blocks !== null) {
      blocks = Object.values(supaTemplate.blocks);
    }
    
    // Log for debugging
    console.log(`Converting template: ${supaTemplate.name}, blocks type:`, 
      typeof supaTemplate.blocks, 
      'isArray:', Array.isArray(supaTemplate.blocks), 
      'length:', blocks.length);
    
    return {
      id: supaTemplate.id,
      name: supaTemplate.name,
      category: supaTemplate.category,
      blocks: blocks
    };
  } catch (error) {
    console.error('Error converting template:', error, supaTemplate);
    // Return a minimal valid template to prevent app crashes
    return {
      id: supaTemplate.id || uuidv4(),
      name: supaTemplate.name || 'Error Template',
      category: supaTemplate.category || 'other',
      blocks: []
    };
  }
};

// Helper to serialize blocks for Supabase storage
const serializeBlocks = (blocks: Block[]): any => {
  return JSON.parse(JSON.stringify(blocks));
};

export const useTemplateStore = create<TemplateState>((set, get) => ({
  templates: [],
  categories: [],
  selectedCategory: null,
  customCategories: [],
  
  loadTemplates: async () => {
    try {
      console.log('Starting template loading process...');
      
      // First load templates from utils (default templates)
      const defaultTemplates = getAllTemplates();
      console.log('Default templates loaded, count:', defaultTemplates.length);
      
      // Then try to load user templates from Supabase
      const { data: userTemplatesData, error } = await supabase
        .from('templates')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) {
        console.error('Error loading templates from database:', error);
        throw error;
      }
      
      console.log('User templates from database:', userTemplatesData?.length || 0);
      
      // Convert Supabase templates to our Template format
      const userTemplates: Template[] = [];
      
      // Process templates safely
      (userTemplatesData || []).forEach(template => {
        try {
          const converted = convertSupabaseToTemplate(template as SupabaseTemplate);
          userTemplates.push(converted);
        } catch (conversionError) {
          console.error(`Failed to convert template ${template.id}:`, conversionError);
        }
      });
      
      // Combine default templates with user templates
      const allTemplates = [
        ...defaultTemplates,
        ...userTemplates
      ];
      
      console.log('Total templates loaded successfully:', allTemplates.length);
      
      // Extract categories from templates
      const templateCategories = Array.from(
        new Set(allTemplates.map(template => template.category))
      );
      
      console.log('Template categories found:', templateCategories);
      
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
      
      console.log('Template store updated successfully');
    } catch (error) {
      console.error('Critical error in loadTemplates:', error);
      // Still set any default templates we have to prevent complete failure
      const defaultTemplates = getAllTemplates();
      set({
        templates: defaultTemplates,
        categories: Array.from(new Set(defaultTemplates.map(t => t.category))),
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
    try {
      const newTemplate: Template = {
        ...templateData,
        id: uuidv4()
      };
      
      console.log('Creating new template:', newTemplate);
      
      // Add to Supabase if possible
      try {
        const { data, error } = await supabase
          .from('templates')
          .insert({
            id: newTemplate.id,
            name: newTemplate.name,
            category: newTemplate.category,
            blocks: serializeBlocks(newTemplate.blocks)
          });
        
        if (error) {
          console.error('Error saving template to database:', error);
        } else {
          console.log('Template successfully saved to database');
        }
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
      }
      
      // Update local state regardless of DB success
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
      
      if (templateIndex === -1) {
        console.error('Template not found:', id);
        return null;
      }
      
      const updatedTemplate: Template = {
        ...templates[templateIndex],
        ...templateData
      };
      
      console.log('Updating template:', id, updatedTemplate);
      
      // Update in Supabase if possible
      try {
        const { data, error } = await supabase
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
        } else {
          console.log('Template successfully updated in database');
        }
      } catch (dbError) {
        console.error('Database update operation failed:', dbError);
      }
      
      // Update local state regardless of DB success
      const newTemplates = [...templates];
      newTemplates[templateIndex] = updatedTemplate;
      
      set({
        templates: newTemplates
      });
      
      return updatedTemplate;
    } catch (error) {
      console.error('Error in updateTemplate:', error);
      return null;
    }
  },
  
  deleteTemplate: async (id) => {
    try {
      console.log('Deleting template:', id);
      
      // Try to delete from Supabase
      try {
        const { error } = await supabase
          .from('templates')
          .delete()
          .eq('id', id);
        
        if (error) {
          console.error('Error deleting template from database:', error);
        } else {
          console.log('Template successfully deleted from database');
        }
      } catch (dbError) {
        console.error('Database delete operation failed:', dbError);
      }
      
      // Update local state regardless of DB success
      set(state => ({
        templates: state.templates.filter(template => template.id !== id)
      }));
      
      return true;
    } catch (error) {
      console.error('Error in deleteTemplate:', error);
      return false;
    }
  },
  
  addCustomCategory: async (category) => {
    try {
      // Try to add to Supabase
      const { data, error } = await supabase
        .from('template_categories')
        .insert({ name: category });
      
      if (error) {
        console.error('Error adding category to database:', error);
        return false;
      }
      
      // Update local state
      set(state => ({
        categories: [...state.categories, category],
        customCategories: [...state.customCategories, category]
      }));
      
      return true;
    } catch (error) {
      console.error('Error in addCustomCategory:', error);
      return false;
    }
  }
}));
