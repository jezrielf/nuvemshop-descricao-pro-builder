
import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { supabase } from '@/integrations/supabase/client';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('Loading templates from Supabase...');
      
      // Primeiro, tentar migrar templates se necessário
      try {
        console.log('Verificando se precisa migrar templates...');
        const { data: migrationResult } = await supabase.functions.invoke('migrate-templates');
        console.log('Resultado da migração:', migrationResult);
      } catch (migrationError) {
        console.warn('Aviso na migração de templates:', migrationError);
        // Continuar mesmo se a migração falhar
      }
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading templates:', error);
        throw error;
      }

      const templates: Template[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as any,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id
      }));

      console.log('Templates loaded successfully:', templates.length);
      console.log('Template names:', templates.map(t => t.name));
      
      set({ templates });
      return templates;
    } catch (error) {
      console.error('Error in loadTemplates:', error);
      set({ templates: [] });
      throw error;
    }
  },

  searchTemplates: (query: string, category: string | null) => {
    const { templates } = get();
    
    if (!templates || templates.length === 0) {
      return [];
    }

    let filtered = [...templates];

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(template => template.category === category);
    }

    // Filter by search query
    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm) ||
        template.category.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }
});
