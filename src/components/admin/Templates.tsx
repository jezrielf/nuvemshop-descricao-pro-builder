import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, RefreshCw, Edit, Eye, Trash2, Upload, Code } from 'lucide-react';
import { parseHtmlToBlocks } from '@/utils/htmlParsers/htmlToBlocks';

interface TemplateData {
  id: string;
  name: string;
  category: string;
  blocks: any[];
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

interface TemplatesByCategory {
  [category: string]: TemplateData[];
}

const categories = [
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

export const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [templatesByCategory, setTemplatesByCategory] = useState<TemplatesByCategory>({});
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('other');
  const [formHtml, setFormHtml] = useState('');
  const [formDescription, setFormDescription] = useState('');
  
  const { toast } = useToast();

  const loadTemplates = async () => {
    try {
      setLoading(true);
      console.log('Carregando templates do Supabase...');
      
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        console.error('Usuário não autenticado');
        toast({
          title: "Erro de autenticação",
          description: "Você precisa estar logado para ver os templates",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar templates:', error);
        throw error;
      }

      console.log('Templates carregados do banco:', data?.length || 0);
      console.log('Dados dos templates:', data);

      const formattedTemplates: TemplateData[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));

      setTemplates(formattedTemplates);

      // Agrupar templates por categoria
      const grouped = formattedTemplates.reduce((acc: TemplatesByCategory, template) => {
        const category = template.category || 'other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(template);
        return acc;
      }, {});

      setTemplatesByCategory(grouped);
      console.log('Templates agrupados por categoria:', grouped);
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar templates. Verifique sua conexão e tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const getCategoryLabel = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    return categoryData?.label || category;
  };

  const handleCreate = async () => {
    if (!formName.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        throw new Error('Usuário não autenticado');
      }

      let blocks = [];
      
      // Se há HTML, converter para blocos
      if (formHtml.trim()) {
        try {
          blocks = parseHtmlToBlocks(formHtml);
          console.log('Blocos gerados do HTML:', blocks);
        } catch (htmlError) {
          console.error('Erro ao converter HTML:', htmlError);
          toast({
            title: "Aviso",
            description: "Não foi possível converter o HTML. Template criado sem blocos.",
            variant: "default"
          });
        }
      }

      // Usar type assertion para contornar a tipagem estrita do Supabase
      const { data, error } = await supabase
        .from('templates')
        .insert({
          name: formName.trim(),
          category: formCategory,
          blocks: blocks as any,
          user_id: sessionData.session.user.id
        } as any)
        .select()
        .single();

      if (error) throw error;

      console.log('Template criado:', data);
      
      // Reset form
      setFormName('');
      setFormCategory('other');
      setFormHtml('');
      setFormDescription('');
      setCreateDialogOpen(false);
      
      // Reload templates
      await loadTemplates();
      
      toast({
        title: "Sucesso",
        description: "Template criado com sucesso"
      });
    } catch (error) {
      console.error('Erro ao criar template:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar template",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (template: TemplateData) => {
    setSelectedTemplate(template);
    setFormName(template.name);
    setFormCategory(template.category);
    setFormHtml('');
    setFormDescription('');
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedTemplate || !formName.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    try {
      let blocksToUpdate = selectedTemplate.blocks;
      
      // Se há HTML novo, converter para blocos
      if (formHtml.trim()) {
        try {
          blocksToUpdate = parseHtmlToBlocks(formHtml);
          console.log('Novos blocos gerados do HTML:', blocksToUpdate);
        } catch (htmlError) {
          console.error('Erro ao converter HTML:', htmlError);
          toast({
            title: "Aviso",
            description: "Não foi possível converter o HTML. Mantendo blocos existentes.",
            variant: "default"
          });
        }
      }

      const { error } = await supabase
        .from('templates')
        .update({
          name: formName.trim(),
          category: formCategory,
          blocks: blocksToUpdate,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      console.log('Template atualizado');
      
      // Reset form
      setFormName('');
      setFormCategory('other');
      setFormHtml('');
      setFormDescription('');
      setEditDialogOpen(false);
      setSelectedTemplate(null);
      
      // Reload templates
      await loadTemplates();
      
      toast({
        title: "Sucesso",
        description: "Template atualizado com sucesso"
      });
    } catch (error) {
      console.error('Erro ao atualizar template:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar template",
        variant: "destructive"
      });
    }
  };

  const handleView = (template: TemplateData) => {
    setSelectedTemplate(template);
    setViewDialogOpen(true);
  };

  const handleDelete = (template: TemplateData) => {
    setSelectedTemplate(template);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTemplate) return;

    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', selectedTemplate.id);

      if (error) throw error;

      console.log('Template deletado');
      
      setDeleteDialogOpen(false);
      setSelectedTemplate(null);
      
      // Reload templates
      await loadTemplates();
      
      toast({
        title: "Sucesso",
        description: "Template excluído com sucesso"
      });
    } catch (error) {
      console.error('Erro ao deletar template:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir template",
        variant: "destructive"
      });
    }
  };

  const totalTemplates = templates.length;
  const categoriesCount = Object.keys(templatesByCategory).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Gerencie os templates do sistema ({totalTemplates} templates em {categoriesCount} categorias)
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={loadTemplates}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Template
          </Button>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p>Carregando templates...</p>
            </div>
          </CardContent>
        </Card>
      ) : totalTemplates === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <p className="text-muted-foreground">Nenhum template encontrado</p>
              <p className="text-sm text-muted-foreground">
                Comece criando seu primeiro template usando o botão "Novo Template" acima.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(templatesByCategory).map(([category, categoryTemplates]) => (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{getCategoryLabel(category)}</span>
                      <Badge variant="secondary">{categoryTemplates.length}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Templates da categoria {getCategoryLabel(category)}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryTemplates.map((template) => (
                    <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="outline">{template.blocks?.length || 0} blocos</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {template.user_id ? `Por: ${template.user_id.substring(0, 8)}...` : 'Sistema'}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleView(template)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(template)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(template)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Template Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Template</DialogTitle>
            <DialogDescription>
              Crie um novo template do zero ou importe de HTML
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Template</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Template Suplementos Premium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formCategory} onValueChange={setFormCategory}>
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

            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual</TabsTrigger>
                <TabsTrigger value="html">Importar HTML</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição (opcional)</Label>
                  <Textarea
                    id="description"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Descreva o template..."
                    rows={3}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  O template será criado vazio e você poderá adicionar blocos no editor principal.
                </p>
              </TabsContent>
              
              <TabsContent value="html" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="html">Código HTML</Label>
                  <Textarea
                    id="html"
                    value={formHtml}
                    onChange={(e) => setFormHtml(e.target.value)}
                    placeholder="Cole o código HTML aqui..."
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  O HTML será automaticamente convertido em blocos estruturados.
                </p>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreate}>
              <Upload className="h-4 w-4 mr-2" />
              Criar Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Template</DialogTitle>
            <DialogDescription>
              Edite as informações do template ou atualize com novo HTML
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome do Template</Label>
              <Input
                id="edit-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Template Suplementos Premium"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoria</Label>
              <Select value={formCategory} onValueChange={setFormCategory}>
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
              <Label htmlFor="edit-html">Atualizar com HTML (opcional)</Label>
              <Textarea
                id="edit-html"
                value={formHtml}
                onChange={(e) => setFormHtml(e.target.value)}
                placeholder="Cole novo código HTML para substituir os blocos existentes..."
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                Deixe vazio para manter os blocos existentes.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleUpdate}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Template Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Visualizar Template</DialogTitle>
            <DialogDescription>
              Detalhes do template selecionado
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nome</label>
                  <p className="text-sm">{selectedTemplate.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Categoria</label>
                  <div className="mt-1">
                    <Badge variant="secondary">{getCategoryLabel(selectedTemplate.category)}</Badge>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">ID</label>
                <p className="text-sm font-mono">{selectedTemplate.id}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Criado por</label>
                <p className="text-sm">{selectedTemplate.user_id || 'Sistema'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Blocos ({selectedTemplate.blocks?.length || 0})
                </label>
                <div className="mt-2 max-h-32 overflow-y-auto border rounded-md p-3">
                  {selectedTemplate.blocks && selectedTemplate.blocks.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTemplate.blocks.map((block: any, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{block.type || 'Tipo desconhecido'}</span>
                          <Badge variant="outline" className="text-xs">
                            {block.title || `Bloco ${index + 1}`}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhum bloco definido</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Template Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Trash2 className="h-5 w-5 text-destructive" />
              <span>Excluir Template</span>
            </DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. O template será permanentemente removido do sistema.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="font-medium">{selectedTemplate.name}</p>
                <p className="text-sm text-muted-foreground">Categoria: {getCategoryLabel(selectedTemplate.category)}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.blocks?.length || 0} blocos
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Excluir Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
