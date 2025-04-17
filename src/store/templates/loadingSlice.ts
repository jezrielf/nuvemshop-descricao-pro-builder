
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
      const templates = await templateService.getTemplates();
      
      if (!templates || templates.length === 0) {
        console.log('Nenhum template encontrado no serviço, usando templates locais');
        const localTemplates = getAllTemplates();
        set({ templates: localTemplates });
        return localTemplates;
      }
      
      console.log(`Carregados ${templates.length} templates com sucesso`);
      set({ templates });
      return templates;
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
      // Fallback para templates locais em caso de erro
      const localTemplates = getAllTemplates();
      set({ templates: localTemplates });
      return localTemplates;
    }
  },
  
  searchTemplates: (query, category) => {
    const { templates } = get();
    
    // Se não há templates, verificamos se precisamos carregar
    if (!templates || templates.length === 0) {
      console.warn('Tentando buscar templates, mas nenhum está carregado');
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
