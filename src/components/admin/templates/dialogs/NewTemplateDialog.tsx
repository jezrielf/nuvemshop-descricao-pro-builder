import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Template, ProductCategory } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { useTemplateStore } from '@/hooks/templates/useTemplateStore';

interface NewTemplateDialogProps {
  open: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().optional(),
  category: z.enum(['basic', 'supplements', 'shoes', 'electronics', 'health', 'fashion', 'accessories', 'hauteCouture', 'other']),
  thumbnailUrl: z.string().url('URL inválida').optional(),
});

export function NewTemplateDialog({ open, onClose }: NewTemplateDialogProps) {
  const { createTemplate } = useTemplateStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'other',
      thumbnailUrl: ''
    },
  });
  
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      await createTemplate({
        name: values.name,
        description: values.description,
        category: values.category as ProductCategory,
        blocks: [],
        thumbnailUrl: values.thumbnailUrl || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      toast({
        title: 'Template criado',
        description: 'O template foi criado com sucesso.',
      });
      
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: 'Erro ao criar template',
        description: 'Não foi possível criar o template. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Template</DialogTitle>
          <DialogDescription>
            Crie um novo template para usar nas suas descrições de produtos.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do template" {...field} />
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
                    <Input placeholder="Descrição do template" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="supplements">Suplementos</SelectItem>
                      <SelectItem value="shoes">Calçados</SelectItem>
                      <SelectItem value="electronics">Eletrônicos</SelectItem>
                      <SelectItem value="health">Saúde</SelectItem>
                      <SelectItem value="fashion">Moda</SelectItem>
                      <SelectItem value="accessories">Acessórios</SelectItem>
                      <SelectItem value="hauteCouture">Alta Costura</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thumbnailUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL da Thumbnail</FormLabel>
                  <FormControl>
                    <Input placeholder="URL da imagem de visualização" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Criando...' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
