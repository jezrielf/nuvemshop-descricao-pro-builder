
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Package, RefreshCw, Users } from 'lucide-react';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { useNuvemshopProducts } from '../hooks/useNuvemshopProducts';
import { useProductDescriptionSaver } from '../hooks/useProductDescriptionSaver';
import { NuvemshopProduct } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import MultipleProductSelection from './MultipleProductSelection';

interface ProductSearchProps {
  onProductSelect: (product: NuvemshopProduct) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onProductSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMultipleSelectionOpen, setIsMultipleSelectionOpen] = useState(false);
  const { accessToken, userId } = useNuvemshopAuth();
  const { description, getHtmlOutput } = useEditorStore();
  const { toast } = useToast();
  
  const {
    products,
    loadingProducts,
    error,
    fetchProducts,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage
  } = useNuvemshopProducts(accessToken, userId);

  const { handleSaveToNuvemshop } = useProductDescriptionSaver(accessToken, userId);

  // Fetch products when dialog opens
  useEffect(() => {
    if (isOpen && accessToken && userId && products.length === 0) {
      fetchProducts(1);
    }
  }, [isOpen, accessToken, userId, fetchProducts, products.length]);

  // Manual refresh function
  const handleRefresh = () => {
    if (accessToken && userId) {
      fetchProducts(1); // Reset to first page
      toast({
        title: 'Lista atualizada',
        description: 'A lista de produtos foi atualizada.',
      });
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    const productName = typeof product.name === 'string' 
      ? product.name 
      : (product.name?.pt || '');
    
    return productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleProductClick = (product: NuvemshopProduct) => {
    onProductSelect(product);
    setIsOpen(false);
  };

  // Handle applying description to multiple products with improved error handling and progress tracking
  const handleApplyToMultipleProducts = async (productIds: number[]) => {
    if (!description) {
      throw new Error('Nenhuma descrição ativa para aplicar');
    }

    console.log('Iniciando aplicação para produtos:', productIds);
    console.log('Descrição atual:', description);

    const errors: Array<{ productId: number; error: string }> = [];
    
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        console.error(`Produto não encontrado para ID: ${productId}`);
        errors.push({ productId, error: 'Produto não encontrado' });
        continue;
      }
      
      try {
        console.log(`Processando produto ${i + 1}/${productIds.length}: ${productId}`);
        
        // Get product title for HTML generation
        const productTitle = product.name && typeof product.name === 'object' && product.name.pt 
          ? product.name.pt 
          : (typeof product.name === 'string' ? product.name : '');

        console.log(`Título do produto: ${productTitle}`);
        
        // Generate HTML output with product title
        const htmlOutput = getHtmlOutput(productTitle);
        console.log(`HTML gerado (primeiros 100 chars): ${htmlOutput.substring(0, 100)}...`);
        
        const success = await handleSaveToNuvemshop(product);
        
        if (!success) {
          console.error(`Falha ao salvar produto ${productId}`);
          errors.push({ productId, error: 'Falha ao salvar na Nuvemshop' });
        } else {
          console.log(`Produto ${productId} atualizado com sucesso`);
        }
      } catch (error) {
        console.error(`Erro ao processar produto ${productId}:`, error);
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        errors.push({ productId, error: errorMessage });
      }
    }

    // If there were errors, throw an error with details
    if (errors.length > 0) {
      const errorMessage = `Falha ao atualizar ${errors.length} de ${productIds.length} produto(s)`;
      console.error('Erros encontrados:', errors);
      throw new Error(errorMessage);
    }

    console.log(`Todos os ${productIds.length} produtos foram atualizados com sucesso`);
  };

  // Helper to render product name
  const renderProductName = (name: string | { pt?: string; [key: string]: string | undefined }) => {
    if (typeof name === 'string') {
      return name;
    } else if (name && typeof name === 'object' && 'pt' in name) {
      return name.pt || 'Produto sem nome';
    }
    return 'Produto sem nome';
  };

  if (!accessToken || !userId) {
    return (
      <div className="text-sm text-gray-500">
        Conecte sua conta Nuvemshop para buscar produtos
      </div>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Buscar Produtos
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produtos da Loja
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loadingProducts}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loadingProducts ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMultipleSelectionOpen(true)}
                  disabled={!description || products.length === 0}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Seleção Múltipla
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Error state */}
            {error && (
              <div className="text-center p-4 text-red-600 bg-red-50 rounded-md">
                <p>Erro ao carregar produtos: {error}</p>
                <Button variant="outline" onClick={handleRefresh} className="mt-2">
                  Tentar novamente
                </Button>
              </div>
            )}

            {/* Loading state */}
            {loadingProducts && (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Carregando produtos...</p>
              </div>
            )}

            {/* Products list */}
            {!loadingProducts && filteredProducts.length > 0 && (
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">
                            {renderProductName(product.name)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            ID: {product.id}
                          </Badge>
                        </div>
                        
                        {product.sku && (
                          <div className="text-sm text-gray-500">
                            SKU: {product.sku}
                          </div>
                        )}
                        
                        {product.price && (
                          <div className="text-sm font-medium text-green-600">
                            R$ {parseFloat(product.price.toString()).toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Empty state */}
            {!loadingProducts && filteredProducts.length === 0 && products.length > 0 && (
              <div className="text-center p-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum produto encontrado para "{searchTerm}"</p>
              </div>
            )}

            {/* No products */}
            {!loadingProducts && products.length === 0 && !error && (
              <div className="text-center p-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum produto encontrado na sua loja</p>
                <Button variant="outline" onClick={handleRefresh} className="mt-2">
                  Atualizar lista
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!loadingProducts && products.length > 0 && totalPages > 1 && (
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <span className="text-sm text-gray-500">
                  Página {currentPage} de {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Próxima
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Multiple product selection dialog */}
      <MultipleProductSelection
        products={products}
        isOpen={isMultipleSelectionOpen}
        onClose={() => setIsMultipleSelectionOpen(false)}
        onApplyToProducts={handleApplyToMultipleProducts}
      />
    </>
  );
};

export default ProductSearch;
