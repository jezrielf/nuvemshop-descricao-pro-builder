import { Template, ProductCategory } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { convertBlock } from '@/utils/blockConverter';
import { fixTemplateProps } from '@/utils/templates/fixTemplateProps';
import { getAllTemplates } from '@/utils/templates';

// Cache of templates to prevent excessive database calls
let templateCache: Template[] | null = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// Utility function to convert blocks if needed
export const convertBlocks = (blocks: any[]) => {
  return blocks.map(block => convertBlock(block));
};

// Get all templates
export const getTemplates = async (): Promise<Template[]> => {
  try {
    // Check cache first to prevent excessive database calls
    const now = Date.now();
    if (templateCache && lastFetchTime > now - CACHE_EXPIRY) {
      console.log("Using template cache", templateCache.length);
      return templateCache;
    }
    
    // First try to get templates from Supabase
    const { data: dbTemplates, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.warn('Error fetching templates from database:', error);
      // Fallback to local templates if database fetch fails
      const localTemplates = getAllTemplates();
      templateCache = localTemplates;
      lastFetchTime = now;
      return localTemplates;
    }
    
    if (dbTemplates && dbTemplates.length > 0) {
      const fixedTemplates = dbTemplates.map(template => fixTemplateProps(template));
      templateCache = fixedTemplates;
      lastFetchTime = now;
      return fixedTemplates;
    }
    
    // If no templates in database, use local templates
    const localTemplates = getAllTemplates();
    templateCache = localTemplates;
    lastFetchTime = now;
    return localTemplates;
    
  } catch (error) {
    console.error('Error managing templates:', error);
    // Fallback to local templates in case of any error
    const localTemplates = getAllTemplates();
    templateCache = localTemplates;
    lastFetchTime = Date.now();
    return localTemplates;
  }
};

// Get a single template by ID
export const getTemplateById = async (id: string): Promise<Template | null> => {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    if (!data) return null;
    
    return fixTemplateProps({
      id: data.id,
      name: data.name,
      category: data.category as ProductCategory,
      blocks: Array.isArray(data.blocks) ? data.blocks : [],
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  } catch (error) {
    console.error(`Error fetching template ${id}:`, error);
    return null;
  }
};

// Create new template
export const createTemplate = async (template: Omit<Template, 'id'>): Promise<Template> => {
  try {
    const newTemplate = {
      id: uuidv4(),
      ...template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('templates')
      .insert([{
        id: newTemplate.id,
        name: newTemplate.name,
        category: newTemplate.category,
        blocks: newTemplate.blocks,
        created_at: newTemplate.createdAt,
        updated_at: newTemplate.updatedAt
      }])
      .select();
      
    if (error) throw error;
    
    return newTemplate;
  } catch (error) {
    console.error('Error creating template:', error);
    
    // Return the template anyway for UI purposes
    return {
      id: uuidv4(),
      ...template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};

// Update existing template
export const updateTemplate = async (id: string, template: Partial<Template>): Promise<Template> => {
  try {
    const updates: any = {
      ...template,
      updated_at: new Date().toISOString()
    };
    
    // Only include properties that exist in the database table
    delete updates.description;
    delete updates.thumbnailUrl;
    
    const { data, error } = await supabase
      .from('templates')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return fixTemplateProps({
      id: data.id,
      name: data.name,
      category: data.category as ProductCategory,
      blocks: Array.isArray(data.blocks) ? data.blocks : [],
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });
  } catch (error) {
    console.error(`Error updating template ${id}:`, error);
    
    // Return the template anyway for UI purposes
    return {
      id,
      ...(template as any),
      updatedAt: new Date().toISOString()
    };
  }
};

// Delete template
export const deleteTemplate = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error(`Error deleting template ${id}:`, error);
    return false;
  }
};

// Function to apply a template
const applyTemplate = (template: Template) => {
  try {
    // Import dynamically to avoid circular dependency
    const { useEditorStore } = require('@/store/editor');
    const { loadDescription } = useEditorStore.getState();
    
    if (!loadDescription) {
      console.error("Failed to apply template: Editor store not available");
      return;
    }
    
    const templateDescription = {
      id: uuidv4(),
      name: `Descrição baseada em "${template.name}"`,
      blocks: template.blocks ? [...template.blocks] : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: template.category
    };
    
    loadDescription(templateDescription);
  } catch (error) {
    console.error("Error applying template:", error);
  }
};

// Function to clear template cache (useful for admin operations)
export const clearTemplateCache = () => {
  templateCache = null;
  lastFetchTime = 0;
};

// Export as a default object for compatibility
const templateService = {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  convertBlocks,
  applyTemplate,
  clearTemplateCache
};

export default templateService;
