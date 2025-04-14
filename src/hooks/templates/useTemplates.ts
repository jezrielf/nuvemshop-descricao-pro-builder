
import { useState, useEffect, useMemo } from 'react';
import { Template } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';

export function useTemplates() {
  const { templates, loadTemplates } = useTemplateStore();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await loadTemplates();
      setIsLoading(false);
    };
    loadData();
  }, [loadTemplates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [templates, searchQuery, selectedCategory]);

  return {
    templates,
    isLoading,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTemplates
  };
}
