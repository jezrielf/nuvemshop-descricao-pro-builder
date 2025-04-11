
import { ProductCategory } from '@/types/editor';

// Helper function to get a human-readable category name
export const getCategoryName = (category: ProductCategory) => {
  const categoryNames: Record<ProductCategory, string> = {
    supplements: 'Suplementos',
    clothing: 'Vestuário',
    accessories: 'Acessórios',
    shoes: 'Calçados',
    electronics: 'Eletrônicos',
    energy: 'Energia',
    other: 'Outros'
  };
  
  return categoryNames[category] || category;
};
