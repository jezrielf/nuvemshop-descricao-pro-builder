
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNavigate } from 'react-router-dom';

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
  const { saveCurrentDescription } = useEditorStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSaveDescription = () => {
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
  };
  
  return (
    <Button 
      variant="outline" 
      className="flex items-center"
      onClick={handleSaveDescription}
      disabled={!hasDescription}
    >
      <Save className="mr-2 h-4 w-4" />
      Salvar Descrição
      {!isSubscribed() && <Lock className="ml-1 h-3 w-3 text-yellow-600" />}
    </Button>
  );
};

export default SaveDescriptionButton;
