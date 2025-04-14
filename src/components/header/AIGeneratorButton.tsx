
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Lock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import AIDescriptionGenerator from '../AIGenerator/AIDescriptionGenerator';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AIGeneratorButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPremium, isBusiness } = useAuth();
  const navigate = useNavigate();
  
  // Now premium users can use AI too
  const canUseAI = isPremium() || isBusiness();
  
  console.log("AIGeneratorButton - isPremium:", isPremium());
  console.log("AIGeneratorButton - isBusiness:", isBusiness());
  console.log("AIGeneratorButton - canUseAI:", canUseAI);
  
  const tooltipText = canUseAI 
    ? "Gerar descrição completa com IA" 
    : "Recurso exclusivo: Assine o plano Premium ou Empresarial para usar IA";
  
  const handleClick = () => {
    if (canUseAI) {
      setIsOpen(true);
    } else {
      navigate('/plans');
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className={canUseAI ? "border-yellow-400 hover:border-yellow-500 hover:bg-yellow-50" : ""}
              onClick={handleClick}
            >
              <Sparkles className={`h-4 w-4 mr-2 ${canUseAI ? "text-yellow-500" : "text-gray-400"}`} />
              {canUseAI ? "IA" : <><span className="mr-1">IA</span><Lock className="h-3 w-3 text-gray-400" /></>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {canUseAI && (
        <AIDescriptionGenerator 
          isOpen={isOpen} 
          onOpenChange={setIsOpen} 
        />
      )}
    </>
  );
};

export default AIGeneratorButton;
