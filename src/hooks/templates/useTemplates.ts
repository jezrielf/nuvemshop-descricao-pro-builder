
import { useState, useEffect } from 'react';
import { Template } from '@/types/editor';
import { useTemplateStore } from '@/store/templates';

export function useTemplates() {
  const { templates, loadTemplates, searchTemplates, categories } = useTemplateStore();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        console.log('useTemplates - Iniciando carregamento de templates...');
        const loadedTemplates = await loadTemplates();
        console.log('useTemplates - Templates carregados:', loadedTemplates.length);
        
        if (loadedTemplates.length === 0) {
          console.warn('useTemplates - Nenhum template encontrado no banco');
        }
      } catch (error) {
        console.error('useTemplates - Erro ao carregar templates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [loadTemplates]);

  const filteredTemplates = searchTemplates(searchQuery, selectedCategory);

  console.log('useTemplates - Templates filtrados:', filteredTemplates.length);
  console.log('useTemplates - Categoria selecionada:', selectedCategory);
  console.log('useTemplates - Query de busca:', searchQuery);

  return {
    templates,
    categories,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTemplates
  };
}
