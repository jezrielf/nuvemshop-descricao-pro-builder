
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface StoreSelectorProps {
  onSelect: (storeId: number) => void;
  value?: number;
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({ onSelect, value }) => {
  const { data: stores, isLoading } = useQuery({
    queryKey: ['nuvemshop-stores'],
    queryFn: async () => {
      const { data } = await supabase.rpc('get_nuvemshop_stores');
      return data || [];
    },
  });

  if (isLoading || !stores?.length) return null;

  return (
    <Select
      value={value?.toString()}
      onValueChange={(value) => onSelect(parseInt(value))}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecionar loja" />
      </SelectTrigger>
      <SelectContent>
        {stores.map((store: any) => (
          <SelectItem key={store.store_id} value={store.store_id.toString()}>
            {store.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
