
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Plan, PlanFeature, defaultFeaturesTemplate } from './types';
import { Plus, Trash } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

// Create a schema that ensures all required fields are present
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

// This type ensures we match the Plan type exactly (minus the id field)
type FormValues = z.infer<typeof formSchema>;

interface PlanFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Plan, 'id'> | Plan) => void;
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
  const [newFeatureName, setNewFeatureName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Create a properly typed default value object that matches the FormValues type
  const defaultValues: FormValues = {
    name: '',
    description: '',
    price: 0,
    isActive: true,
    isDefault: false,
    features: [...defaultFeaturesTemplate],
  };

  // Set default values with the correct types to match Plan requirements
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // When initialData changes or open changes, reset the form
  useEffect(() => {
    if (open && initialData) {
      console.log("Loading plan data for editing:", initialData);
      // Reset the form with the initialData
      form.reset({
        name: initialData.name,
        description: initialData.description || '',
        price: initialData.price,
        isActive: initialData.isActive,
        isDefault: initialData.isDefault,
        features: initialData.features || [...defaultFeaturesTemplate],
      });
      
      toast({
        title: "Plano carregado",
        description: "Os dados do plano foram carregados para edição",
      });
    } else if (open && !initialData) {
      // Reset to default values when creating a new plan
      form.reset(defaultValues);
    }
  }, [open, initialData, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      
      // If initialData exists, we're editing an existing plan
      if (initialData) {
        // Make sure all required properties are present, using spread to ensure type safety
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
        // We're creating a new plan, ensure all required fields are present
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

  const addNewFeature = () => {
    if (newFeatureName.trim() === '') return;
    
    const currentFeatures = form.getValues().features || [];
    const newFeature: PlanFeature = {
      id: `feature-${uuidv4()}`,
      name: newFeatureName,
      included: false
    };
    
    form.setValue('features', [...currentFeatures, newFeature]);
    setNewFeatureName('');
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues().features;
    const updatedFeatures = [...currentFeatures];
    updatedFeatures.splice(index, 1);
    form.setValue('features', updatedFeatures);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Plano</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Plano Básico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição do plano" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço Mensal (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <FormLabel>Ativo</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <FormLabel>Plano Padrão</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormLabel>Recursos Incluídos</FormLabel>
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                {form.getValues().features.map((feature, index) => (
                  <FormField
                    key={feature.id}
                    control={form.control}
                    name={`features.${index}.included`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="flex-1 mr-2">
                          <FormLabel className="m-0">
                            {form.getValues().features[index].name}
                          </FormLabel>
                        </div>
                        <div className="flex items-center">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="ml-2"
                            onClick={() => removeFeature(index)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Input 
                  value={newFeatureName} 
                  onChange={(e) => setNewFeatureName(e.target.value)}
                  placeholder="Nome do novo recurso" 
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={addNewFeature}
                  disabled={!newFeatureName.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </div>
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
