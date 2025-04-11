
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCategory } from '@/types/editor';
import { CategorySelector } from './CategorySelector';

interface TemplateSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (value: string | null) => void;
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
    <div className="flex flex-col lg:flex-row gap-4 items-center">
      <SearchInput 
        searchTerm={searchTerm} 
        onSearchChange={onSearchChange} 
      />
      
      <CategorySelector 
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        categories={categories}
        getCategoryName={getCategoryName}
      />
    </div>
  );
};

interface SearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full lg:w-auto flex-1">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar templates..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default TemplateSearch;
