
import { Template, ProductCategory } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { convertBlock } from '@/utils/blockConverter';
import { fixTemplateProps } from '@/utils/templates/fixTemplateProps';

// Utility function to convert blocks if needed
export const convertBlocks = (blocks: any[]) => {
  return blocks.map(block => convertBlock(block));
};

// Get all templates
export const getTemplates = async (): Promise<Template[]> => {
  try {
    // In a real app, we would fetch from Supabase or another API
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return data.map(template => {
      return fixTemplateProps({
        id: template.id,
        name: template.name,
        category: template.category as ProductCategory,
        blocks: Array.isArray(template.blocks) ? template.blocks : [],
        createdAt: template.created_at,
        updatedAt: template.updated_at
      });
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    
    // Fallback to mock data if there's an error
    return getMockTemplates();
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

// Mock fallback templates
const getMockTemplates = (): Template[] => {
  return [
    {
      id: uuidv4(),
      name: 'Produto Básico',
      description: 'Template simples para descrição básica de produtos',
      category: 'other' as ProductCategory,
      blocks: [],
      thumbnailUrl: '/templates/basic.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: 'Suplemento Premium',
      description: 'Template completo para suplementos com benefícios destacados',
      category: 'supplements' as ProductCategory,
      blocks: [],
      thumbnailUrl: '/templates/supplements.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
};

// Function to apply a template
const applyTemplate = (template: Template) => {
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
};

// Export as a default object for compatibility
const templateService = {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  convertBlocks,
  applyTemplate
};

export default templateService;
