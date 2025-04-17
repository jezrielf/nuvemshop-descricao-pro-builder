
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
import { Plan } from './types';
import { PlanBasicInfo } from './components/PlanBasicInfo';
import { PlanStatusToggles } from './components/PlanStatusToggles';
import { PlanFeaturesManager } from './components/PlanFeaturesManager';
import { usePlanForm } from './hooks/usePlanForm';
import { toast } from '@/hooks/use-toast';

interface PlanFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Plan | Omit<Plan, 'id'>) => void;
  title: string;
  initialData?: Plan | null;
}

const PlanFormDialog: React.FC<PlanFormDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  title,
  initialData,
}) => {
  const {
    form,
    isLoading,
    newFeatureName,
    setNewFeatureName,
    handleSubmit,
  } = usePlanForm(initialData, onSubmit, onOpenChange);

  useEffect(() => {
    if (open && initialData) {
      console.log("Loading plan data for editing:", initialData);
      form.reset({
        name: initialData.name,
        description: initialData.description || '',
        price: initialData.price,
        isActive: initialData.isActive,
        isDefault: initialData.isDefault,
        features: initialData.features,
      });
      
      toast({
        title: "Plano carregado",
        description: "Os dados do plano foram carregados para edição",
      });
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
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanFormDialog;
