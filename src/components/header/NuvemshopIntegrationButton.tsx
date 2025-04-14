
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import NuvemshopIntegrationDialog from './NuvemshopIntegrationDialog';
import { useAuth } from '@/contexts/AuthContext';

const NuvemshopIntegrationButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPremium, isBusiness } = useAuth();
  
  const canUseIntegration = isPremium() || isBusiness();
  
  const tooltipText = canUseIntegration 
    ? "Integrar com Nuvemshop" 
    : "Recurso exclusivo: Assine o plano Premium ou Empresarial para integrar com Nuvemshop";
  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className={canUseIntegration ? "border-blue-400 hover:border-blue-500 hover:bg-blue-50" : ""}
              onClick={() => canUseIntegration ? setIsOpen(true) : window.location.href = '/plans'}
            >
              <ShoppingBag className={`h-4 w-4 mr-2 ${canUseIntegration ? "text-blue-500" : "text-gray-400"}`} />
              Nuvemshop
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {canUseIntegration && (
        <NuvemshopIntegrationDialog 
          isOpen={isOpen} 
          onOpenChange={setIsOpen} 
        />
      )}
    </>
  );
};

export default NuvemshopIntegrationButton;
