
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getAuthData, storeAuthData, clearAuthData } from '../utils/authStorage';
import { 
  exchangeCodeForToken, 
  getNuvemshopAuthUrl, 
  detectAuthCode,
  clearAuthCodeFromUrl,
  testNuvemshopConnection
} from '../utils/authOperations';

export function useNuvemshopAuth() {
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [testCode, setTestCode] = useState('');
  const [storeName, setStoreName] = useState<string | null>(null);
  const [autoAuthTriggered, setAutoAuthTriggered] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing tokens on component mount
  useEffect(() => {
    const { accessToken: storedToken, userId: storedUserId, storeName: storedStoreName, isAuthenticated } = getAuthData();
    
    if (isAuthenticated) {
      setAccessToken(storedToken);
      setUserId(storedUserId);
      
      // Ensure store name is properly set
      if (storedStoreName && storedStoreName !== '[object Object]' && typeof storedStoreName === 'string') {
        setStoreName(storedStoreName);
      } else {
        // Fallback to a default name if the store name is invalid
        setStoreName('Loja Nuvemshop');
      }
      
      setSuccess(true);
      console.log("Autenticação restaurada do localStorage:", { storedToken, storedUserId, storedStoreName });
    } else {
      console.log("Sem autenticação armazenada, verificando código na URL");
      // Try auto authentication on mount
      tryAutoAuthentication();
    }
  }, []);

  // Auto authentication
  const tryAutoAuthentication = async () => {
    if (authenticating || success || autoAuthTriggered) return;
    
    setAutoAuthTriggered(true);
    const authCode = detectAuthCode();
    
    if (authCode) {
      console.log("Iniciando autenticação automática com código:", authCode);
      await processAuthCode(authCode);
      clearAuthCodeFromUrl();
    } else {
      console.log("Nenhum código de autorização detectado para autenticação automática");
    }
  };

  const processAuthCode = async (authCode: string) => {
    try {
      setAuthenticating(true);
      setError(null);
      
      console.log("Processando código de autorização:", authCode);
      
      // Test connection first
      const connectionTest = await testNuvemshopConnection();
      if (!connectionTest) {
        console.warn('Connection test failed, but proceeding with authentication');
      }
      
      const data = await exchangeCodeForToken(authCode);
      
      // Validate response data
      if (!data.access_token || !data.user_id) {
        throw new Error('Resposta inválida da Nuvemshop: dados de acesso não encontrados');
      }
      
      // Validate and sanitize store name
      let validStoreName = 'Loja Nuvemshop';
      if (data.store_name && typeof data.store_name === 'string' && data.store_name !== '[object Object]') {
        validStoreName = data.store_name;
      }
      
      // Store the access token, user ID, and store name
      setAccessToken(data.access_token);
      setUserId(data.user_id.toString());
      setStoreName(validStoreName);
      setSuccess(true);
      
      // Store in localStorage for persistence
      storeAuthData(data.access_token, data.user_id.toString(), validStoreName);
      
      toast({
        title: 'Loja conectada com sucesso!',
        description: `Sua loja ${validStoreName} foi conectada com sucesso.`,
      });
      
      return true;
    } catch (err: any) {
      console.error('Erro na autenticação:', err);
      
      // Provide user-friendly error messages
      let errorMessage = err.message;
      if (errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
      } else if (errorMessage.includes('NetworkError')) {
        errorMessage = 'Erro de rede. Tente novamente em alguns momentos.';
      }
      
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Erro ao conectar',
        description: errorMessage,
      });
      return false;
    } finally {
      setAuthenticating(false);
    }
  };

  const handleConnect = () => {
    setLoading(true);
    setError(null);
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
      return await processAuthCode(code);
    }
    return false;
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
    setLoading(false);
    setAutoAuthTriggered(false);
    
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
    tryAutoAuthentication
  };
}
