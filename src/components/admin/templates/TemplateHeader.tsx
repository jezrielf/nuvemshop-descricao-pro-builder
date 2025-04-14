
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { ProductCategory } from '@/types/editor';
import { getCategoryName } from './utils';

interface TemplateHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const { openNewTemplateDialog } = useTemplateDialogs();
  const categories = ['supplements', 'clothing', 'accessories', 'shoes', 'electronics', 'energy', 'other'];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar templates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value) => onCategoryChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {getCategoryName(category as ProductCategory)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <Button onClick={openNewTemplateDialog}>
        <Plus className="mr-2 h-4 w-4" /> Novo Template
      </Button>
    </div>
  );
};
