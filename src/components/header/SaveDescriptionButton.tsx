import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
  const { description, saveCurrentDescription } = useEditorStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [descriptionName, setDescriptionName] = useState('');
  
  const handleSaveClick = () => {
    if (!hasDescription) {
      toast({
        title: "Nenhuma descrição ativa",
        description: "Crie uma nova descrição primeiro.",
        variant: "destructive",
      });
      return;
    }
    
    if (!isSubscribed() && !canCreateMoreDescriptions()) {
      toast({
        title: "Limite de descrições atingido",
        description: "Você atingiu o limite de 3 descrições gratuitas. Faça upgrade para um plano pago para continuar.",
        variant: "destructive",
      });
      
      // Perguntar se o usuário quer visualizar os planos
      const confirmUpgrade = window.confirm(
        "Você atingiu o limite de descrições gratuitas. Deseja ver nossos planos de assinatura?"
      );
      
      if (confirmUpgrade) {
        navigate('/plans');
      }
      
      return;
    }
    
    // Se a descrição já tiver um nome válido, salvar diretamente
    if (description?.name && description.name !== 'Nova descrição') {
      const saved = saveCurrentDescription();
      if (saved) {
        toast({
          title: "Descrição salva",
          description: "Sua descrição foi salva com sucesso!",
        });
      } else {
        toast({
          title: "Erro ao salvar",
          description: "Ocorreu um erro ao salvar a descrição.",
          variant: "destructive",
        });
      }
    } else {
      // Abrir o diálogo para pedir um nome
      setNameDialogOpen(true);
      setDescriptionName(description?.name === 'Nova descrição' ? '' : (description?.name || ''));
    }
  };
  
  const handleSaveWithName = () => {
    if (!descriptionName.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe um nome para a descrição.",
        variant: "destructive",
      });
      return;
    }
    
    // Atualizar o nome da descrição
    if (description) {
      // Update description in the store with the new name
      const updatedDescription = { ...description, name: descriptionName };
      useEditorStore.getState().loadDescription(updatedDescription);
    }
    
    // Salvar a descrição
    const saved = saveCurrentDescription();
    if (saved) {
      toast({
        title: "Descrição salva",
        description: "Sua descrição foi salva com sucesso!",
      });
      setNameDialogOpen(false);
    } else {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar a descrição.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center"
        onClick={handleSaveClick}
        disabled={!hasDescription}
      >
        <Save className="mr-2 h-4 w-4" />
        Salvar Descrição
        {!isSubscribed() && <Lock className="ml-1 h-3 w-3 text-yellow-600" />}
      </Button>
      
      <Dialog open={nameDialogOpen} onOpenChange={setNameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Descrição</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="description-name">Nome da Descrição</Label>
            <Input 
              id="description-name"
              value={descriptionName}
              onChange={(e) => setDescriptionName(e.target.value)}
              placeholder="Ex: Descrição Whey Protein Premium"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNameDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveWithName}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SaveDescriptionButton;
