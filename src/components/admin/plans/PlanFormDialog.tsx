
import React from 'react';
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
import { Plan, PlanFeature } from './types';

// Create a schema that ensures all required fields are present
const formSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome do plano deve ter pelo menos 3 caracteres.',
  }),
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
  onSubmit: (data: Omit<Plan, 'id'>) => void;
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
  const defaultFeatures: PlanFeature[] = [
    { id: 'feature-1', name: 'Descrições ilimitadas', included: true },
    { id: 'feature-2', name: 'Suporte prioritário', included: false },
    { id: 'feature-3', name: 'Acesso a todos os templates', included: false },
    { id: 'feature-4', name: 'Exportação em múltiplos formatos', included: false },
    { id: 'feature-5', name: 'Integrações com marketplaces', included: false },
  ];

  // Set default values with the correct types to match Plan requirements
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      price: 0,
      isActive: true,
      isDefault: false,
      features: defaultFeatures,
    },
  });

  const handleSubmit = (values: FormValues) => {
    // FormValues now exactly matches Omit<Plan, 'id'>, since all fields are required
    onSubmit(values);
    form.reset();
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
              {defaultFeatures.map((feature, index) => (
                <FormField
                  key={feature.id}
                  control={form.control}
                  name={`features.${index}.included`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <FormLabel className="m-0">
                        {form.getValues().features[index].name}
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanFormDialog;
