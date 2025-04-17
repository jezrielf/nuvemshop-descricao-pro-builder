
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plan, PlanFeature, defaultFeaturesTemplate } from '../types';
import { useToast } from '@/hooks/use-toast';

// Moved schema to the hook for better organization
const formSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome do plano deve ter pelo menos 3 caracteres.',
  }),
  description: z.string().optional(),
  price: z.coerce.number().min(0, {
    message: 'O preço deve ser um número positivo.',
  }),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  features: z.array(z.object({
    id: z.string(),
    name: z.string(),
    included: z.boolean(),
  })),
});

export type PlanFormValues = z.infer<typeof formSchema>;

export const usePlanForm = (
  initialData: Plan | null,
  onSubmit: (data: Plan | Omit<Plan, 'id'>) => void,
  onOpenChange: (open: boolean) => void
) => {
  const [newFeatureName, setNewFeatureName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const defaultValues: PlanFormValues = {
    name: '',
    description: '',
    price: 0,
    isActive: true,
    isDefault: false,
    features: [...defaultFeaturesTemplate],
  };

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (values: PlanFormValues) => {
    try {
      setIsLoading(true);
      
      if (initialData) {
        const planData: Plan = {
          id: initialData.id,
          name: values.name,
          description: values.description,
          price: values.price,
          isActive: values.isActive,
          isDefault: values.isDefault,
          features: values.features.map(feature => ({
            id: feature.id,
            name: feature.name,
            included: feature.included
          })),
          priceId: initialData.priceId || ''
        };
        
        await onSubmit(planData);
      } else {
        const newPlan: Omit<Plan, 'id'> = {
          name: values.name,
          description: values.description,
          price: values.price,
          isActive: values.isActive,
          isDefault: values.isDefault,
          features: values.features.map(feature => ({
            id: feature.id,
            name: feature.name,
            included: feature.included
          }))
        };
        
        await onSubmit(newPlan);
      }
      
      form.reset();
      setNewFeatureName('');
    } catch (error) {
      console.error("Error submitting plan form:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o plano. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    newFeatureName,
    setNewFeatureName,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
};
