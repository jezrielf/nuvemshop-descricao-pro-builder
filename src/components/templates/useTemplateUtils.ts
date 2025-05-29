
import { useState, useEffect, useMemo } from 'react';
import { ProductCategory } from '@/types/editor';

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
    'casa-decoracao': 'Casa e decoração',
    'health': 'Saúde',
    'luxury': 'Luxo',
    'adult': 'Produtos Íntimos',
    'other': 'Outros'
  }), []);

  // Check if a template has a valid thumbnail (making it "advanced")
  const isAdvancedTemplate = (id: string): boolean => {
    // For now, all templates with thumbnails are considered advanced
    return true;
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
      'casa-decoracao': '/assets/thumbnails/home.jpg',
      'health': '/assets/thumbnails/health.jpg',
      'luxury': '/assets/thumbnails/luxury.jpg',
      'adult': '/assets/thumbnails/adult.jpg',
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
