
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, RefreshCw, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

interface SavedDescription {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  userId: string;
  userEmail?: string;
}

export const Descriptions: React.FC = () => {
  const [descriptions, setDescriptions] = useState<SavedDescription[]>([]);
  const [filteredDescriptions, setFilteredDescriptions] = useState<SavedDescription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const loadDescriptions = () => {
    try {
      const allDescriptions: SavedDescription[] = [];
      const allKeys = Object.keys(localStorage);
      
      allKeys.forEach(key => {
        if (key.startsWith('savedDescriptions_')) {
          const userId = key.replace('savedDescriptions_', '');
          try {
            const userDescriptions = JSON.parse(localStorage.getItem(key) || '[]');
            userDescriptions.forEach((desc: any) => {
              allDescriptions.push({
                ...desc,
                userId,
                userEmail: userId.includes('@') ? userId : `user-${userId.substring(0, 8)}`
              });
            });
          } catch (error) {
            console.error(`Error parsing descriptions for ${userId}:`, error);
          }
        }
      });

      // Sort by most recent
      allDescriptions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      
      setDescriptions(allDescriptions);
      setFilteredDescriptions(allDescriptions);

      toast({
        title: 'Descrições carregadas',
        description: `${allDescriptions.length} descrições encontradas`
      });
    } catch (error) {
      console.error('Error loading descriptions:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao carregar descrições',
        variant: 'destructive'
      });
    }
  };

  const deleteDescription = (descriptionId: string, userId: string) => {
    try {
      const key = `savedDescriptions_${userId}`;
      const userDescriptions = JSON.parse(localStorage.getItem(key) || '[]');
      const updatedDescriptions = userDescriptions.filter((desc: any) => desc.id !== descriptionId);
      
      localStorage.setItem(key, JSON.stringify(updatedDescriptions));
      loadDescriptions(); // Reload all descriptions
      
      toast({
        title: 'Sucesso',
        description: 'Descrição excluída com sucesso'
      });
    } catch (error) {
      console.error('Error deleting description:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao excluir descrição',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    loadDescriptions();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredDescriptions(descriptions);
    } else {
      const filtered = descriptions.filter(desc =>
        desc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        desc.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDescriptions(filtered);
    }
  }, [searchTerm, descriptions]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Todas as Descrições</h2>
        <Button onClick={loadDescriptions} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar descrições..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">
          {filteredDescriptions.length} descrições
        </Badge>
      </div>

      <div className="grid gap-4">
        {filteredDescriptions.map((description) => (
          <Card key={`${description.userId}-${description.id}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{description.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{description.userEmail}</Badge>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir Descrição</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir esta descrição? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteDescription(description.id, description.userId)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                Atualizada em: {new Date(description.updatedAt).toLocaleString('pt-BR')}
              </p>
              <div className="text-sm">
                {description.content.length > 200 
                  ? `${description.content.substring(0, 200)}...`
                  : description.content
                }
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDescriptions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm ? 'Nenhuma descrição encontrada para a busca' : 'Nenhuma descrição salva encontrada'}
          </p>
        </div>
      )}
    </div>
  );
};
