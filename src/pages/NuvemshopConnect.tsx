
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { useUrlCodeExtractor } from '@/components/Nuvemshop/hooks/useUrlCodeExtractor';
import { AuthStatus } from '@/components/Nuvemshop/components/AuthStatus';
import { AuthenticationPanel } from '@/components/Nuvemshop/components/AuthenticationPanel';
import { ProductsTable } from '@/components/Nuvemshop/components/ProductsTable';

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
    handleDisconnect
  } = useNuvemshopAuth();

  const {
    products,
    loadingProducts,
    currentPage,
    totalProducts,
    totalPages,
    fetchProducts,
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
            <AuthStatus
              success={success}
              error={error}
              loading={loading}
              authenticating={authenticating}
              userId={userId}
              handleConnect={handleConnect}
              handleDisconnect={handleDisconnectClick}
              onFetchProducts={() => fetchProducts(1)}
              loadingProducts={loadingProducts}
            />
            
            {!success && (
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
            )}
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
                currentPage={currentPage}
                totalPages={totalPages}
                totalProducts={totalProducts}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NuvemshopConnect;
