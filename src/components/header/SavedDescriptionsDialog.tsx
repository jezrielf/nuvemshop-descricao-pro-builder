
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ListTodo, BadgeAlert, Trash2 } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { ProductDescription } from '@/types/editor';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface SavedDescriptionsDialogProps {
  isPremium: boolean; // Boolean prop instead of function
  descriptionCount: number;
  savedDescriptions: ProductDescription[] | undefined;
}

const SavedDescriptionsDialog: React.FC<SavedDescriptionsDialogProps> = ({ 
  isPremium, 
  descriptionCount, 
  savedDescriptions = [] // Provide default empty array if undefined
}) => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<ProductDescription | null>(null);
  const { toast } = useToast();
  const { loadSavedDescriptions, loadDescription } = useEditorStore(); // Get functions from store
  
  // Store the user in a state variable instead of accessing it during render
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    // Get auth state once during component mount
    const { user } = useEditorStore.getState();
    setUserId(user ? user.id : null);
  }, []);
  
  const handleDeleteClick = (desc: ProductDescription, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click
    setSelectedDescription(desc);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (selectedDescription) {
      // Use stored userId instead of accessing it during render
      const key = userId ? `savedDescriptions_${userId}` : 'savedDescriptions_anonymous';
      
      // Get current descriptions from localStorage
      const saved = localStorage.getItem(key);
      if (saved) {
        const descriptions = JSON.parse(saved) as ProductDescription[];
        const updatedDescriptions = descriptions.filter(d => d.id !== selectedDescription.id);
        localStorage.setItem(key, JSON.stringify(updatedDescriptions));
        
        // Update store
        loadSavedDescriptions();
        
        toast({
          title: "Descrição excluída",
          description: "A descrição foi removida com sucesso."
        });
      }
    }
    setDeleteDialogOpen(false);
    setSelectedDescription(null);
  };
  
  const handleLoadDescription = (desc: ProductDescription) => {
    loadDescription(desc);
    setOpen(false);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center">
            <ListTodo className="mr-2 h-4 w-4" />
            Descrições Salvas
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suas Descrições Salvas</DialogTitle>
            <DialogDescription>
              Selecione uma descrição para continuar editando.
              {!isPremium && (
                <div className="mt-2 text-yellow-600 text-sm flex items-center">
                  <BadgeAlert className="mr-1 h-4 w-4" />
                  Você usou {descriptionCount}/3 descrições gratuitas.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {savedDescriptions && savedDescriptions.length > 0 ? (
              <div className="space-y-2">
                {savedDescriptions.map((desc) => (
                  <div 
                    key={desc.id} 
                    className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer flex justify-between items-center group"
                    onClick={() => handleLoadDescription(desc)}
                  >
                    <div>
                      <p className="font-medium">{desc.name}</p>
                      <p className="text-xs text-gray-500">
                        Atualizado em: {new Date(desc.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-gray-500">
                        {desc.blocks.length} blocos
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => handleDeleteClick(desc, e)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhuma descrição salva ainda.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a descrição "{selectedDescription?.name}"? 
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SavedDescriptionsDialog;
