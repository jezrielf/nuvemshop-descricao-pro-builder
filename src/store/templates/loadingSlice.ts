
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
      console.log('loadingSlice - Carregando templates do Supabase...');
      
      // Verificar conexão com Supabase
      const { data: testData, error: testError } = await supabase
        .from('templates')
        .select('count')
        .limit(1);
        
      if (testError) {
        console.error('loadingSlice - Erro na conexão com Supabase:', testError);
        throw testError;
      }
      
      console.log('loadingSlice - Conexão com Supabase OK');
      
      // Carregar todos os templates
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('loadingSlice - Erro ao carregar templates:', error);
        throw error;
      }

      console.log('loadingSlice - Dados brutos do banco:', data);

      const templates: Template[] = (data || []).map(item => {
        console.log('loadingSlice - Processando template:', item.name);
        return {
          id: item.id,
          name: item.name,
          category: item.category as any,
          blocks: Array.isArray(item.blocks) ? item.blocks : [],
          user_id: item.user_id
        };
      });

      console.log('loadingSlice - Templates processados:', templates.length);
      templates.forEach((template, index) => {
        console.log(`loadingSlice - Template ${index + 1}: ${template.name} (${template.category}) - ${template.blocks.length} blocos`);
      });
      
      set({ templates });
      
      // Extrair categorias únicas
      const uniqueCategories = [...new Set(templates.map(t => t.category))];
      console.log('loadingSlice - Categorias encontradas:', uniqueCategories);
      set({ categories: uniqueCategories });
      
      return templates;
    } catch (error) {
      console.error('loadingSlice - Erro fatal no carregamento:', error);
      set({ templates: [], categories: [] });
      throw error;
    }
  },

  searchTemplates: (query: string, category: string | null) => {
    const { templates } = get();
    
    console.log('loadingSlice - searchTemplates chamado:', { query, category, totalTemplates: templates.length });
    
    if (!templates || templates.length === 0) {
      console.warn('loadingSlice - Sem templates para filtrar');
      return [];
    }

    let filtered = [...templates];

    // Filtrar por categoria
    if (category && category !== 'all' && category !== null) {
      const originalCount = filtered.length;
      filtered = filtered.filter(template => template.category === category);
      console.log(`loadingSlice - Filtro por categoria '${category}': ${originalCount} -> ${filtered.length}`);
    }

    // Filtrar por busca
    if (query && query.trim() !== '') {
      const searchTerm = query.toLowerCase();
      const originalCount = filtered.length;
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm) ||
        template.category.toLowerCase().includes(searchTerm)
      );
      console.log(`loadingSlice - Filtro por busca '${searchTerm}': ${originalCount} -> ${filtered.length}`);
    }

    console.log('loadingSlice - Templates filtrados final:', filtered.length);
    return filtered;
  }
});
