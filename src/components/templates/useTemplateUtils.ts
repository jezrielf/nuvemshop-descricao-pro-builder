
import { useMemo } from 'react';
import { ProductCategory } from '@/types/editor';

export const useTemplateUtils = () => {
  // Mapping for display names
  const categoryNames = useMemo(() => {
    const names: Record<string, string> = {
      'Alimentos': 'Alimentos',
      'Bebidas': 'Bebidas',
      'Beleza': 'Beleza e Cuidados Pessoais',
      'Casa': 'Casa',
      'Decoração': 'Decoração',
      'Eletrônicos': 'Eletrônicos',
      'Esporte': 'Esporte e Fitness',
      'Moda': 'Moda',
      'Saúde': 'Saúde e Bem-estar',
      // Legacy categories
      'supplements': 'Suplementos',
      'clothing': 'Roupas',
      'accessories': 'Acessórios',
      'shoes': 'Calçados',
      'electronics': 'Eletrônicos',
      'energy': 'Energia',
      'Casa e decoração': 'Casa e Decoração',
      'other': 'Outros'
    };
    return names;
  }, []);

  // Function to get display name for a category
  const getCategoryName = (category: string): string => {
    return categoryNames[category] || category;
  };

  return { getCategoryName, categoryNames };
};
