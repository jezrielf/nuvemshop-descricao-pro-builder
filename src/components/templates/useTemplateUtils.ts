
import { useState, useEffect, useMemo } from 'react';
import { ProductCategory } from '@/types/editor';
import { optimizeImageUrl } from '@/utils/imageOptimization';

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

  // Get an optimized thumbnail for a template
  const getTemplateThumbnail = (template: { category: ProductCategory, thumbnail?: string }): string => {
    if (template.thumbnail && template.thumbnail !== '/placeholder.svg') {
      // Optimize the thumbnail URL for better performance
      return optimizeImageUrl(template.thumbnail, 'thumbnail');
    }
    
    // Default thumbnails based on category (also optimized)
    const categoryThumbnails: Record<ProductCategory, string> = {
      'supplements': optimizeImageUrl('/assets/thumbnails/supplements.jpg', 'thumbnail'),
      'clothing': optimizeImageUrl('/assets/thumbnails/clothing.jpg', 'thumbnail'),
      'accessories': optimizeImageUrl('/assets/thumbnails/accessories.jpg', 'thumbnail'),
      'shoes': optimizeImageUrl('/assets/thumbnails/shoes.jpg', 'thumbnail'),
      'electronics': optimizeImageUrl('/assets/thumbnails/electronics.jpg', 'thumbnail'),
      'energy': optimizeImageUrl('/assets/thumbnails/energy.jpg', 'thumbnail'),
      'Casa e decoração': optimizeImageUrl('/assets/thumbnails/home.jpg', 'thumbnail'),
      'casa-decoracao': optimizeImageUrl('/assets/thumbnails/home.jpg', 'thumbnail'),
      'health': optimizeImageUrl('/assets/thumbnails/health.jpg', 'thumbnail'),
      'luxury': optimizeImageUrl('/assets/thumbnails/luxury.jpg', 'thumbnail'),
      'adult': optimizeImageUrl('/assets/thumbnails/adult.jpg', 'thumbnail'),
      'other': optimizeImageUrl('/assets/thumbnails/generic.jpg', 'thumbnail')
    };
    
    return categoryThumbnails[template.category] || '/placeholder.svg';
  };

  return {
    categoryNames,
    isAdvancedTemplate,
    getTemplateThumbnail
  };
}
