
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, RefreshCw, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Template {
  id: string;
  name: string;
  category: string;
  blocks: any[];
  user_id?: string;
  created_at: string;
}

export const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const { toast } = useToast();

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: 'other',
    htmlContent: ''
  });

  const loadTemplates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTemplates(data || []);
      setFilteredTemplates(data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar templates',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async () => {
    try {
      const templateData = {
        name: newTemplate.name,
        category: newTemplate.category,
        blocks: [], // For now, empty blocks - could parse HTML later
      };

      const { error } = await supabase
        .from('templates')
        .insert(templateData);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Template criado com sucesso'
      });

      setIsCreateOpen(false);
      setNewTemplate({ name: '', category: 'other', htmlContent: '' });
      loadTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao criar template',
        variant: 'destructive'
      });
    }
  };

  const updateTemplate = async () => {
    if (!editingTemplate) return;

    try {
      const { error } = await supabase
        .from('templates')
        .update({
          name: editingTemplate.name,
          category: editingTemplate.category
        })
        .eq('id', editingTemplate.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Template atualizado com sucesso'
      });

      setEditingTemplate(null);
      loadTemplates();
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar template',
        variant: 'destructive'
      });
    }
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Template excluído com sucesso'
      });

      loadTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao excluir template',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTemplates(templates);
    } else {
      const filtered = templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTemplates(filtered);
    }
  }, [searchTerm, templates]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Templates</h2>
        <div className="flex space-x-2">
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Template</DialogTitle>
                <DialogDescription>
                  Crie um novo template para o sistema
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    placeholder="Nome do template..."
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={newTemplate.category}
                    onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
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
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={createTemplate} disabled={!newTemplate.name}>
                  Criar Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button onClick={loadTemplates} disabled={loading} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">
          {filteredTemplates.length} templates
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg truncate">{template.name}</CardTitle>
                <Badge variant="outline">{template.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {template.blocks?.length || 0} blocos
              </p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Dialog open={editingTemplate?.id === template.id} onOpenChange={(open) => !open && setEditingTemplate(null)}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setEditingTemplate(template)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Template</DialogTitle>
                      </DialogHeader>
                      {editingTemplate && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Nome</Label>
                            <Input
                              id="edit-name"
                              value={editingTemplate.name}
                              onChange={(e) => setEditingTemplate({ 
                                ...editingTemplate, 
                                name: e.target.value 
                              })}
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-category">Categoria</Label>
                            <Select
                              value={editingTemplate.category}
                              onValueChange={(value) => setEditingTemplate({ 
                                ...editingTemplate, 
                                category: value 
                              })}
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
                                <SelectItem value="other">Outros</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingTemplate(null)}>
                          Cancelar
                        </Button>
                        <Button onClick={updateTemplate}>
                          Salvar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir Template</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteTemplate(template.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm ? 'Nenhum template encontrado' : 'Nenhum template criado ainda'}
          </p>
        </div>
      )}
    </div>
  );
};
