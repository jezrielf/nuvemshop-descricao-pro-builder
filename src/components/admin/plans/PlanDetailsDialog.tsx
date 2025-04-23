
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { Plan } from './types';

interface PlanDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: Plan | null;
}

const PlanDetailsDialog: React.FC<PlanDetailsDialogProps> = ({
  open,
  onOpenChange,
  selectedPlan
}) => {
  if (!selectedPlan) return null;

  const formatPrice = (price: number) => {
    if (price === 0) return 'Grátis';
    return `R$ ${price.toFixed(2)}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedPlan.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-semibold">Detalhes do Plano</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="font-medium">Preço:</div>
              <div>{formatPrice(selectedPlan.price)}</div>
              
              <div className="font-medium">Status:</div>
              <div>
                {selectedPlan.isActive ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Ativo
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700">
                    Inativo
                  </Badge>
                )}
              </div>
              
              <div className="font-medium">Plano Padrão:</div>
              <div>
                {selectedPlan.isDefault ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <X className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>
          
          {selectedPlan.description && (
            <div>
              <h3 className="text-lg font-semibold">Descrição</h3>
              <p className="text-gray-600 mt-1">{selectedPlan.description}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold">Recursos</h3>
            <ul className="mt-2 space-y-2">
              {selectedPlan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  {feature.included ? (
                    <Check className="h-5 w-5 text-green-600 mr-2 shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                  )}
                  <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanDetailsDialog;
