
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { useUrlCodeExtractor } from '@/components/Nuvemshop/hooks/useUrlCodeExtractor';
import { AuthStatus } from '@/components/Nuvemshop/components/AuthStatus';
import { AuthenticationPanel } from '@/components/Nuvemshop/components/AuthenticationPanel';
import { ProductsTable } from '@/components/Nuvemshop/components/ProductsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const NuvemshopConnect: React.FC = () => {
  // Custom hooks for functionality
  const {
    loading,
    authenticating,
    error,
    success,
    accessToken,
    userId,
    testCode,
    setTestCode,
    handleConnect,
    handleTestCode,
    handleDisconnect,
    clearAuthCache,
    storeName,
    storeUrlName,
    setStoreUrlName
  } = useNuvemshopAuth();

  const {
    products,
    loadingProducts,
    updatingProduct,
    currentPage,
    totalProducts,
    totalPages,
    fetchProducts,
    updateProductDescription,
    handleNextPage,
    handlePrevPage,
    resetProducts
  } = useNuvemshopProducts(accessToken, userId);

  const {
    redirectUrl,
    setRedirectUrl,
    extractCodeFromUrl,
    extractCodeFromReferrer,
    copyToClipboard
  } = useUrlCodeExtractor();

  // Effect to try extracting code from referrer on load
  useEffect(() => {
    // Attempt to extract on initial load
    setTimeout(() => {
      const code = extractCodeFromReferrer();
      if (code) {
        setTestCode(code);
      }
    }, 1000);
  }, []);

  // Handlers
  const handleExtractCode = () => {
    const code = extractCodeFromUrl(redirectUrl);
    if (code) {
      setTestCode(code);
    }
  };

  const handleTestCodeClick = () => {
    handleTestCode(testCode);
  };

  const handleDisconnectClick = () => {
    handleDisconnect();
    resetProducts();
  };

  const handleUpdateDescription = async (productId: number, description: string) => {
    return await updateProductDescription(productId, description);
  };

  const handleDirectConnect = (e?: React.MouseEvent) => {
    // Prevent default event behavior if an event is passed
    if (e) {
      e.preventDefault();
    }
    
    // Limpar cache antes de conectar
    clearAuthCache(false);
    // Use the entered store name
    handleConnect();
  };

  const handleClearCache = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    clearAuthCache(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Integração com Nuvemshop</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status da Conexão</CardTitle>
            <CardDescription>
              Conecte sua loja Nuvemshop para importar produtos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <AuthStatus
                success={success}
                error={error}
                loading={loading}
                authenticating={authenticating}
                userId={userId}
                handleConnect={handleDirectConnect}
                handleDisconnect={handleDisconnectClick}
                onFetchProducts={() => fetchProducts(1)}
                loadingProducts={loadingProducts}
                storeName={storeName}
              />
              
              {!success && (
                <div className="mt-2">
                  <Button 
                    variant="outline"
                    onClick={handleClearCache}
                    className="text-yellow-600 border-yellow-300 bg-yellow-50 hover:bg-yellow-100"
                  >
                    Limpar Cache de Conexão
                  </Button>
                  
                  <div className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeUrlName">Nome da Loja (URL)</Label>
                      <div className="flex gap-2">
                        <Input
                          id="storeUrlName"
                          placeholder="minhaloja"
                          value={storeUrlName}
                          onChange={(e) => setStoreUrlName(e.target.value)}
                          className="max-w-md"
                        />
                        <Button
                          variant="default"
                          onClick={handleDirectConnect}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Conectar Loja Nuvemshop
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Insira o nome da sua loja que aparece na URL (ex: se sua loja é https://minhaloja.lojavirtualnuvem.com.br, digite "minhaloja")
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <AuthenticationPanel
                      redirectUrl={redirectUrl}
                      setRedirectUrl={setRedirectUrl}
                      extractCodeFromUrl={handleExtractCode}
                      testCode={testCode}
                      setTestCode={setTestCode}
                      handleTestCode={handleTestCodeClick}
                      authenticating={authenticating}
                      copyToClipboard={copyToClipboard}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {products.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Produtos da Loja</CardTitle>
              <CardDescription>
                Página {currentPage} - Exibindo {products.length} produtos 
                {totalProducts > 0 ? ` de aproximadamente ${totalProducts}` : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProductsTable
                products={products}
                loadingProducts={loadingProducts}
                updatingProduct={updatingProduct}
                currentPage={currentPage}
                totalPages={totalPages}
                totalProducts={totalProducts}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
                onUpdateDescription={handleUpdateDescription}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NuvemshopConnect;
