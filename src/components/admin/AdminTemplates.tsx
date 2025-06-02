
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Eye, Pencil, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Template, ProductCategory } from '@/types/editor';
import { parseHtmlToBlocks } from '@/utils/htmlParsers';

interface TemplateFormData {
  name: string;
  category: ProductCategory;
}

const categoryNames: Record<string, string> = {
  supplements: 'Suplementos',
  electronics: 'Eletrônicos',
  clothing: 'Roupas',
  shoes: 'Calçados',
  accessories: 'Acessórios',
  energy: 'Energia',
  'Casa e decoração': 'Casa e decoração',
  other: 'Outros'
};

export const AdminTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Dialog states
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
  
  // Form states
  const [formData, setFormData] = useState<TemplateFormData>({ name: '', category: 'other' });
  const [htmlContent, setHtmlContent] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { toast } = useToast();

  // Load templates from Supabase
  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      console.log('Loading templates from Supabase...');
      
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading templates:', error);
        throw error;
      }

      const loadedTemplates: Template[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category as ProductCategory,
        blocks: Array.isArray(item.blocks) ? item.blocks : [],
        user_id: item.user_id
      }));

      console.log('Templates loaded:', loadedTemplates.length);
      setTemplates(loadedTemplates);
      
      if (loadedTemplates.length > 0) {
        toast({
          title: 'Templates carregados',
          description: `${loadedTemplates.length} templates encontrados`
        });
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      toast({
        title: 'Erro ao carregar templates',
        description: 'Não foi possível carregar os templates',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create new template
  const createTemplate = async () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Nome obrigatório',
        description: 'Digite um nome para o template',
        variant: 'destructive'
      });
      return;
    }

    setIsCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Erro de autenticação',
          description: 'Você precisa estar logado',
          variant: 'destructive'
        });
        return;
      }

      let blocks = [];
      
      if (activeTab === 'html' && htmlContent.trim()) {
        // Convert HTML to blocks
        blocks = parseHtmlToBlocks(htmlContent);
      } else {
        // Default template structure
        blocks = [{
          id: 'hero-1',
          type: 'hero',
          title: 'Banner Principal',
          content: {
            title: 'Título do produto',
            subtitle: 'Descrição do produto',
            buttonText: 'Saiba Mais'
          }
        }];
      }

      // Generate UUID for the template
      const templateId = crypto.randomUUID();

      const { data, error } = await supabase
        .from('templates')
        .insert({
          id: templateId,
          name: formData.name,
          category: formData.category as string,
          blocks: blocks as any,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;

      const newTemplate: Template = {
        id: data.id,
        name: data.name,
        category: data.category as ProductCategory,
        blocks: Array.isArray(data.blocks) ? data.blocks : [],
        user_id: data.user_id
      };

      setTemplates(prev => [newTemplate, ...prev]);
      
      toast({
        title: 'Template criado',
        description: `Template "${formData.name}" criado com sucesso`
      });

      // Reset form
      setFormData({ name: '', category: 'other' });
      setHtmlContent('');
      setActiveTab('basic');
      setIsNewDialogOpen(false);
      
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: 'Erro ao criar template',
        description: 'Não foi possível criar o template',
        variant: 'destructive'
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Delete template
  const deleteTemplate = async () => {
    if (!templateToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateToDelete.id);

      if (error) throw error;

      setTemplates(prev => prev.filter(t => t.id !== templateToDelete.id));
      
      toast({
        title: 'Template excluído',
        description: `Template "${templateToDelete.name}" foi excluído`
      });

      setIsDeleteDialogOpen(false);
      setTemplateToDelete(null);
      
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir o template',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando templates...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Templates</h1>
        <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Template</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Nome do template"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value: ProductCategory) => setFormData(prev => ({ ...prev, category: value }))}
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
                  <TabsTrigger value="basic">Template Básico</TabsTrigger>
                  <TabsTrigger value="html">Importar HTML</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Será criado um template básico que você pode editar depois.
                  </p>
                </TabsContent>
                
                <TabsContent value="html" className="space-y-4">
                  <div>
                    <Label htmlFor="html">Código HTML</Label>
                    <Textarea
                      id="html"
                      value={htmlContent}
                      onChange={(e) => setHtmlContent(e.target.value)}
                      placeholder="Cole o código HTML aqui..."
                      className="min-h-[200px]"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={createTemplate} disabled={isCreating}>
                  {isCreating ? 'Criando...' : 'Criar Template'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
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

      {/* Templates table */}
      {filteredTemplates.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Blocos</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {categoryNames[template.category] || template.category}
                  </Badge>
                </TableCell>
                <TableCell>{template.blocks.length}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" title="Visualizar">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Editar">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        setTemplateToDelete(template);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="text-destructive hover:bg-destructive/10"
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {templates.length === 0 
              ? 'Nenhum template encontrado. Crie o primeiro template!' 
              : 'Nenhum template corresponde aos filtros aplicados.'
            }
          </p>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o template "{templateToDelete?.name}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteTemplate}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
