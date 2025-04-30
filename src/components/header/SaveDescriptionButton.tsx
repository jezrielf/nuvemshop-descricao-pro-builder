import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
interface SaveDescriptionButtonProps {
  isPremium: () => boolean;
  isSubscribed: () => boolean;
  hasDescription: boolean;
  canCreateMoreDescriptions: () => boolean;
}
const SaveDescriptionButton: React.FC<SaveDescriptionButtonProps> = ({
  isPremium,
  isSubscribed,
  hasDescription,
  canCreateMoreDescriptions
}) => {
  const {
    description,
    saveCurrentDescription
  } = useEditorStore();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [descriptionName, setDescriptionName] = useState(description?.name || '');
  const handleSaveDescription = () => {
    if (!hasDescription) {
      toast({
        title: "Nenhuma descrição ativa",
        description: "Crie uma nova descrição primeiro.",
        variant: "destructive"
      });
      return;
    }
    if (!isSubscribed() && !canCreateMoreDescriptions()) {
      toast({
        title: "Limite de descrições atingido",
        description: "Você atingiu o limite de 3 descrições gratuitas. Faça upgrade para um plano pago para continuar.",
        variant: "destructive"
      });
      const confirmUpgrade = window.confirm("Você atingiu o limite de descrições gratuitas. Deseja ver nossos planos de assinatura?");
      if (confirmUpgrade) {
        navigate('/plans');
      }
      return;
    }

    // If description has no name or is the default name, show dialog
    if (!description?.name || description.name === 'Nova Descrição') {
      setIsDialogOpen(true);
      return;
    }
    saveAndNotify();
  };
  const saveAndNotify = () => {
    if (!descriptionName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, insira um nome para a descrição.",
        variant: "destructive"
      });
      return;
    }

    // Update description name before saving
    description.name = descriptionName;
    const saved = saveCurrentDescription();
    if (saved) {
      toast({
        title: "Descrição salva",
        description: "Sua descrição foi salva com sucesso!"
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a descrição.",
        variant: "destructive"
      });
    }
  };
  return <>
      <Button variant="outline" onClick={handleSaveDescription} disabled={!hasDescription} className="flex items-center text-xs">
        <Save className="mr-2 h-4 w-4" />
        Salvar Descrição
        {!isSubscribed() && <Lock className="ml-1 h-3 w-3 text-yellow-600" />}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Descrição</DialogTitle>
            <DialogDescription>
              Dê um nome para sua descrição antes de salvar
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="name">Nome da Descrição</Label>
            <Input id="name" value={descriptionName} onChange={e => setDescriptionName(e.target.value)} placeholder="Ex: Descrição Whey Protein Premium" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveAndNotify}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>;
};
export default SaveDescriptionButton;