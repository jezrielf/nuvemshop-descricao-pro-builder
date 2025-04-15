
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface NuvemshopProduct {
  id: number;
  name: Record<string, string>;
}

interface ProductListProps {
  products: NuvemshopProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product => {
    const productName = product.name.pt || product.name.en;
    return productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {filteredProducts.map(product => (
            <div key={product.id} className="py-2">
              <div className="text-sm font-medium">
                {product.name.pt || product.name.en}
              </div>
              <Separator className="mt-2" />
            </div>
          ))}
          
          {filteredProducts.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              Nenhum produto encontrado
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
