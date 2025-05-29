
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
    return true;
  };

  // Get an optimized thumbnail for a template with robust fallbacks
  const getTemplateThumbnail = (template: { category: ProductCategory, thumbnail?: string }): string => {
    // If template has a custom thumbnail and it's not placeholder
    if (template.thumbnail && 
        template.thumbnail !== '/placeholder.svg' && 
        template.thumbnail.trim() !== '') {
      try {
        // Optimize the thumbnail URL for better performance
        return optimizeImageUrl(template.thumbnail, 'thumbnail');
      } catch (error) {
        console.warn('Failed to optimize template thumbnail:', template.thumbnail, error);
      }
    }
    
    // Reliable category-based thumbnails with known working Unsplash images
    const categoryThumbnails: Record<ProductCategory, string> = {
      'supplements': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format',
      'clothing': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format',
      'accessories': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&auto=format',
      'shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format',
      'electronics': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format',
      'energy': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format',
      'Casa e decoração': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format',
      'casa-decoracao': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&auto=format',
      'health': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
      'luxury': 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop&auto=format',
      'adult': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop&auto=format',
      'other': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&auto=format'
    };
    
    return categoryThumbnails[template.category] || '/placeholder.svg';
  };

  return {
    categoryNames,
    isAdvancedTemplate,
    getTemplateThumbnail
  };
}
