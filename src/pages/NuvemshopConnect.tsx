import React, { useEffect } from 'react';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { useNuvemshopCodeExtractor } from '@/components/Nuvemshop/hooks/useNuvemshopCodeExtractor';
import { ConnectionCard } from '@/components/Nuvemshop/components/connect/ConnectionCard';
import { ProductsCard } from '@/components/Nuvemshop/components/connect/ProductsCard';
import { useToast } from '@/hooks/use-toast';

const NuvemshopConnect: React.FC = () => {
  const { toast } = useToast();
  
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
    extractAndTestCode,
    copyToClipboard
  } = useNuvemshopCodeExtractor({
    setTestCode,
    handleTestCode: handleTestCodeClick
  });

  // Verificar se há código no URL e automaticamente processar
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const codeParam = query.get('code');
    
    if (codeParam && !success && !authenticating) {
      console.log("Código detectado no URL durante carregamento:", codeParam);
      setTestCode(codeParam);
      toast({
        title: 'Código encontrado',
        description: 'Um código de autorização foi detectado na URL.',
      });
    }
  }, []);

  // Handlers
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
    // Connect using the correct URL
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
        <ConnectionCard
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
          testCode={testCode}
          setTestCode={setTestCode}
          redirectUrl={redirectUrl}
          setRedirectUrl={setRedirectUrl}
          extractCodeFromUrl={extractAndTestCode}
          handleTestCode={handleTestCodeClick}
          copyToClipboard={copyToClipboard}
          handleClearCache={handleClearCache}
        />
        
        <ProductsCard
          products={products}
          loadingProducts={loadingProducts}
          updatingProduct={updatingProduct}
          currentPage={currentPage}
          totalPages={totalPages}
          totalProducts={totalProducts}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleUpdateDescription={handleUpdateDescription}
        />
      </div>
    </div>
  );
};

export default NuvemshopConnect;
