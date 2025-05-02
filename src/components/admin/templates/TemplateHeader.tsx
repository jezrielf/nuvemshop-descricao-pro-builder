
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { useTemplateStore } from '@/hooks/templates/useTemplateStore';

interface TemplateHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onCreateTemplate: () => void;
}

export const TemplateHeader: React.FC<TemplateHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onCreateTemplate
}) => {
  const { categories } = useTemplateStore();
  
  const getCategoryName = (id: string) => {
    const categoryMap: Record<string, string> = {
      'supplements': 'Suplementos',
      'clothing': 'Vestuário',
      'accessories': 'Acessórios',
      'shoes': 'Calçados',
      'electronics': 'Eletrônicos',
      'energy': 'Energia',
      'Casa e decoração': 'Casa e decoração',
      'other': 'Outro'
    };
    
    return categoryMap[id] || id;
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Buscar templates..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {/* Category filter */}
      <div className="w-full md:w-[200px]">
        <Select
          value={selectedCategory || ''}
          onValueChange={(value) => onCategoryChange(value === '' ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Todas categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todas categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {getCategoryName(category)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Create button */}
      <Button onClick={onCreateTemplate} className="whitespace-nowrap">
        <Plus className="h-4 w-4 mr-2" />
        Novo Template
      </Button>
    </div>
  );
};
