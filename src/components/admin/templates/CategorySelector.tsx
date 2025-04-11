
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
  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      onCategoryChange(null);
    } else {
      onCategoryChange(value);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select
        value={selectedCategory || "all"}
        onValueChange={handleCategoryChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {getCategoryName(category as ProductCategory)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
