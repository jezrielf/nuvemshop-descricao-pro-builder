import { StateCreator } from 'zustand';
import { Template } from '@/types/editor';
import { TemplateState, TemplateLoadingSlice } from './types';
import { templateService } from '@/services/admin/templateService';
import { getAllTemplates } from '@/utils/templates';

export const createLoadingSlice: StateCreator<
  TemplateState & TemplateLoadingSlice,
  [],
  [],
  TemplateLoadingSlice
> = (set, get) => ({
  loadTemplates: async () => {
    try {
      console.log('Tentando carregar templates do serviço...');
      
      // Always have a fallback of local templates
      const localTemplates = getAllTemplates();
      
      // Ensure we have templates available immediately
      if (get().templates.length === 0) {
        console.log('Definindo templates locais para uso imediato enquanto carregamos do servidor');
        set({ templates: localTemplates });
      }
      
      // Try to load from server
      let templates = await templateService.getTemplates();
      
      // Ensure we always have templates available
      if (!templates || templates.length === 0) {
        console.log('Nenhum template retornado pelo serviço, usando templates locais');
        templates = localTemplates;
      }
      
      console.log(`Carregados ${templates.length} templates com sucesso`);
      set({ templates });
      return templates;
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
      // Fallback to local templates in case of error
      const localTemplates = getAllTemplates();
      set({ templates: localTemplates });
      console.log(`Fallback para ${localTemplates.length} templates locais`);
      return localTemplates;
    }
  },
  
  searchTemplates: (query, category) => {
    const { templates } = get();
    
    // Se não há templates, verificamos se precisamos carregar
    if (!templates || templates.length === 0) {
      console.warn('Tentando buscar templates, mas nenhum está carregado');
      // Retornamos um array vazio, mas o componente deve tratar este caso
      return [];
    }
    
    return templates.filter(template => {
      // Filter by category if selected
      if (category && template.category !== category) {
        return false;
      }
      
      // Filter by search query if provided
      if (query && query.trim() !== '') {
        const normalizedQuery = query.toLowerCase().trim();
        return template.name.toLowerCase().includes(normalizedQuery);
      }
      
      return true;
    });
  }
});
