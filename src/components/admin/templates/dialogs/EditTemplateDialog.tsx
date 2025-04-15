
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template, Block } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { convertBlocks, parseTemplateBlocks } from '@/utils/blockConverter';

interface EditTemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: Template;
  onUpdate: (template: Template) => void;
}

export const EditTemplateDialog: React.FC<EditTemplateDialogProps> = ({
  open,
  onClose,
  template,
  onUpdate,
}) => {
  const [name, setName] = useState(template.name);
  const [category, setCategory] = useState(template.category);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Ensure blocks are properly typed when the dialog opens
    setBlocks(convertBlocks(template.blocks));
    setName(template.name);
    setCategory(template.category);
  }, [template]);

  const handleUpdate = () => {
    if (!name.trim()) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome para o template.",
        variant: "destructive",
      });
      return;
    }

    const updatedTemplate: Template = {
      ...template,
      name: name,
      category: category,
      blocks: blocks,
    };

    onUpdate(updatedTemplate);
    onClose();
    toast({
      title: "Template atualizado",
      description: "O template foi atualizado com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="supplements">Suplementos</SelectItem>
                <SelectItem value="clothing">Vestuário</SelectItem>
                <SelectItem value="accessories">Acessórios</SelectItem>
                <SelectItem value="shoes">Calçados</SelectItem>
                <SelectItem value="electronics">Eletrônicos</SelectItem>
                <SelectItem value="energy">Energia</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate}>
            Atualizar Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
