
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProductCategory } from '@/types/editor';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  categoryNames: Record<string, string>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryNames,
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectCategory(null)}
      >
        Todos
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectCategory(category)}
        >
          {categoryNames[category] || category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
