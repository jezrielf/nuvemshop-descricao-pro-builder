
import React, { useEffect } from 'react';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { useNuvemshopCodeExtractor } from '@/components/Nuvemshop/hooks/useNuvemshopCodeExtractor';
import { ConnectionCard } from '@/components/Nuvemshop/components/connect/ConnectionCard';
import { ProductsCard } from '@/components/Nuvemshop/components/connect/ProductsCard';
import { useToast } from '@/hooks/use-toast';

const NuvemshopConnect: React.FC = () => {
  const { toast } = useToast();
  
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

  const handleTestCodeClick = () => {
    if (testCode) {
      handleTestCode(testCode);
    }
  };

  const {
    redirectUrl,
    setRedirectUrl,
    extractAndTestCode,
    copyToClipboard
  } = useNuvemshopCodeExtractor({
    setTestCode,
    handleTestCode: handleTestCodeClick
  });

  // Handlers
  const handleDisconnectClick = () => {
    handleDisconnect();
    resetProducts();
  };

  const handleUpdateDescription = async (productId: number, description: string) => {
    return await updateProductDescription(productId, description);
  };

  const handleDirectConnect = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    clearAuthCache(false);
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
          extractCodeFromUrl={() => extractAndTestCode(redirectUrl)}
          handleTestCode={handleTestCodeClick}
          copyToClipboard={copyToClipboard}
          handleClearCache={handleClearCache}
        />
        
        {success && (
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
        )}
      </div>
    </div>
  );
};

export default NuvemshopConnect;
