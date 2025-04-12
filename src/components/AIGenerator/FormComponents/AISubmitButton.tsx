
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface AISubmitButtonProps {
  isLoading: boolean;
  isPremium: boolean;
}

const AISubmitButton: React.FC<AISubmitButtonProps> = ({ isLoading, isPremium }) => {
  return (
    <>
      <Button
        type="submit"
        disabled={isLoading || !isPremium}
        className="w-full bg-violet-600 hover:bg-violet-700 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gerando Descrição...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4" />
            Gerar Descrição com IA
          </>
        )}
      </Button>
      
      {!isPremium && (
        <p className="text-amber-600 text-center text-sm">
          Este recurso está disponível apenas para usuários premium.
        </p>
      )}
    </>
  );
};

export default AISubmitButton;
