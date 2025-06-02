
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Template, ProductCategory } from '@/types/editor';

interface EditTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template;
  onTemplateUpdated: () => void;
}

const categories: { value: ProductCategory; label: string }[] = [
  { value: 'supplements', label: 'Suplementos' },
  { value: 'clothing', label: 'Roupas' },
  { value: 'accessories', label: 'Acessórios' },
  { value: 'shoes', label: 'Calçados' },
  { value: 'electronics', label: 'Eletrônicos' },
  { value: 'energy', label: 'Energia' },
  { value: 'casa-decoracao', label: 'Casa e Decoração' },
  { value: 'health', label: 'Saúde' },
  { value: 'luxury', label: 'Luxo' },
  { value: 'adult', label: 'Adulto' },
  { value: 'other', label: 'Outros' },
];

export const EditTemplateDialog: React.FC<EditTemplateDialogProps> = ({
  open,
  onOpenChange,
  template,
  onTemplateUpdated,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('other');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (template) {
      setName(template.name);
      setCategory(template.category);
    }
  }, [template]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from('templates')
        .update({
          name: name.trim(),
          category: category,
          updated_at: new Date().toISOString()
        })
        .eq('id', template.id);

      if (error) throw error;

      onTemplateUpdated();
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar template",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
          <DialogDescription>
            Edite as informações do template
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome do Template</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Template Suplementos Premium"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoria</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as ProductCategory)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
