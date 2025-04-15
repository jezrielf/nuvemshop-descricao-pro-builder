import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Template, Block } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTemplateStore } from '@/store/templateStore';
import { convertBlocks, parseTemplateBlocks } from '@/utils/blockConverter';

interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('other');
  const { createTemplate } = useTemplateStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome para o template.",
        variant: "destructive",
      });
      return;
    }

    const newTemplate: Omit<Template, "id"> = {
      name: name,
      category: category,
      blocks: []
    };

    try {
      await createTemplate(newTemplate);
      toast({
        title: "Template criado",
        description: "O template foi criado com sucesso.",
      });
      onClose();
    } catch (error) {
      console.error("Error creating template:", error);
      toast({
        title: "Erro ao criar template",
        description: "Ocorreu um erro ao criar o template. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Template</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="col-span-3">
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
            <Button type="submit">Criar Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
