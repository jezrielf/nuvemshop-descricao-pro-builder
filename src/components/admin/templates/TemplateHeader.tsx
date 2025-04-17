
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';

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
  const { openNewDialog } = useTemplateDialogs();

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
          <SelectItem value="supplements">Suplementos</SelectItem>
          <SelectItem value="clothing">Vestuário</SelectItem>
          <SelectItem value="accessories">Acessórios</SelectItem>
          <SelectItem value="shoes">Calçados</SelectItem>
          <SelectItem value="electronics">Eletrônicos</SelectItem>
          <SelectItem value="energy">Energia</SelectItem>
          <SelectItem value="house">Casa e decoração</SelectItem>
          <SelectItem value="other">Outros</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={openNewDialog}>
        <Plus className="h-4 w-4 mr-2" />
        Novo Template
      </Button>
    </div>
  );
};
