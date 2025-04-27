
import { useState, useEffect, useMemo } from 'react';
import { ProductCategory } from '@/types/editor';
import { advancedTemplates } from '@/utils/templates';

interface CategoryNamesMap {
  [key: string]: string;
}

export default function useTemplateUtils() {
  // Category mapping for display purposes
  const categoryNames: CategoryNamesMap = useMemo(() => ({
    'supplements': 'Suplementos',
    'clothing': 'Vestuário',
    'accessories': 'Acessórios',
    'shoes': 'Calçados',
    'electronics': 'Eletrônicos',
    'energy': 'Energia',
    'Casa e decoração': 'Casa e decoração',
    'other': 'Outros'
  }), []);

  // Check if a template is from the advanced collection
  const isAdvancedTemplate = (id: string): boolean => {
    return advancedTemplates.some(template => template.id === id);
  };

  // Get a thumbnail for a template
  const getTemplateThumbnail = (template: { category: ProductCategory, thumbnail?: string }): string => {
    if (template.thumbnail && template.thumbnail !== '/placeholder.svg') {
      return template.thumbnail;
    }
    
    // Default thumbnails based on category
    const categoryThumbnails: Record<ProductCategory, string> = {
      'supplements': '/assets/thumbnails/supplements.jpg',
      'clothing': '/assets/thumbnails/clothing.jpg',
      'accessories': '/assets/thumbnails/accessories.jpg',
      'shoes': '/assets/thumbnails/shoes.jpg',
      'electronics': '/assets/thumbnails/electronics.jpg',
      'energy': '/assets/thumbnails/energy.jpg',
      'Casa e decoração': '/assets/thumbnails/home.jpg',
      'other': '/assets/thumbnails/generic.jpg'
    };
    
    return categoryThumbnails[template.category] || '/placeholder.svg';
  };

  return {
    categoryNames,
    isAdvancedTemplate,
    getTemplateThumbnail
  };
}
