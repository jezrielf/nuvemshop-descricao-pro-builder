
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NuvemshopProduct {
  id: number;
  name: Record<string, string>;
  description: Record<string, string>;
  images: Array<{
    id: number;
    src: string;
    position: number;
  }>;
  variants: Array<{
    id: number;
    price: string;
    promotional_price: string | null;
    stock: number;
    sku: string;
  }>;
  categories: Array<{
    id: number;
    name: Record<string, string>;
  }>;
  tags: string;
}

interface ProductListProps {
  products: NuvemshopProduct[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-6">
        {products.map(product => (
          <div key={product.id} className="space-y-4">
            <div className="flex items-start gap-4">
              {product.images?.[0] && (
                <img 
                  src={product.images[0].src} 
                  alt={product.name.pt || product.name.en} 
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {product.name.pt || product.name.en}
                </h3>
                <div className="text-sm text-muted-foreground mt-1">
                  ID: {product.id}
                </div>
                {product.variants?.[0] && (
                  <div className="flex gap-2 mt-2 text-sm">
                    <span className="font-medium">
                      R$ {product.variants[0].price}
                    </span>
                    {product.variants[0].promotional_price && (
                      <span className="text-green-600 font-medium">
                        Promo: R$ {product.variants[0].promotional_price}
                      </span>
                    )}
                    <span className="text-muted-foreground">
                      Estoque: {product.variants[0].stock}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-sm">
              <div className="font-medium mb-1">Descrição:</div>
              <div className="text-muted-foreground" 
                   dangerouslySetInnerHTML={{ __html: product.description.pt || product.description.en }} 
              />
            </div>
            
            {product.categories?.length > 0 && (
              <div className="text-sm">
                <span className="font-medium">Categorias: </span>
                {product.categories.map(cat => cat.name.pt || cat.name.en).join(', ')}
              </div>
            )}
            
            {product.tags && (
              <div className="text-sm">
                <span className="font-medium">Tags: </span>
                {product.tags}
              </div>
            )}
            
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
