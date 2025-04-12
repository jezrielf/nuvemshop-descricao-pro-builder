
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AISubmitButtonProps {
  isLoading: boolean;
  onClick?: (e?: React.FormEvent) => void;
  text?: string;
  isPremium: boolean;
}

const AISubmitButton: React.FC<AISubmitButtonProps> = ({ 
  isLoading, 
  onClick, 
  text = "Gerar com IA",
  isPremium
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isLoading || !isPremium}
      className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium py-2 transition-all duration-200 shadow-md hover:shadow-lg"
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full"></div>
          <span>Gerando descrição...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <Sparkles className="mr-2 h-5 w-5" />
          <span>{text}</span>
        </div>
      )}
    </Button>
  );
};

export default AISubmitButton;
