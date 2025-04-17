
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, X } from 'lucide-react';
import { Plan } from './types';
import { Badge } from '@/components/ui/badge';

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

  // Format price to display as currency
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(selectedPlan.price);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{selectedPlan.name}</DialogTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={selectedPlan.isActive ? "default" : "outline"}>
              {selectedPlan.isActive ? "Ativo" : "Inativo"}
            </Badge>
            {selectedPlan.isDefault && (
              <Badge variant="secondary">Plano Padrão</Badge>
            )}
          </div>
        </DialogHeader>
        
        <div className="py-4">
          {selectedPlan.description && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-1">Descrição</h3>
              <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
            </div>
          )}
          
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-1">Preço Mensal</h3>
            <p className="text-lg font-bold">{formattedPrice}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Recursos Incluídos</h3>
            <ScrollArea className="h-[250px] rounded-md border p-2">
              <div className="space-y-2">
                {selectedPlan.features.map((feature) => (
                  <div 
                    key={feature.id}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <span className="text-sm font-medium">{feature.name}</span>
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button>Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanDetailsDialog;
