
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProductSelectorProps {
  storeId: number;
  onSelect: (productId: number) => void;
  value?: number;
}

export const ProductSelector: React.FC<ProductSelectorProps> = ({ 
  storeId, 
  onSelect, 
  value 
}) => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['nuvemshop-products', storeId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
          body: { storeId }
        });
        
        if (error) throw error;
        return data?.products || [];
      } catch (err) {
        console.error('Error fetching products:', err);
        throw err;
      }
    },
    enabled: !!storeId,
  });

  if (!storeId) return null;

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 h-10 px-3 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Carregando produtos...
      </div>
    );
  }

  if (error) {
    console.error('Error loading products:', error);
    return (
      <div className="text-sm text-red-500">
        Erro ao carregar produtos
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Nenhum produto encontrado
      </div>
    );
  }

  return (
    <Select
      value={value?.toString()}
      onValueChange={(value) => onSelect(parseInt(value))}
    >
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Selecionar produto" />
      </SelectTrigger>
      <SelectContent>
        {products.map((product: any) => (
          <SelectItem key={product.id} value={product.id.toString()}>
            {product.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
