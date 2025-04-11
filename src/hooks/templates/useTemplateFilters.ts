
import { useState, useEffect } from 'react';
import { Template } from '@/types/editor';

export function useTemplateFilters(templates: Template[], itemsPerPage: number = 10) {
  const [displayedTemplates, setDisplayedTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Categorias derivadas dos templates
  const categories = Array.from(
    new Set(templates.map(template => template.category))
  );

  // Filtrar templates baseado em busca e categoria
  useEffect(() => {
    let filtered = [...templates];
    
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(template => template.category === selectedCategory);
    }
    
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    setTotalPages(totalPages || 1);
    
    // Garantir que a página atual ainda é válida
    const validCurrentPage = Math.min(currentPage, totalPages || 1);
    if (validCurrentPage !== currentPage) {
      setCurrentPage(validCurrentPage);
    }
    
    // Paginar resultados
    const start = (validCurrentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedTemplates(filtered.slice(start, end));
  }, [templates, searchTerm, selectedCategory, currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return {
    displayedTemplates,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage
  };
}
