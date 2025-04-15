
import { ProductCategory } from '@/types/editor';

// Function to get a human-readable name for a category
export const getCategoryName = (category: ProductCategory | string): string => {
  const categoryMap: Record<string, string> = {
    supplements: 'Suplementos',
    clothing: 'Roupas',
    accessories: 'Acessórios',
    shoes: 'Calçados',
    electronics: 'Eletrônicos',
    energy: 'Energia',
    other: 'Outros',
  };

  // Return the mapped name or the original if not found
  return categoryMap[category] || category;
};
