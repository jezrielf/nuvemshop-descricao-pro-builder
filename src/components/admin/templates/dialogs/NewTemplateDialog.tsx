
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template, ProductCategory } from '@/types/editor';
import { Loader2 } from 'lucide-react';

interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateTemplate: (data: Omit<Template, 'id'>) => Promise<void>;
  isProcessing?: boolean;
}

export const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({
  open,
  onClose,
  onCreateTemplate,
  isProcessing = false
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('other');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      return; // Form validation should handle this
    }
    
    try {
      console.log('Submitting new template:', { name, category });
      await onCreateTemplate({
        name,
        category,
        blocks: [],
        thumbnail: '/placeholder.svg'
      });
      // onClose is called by the parent component after successful creation
    } catch (error) {
      console.error('Error submitting new template:', error);
    }
  };

  const resetForm = () => {
    setName('');
    setCategory('other');
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm();
        }
        onClose();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Template</DialogTitle>
          <DialogDescription>
            Crie um novo template para usar em suas descrições de produtos
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Insira um nome para o template"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={category} 
                onValueChange={(value: ProductCategory) => setCategory(value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplements">Suplementos</SelectItem>
                  <SelectItem value="clothing">Vestuário</SelectItem>
                  <SelectItem value="accessories">Acessórios</SelectItem>
                  <SelectItem value="shoes">Calçados</SelectItem>
                  <SelectItem value="electronics">Eletrônicos</SelectItem>
                  <SelectItem value="energy">Energia</SelectItem>
                  <SelectItem value="Casa e decoração">Casa e decoração</SelectItem>
                  <SelectItem value="other">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isProcessing || !name.trim()}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                'Criar Template'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
