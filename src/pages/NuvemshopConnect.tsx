import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { useNuvemshopCodeExtractor } from '@/components/Nuvemshop/hooks/useNuvemshopCodeExtractor';
import { useNuvemshopStore } from '@/contexts/NuvemshopStoreContext';
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

  const { activeStoreId, stores, refetch } = useNuvemshopStore();
  const storeId = activeStoreId;
  
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
  } = useNuvemshopProducts(storeId);

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

  // Auto-refetch stores after successful authentication
  useEffect(() => {
    if (success && stores.length === 0) {
      toast({
        title: 'Sincronizando lojas...',
        description: 'Carregando dados da sua loja Nuvemshop.',
      });
      setTimeout(() => {
        refetch();
      }, 1000);
    }
  }, [success, stores.length, refetch, toast]);

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

  const handleSyncStores = async () => {
    toast({
      title: 'Sincronizando...',
      description: 'Recarregando dados das lojas.',
    });
    await refetch();
    
    if (stores.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Nenhuma loja encontrada',
        description: 'Tente reconectar sua conta Nuvemshop.',
      });
    } else {
      toast({
        title: 'Sincronização concluída',
        description: `${stores.length} loja(s) encontrada(s).`,
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Integração com Nuvemshop</h1>
      
      {/* Show sync warning if connected but no stores */}
      {success && stores.length === 0 && !loading && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-amber-800 font-medium">Loja não sincronizada</h3>
              <p className="text-amber-700 text-sm">
                Sua conta está conectada, mas os dados da loja não foram carregados.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSyncStores}
                className="px-3 py-1 bg-amber-100 text-amber-800 rounded text-sm hover:bg-amber-200"
              >
                Sincronizar
              </button>
              <button
                onClick={handleDirectConnect}
                className="px-3 py-1 bg-amber-600 text-white rounded text-sm hover:bg-amber-700"
              >
                Reconectar
              </button>
            </div>
          </div>
        </div>
      )}
      
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
