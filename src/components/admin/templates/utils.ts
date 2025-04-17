
import { ProductCategory } from '@/types/editor';

// Get readable category name
export const getCategoryName = (category: string | ProductCategory): string => {
  const categoryMap: Record<string, string> = {
    'supplements': 'Suplementos',
    'clothing': 'Vestuário',
    'accessories': 'Acessórios',
    'shoes': 'Calçados',
    'electronics': 'Eletrônicos',
    'energy': 'Energia',
    'health': 'Saúde',
    'beauty': 'Beleza',
    'fashion': 'Moda',
    'haute-couture': 'Alta Costura',
    'home-decor': 'Casa e Decoração',
    'other': 'Outros'
  };
  
  return categoryMap[category] || category;
};

// Get all categories for select
export const getAllCategories = (): { value: string; label: string }[] => {
  return [
    { value: 'supplements', label: 'Suplementos' },
    { value: 'clothing', label: 'Vestuário' },
    { value: 'accessories', label: 'Acessórios' },
    { value: 'shoes', label: 'Calçados' },
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'energy', label: 'Energia' },
    { value: 'health', label: 'Saúde' },
    { value: 'beauty', label: 'Beleza' },
    { value: 'fashion', label: 'Moda' },
    { value: 'haute-couture', label: 'Alta Costura' },
    { value: 'home-decor', label: 'Casa e Decoração' },
    { value: 'other', label: 'Outros' }
  ];
};
