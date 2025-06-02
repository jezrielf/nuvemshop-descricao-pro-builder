
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
import { Eye, Trash, RefreshCw, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ExtendedProductDescription extends ProductDescription {
  userId: string;
  userEmail?: string;
  userName?: string;
}

const DescriptionsPanel: React.FC = () => {
  const [descriptions, setDescriptions] = useState<ExtendedProductDescription[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<ExtendedProductDescription | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const loadDescriptions = async () => {
    setLoading(true);
    
    try {
      // Primeiro, buscar todos os perfis de usuários
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, nome');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Mapear perfis para facilitar o lookup
      const profilesMap = new Map();
      profiles?.forEach(profile => {
        profilesMap.set(profile.id, profile.nome || 'Usuário sem nome');
      });

      // Buscar descrições do localStorage de todos os usuários
      const allStorageKeys = Object.keys(localStorage);
      const descriptionKeys = allStorageKeys.filter(key => 
        key.startsWith('savedDescriptions_')
      );
      
      const allDescriptions: ExtendedProductDescription[] = [];
      
      descriptionKeys.forEach(key => {
        try {
          const userDescriptions = JSON.parse(localStorage.getItem(key) || '[]');
          const userId = key.replace('savedDescriptions_', '');
          const userName = profilesMap.get(userId) || 'Usuário desconhecido';
          
          const descriptionsWithUser = userDescriptions.map((desc: ProductDescription) => ({
            ...desc,
            userId,
            userName,
            userEmail: userId
          }));
          
          allDescriptions.push(...descriptionsWithUser);
        } catch (error) {
          console.error(`Error parsing descriptions for key ${key}:`, error);
        }
      });
      
      // Ordenar por mais recente primeiro
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

  const handleViewDescription = (description: ExtendedProductDescription) => {
    setSelectedDescription(description);
    setIsPreviewOpen(true);
  };

  const handleDeleteClick = (description: ExtendedProductDescription) => {
    setSelectedDescription(description);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!selectedDescription) return;
    
    try {
      const userId = selectedDescription.userId;
      const storageKey = `savedDescriptions_${userId}`;
      const userDescriptions = JSON.parse(localStorage.getItem(storageKey) || '[]');
      
      const updatedDescriptions = userDescriptions.filter(
        (d: ProductDescription) => d.id !== selectedDescription.id
      );
      
      localStorage.setItem(storageKey, JSON.stringify(updatedDescriptions));
      
      // Atualizar estado local
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

  // Filtrar descrições baseado no termo de busca
  const filteredDescriptions = descriptions.filter(desc =>
    desc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    desc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    desc.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    desc.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Descrições</h2>
          <p className="text-gray-600 mt-1">Visualize e gerencie todas as descrições criadas pelos usuários</p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar descrições..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md w-64"
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
                <TableHead>Nome da Descrição</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Blocos</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Atualizado em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDescriptions.map((description) => (
                <TableRow key={`${description.userId}-${description.id}`}>
                  <TableCell className="font-medium">{truncateText(description.name)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{description.userName}</span>
                        <span className="text-xs text-gray-500">{truncateText(description.userId, 8)}</span>
                      </div>
                    </div>
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
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <p><strong>ID:</strong> {selectedDescription.id}</p>
                  <p><strong>Usuário:</strong> {selectedDescription.userName}</p>
                  <p><strong>User ID:</strong> {selectedDescription.userId}</p>
                  <p><strong>Blocos:</strong> {selectedDescription.blocks.length}</p>
                </div>
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
              Tem certeza que deseja excluir a descrição "{selectedDescription?.name}" 
              do usuário {selectedDescription?.userName}? Esta ação não pode ser desfeita.
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
