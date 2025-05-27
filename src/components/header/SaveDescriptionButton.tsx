
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
    savedDescriptions,
    saveCurrentDescription,
    updateDescription
  } = useEditorStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [descriptionName, setDescriptionName] = useState(description?.name || '');

  // Check if this description already exists in saved descriptions (is an update)
  const isExistingDescription = description && savedDescriptions.some(saved => saved.id === description.id);

  const handleSaveDescription = () => {
    if (!hasDescription) {
      toast({
        title: "Nenhuma descrição ativa",
        description: "Crie uma nova descrição primeiro.",
        variant: "destructive"
      });
      return;
    }

    // Only check limits for NEW descriptions, not updates
    if (!isExistingDescription && !isPremium() && !canCreateMoreDescriptions()) {
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
    if (!description?.name || description.name.startsWith('Nova Descrição')) {
      setDescriptionName(description?.name || '');
      setIsDialogOpen(true);
      return;
    }

    // Save directly if description already has a proper name
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

    // Update description name if it was changed
    if (description && description.name !== descriptionName) {
      updateDescription({ ...description, name: descriptionName });
    }

    // Save the description (pass whether it's a new description)
    const saved = saveCurrentDescription(!isExistingDescription);
    
    if (saved) {
      const actionText = isExistingDescription ? "atualizada" : "salva";
      toast({
        title: `Descrição ${actionText}`,
        description: `Sua descrição foi ${actionText} com sucesso!`
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

  const buttonText = isExistingDescription ? "Atualizar Descrição" : "Salvar Descrição";

  return (
    <>
      <Button 
        variant="outline" 
        onClick={handleSaveDescription} 
        disabled={!hasDescription} 
        className="flex items-center text-xs"
      >
        <Save className="mr-2 h-4 w-4" />
        {buttonText}
        {!isPremium() && !isExistingDescription && <Lock className="ml-1 h-3 w-3 text-yellow-600" />}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isExistingDescription ? "Atualizar Descrição" : "Salvar Descrição"}
            </DialogTitle>
            <DialogDescription>
              {isExistingDescription 
                ? "Altere o nome da descrição se desejar" 
                : "Dê um nome para sua descrição antes de salvar"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="name">Nome da Descrição</Label>
            <Input 
              id="name" 
              value={descriptionName} 
              onChange={(e) => setDescriptionName(e.target.value)} 
              placeholder="Ex: Descrição Whey Protein Premium" 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={saveAndNotify}>
              {isExistingDescription ? "Atualizar" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SaveDescriptionButton;
