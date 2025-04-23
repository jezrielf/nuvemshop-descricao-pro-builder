
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getAuthData, storeAuthData, clearAuthData } from '../utils/authStorage';
import { exchangeCodeForToken, getNuvemshopAuthUrl } from '../utils/authOperations';

export function useNuvemshopAuth() {
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [testCode, setTestCode] = useState('');
  const [storeName, setStoreName] = useState<string | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing tokens on component mount
  useEffect(() => {
    const { accessToken: storedToken, userId: storedUserId, storeName: storedStoreName, isAuthenticated } = getAuthData();
    
    if (isAuthenticated) {
      setAccessToken(storedToken);
      setUserId(storedUserId);
      setStoreName(storedStoreName);
      setSuccess(true);
    }
  }, []);

  // Handle the redirect from Nuvemshop with the authorization code
  useEffect(() => {
    const handleAuthorizationCode = async () => {
      // Check for code in URL parameters
      const query = new URLSearchParams(location.search);
      const codeParam = query.get('code');
      
      if (codeParam && !authenticating && !success) {
        console.log("Código de autorização detectado na URL:", codeParam);
        await processAuthCode(codeParam);
        
        // Limpar o código da URL após processá-lo para evitar reprocessamento
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    };
    
    handleAuthorizationCode();
  }, [location.search, authenticating, success]);

  const processAuthCode = async (authCode: string) => {
    try {
      setAuthenticating(true);
      setError(null);
      
      const data = await exchangeCodeForToken(authCode);
      
      // Store the access token, user ID, and store name
      setAccessToken(data.access_token);
      setUserId(data.user_id.toString());
      setStoreName(data.store_name || 'Loja Nuvemshop');
      setSuccess(true);
      
      // Store in localStorage for persistence
      storeAuthData(data.access_token, data.user_id.toString(), data.store_name || 'Loja Nuvemshop');
      
      toast({
        title: 'Loja conectada com sucesso!',
        description: 'Sua loja Nuvemshop foi conectada com sucesso.',
      });
    } catch (err: any) {
      console.error('Authentication error:', err);
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Erro ao conectar',
        description: err.message,
      });
    } finally {
      setAuthenticating(false);
    }
  };

  const handleConnect = () => {
    setLoading(true);
    // Limpar o cache antes de conectar
    clearAuthCache(false);
    // Redirect to Nuvemshop authorization URL
    const authUrl = getNuvemshopAuthUrl();
    console.log("Redirecionando para URL de autorização:", authUrl);
    window.location.href = authUrl;
  };
  
  const handleTestCode = async (code: string) => {
    if (code) {
      // Limpar cache antes de testar um novo código
      clearAuthCache(false);
      await processAuthCode(code);
    }
  };
  
  const handleDisconnect = () => {
    // Clear stored tokens and store name
    clearAuthCache(false);
    
    toast({
      title: 'Loja desconectada',
      description: 'Sua loja Nuvemshop foi desconectada com sucesso.',
    });
  };

  const clearAuthCache = (showNotification = true) => {
    // Clear all Nuvemshop related items from localStorage
    clearAuthData();
    
    // Reset state
    setAccessToken(null);
    setUserId(null);
    setStoreName(null);
    setSuccess(false);
    setError(null);
    
    if (showNotification) {
      toast({
        title: 'Cache limpo',
        description: 'O cache de conexão com a Nuvemshop foi limpo com sucesso.',
      });
    }
  };

  return {
    loading,
    authenticating,
    error,
    success,
    accessToken,
    userId,
    testCode,
    setTestCode,
    processAuthCode,
    handleConnect,
    handleTestCode,
    handleDisconnect,
    clearAuthCache,
    storeName,
    resetStoreUrlName: () => {} // Function kept for API compatibility
  };
}
