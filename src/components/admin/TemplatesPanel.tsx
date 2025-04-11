
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Eye, 
  Trash, 
  Edit, 
  Plus, 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  X
} from 'lucide-react';
import { Template, ProductCategory, Block, BlockType } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';
import { createBlock } from '@/utils/blockCreators';

const TemplatesPanel: React.FC = () => {
  const { templates: allTemplates, categories } = useTemplateStore();
  const [templates, setTemplates] = useState<Template[]>(allTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editedTemplate, setEditedTemplate] = useState<Partial<Template>>({});
  const [newTemplate, setNewTemplate] = useState<Partial<Template>>({
    name: '',
    category: 'other',
    blocks: []
  });
  const { toast } = useToast();

  useEffect(() => {
    // Filter templates based on search and category
    let filtered = [...allTemplates];
    
    if (searchTerm) {
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(template => 
        template.category === selectedCategory
      );
    }
    
    setTemplates(filtered);
  }, [allTemplates, searchTerm, selectedCategory]);

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setEditedTemplate({...template});
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (template: Template) => {
    setSelectedTemplate(template);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // This would delete the template in a real application
    // For now, just close the dialog and show a toast
    setIsDeleteDialogOpen(false);
    toast({
      title: "Template excluído",
      description: `O template "${selectedTemplate?.name}" foi excluído com sucesso.`,
    });
  };

  const handleEditConfirm = () => {
    // This would update the template in a real application
    // For now, just close the dialog and show a toast
    setIsEditDialogOpen(false);
    toast({
      title: "Template atualizado",
      description: `O template "${editedTemplate.name}" foi atualizado com sucesso.`,
    });
  };

  const handleCreateTemplate = () => {
    // Validate form
    if (!newTemplate.name || !newTemplate.category) {
      toast({
        title: "Erro ao criar template",
        description: "Nome e categoria são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Create a new template
    const createdTemplate: Template = {
      id: uuidv4(),
      name: newTemplate.name as string,
      category: newTemplate.category as ProductCategory,
      blocks: newTemplate.blocks || [],
      thumbnail: ''
    };

    // This would add the template to the store in a real application
    // For now, just close the dialog and show a toast
    setIsNewTemplateDialogOpen(false);
    setNewTemplate({
      name: '',
      category: 'other',
      blocks: []
    });
    
    toast({
      title: "Template criado",
      description: `O template "${createdTemplate.name}" foi criado com sucesso.`,
    });
  };

  const handleAddBlock = (type: BlockType) => {
    if (!newTemplate.blocks) {
      newTemplate.blocks = [];
    }
    
    const block = createBlock(type, 1);
    if (block) {
      setNewTemplate({
        ...newTemplate,
        blocks: [...newTemplate.blocks, block]
      });
    }
  };

  const handleRemoveBlock = (blockId: string) => {
    if (newTemplate.blocks) {
      setNewTemplate({
        ...newTemplate,
        blocks: newTemplate.blocks.filter(block => block.id !== blockId)
      });
    }
  };

  // Helper function to get a human-readable category name
  const getCategoryName = (category: ProductCategory) => {
    const categoryNames: Record<ProductCategory, string> = {
      supplements: 'Suplementos',
      clothing: 'Vestuário',
      accessories: 'Acessórios',
      shoes: 'Calçados',
      electronics: 'Eletrônicos',
      energy: 'Energia',
      other: 'Outros'
    };
    
    return categoryNames[category] || category;
  };

  // Block type options for template creation
  const blockTypes: BlockType[] = [
    'hero', 
    'features', 
    'benefits', 
    'specifications',
    'text',
    'image',
    'gallery',
    'imageText',
    'textImage',
    'faq',
    'cta'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Gerenciar Templates</h2>
        <Button onClick={() => setIsNewTemplateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative w-full lg:w-auto flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select 
            value={selectedCategory || ''} 
            onValueChange={(value) => setSelectedCategory(value || null)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas categorias</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {getCategoryName(category as ProductCategory)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>Lista de todos os templates disponíveis no sistema</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Blocos</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Nenhum template encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getCategoryName(template.category)}
                      </Badge>
                    </TableCell>
                    <TableCell>{template.blocks.length}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTemplate(template)}
                          title="Visualizar"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditTemplate(template)}
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClick(template)}
                          title="Excluir"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>
        <Button variant="outline" size="sm" disabled>
          Próximo
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualizar Template</DialogTitle>
          </DialogHeader>
          {selectedTemplate && (
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-bold text-lg">{selectedTemplate.name}</h3>
                <Badge variant="outline">
                  {getCategoryName(selectedTemplate.category)}
                </Badge>
              </div>
              <div className="space-y-4">
                {selectedTemplate.blocks.map(block => (
                  <div key={block.id} className="border rounded p-4">
                    <h4 className="font-medium mb-2">{block.type}: {block.title}</h4>
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {JSON.stringify(block, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Editar Template</DialogTitle>
            <DialogDescription>
              Modifique as informações e estrutura do template.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={editedTemplate.name || ''}
                onChange={(e) => setEditedTemplate({...editedTemplate, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Select 
                value={editedTemplate.category as string || ''} 
                onValueChange={(value) => setEditedTemplate({...editedTemplate, category: value as ProductCategory})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(getCategoryName).map(category => (
                    <SelectItem key={category} value={category}>
                      {getCategoryName(category as ProductCategory)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditConfirm}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Template Dialog */}
      <Dialog open={isNewTemplateDialogOpen} onOpenChange={setIsNewTemplateDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Template</DialogTitle>
            <DialogDescription>
              Defina as informações básicas e estrutura do novo template.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="blocks">Blocos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 pt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newName" className="text-right">
                  Nome
                </Label>
                <Input
                  id="newName"
                  value={newTemplate.name || ''}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="col-span-3"
                  placeholder="Nome do novo template"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newCategory" className="text-right">
                  Categoria
                </Label>
                <Select 
                  value={newTemplate.category as string || ''} 
                  onValueChange={(value) => setNewTemplate({...newTemplate, category: value as ProductCategory})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {getCategoryName(category as ProductCategory)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="blocks" className="space-y-4 pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {blockTypes.map(type => (
                  <Button 
                    key={type} 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAddBlock(type)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> {type}
                  </Button>
                ))}
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Blocos no Template ({newTemplate.blocks?.length || 0})</h4>
                {!newTemplate.blocks || newTemplate.blocks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nenhum bloco adicionado. Use os botões acima para adicionar blocos ao template.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {newTemplate.blocks.map((block, index) => (
                      <div 
                        key={block.id} 
                        className="flex items-center justify-between p-2 border rounded bg-muted/50"
                      >
                        <div className="flex items-center">
                          <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">
                            {index + 1}
                          </span>
                          <span className="font-medium">{block.type}</span>
                          <span className="ml-2 text-sm text-muted-foreground">
                            {block.title}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveBlock(block.id)}
                          className="h-8 w-8 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewTemplateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateTemplate}>
              Criar Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o template "{selectedTemplate?.name}"? 
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplatesPanel;
