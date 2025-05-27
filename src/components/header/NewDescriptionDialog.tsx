
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, BadgeAlert, Crown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNavigate } from 'react-router-dom';

interface NewDescriptionDialogProps {
  isPremium: () => boolean;
  descriptionCount: number;
  canCreateMoreDescriptions: () => boolean;
  incrementDescriptionCount: () => void;
}

const NewDescriptionDialog: React.FC<NewDescriptionDialogProps> = ({
  isPremium,
  descriptionCount,
  canCreateMoreDescriptions,
  incrementDescriptionCount
}) => {
  const [open, setOpen] = React.useState(false);
  const [newDescriptionName, setNewDescriptionName] = React.useState('');
  const { createNewDescription } = useEditorStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateNew = () => {
    if (!newDescriptionName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para a descrição.",
        variant: "destructive"
      });
      return;
    }

    if (!canCreateMoreDescriptions()) {
      toast({
        title: "Limite atingido",
        description: "Você atingiu o limite de 3 descrições gratuitas. Faça upgrade para o plano premium para criar mais.",
        variant: "destructive"
      });
      
      // Redirect to plans page after showing the toast
      setTimeout(() => {
        navigate('/plans');
      }, 2000);
      return;
    }

    // Increment counter for free users BEFORE creating the description
    if (!isPremium()) {
      incrementDescriptionCount();
      console.log('Incremented description count to:', descriptionCount + 1);
    }

    // Create the description with the correct single argument
    createNewDescription(newDescriptionName);
    setNewDescriptionName('');
    setOpen(false);
    
    toast({
      title: "Descrição criada",
      description: "Nova descrição de produto iniciada com sucesso!"
    });
  };

  const remainingDescriptions = Math.max(0, 3 - descriptionCount);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center font-normal text-xs"
          disabled={!canCreateMoreDescriptions()}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Descrição
          {!isPremium() && !canCreateMoreDescriptions() && (
            <Crown className="ml-1 h-3 w-3 text-yellow-600" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Descrição de Produto</DialogTitle>
          <DialogDescription>
            Crie uma nova descrição para seu produto na Nuvemshop.
            {!isPremium() && (
              <div className="mt-2 space-y-1">
                <div className="text-yellow-600 text-sm flex items-center">
                  <BadgeAlert className="mr-1 h-4 w-4" />
                  Você usou {descriptionCount}/3 descrições gratuitas.
                </div>
                {remainingDescriptions > 0 ? (
                  <div className="text-green-600 text-sm">
                    {remainingDescriptions} descrição{remainingDescriptions > 1 ? 'ões' : ''} restante{remainingDescriptions > 1 ? 's' : ''}.
                  </div>
                ) : (
                  <div className="text-red-600 text-sm">
                    Limite atingido. Faça upgrade para criar mais descrições.
                  </div>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="name">Nome da Descrição</Label>
          <Input
            id="name"
            value={newDescriptionName}
            onChange={(e) => setNewDescriptionName(e.target.value)}
            placeholder="Ex: Descrição Whey Protein Premium"
            disabled={!canCreateMoreDescriptions()}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleCreateNew}
            disabled={!canCreateMoreDescriptions()}
          >
            {canCreateMoreDescriptions() ? 'Criar' : 'Limite Atingido'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewDescriptionDialog;
