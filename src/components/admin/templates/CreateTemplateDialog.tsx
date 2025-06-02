
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ProductCategory } from '@/types/editor';

interface CreateTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTemplateCreated: () => void;
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

export const CreateTemplateDialog: React.FC<CreateTemplateDialogProps> = ({
  open,
  onOpenChange,
  onTemplateCreated,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('other');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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
      
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error('Usuário não autenticado');
      }

      const templateData = {
        id: crypto.randomUUID(),
        name: name.trim(),
        category: category,
        blocks: [],
        user_id: sessionData.session.user.id
      };

      const { error } = await supabase
        .from('templates')
        .insert([templateData]);

      if (error) throw error;

      setName('');
      setCategory('other');
      setDescription('');
      onTemplateCreated();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar template",
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
          <DialogTitle>Criar Novo Template</DialogTitle>
          <DialogDescription>
            Crie um novo template para o sistema
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Template</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Template Suplementos Premium"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
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

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o template..."
              rows={3}
            />
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
              {loading ? 'Criando...' : 'Criar Template'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
