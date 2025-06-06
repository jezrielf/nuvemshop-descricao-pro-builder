import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { useNuvemshopCodeExtractor } from '@/components/Nuvemshop/hooks/useNuvemshopCodeExtractor';
import { ConnectionCard } from '@/components/Nuvemshop/components/connect/ConnectionCard';
import { ProductsCard } from '@/components/Nuvemshop/components/connect/ProductsCard';
import { useToast } from '@/hooks/use-toast';
import { detectAuthCode, clearAuthCodeFromUrl } from '@/components/Nuvemshop/utils/authOperations';

const NuvemshopConnect: React.FC = () => {
  const navigate = useNavigate();
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
    tryAutoAuthentication
  } = useNuvemshopAuth();

  // Log store name for debugging
  useEffect(() => {
    console.log('NuvemshopConnect - Store name:', storeName);
  }, [storeName]);

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

  // Criando a função antes de usá-la
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

  // Auto authentication effect
  useEffect(() => {
    const attemptAutoAuth = async () => {
      // Check for auth code in URL or referrer
      const authCode = detectAuthCode();
      if (authCode && !success && !authenticating) {
        console.log("Tentando autenticação automática no carregamento da página");
        setTestCode(authCode);
        const authResult = await handleTestCode(authCode);
        clearAuthCodeFromUrl();
        
        // Se a autenticação foi bem-sucedida e estamos na página de conexão, redireciona para o editor
        if (authResult && window.location.pathname.includes('nuvemshop-connect')) {
          setTimeout(() => {
            navigate('/editor');
          }, 2000);
        }
      } else if (!success) {
        console.log("Nenhum código de autorização encontrado para autenticação automática");
      }
    };
    
    attemptAutoAuth();
  }, []);

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

  // Função para extrair código manualmente
  const extractCodeFromUrl = () => {
    if (redirectUrl) {
      extractAndTestCode(redirectUrl);
    }
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
          extractCodeFromUrl={extractCodeFromUrl}
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
