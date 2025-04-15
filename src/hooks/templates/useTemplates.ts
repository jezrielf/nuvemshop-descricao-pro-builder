
import { useState, useEffect } from 'react';
import { Template } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';

export function useTemplates() {
  const { templates, loadTemplates, searchTemplates, categories } = useTemplateStore();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await loadTemplates();
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [loadTemplates]);

  const filteredTemplates = searchTemplates(searchQuery, selectedCategory);

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
