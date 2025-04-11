
import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCategory } from '@/types/editor';

interface CategorySelectorProps {
  selectedCategory: string | null;
  onCategoryChange: (value: string | null) => void;
  categories: string[];
  getCategoryName: (category: ProductCategory) => string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
  categories,
  getCategoryName
}) => {
  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select 
        value={selectedCategory || ''} 
        onValueChange={(value) => onCategoryChange(value || null)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Todas categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Todas categorias</SelectItem>
          {categories.map(category => (
            <SelectItem key={category} value={category}>
              {getCategoryName(category as ProductCategory)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
