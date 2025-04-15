
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const NUVEMSHOP_CLIENT_ID = "17194";
const NUVEMSHOP_SCOPES = "products";

// Schema para validação do domínio da loja
const storeFormSchema = z.object({
  storeDomain: z.string()
    .min(1, { message: "O domínio da loja é obrigatório" })
    .refine(
      (value) => /^[a-zA-Z0-9][a-zA-Z0-9-]*\.lojavirtualnuvem\.com\.br$/.test(value) || 
                 /^[a-zA-Z0-9][a-zA-Z0-9-]*\.mitiendanube\.com$/.test(value) ||
                 /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(value),
      {
        message: "Formato de domínio inválido. Use formato: loja.lojavirtualnuvem.com.br"
      }
    )
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

export const NuvemshopConnect: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  
  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeDomain: ""
    }
  });

  const handleConnect = async (values: StoreFormValues) => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para conectar sua loja.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Initiating Nuvemshop connection for user:', user.id);
      console.log('Store domain:', values.storeDomain);
      
      // Sanitize domain (remove protocol if present)
      let domain = values.storeDomain.trim();
      domain = domain.replace(/^https?:\/\//, '');
      domain = domain.replace(/\/$/, ''); // Remove trailing slash if present
      
      // Generate and save state for CSRF protection
      const state = uuidv4();
      const { error: stateError } = await supabase
        .from('nuvemshop_auth_states')
        .insert({ user_id: user.id, state });
        
      if (stateError) {
        console.error('Error saving auth state:', stateError);
        throw stateError;
      }

      // Build direct store app authorization URL
      const redirectUrl = `https://${domain}/admin/apps/${NUVEMSHOP_CLIENT_ID}/authorize?state=${state}`;
      
      console.log('Redirecting to Nuvemshop OAuth page:', redirectUrl);
      setOpen(false); // Close dialog before redirect
      window.location.href = redirectUrl;
    } catch (error) {
      console.error('Error initiating Nuvemshop connection:', error);
      toast({
        title: "Erro de conexão",
        description: "Não foi possível iniciar a conexão com a Nuvemshop.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Store className="h-4 w-4" />
          Conectar Nuvemshop
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Conectar loja Nuvemshop</DialogTitle>
          <DialogDescription>
            Insira o domínio da sua loja Nuvemshop para conectá-la ao Descrição Pro.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleConnect)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="storeDomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domínio da loja</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="minhaloja.lojavirtualnuvem.com.br" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Conectar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
