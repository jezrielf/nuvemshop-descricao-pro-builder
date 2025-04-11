
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCategory } from '@/types/editor';

interface BasicInfoProps {
  name: string;
  category: string;
  onNameChange: (name: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
  getCategoryName: (category: ProductCategory) => string;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  name,
  category,
  onNameChange,
  onCategoryChange,
  categories,
  getCategoryName
}) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="newName" className="text-right">
          Nome
        </Label>
        <Input
          id="newName"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="col-span-3"
          placeholder="Nome do novo template"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="newCategory" className="text-right">
          Categoria
        </Label>
        <Select 
          value={category} 
          onValueChange={(value) => onCategoryChange(value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {getCategoryName(category as ProductCategory)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicInfo;
