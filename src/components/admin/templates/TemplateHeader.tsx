
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';
import { getCategoryName } from './utils';

interface TemplateHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const { openNewDialog } = useTemplateDialogs();

  const categoryOptions = [
    'supplements',
    'clothing',
    'accessories',
    'shoes',
    'electronics',
    'energy',
    'Casa e decoração',
    'other'
  ];

  const handleNewTemplateClick = () => {
    console.log('New template button clicked');
    openNewDialog();
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
          <SelectValue placeholder="Todas as categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {categoryOptions.map((category) => (
            <SelectItem key={category} value={category}>
              {getCategoryName(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={handleNewTemplateClick} type="button">
        <Plus className="h-4 w-4 mr-2" />
        Novo Template
      </Button>
    </div>
  );
};
