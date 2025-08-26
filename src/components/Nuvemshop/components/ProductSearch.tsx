
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Package, RefreshCw, Users, Globe } from 'lucide-react';
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
  const [goToPageValue, setGoToPageValue] = useState('');
  const [isGlobalSearchActive, setIsGlobalSearchActive] = useState(false);
  const { accessToken, userId, clearAuthCache, handleConnect, success } = useNuvemshopAuth();
  const { description, getHtmlOutput } = useEditorStore();
  const { toast } = useToast();
  
  const {
    products,
    loadingProducts,
    error,
    fetchProducts,
    currentPage,
    totalPages,
    totalProducts,
    hasNext,
    hasPrev,
    pageSize,
    handleNextPage,
    handlePrevPage,
    setPageSizeAndRefetch,
    goToPage,
    searchAllProducts,
    searchingAll,
    allProductsForSearch,
    validateCredentials
  } = useNuvemshopProducts(accessToken, userId);

  const { handleSaveToNuvemshop } = useProductDescriptionSaver(accessToken, userId);

  // Handle reopening modal after reconnection
  useEffect(() => {
    if (success && sessionStorage.getItem('nuvemshop_reopen_selection') === '1') {
      sessionStorage.removeItem('nuvemshop_reopen_selection');
      setIsMultipleSelectionOpen(true);
      
      // Optional: validate credentials when reopening
      if (validateCredentials) {
        validateCredentials().then(result => {
          if (!result.ok) {
            toast({
              variant: 'destructive',
              title: 'Erro de autenticação',
              description: 'Verifique sua conexão com a Nuvemshop.',
            });
          }
        });
      }
    }
  }, [success, validateCredentials, toast]);

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

  // Enhanced search that includes all products when needed
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return isGlobalSearchActive ? allProductsForSearch : products;
    }

    const searchProducts = isGlobalSearchActive ? allProductsForSearch : products;
    const term = searchTerm.toLowerCase();

    return searchProducts.filter(product => {
      const productName = typeof product.name === 'string' 
        ? product.name 
        : (product.name?.pt || '');
      
      // Search in product name
      if (productName.toLowerCase().includes(term)) return true;
      
      // Search in product SKU
      if (product.sku && product.sku.toLowerCase().includes(term)) return true;
      
      // Search in product ID
      if (product.id.toString().includes(term)) return true;
      
      // Search in variant SKUs
      if (product.variants) {
        const hasVariantMatch = product.variants.some(variant => 
          variant.sku && variant.sku.toLowerCase().includes(term)
        );
        if (hasVariantMatch) return true;
      }
      
      return false;
    });
  }, [searchTerm, products, allProductsForSearch, isGlobalSearchActive]);

  // Auto-trigger global search when typing 3+ characters
  useEffect(() => {
    if (searchTerm.length >= 3 && !isGlobalSearchActive && allProductsForSearch.length === 0) {
      handleGlobalSearch();
    }
  }, [searchTerm, isGlobalSearchActive, allProductsForSearch.length]);

  const handleGlobalSearch = async () => {
    if (searchingAll) return;
    
    setIsGlobalSearchActive(true);
    await searchAllProducts();
    
    toast({
      title: "Busca global ativada",
      description: "Agora você pode buscar em todos os produtos da loja",
    });
  };

  const handleProductClick = (product: NuvemshopProduct) => {
    onProductSelect(product);
    setIsOpen(false);
  };

  // REFACTORED: Handle applying description to multiple products - SEQUENTIAL PROCESSING
  const handleApplyToMultipleProducts = async (
    productIds: number[], 
    onStatusChange?: (productId: number, status: 'pending' | 'success' | 'error', message?: string) => void
  ) => {
    console.log('=== INICIANDO ATUALIZAÇÃO MÚLTIPLA (SEQUENCIAL) ===');
    console.log('IDs dos produtos:', productIds);
    
    if (!productIds.length) {
      console.error('❌ Nenhum produto selecionado');
      throw new Error('Nenhum produto selecionado para atualização');
    }

    if (!products.length) {
      console.error('❌ Lista de produtos vazia');
      throw new Error('Lista de produtos não carregada');
    }

    // Validate credentials ONCE before starting
    console.log('🔐 Validando credenciais antes de iniciar...');
    try {
      const validation = await validateCredentials();
      if (!validation.ok) {
        console.error('❌ Validação falhou:', validation);
        if (validation.kind === 'AUTH_INVALID') {
          throw new Error('AUTH_INVALID');
        } else {
          throw new Error(validation.message || 'Erro ao validar credenciais');
        }
      }
      console.log('✅ Credenciais válidas');
    } catch (validationError) {
      console.error('💥 Erro na validação:', validationError);
      throw validationError;
    }

    // Process each product sequentially with detailed logging
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const progress = `${i + 1}/${productIds.length}`;
      
      console.log(`\n--- PRODUTO ${progress}: ID ${productId} ---`);
      
      // Find product in list
      const product = products.find(p => p.id === productId);
      if (!product) {
        const errorMsg = `Produto ${productId} não encontrado`;
        console.error('❌', errorMsg);
        onStatusChange?.(productId, 'error', errorMsg);
        errors.push(errorMsg);
        errorCount++;
        continue;
      }

      const productName = product.name && typeof product.name === 'object' && product.name.pt 
        ? product.name.pt 
        : (typeof product.name === 'string' ? product.name : `Produto ${productId}`);
      
      console.log(`📦 Processando: ${productName}`);
      
      // Update status to pending with product name
      onStatusChange?.(productId, 'pending', `Atualizando ${productName}...`);
      
      try {
        // Attempt to save the product
        console.log(`🚀 Chamando handleSaveToNuvemshop para produto ${productId}`);
        const success = await handleSaveToNuvemshop(product, false);
        
        if (success) {
          console.log(`✅ Produto ${productId} atualizado com sucesso`);
          onStatusChange?.(productId, 'success', 'Atualizado com sucesso');
          successCount++;
        } else {
          const errorMsg = 'Falha na atualização';
          console.error(`❌ ${errorMsg} para produto ${productId}`);
          onStatusChange?.(productId, 'error', errorMsg);
          errors.push(`${productName}: ${errorMsg}`);
          errorCount++;
        }
      } catch (error) {
        console.error(`💥 Erro no produto ${productId}:`, error);
        
        // Handle specific error types
        if (error instanceof Error) {
          if (error.message.includes('AUTH_INVALID')) {
            console.error('🔑 Token expirado detectado - parando atualização');
            onStatusChange?.(productId, 'error', 'Token expirado');
            throw new Error('AUTH_INVALID');
          }
          
          let errorMsg = 'Erro desconhecido';
          if (error.message.includes('RATE_LIMIT')) {
            errorMsg = 'Limite de requisições';
          } else if (error.message.includes('VALIDATION_ERROR')) {
            errorMsg = 'Erro de validação';
          } else {
            errorMsg = error.message;
          }
          
          onStatusChange?.(productId, 'error', errorMsg);
          errors.push(`${productName}: ${errorMsg}`);
          errorCount++;
        } else {
          onStatusChange?.(productId, 'error', 'Erro desconhecido');
          errors.push(`${productName}: Erro desconhecido`);
          errorCount++;
        }
      }
      
      // Add 1.5 second delay between products to prevent rate limiting
      if (i < productIds.length - 1) {
        console.log('⏱️ Aguardando 1.5 segundos antes do próximo produto...');
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }

    // Final summary
    console.log('\n=== RESUMO DA ATUALIZAÇÃO SEQUENCIAL ===');
    console.log(`Total processados: ${productIds.length}`);
    console.log(`✅ Sucessos: ${successCount}`);
    console.log(`❌ Erros: ${errorCount}`);
    
    if (errors.length > 0) {
      console.log('📋 Detalhes dos erros:', errors);
    }

    // Show final toast
    if (successCount > 0 && errorCount === 0) {
      toast({
        title: '🎉 Atualização concluída!',
        description: `Todos os ${successCount} produtos foram atualizados com sucesso.`,
      });
    } else if (successCount > 0 && errorCount > 0) {
      toast({
        title: '⚠️ Atualização parcial',
        description: `${successCount} produtos atualizados, ${errorCount} com erro.`,
        variant: 'default',
      });
    } else if (successCount === 0 && errorCount > 0) {
      toast({
        title: '❌ Atualização falhou',
        description: `Nenhum produto foi atualizado. ${errorCount} erros encontrados.`,
        variant: 'destructive',
      });
    }

    console.log('🏁 Atualização múltipla finalizada');
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
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loadingProducts}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loadingProducts ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
                
                <div className="flex items-center gap-1">
                  <label className="text-sm font-medium">Por página:</label>
                  <select 
                    value={pageSize} 
                    onChange={(e) => setPageSizeAndRefetch(Number(e.target.value) as 50 | 100 | 200)}
                    className="text-sm border border-input rounded px-2 py-1 bg-background"
                    disabled={loadingProducts}
                  >
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-1">
                  <label className="text-sm font-medium">Ir para:</label>
                  <input 
                    type="number" 
                    min="1" 
                    max={totalPages}
                    value={goToPageValue}
                    onChange={(e) => setGoToPageValue(e.target.value)}
                    className="text-sm border border-input rounded px-2 py-1 bg-background w-16"
                    placeholder="1"
                    disabled={loadingProducts}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const pageNum = parseInt(goToPageValue);
                      if (pageNum && pageNum >= 1 && pageNum <= totalPages) {
                        goToPage(pageNum);
                        setGoToPageValue('');
                      }
                    }}
                    disabled={loadingProducts || !goToPageValue}
                  >
                    Ir
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMultipleSelectionOpen(true)}
                  disabled={loadingProducts || products.length === 0}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Seleção Múltipla
                </Button>
                
                {!isGlobalSearchActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGlobalSearch}
                    disabled={searchingAll || loadingProducts}
                  >
                    <Globe className={`h-4 w-4 mr-2 ${searchingAll ? 'animate-spin' : ''}`} />
                    Buscar em Todos
                  </Button>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={isGlobalSearchActive ? "Buscar em todos os produtos..." : "Buscar por nome ou SKU..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {isGlobalSearchActive && (
                <Badge variant="secondary" className="absolute right-2 top-2">
                  <Globe className="h-3 w-3 mr-1" />
                  Global
                </Badge>
              )}
            </div>

            {/* Search status */}
            {searchingAll && (
              <div className="text-center p-4 bg-blue-50 rounded-md">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm text-blue-600">Carregando todos os produtos para busca...</p>
              </div>
            )}

            {isGlobalSearchActive && !searchingAll && (
              <div className="text-center p-2 bg-green-50 rounded-md">
                <p className="text-sm text-green-600">
                  Buscando em {allProductsForSearch.length} produtos • Inclui variantes e SKUs
                </p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center p-4 text-red-600 bg-red-50 rounded-md">
                <p>Erro ao carregar produtos: {error}</p>
                <div className="flex gap-2 justify-center mt-2">
                  <Button variant="outline" onClick={handleRefresh}>
                    Tentar novamente
                  </Button>
                  {(error.includes('Token inválido') || error.includes('Unauthorized') || error.includes('Invalid access token')) && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        clearAuthCache(false);
                        handleConnect();
                      }}
                    >
                      Reconectar loja
                    </Button>
                  )}
                </div>
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
            {!loadingProducts && !searchingAll && filteredProducts.length === 0 && (products.length > 0 || allProductsForSearch.length > 0) && (
              <div className="text-center p-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum produto encontrado para "{searchTerm}"</p>
                {!isGlobalSearchActive && searchTerm.length >= 3 && (
                  <Button variant="outline" onClick={handleGlobalSearch} className="mt-2">
                    <Globe className="h-4 w-4 mr-2" />
                    Buscar em todos os produtos
                  </Button>
                )}
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

            {/* Products count and pagination info */}
            {!loadingProducts && !searchingAll && (
              <div className="text-center text-sm text-gray-500">
                {isGlobalSearchActive ? (
                  <>Mostrando {filteredProducts.length} de {allProductsForSearch.length} produtos (Busca Global)</>
                ) : (
                  <>Mostrando {products.length} de {totalProducts} produtos (Página {currentPage} de {totalPages})</>
                )}
              </div>
            )}

            {/* Pagination - only show when not in global search mode */}
            {!loadingProducts && !searchingAll && !isGlobalSearchActive && products.length > 0 && totalPages > 1 && (
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={handlePrevPage}
                  disabled={!hasPrev}
                >
                  Anterior
                </Button>
                <span className="text-sm text-gray-500">
                  Página {currentPage} de {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  onClick={handleNextPage}
                  disabled={!hasNext}
                >
                  Próxima
                </Button>
              </div>
            )}

            {/* Global search controls */}
            {isGlobalSearchActive && !searchingAll && (
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsGlobalSearchActive(false);
                    setSearchTerm('');
                  }}
                >
                  Voltar à navegação por páginas
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Multiple product selection dialog */}
      <MultipleProductSelection
        products={isGlobalSearchActive ? allProductsForSearch : products}
        isOpen={isMultipleSelectionOpen}
        onClose={() => setIsMultipleSelectionOpen(false)}
        onApplyToProducts={handleApplyToMultipleProducts}
        onReconnect={() => {
          sessionStorage.setItem('nuvemshop_reopen_selection', '1');
          setIsMultipleSelectionOpen(false);
          clearAuthCache(false);
          handleConnect();
        }}
        description={description ? getHtmlOutput() : ''}
        getHtmlOutput={getHtmlOutput}
      />
    </>
  );
};

export default ProductSearch;
