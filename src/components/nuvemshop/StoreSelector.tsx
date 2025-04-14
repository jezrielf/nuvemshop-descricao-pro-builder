
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
import { Loader2 } from 'lucide-react';

interface StoreSelectorProps {
  onSelect: (storeId: number) => void;
  value?: number;
}

export const StoreSelector: React.FC<StoreSelectorProps> = ({ onSelect, value }) => {
  const { data: stores, isLoading, error } = useQuery({
    queryKey: ['nuvemshop-stores'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_nuvemshop_stores');
      if (error) throw error;
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 h-10 px-3 text-sm text-gray-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Carregando lojas...
      </div>
    );
  }

  if (error) {
    console.error('Error loading stores:', error);
    return null;
  }

  if (!stores || stores.length === 0) {
    return null;
  }

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
