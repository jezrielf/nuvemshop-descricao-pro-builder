
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { CategorySelector } from './CategorySelector';
import { ProductCategory } from '@/types/editor';

interface TemplateSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  getCategoryName: (category: ProductCategory) => string;
}

const TemplateSearch: React.FC<TemplateSearchProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  getCategoryName
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 mb-6">
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar template..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <CategorySelector
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories || []}
        getCategoryName={getCategoryName}
      />
    </div>
  );
};

export default TemplateSearch;
