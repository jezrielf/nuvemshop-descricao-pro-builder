import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, BadgeAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
interface NewDescriptionDialogProps {
  isPremium: () => boolean;
  descriptionCount: number;
  canCreateMoreDescriptions: () => boolean;
}
const NewDescriptionDialog: React.FC<NewDescriptionDialogProps> = ({
  isPremium,
  descriptionCount,
  canCreateMoreDescriptions
}) => {
  const [open, setOpen] = React.useState(false);
  const [newDescriptionName, setNewDescriptionName] = React.useState('');
  const {
    createNewDescription
  } = useEditorStore();
  const {
    toast
  } = useToast();
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
      return;
    }
    createNewDescription(newDescriptionName);
    setNewDescriptionName('');
    setOpen(false);
    toast({
      title: "Descrição criada",
      description: "Nova descrição de produto iniciada com sucesso!"
    });
  };
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center font-normal text-xs">
          <Plus className="mr-2 h-4 w-4" />
          Nova Descrição
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Descrição de Produto</DialogTitle>
          <DialogDescription>
            Crie uma nova descrição para seu produto na Nuvemshop.
            {!isPremium() && <div className="mt-2 text-yellow-600 text-sm flex items-center">
                <BadgeAlert className="mr-1 h-4 w-4" />
                Você usou {descriptionCount}/3 descrições gratuitas.
              </div>}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Label htmlFor="name">Nome da Descrição</Label>
          <Input id="name" value={newDescriptionName} onChange={e => setNewDescriptionName(e.target.value)} placeholder="Ex: Descrição Whey Protein Premium" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreateNew}>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
};
export default NewDescriptionDialog;