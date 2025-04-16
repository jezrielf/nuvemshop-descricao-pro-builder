
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { NuvemshopProduct } from '../types';
import { useNuvemshopProducts } from '../hooks/useNuvemshopProducts';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { Spinner } from '@/components/ui/spinner';
import { useEditorStore } from '@/store/editor';
import { useToast } from '@/hooks/use-toast';

interface ProductSearchProps {
  onProductSelect?: (product: NuvemshopProduct) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onProductSelect }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { accessToken, userId, success: isConnected } = useNuvemshopAuth();
  const { toast } = useToast();
  
  const {
    products,
    loadingProducts,
    fetchProducts,
    resetProducts,
  } = useNuvemshopProducts(accessToken, userId);

  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const name = typeof product.name === 'string' 
      ? product.name.toLowerCase() 
      : (product.name?.pt?.toLowerCase() || '');
    
    const sku = product.sku?.toLowerCase() || '';
    
    return name.includes(searchLower) || sku.includes(searchLower);
  });

  // Load products when dialog opens if connected
  useEffect(() => {
    if (open && isConnected && products.length === 0) {
      fetchProducts(1);
    }
  }, [open, isConnected, products.length, fetchProducts]);

  // Clean up when dialog closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);

  const handleSelectProduct = (product: NuvemshopProduct) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
    setOpen(false);
  };

  const getProductNameDisplay = (product: NuvemshopProduct) => {
    return typeof product.name === 'string' 
      ? product.name 
      : (product.name?.pt || 'Produto sem nome');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Search className="h-4 w-4 mr-2" />
          Buscar produtos da Nuvemshop
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buscar produtos</DialogTitle>
        </DialogHeader>
        
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center p-4">
            <p className="text-center mb-4">
              Você precisa conectar sua loja Nuvemshop para buscar produtos.
            </p>
            <Button onClick={() => window.location.href = '/nuvemshop-connect'}>
              Conectar Nuvemshop
            </Button>
          </div>
        ) : (
          <Command>
            <CommandInput 
              placeholder="Busque por nome ou SKU..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            
            <CommandList>
              {loadingProducts ? (
                <div className="flex justify-center p-4">
                  <Spinner />
                </div>
              ) : products.length === 0 ? (
                <CommandEmpty>
                  Nenhum produto encontrado na sua loja.
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-2" 
                    onClick={() => fetchProducts(1)}
                  >
                    Recarregar produtos
                  </Button>
                </CommandEmpty>
              ) : (
                <>
                  <CommandEmpty>Nenhum produto corresponde à sua busca.</CommandEmpty>
                  <CommandGroup heading="Produtos">
                    {filteredProducts.map((product) => (
                      <CommandItem 
                        key={product.id}
                        value={getProductNameDisplay(product)}
                        onSelect={() => handleSelectProduct(product)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{getProductNameDisplay(product)}</span>
                          {product.sku && (
                            <span className="text-xs text-gray-500">SKU: {product.sku}</span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductSearch;
