
import React, { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/editor';
import { ProductDescription } from '@/types/editor';
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Eye, Trash, Copy, Edit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const DescriptionsPanel: React.FC = () => {
  const [descriptions, setDescriptions] = useState<ProductDescription[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<ProductDescription | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load all descriptions from localStorage for demonstration
  // In a real application, this would come from the database
  useEffect(() => {
    setLoading(true);
    
    // Get all keys from localStorage
    const allStorageKeys = Object.keys(localStorage);
    
    // Filter for saved descriptions keys
    const descriptionKeys = allStorageKeys.filter(key => 
      key.startsWith('savedDescriptions_')
    );
    
    // Get all descriptions from all users
    const allDescriptions: ProductDescription[] = [];
    
    descriptionKeys.forEach(key => {
      try {
        const userDescriptions = JSON.parse(localStorage.getItem(key) || '[]');
        allDescriptions.push(...userDescriptions);
      } catch (error) {
        console.error(`Error parsing descriptions for key ${key}:`, error);
      }
    });
    
    setDescriptions(allDescriptions);
    setLoading(false);
  }, []);

  const handleViewDescription = (description: ProductDescription) => {
    setSelectedDescription(description);
    setIsPreviewOpen(true);
  };

  const handleDeleteClick = (description: ProductDescription) => {
    setSelectedDescription(description);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDescription) return;
    
    // In a real application, this would delete from the database
    // For now, we'll just update our local state
    setDescriptions(descriptions.filter(d => d.id !== selectedDescription.id));
    setIsDeleteDialogOpen(false);
    setSelectedDescription(null);
  };

  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciar Descrições</h2>
      
      <Card className="p-6">
        {loading ? (
          <p>Carregando descrições...</p>
        ) : descriptions.length > 0 ? (
          <Table>
            <TableCaption>Lista de todas as descrições de produtos no sistema</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Blocos</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {descriptions.map((description) => (
                <TableRow key={description.id}>
                  <TableCell className="font-medium">{truncateText(description.name)}</TableCell>
                  <TableCell className="text-xs truncate max-w-[100px]">{description.id}</TableCell>
                  <TableCell>{description.blocks.length}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(description.createdAt), { 
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(description.updatedAt), { 
                      addSuffix: true,
                      locale: ptBR
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDescription(description)}
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
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteClick(description)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            Nenhuma descrição encontrada no sistema.
          </p>
        )}
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualizar Descrição</DialogTitle>
          </DialogHeader>
          {selectedDescription && (
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              <h3 className="font-bold text-lg mb-2">{selectedDescription.name}</h3>
              <div className="space-y-4">
                {selectedDescription.blocks.map(block => (
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
              Tem certeza que deseja excluir a descrição "{selectedDescription?.name}"? 
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

export default DescriptionsPanel;
