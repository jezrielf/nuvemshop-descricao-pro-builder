
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Plano</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-lg">{selectedPlan.name}</h3>
              <p className="text-xl font-bold mt-1">{formatPrice(selectedPlan.price)}</p>
            </div>
            <div className="space-y-2">
              {selectedPlan.isActive ? (
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Ativo
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  Inativo
                </Badge>
              )}
              {selectedPlan.isDefault && (
                <Badge variant="outline" className="block ml-auto">
                  Plano Padrão
                </Badge>
              )}
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-3">Recursos Incluídos:</h4>
            <ul className="space-y-2">
              {selectedPlan.features.map(feature => (
                <li key={feature.id} className="flex items-center">
                  {feature.included ? (
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400 mr-2" />
                  )}
                  <span className={!feature.included ? "text-gray-500" : ""}>
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
