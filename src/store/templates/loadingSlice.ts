
import { StateCreator } from 'zustand';
import { Template, ProductCategory } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { supabase } from '@/integrations/supabase/client';
import { getAllTemplates } from '@/utils/templates';
import { deserializeBlocks, convertSupabaseToTemplate } from './utils';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('Loading templates from database...');
      
      // First try to load from database
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading templates from database:', error);
        // Fall back to loading from static templates
        console.log('Falling back to static templates...');
        const staticTemplates = getAllTemplates();
        
        // Ensure each template has a valid thumbnail
        const validatedTemplates = staticTemplates.map(template => {
          if (!template.thumbnail || template.thumbnail === '/placeholder.svg') {
            return {
              ...template,
              thumbnail: getDefaultThumbnail(template.category)
            };
          }
          return template;
        });
        
        set({ 
          templates: validatedTemplates,
          categories: Array.from(new Set(validatedTemplates.map(t => t.category)))
        });
        return;
      }
      
      // Process database templates
      if (data && data.length > 0) {
        console.log(`Loaded ${data.length} templates from database`);
        
        const templates: Template[] = data
          .map(item => convertSupabaseToTemplate(item))
          .filter((template): template is Template => template !== null)
          .map(template => {
            // Ensure each template has a valid thumbnail
            if (!template.thumbnail || template.thumbnail === '/placeholder.svg') {
              return {
                ...template,
                thumbnail: getDefaultThumbnail(template.category)
              };
            }
            return template;
          });
        
        const categories = Array.from(new Set(templates.map(t => t.category)));
        set({ templates, categories });
      } else {
        // No templates in database, load from static
        console.log('No templates in database, loading static templates');
        const staticTemplates = getAllTemplates();
        
        // Ensure each template has a valid thumbnail
        const validatedTemplates = staticTemplates.map(template => {
          if (!template.thumbnail || template.thumbnail === '/placeholder.svg') {
            return {
              ...template,
              thumbnail: getDefaultThumbnail(template.category)
            };
          }
          return template;
        });
        
        set({ 
          templates: validatedTemplates,
          categories: Array.from(new Set(validatedTemplates.map(t => t.category)))
        });
      }
    } catch (error) {
      console.error('Error in loadTemplates:', error);
      // Fall back to static templates
      const staticTemplates = getAllTemplates();
      
      // Ensure each template has a valid thumbnail
      const validatedTemplates = staticTemplates.map(template => {
        if (!template.thumbnail || template.thumbnail === '/placeholder.svg') {
          return {
            ...template,
            thumbnail: getDefaultThumbnail(template.category)
          };
        }
        return template;
      });
      
      set({ 
        templates: validatedTemplates,
        categories: Array.from(new Set(validatedTemplates.map(t => t.category)))
      });
    }
  },
  
  getTemplatesByCategory: (category) => {
    const { templates } = get();
    if (!category) return templates;
    return templates.filter(template => template.category === category);
  },
  
  searchTemplates: (query, category) => {
    const { templates } = get();
    
    if (!query && !category) return templates;
    
    return templates.filter(template => {
      const matchesQuery = !query || 
        template.name.toLowerCase().includes(query.toLowerCase());
      
      const matchesCategory = !category || template.category === category;
      
      return matchesQuery && matchesCategory;
    });
  }
});

// Helper function to get default thumbnail based on category
const getDefaultThumbnail = (category: ProductCategory): string => {
  switch(category) {
    case 'supplements':
      return 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=500';
    case 'clothing':
      return 'https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=500';
    case 'shoes':
      return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=500';
    case 'electronics':
      return 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500';
    case 'energy':
      return 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=500';
    case 'accessories':
      return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500';
    case 'home-decor':
      return 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=500';
    case 'beauty':
      return 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500';
    case 'fitness':
      return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500';
    case 'fashion':
      return 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500';
    default:
      return 'https://images.unsplash.com/photo-1553531384-411a247cce73?q=80&w=500';
  }
};
