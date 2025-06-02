
import React, { useState, useEffect } from 'react';
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
import { Eye, Trash, Copy, Edit, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const DescriptionsPanel: React.FC = () => {
  const [descriptions, setDescriptions] = useState<ProductDescription[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<ProductDescription | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const loadDescriptions = () => {
    setLoading(true);
    
    try {
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
          const userId = key.replace('savedDescriptions_', '');
          
          // Add user context to each description
          const descriptionsWithUser = userDescriptions.map((desc: ProductDescription) => ({
            ...desc,
            userId,
            userEmail: userId // You might want to fetch actual email from profiles
          }));
          
          allDescriptions.push(...descriptionsWithUser);
        } catch (error) {
          console.error(`Error parsing descriptions for key ${key}:`, error);
        }
      });
      
      // Sort by most recent first
      allDescriptions.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      
      setDescriptions(allDescriptions);
      
      toast({
        title: 'Descrições carregadas',
        description: `${allDescriptions.length} descrições encontradas no sistema`,
      });
    } catch (error) {
      console.error('Error loading descriptions:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar descrições',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDescriptions();
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
    
    try {
      const userId = (selectedDescription as any).userId;
      const storageKey = `savedDescriptions_${userId}`;
      const userDescriptions = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      const updatedDescriptions = userDescriptions.filter(
        (d: ProductDescription) => d.id !== selectedDescription.id
      );
      
      localStorage.setItem(storageKey, JSON.stringify(updatedDescriptions));
      
      // Update local state
      setDescriptions(descriptions.filter(d => d.id !== selectedDescription.id));
      
      toast({
        title: 'Descrição excluída',
        description: 'A descrição foi excluída com sucesso',
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedDescription(null);
    } catch (error) {
      console.error('Error deleting description:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir descrição',
        variant: 'destructive'
      });
    }
  };

  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Filter descriptions based on search term
  const filteredDescriptions = descriptions.filter(desc =>
    desc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    desc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (desc as any).userId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Descrições</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar descrições..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
          <Button
            variant="outline"
            onClick={loadDescriptions}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Carregando descrições...</p>
          </div>
        ) : filteredDescriptions.length > 0 ? (
          <Table>
            <TableCaption>
              Lista de todas as descrições de produtos no sistema
              {searchTerm && ` (filtrado: ${filteredDescriptions.length} de ${descriptions.length})`}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Blocos</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDescriptions.map((description) => (
                <TableRow key={description.id}>
                  <TableCell className="font-medium">{truncateText(description.name)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {truncateText((description as any).userId || 'Desconhecido', 20)}
                  </TableCell>
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
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? 
              `Nenhuma descrição encontrada para "${searchTerm}"` : 
              'Nenhuma descrição encontrada no sistema'
            }
          </div>
        )}
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Visualizar Descrição</DialogTitle>
          </DialogHeader>
          {selectedDescription && (
            <div className="mt-4">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{selectedDescription.name}</h3>
                <p className="text-sm text-gray-600">ID: {selectedDescription.id}</p>
                <p className="text-sm text-gray-600">Usuário: {(selectedDescription as any).userId}</p>
                <p className="text-sm text-gray-600">Blocos: {selectedDescription.blocks.length}</p>
              </div>
              <div className="space-y-4">
                {selectedDescription.blocks.map((block, index) => (
                  <div key={block.id} className="border rounded p-4">
                    <h4 className="font-medium mb-2">
                      Bloco {index + 1}: {block.type}
                      {block.title && ` - ${block.title}`}
                    </h4>
                    <div className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                      <pre>{JSON.stringify(block, null, 2)}</pre>
                    </div>
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
