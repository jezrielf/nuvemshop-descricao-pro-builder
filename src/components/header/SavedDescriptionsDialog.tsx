
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ListTodo, BadgeAlert } from 'lucide-react';
import { useEditorStore } from '@/store/editor';
import { ProductDescription } from '@/types/editor';

interface SavedDescriptionsDialogProps {
  isPremium: () => boolean;
  descriptionCount: number;
  savedDescriptions: ProductDescription[];
}

const SavedDescriptionsDialog: React.FC<SavedDescriptionsDialogProps> = ({ 
  isPremium, 
  descriptionCount, 
  savedDescriptions 
}) => {
  const [open, setOpen] = React.useState(false);
  
  return (
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
            {!isPremium() && (
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
                  className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer flex justify-between items-center"
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
                  <div className="text-xs text-gray-500">
                    {desc.blocks.length} blocos
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
  );
};

export default SavedDescriptionsDialog;
