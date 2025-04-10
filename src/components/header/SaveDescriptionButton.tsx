
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';

interface SaveDescriptionButtonProps {
  isPremium: () => boolean;
  hasDescription: boolean;
}

const SaveDescriptionButton: React.FC<SaveDescriptionButtonProps> = ({ 
  isPremium, 
  hasDescription 
}) => {
  const { saveCurrentDescription } = useEditorStore();
  const { toast } = useToast();
  
  const handleSaveDescription = () => {
    if (!hasDescription) {
      toast({
        title: "Nenhuma descrição ativa",
        description: "Crie uma nova descrição primeiro.",
        variant: "destructive",
      });
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
        description: isPremium() 
          ? "Ocorreu um erro ao salvar a descrição." 
          : "Você atingiu o limite de 3 descrições gratuitas. Faça upgrade para o plano premium.",
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
      {!isPremium() && <Lock className="ml-1 h-3 w-3 text-yellow-600" />}
    </Button>
  );
};

export default SaveDescriptionButton;
