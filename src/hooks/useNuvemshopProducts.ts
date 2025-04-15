
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useNuvemshopProducts = (selectedStoreId: number | null) => {
  const { toast } = useToast();
  
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<number[]>([]);

  const handleProductSelect = (productId: number) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
    } else {
      setSelectedProductIds(prev => [...prev, productId]);
    }
    setUpdateSuccess([]);
  };

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['nuvemshop-products', selectedStoreId],
    queryFn: async () => {
      try {
        if (!selectedStoreId) return [];
        const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
          body: { storeId: selectedStoreId }
        });
        
        if (error) throw error;
        return data?.products || [];
      } catch (err) {
        console.error('Error fetching products:', err);
        toast({
          title: "Erro ao carregar produtos",
          description: "Não foi possível carregar os produtos da loja selecionada.",
          variant: "destructive",
        });
        throw err;
      }
    },
    enabled: !!selectedStoreId,
  });

  return {
    products,
    isLoading,
    error,
    selectedProductIds,
    setSelectedProductIds,
    isUpdating,
    setIsUpdating,
    updateSuccess,
    setUpdateSuccess,
    handleProductSelect
  };
};
