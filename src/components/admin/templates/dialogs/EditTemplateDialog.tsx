
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Template, ProductCategory } from '@/types/editor';
import { useTemplateStore } from '@/store/templates';
import { convertBlock } from '@/utils/blockConverter';

interface EditTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
}

export const EditTemplateDialog: React.FC<EditTemplateDialogProps> = ({ 
  open, 
  onClose, 
  template 
}) => {
  const [name, setName] = useState(template.name);
  const [description, setDescription] = useState(template.description || '');
  const [category, setCategory] = useState<ProductCategory>(template.category as ProductCategory);
  
  const { updateTemplate } = useTemplateStore();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para o template.",
        variant: "destructive"
      });
      return;
    }
    
    updateTemplate(template.id, {
      name,
      description,
      category,
      updatedAt: new Date().toISOString()
    });
    
    toast({
      title: "Template atualizado",
      description: `O template "${name}" foi atualizado com sucesso.`
    });
    
    onClose();
  };
  
  const categoryOptions = [
    { value: 'supplements', label: 'Suplementos' },
    { value: 'clothing', label: 'Roupas' },
    { value: 'accessories', label: 'Acessórios' },
    { value: 'shoes', label: 'Calçados' },
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'energy', label: 'Energia' },
    { value: 'Casa e decoração', label: 'Casa e Decoração' },
    { value: 'Alimentos', label: 'Alimentos' },
    { value: 'Bebidas', label: 'Bebidas' },
    { value: 'Beleza', label: 'Beleza' },
    { value: 'Casa', label: 'Casa' },
    { value: 'Decoração', label: 'Decoração' },
    { value: 'Eletrônicos', label: 'Eletrônicos' },
    { value: 'Esporte', label: 'Esporte' },
    { value: 'Moda', label: 'Moda' },
    { value: 'Saúde', label: 'Saúde' },
    { value: 'other', label: 'Outros' }
  ];
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Editar Template</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Template</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="h-20"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={category} 
                onValueChange={(value: string) => setCategory(value as ProductCategory)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
