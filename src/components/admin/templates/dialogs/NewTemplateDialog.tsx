
import React, { useState } from 'react';
import { useTemplateStore } from '@/hooks/templates/useTemplateStore';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Template } from '@/types/editor';

interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NewTemplateDialog: React.FC<NewTemplateDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'other'
  });
  const [htmlContent, setHtmlContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const { createTemplate } = useTemplateStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: 'Erro',
        description: 'Nome do template é obrigatório',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);
    
    try {
      let blocks = [];
      
      if (activeTab === 'html' && htmlContent.trim()) {
        // Convert HTML to blocks (simplified implementation)
        blocks = [{
          id: 'html-block-1',
          type: 'text',
          title: 'Conteúdo HTML',
          content: {
            text: htmlContent
          }
        }];
      } else {
        // Default empty template
        blocks = [];
      }
      
      const templateData: Omit<Template, "id"> = {
        name: formData.name,
        category: formData.category as any,
        blocks
      };
      
      await createTemplate(templateData);
      
      toast({
        title: 'Sucesso',
        description: 'Template criado com sucesso'
      });
      
      // Reset form
      setFormData({ name: '', category: 'other' });
      setHtmlContent('');
      setActiveTab('basic');
      onClose();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao criar template',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', category: 'other' });
    setHtmlContent('');
    setActiveTab('basic');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Novo Template</DialogTitle>
          <DialogDescription>
            Crie um novo template para o sistema
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome do template..."
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplements">Suplementos</SelectItem>
                  <SelectItem value="electronics">Eletrônicos</SelectItem>
                  <SelectItem value="clothing">Roupas</SelectItem>
                  <SelectItem value="shoes">Calçados</SelectItem>
                  <SelectItem value="accessories">Acessórios</SelectItem>
                  <SelectItem value="energy">Energia</SelectItem>
                  <SelectItem value="Casa e decoração">Casa e decoração</SelectItem>
                  <SelectItem value="other">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Template Vazio</TabsTrigger>
              <TabsTrigger value="html">Importar HTML</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Crie um template vazio que você pode editar depois adicionando blocos.
              </p>
            </TabsContent>
            
            <TabsContent value="html" className="space-y-4">
              <div>
                <Label htmlFor="html">Código HTML</Label>
                <Textarea
                  id="html"
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  placeholder="Cole seu código HTML aqui..."
                  rows={10}
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  O HTML será convertido em blocos de texto que você pode editar depois.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? 'Criando...' : 'Criar Template'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
