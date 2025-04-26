
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Plan } from './types';
import { PlanBasicInfo } from './components/PlanBasicInfo';
import { PlanStatusToggles } from './components/PlanStatusToggles';
import { PlanFeaturesManager } from './components/PlanFeaturesManager';
import { usePlanForm } from './hooks/usePlanForm';

interface PlanFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Plan | Omit<Plan, 'id'>) => void;
  title: string;
  initialData?: Plan | null;
  isSubmitting: boolean;
}

const PlanFormDialog: React.FC<PlanFormDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  title,
  initialData,
  isSubmitting,
}) => {
  const {
    form,
    newFeatureName,
    setNewFeatureName,
    handleSubmit,
  } = usePlanForm(initialData, onSubmit, onOpenChange);

  useEffect(() => {
    if (open) {
      if (initialData) {
        console.log("Carregando plano para edição:", initialData);
        form.reset({
          name: initialData.name,
          description: initialData.description || '',
          price: initialData.price,
          isActive: initialData.isActive,
          isDefault: initialData.isDefault,
          features: initialData.features,
          interval: initialData.interval || 'month',  // Ensure interval is set
          currency: initialData.currency || 'BRL',    // Ensure currency is set
        });
      } else {
        // Reset form when opening for creating a new plan
        form.reset({
          name: '',
          description: '',
          price: 0,
          isActive: true,
          isDefault: false,
          features: [],
          interval: 'month',  // Set default interval
          currency: 'BRL',    // Set default currency
        });
      }
    }
  }, [open, initialData, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <PlanBasicInfo form={form} />
            <PlanStatusToggles form={form} />
            <PlanFeaturesManager
              form={form}
              newFeatureName={newFeatureName}
              setNewFeatureName={setNewFeatureName}
            />
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanFormDialog;
