
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
import { Eye, Trash, Edit, Plus } from 'lucide-react';
import { Template, ProductCategory } from '@/types/editor';
import { useTemplateStore } from '@/store/templateStore';

const TemplatesPanel: React.FC = () => {
  const { templates, categories } = useTemplateStore();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleDeleteClick = (template: Template) => {
    setSelectedTemplate(template);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // This would delete the template in a real application
    // For now, just close the dialog
    setIsDeleteDialogOpen(false);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Templates</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>
      
      <Card className="p-6">
        <Table>
          <TableCaption>Lista de todos os templates disponíveis no sistema</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Blocos</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {getCategoryName(template.category)}
                  </Badge>
                </TableCell>
                <TableCell>{template.blocks.length}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewTemplate(template)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteClick(template)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

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
