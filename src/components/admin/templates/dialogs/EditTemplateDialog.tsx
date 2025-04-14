
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Template, ProductCategory } from '@/types/editor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getCategoryName } from '../utils';

interface EditTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
  onUpdate: (template: Partial<Template>) => void;
}

export const EditTemplateDialog: React.FC<EditTemplateDialogProps> = ({
  open,
  onClose,
  template,
  onUpdate,
}) => {
  const [name, setName] = useState(template.name);
  const [category, setCategory] = useState<ProductCategory>(template.category);
  
  const { toast } = useToast();
  const categories = ['supplements', 'clothing', 'accessories', 'shoes', 'electronics', 'energy', 'other'];

  const handleSubmit = () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para o template.",
        variant: "destructive",
      });
      return;
    }

    try {
      onUpdate({
        name,
        category,
      });
      
      toast({
        title: "Template atualizado",
        description: "O template foi atualizado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar template:", error);
      toast({
        title: "Erro ao atualizar template",
        description: "Ocorreu um erro ao atualizar o template.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome do Template</Label>
            <Input 
              id="edit-name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Nome do template"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoria</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ProductCategory)}>
              <SelectTrigger id="edit-category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {getCategoryName(cat as ProductCategory)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              Este template contém {template.blocks.length} blocos.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
