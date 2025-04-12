
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AIDescriptionGenerator from '../AIGenerator/AIDescriptionGenerator';
import { useAuth } from '@/contexts/AuthContext';

const AIGeneratorButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPremium } = useAuth();
  
  const tooltipText = isPremium() 
    ? "Gerar descrição completa com IA" 
    : "Recurso premium: Gerar descrição completa com IA";

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className={isPremium() ? "border-yellow-400 hover:border-yellow-500 hover:bg-yellow-50" : ""}
              onClick={() => setIsOpen(true)}
            >
              <Sparkles className={`h-4 w-4 mr-2 ${isPremium() ? "text-yellow-500" : ""}`} />
              {isPremium() ? "IA" : "Premium"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <AIDescriptionGenerator 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
      />
    </>
  );
};

export default AIGeneratorButton;
