
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ListTodo, BadgeAlert, Trash2 } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { ProductDescription } from '@/types/editor';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface SavedDescriptionsDialogProps {
  isPremium: boolean; // Changed from function to boolean
  descriptionCount: number;
  savedDescriptions: ProductDescription[];
}

const SavedDescriptionsDialog: React.FC<SavedDescriptionsDialogProps> = ({ 
  isPremium, 
  descriptionCount, 
  savedDescriptions 
}) => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState<ProductDescription | null>(null);
  const { toast } = useToast();
  
  const handleDeleteClick = (desc: ProductDescription, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click
    setSelectedDescription(desc);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (selectedDescription) {
      // Obter a chave correta do localStorage baseada no usuário atual
      const { user } = useEditorStore.getState();
      const key = user ? `savedDescriptions_${user.id}` : 'savedDescriptions_anonymous';
      
      // Get current descriptions
      const saved = localStorage.getItem(key);
      if (saved) {
        const descriptions = JSON.parse(saved) as ProductDescription[];
        const updatedDescriptions = descriptions.filter(d => d.id !== selectedDescription.id);
        localStorage.setItem(key, JSON.stringify(updatedDescriptions));
        
        // Update the store
        useEditorStore.getState().loadSavedDescriptions();
        
        toast({
          title: "Descrição excluída",
          description: "A descrição foi removida com sucesso."
        });
      }
    }
    setDeleteDialogOpen(false);
    setSelectedDescription(null);
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
              {!isPremium && ( // Changed from function call to direct boolean check
                <div className="mt-2 text-yellow-600 text-sm flex items-center">
                  <BadgeAlert className="mr-1 h-4 w-4" />
                  Você usou {descriptionCount}/3 descrições gratuitas.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {savedDescriptions.length > 0 ? (
              <div className="space-y-2">
                {savedDescriptions.map((desc) => (
                  <div 
                    key={desc.id} 
                    className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer flex justify-between items-center group"
                    onClick={() => {
                      useEditorStore.getState().loadDescription(desc);
                      setOpen(false);
                    }}
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
