
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
  const { data: products, isLoading } = useQuery({
    queryKey: ['nuvemshop-products', storeId],
    queryFn: async () => {
      const { data } = await supabase.functions.invoke('nuvemshop-products', {
        body: { storeId }
      });
      return data?.products || [];
    },
    enabled: !!storeId,
  });

  if (isLoading || !products?.length) return null;

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
