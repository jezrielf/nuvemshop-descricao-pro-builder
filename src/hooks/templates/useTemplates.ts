
import { useState, useEffect } from 'react';
import { Template } from '@/types/editor';
import { useTemplateStore } from '@/store/templates';

export function useTemplates() {
  const { templates, loadTemplates, categories, selectedCategory, setSelectedCategory } = useTemplateStore();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);

  // Load templates on mount
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

  // Filter templates when search query or category changes
  useEffect(() => {
    const filterTemplates = () => {
      return templates.filter(template => {
        // Filter by search query
        const matchesQuery = !searchQuery || 
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (template.description && template.description.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // Filter by category
        const matchesCategory = !selectedCategory || template.category === selectedCategory;
        
        return matchesQuery && matchesCategory;
      });
    };
    
    setFilteredTemplates(filterTemplates());
  }, [templates, searchQuery, selectedCategory]);

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
