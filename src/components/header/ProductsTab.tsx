
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { NuvemshopConnect } from '@/components/nuvemshop/NuvemshopConnect';
import { StoreSelector } from '@/components/nuvemshop/StoreSelector';
import { ProductList } from '@/components/nuvemshop/ProductList';

interface ProductsTabProps {
  selectedStoreId: number | null;
  onStoreSelect: (storeId: number) => void;
  products: any[];
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  selectedStoreId,
  onStoreSelect,
  products
}) => {
  return (
    <div className="space-y-4">
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Visualize todos os produtos disponíveis na sua loja Nuvemshop.
        </AlertDescription>
      </Alert>
      
      <div className="flex items-center gap-4 mb-4">
        <StoreSelector onSelect={onStoreSelect} value={selectedStoreId || undefined} />
        <NuvemshopConnect />
      </div>
      
      {selectedStoreId && (
        <ProductList products={products || []} />
      )}
    </div>
  );
};
