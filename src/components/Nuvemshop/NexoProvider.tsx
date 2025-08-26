
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNuvemshopAuth } from './hooks/useNuvemshopAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  isEmbeddedInNuvemshop, 
  getNuvemshopSessionToken, 
  getEmbeddedStoreId, 
  logEmbeddedEnvironmentInfo
} from './utils/embedUtils';

// Define the Nexo global object type
declare global {
  interface Window {
    Nexo?: any;
  }
}

interface NexoContextType {
  nexo: any | null;
  isNexoLoaded: boolean;
  nexoError: Error | null;
  isInitializing: boolean;
  retryLoading: () => void;
  isEmbedded: boolean;
  hasCertificateError: boolean;
}

const NexoContext = createContext<NexoContextType>({
  nexo: null,
  isNexoLoaded: false,
  nexoError: null,
  isInitializing: false,
  retryLoading: () => {},
  isEmbedded: false,
  hasCertificateError: false
});

export const useNexo = () => useContext(NexoContext);

export const NexoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nexo, setNexo] = useState<any | null>(null);
  const [isNexoLoaded, setIsNexoLoaded] = useState(false);
  const [nexoError, setNexoError] = useState<Error | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [embeddedStoreId, setEmbeddedStoreId] = useState<string | null>(null);
  const [hasCertificateError, setHasCertificateError] = useState(false);
  
  const { accessToken, userId } = useNuvemshopAuth();
  const { toast } = useToast();
  
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000; // 3 seconds

  // Detect embedded environment on mount
  useEffect(() => {
    const { isEmbedded, sessionToken, storeId } = logEmbeddedEnvironmentInfo();
    
    setIsEmbedded(isEmbedded);
    setSessionToken(sessionToken);
    setEmbeddedStoreId(storeId);
    
    if (isEmbedded) {
      console.log('[Nexo] Running in embedded Nuvemshop mode');
      
      if (sessionToken) {
        console.log('[Nexo] Session token found in URL');
      } else {
        console.warn('[Nexo] No session token found in embedded mode');
      }
    }
  }, []);

  // Function to detect certificate errors in error message
  const isCertificateError = (error: any): boolean => {
    const errorString = String(error);
    return errorString.includes('ERR_CERT_DATE_INVALID') || 
           errorString.includes('NET::ERR_CERT_AUTHORITY_INVALID') || 
           errorString.includes('SSL_ERROR_BAD_CERT_DOMAIN');
  };

  // Load Nexo SDK via script tag
  const loadNexoScript = () => {
    try {
      setIsInitializing(true);
      
      // Check if script already exists
      if (document.getElementById('nexo-sdk')) {
        setIsInitializing(false);
        return;
      }

      const script = document.createElement('script');
      script.id = 'nexo-sdk';
      script.src = 'https://storefronts.nuvemshop.com.br/nexo/nexo.js';
      script.async = true;
      script.onload = () => {
        console.log('Nexo SDK loaded successfully');
        if (window.Nexo) {
          setNexo(window.Nexo);
          setIsNexoLoaded(true);
          setNexoError(null);
          setHasCertificateError(false);
          
          // Initialize Nexo with the appropriate authentication method
          if (isEmbedded && sessionToken) {
            initializeNexoWithSessionToken();
          } else if (accessToken && userId) {
            initializeNexoWithOAuth();
          }
        }
        setIsInitializing(false);
      };
      script.onerror = (error) => {
        console.error('Failed to load Nexo SDK:', error);
        
        // Check if this is a certificate error
        const certError = isCertificateError(error);
        setHasCertificateError(certError);
        
        if (certError) {
          // Special handling for certificate errors
          setNexoError(new Error('Erro de certificado SSL ao carregar o SDK da Nuvemshop. O certificado do servidor pode estar expirado ou inválido.'));
          toast({
            variant: 'destructive',
            title: 'Erro de certificado SSL',
            description: 'Não foi possível carregar o SDK da Nuvemshop devido a um problema com o certificado SSL do servidor.',
          });
        } else {
          setNexoError(new Error('Failed to load Nexo SDK'));
        }
        
        setIsInitializing(false);
        
        // Auto-retry logic with exponential backoff (only for non-certificate errors)
        if (retryCount < MAX_RETRIES && !certError) {
          console.log(`🔄 Tentativa ${retryCount + 1}/${MAX_RETRIES} de carregar Nexo SDK`);
          
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            retryLoading();
          }, RETRY_DELAY * Math.pow(2, retryCount)); // Exponential backoff
        } else {
          console.log('❌ Máximo de tentativas atingido ou erro de certificado - parando tentativas');
        }
      };
      
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error loading Nexo SDK:', error);
      setNexoError(error instanceof Error ? error : new Error('Unknown error loading Nexo SDK'));
      setIsInitializing(false);
    }
  };

  // Initialize Nexo with OAuth token (for external access)
  const initializeNexoWithOAuth = () => {
    if (!window.Nexo) return;
    
    try {
      setIsInitializing(true);
      
      // Initialize Nexo with OAuth authentication information
      // Sempre usando o tema 'nimbus'
      window.Nexo.init({
        token: accessToken,
        storeId: userId,
        theme: 'nimbus'
      });
      
      console.log('Nexo initialized with OAuth credentials');
      toast({
        title: 'Nexo inicializado',
        description: 'Integração com Nuvemshop está pronta para uso.',
      });
      
      setIsInitializing(false);
    } catch (error) {
      console.error('Error initializing Nexo with OAuth:', error);
      setNexoError(error instanceof Error ? error : new Error('Error initializing Nexo with OAuth'));
      setIsInitializing(false);
      
      toast({
        variant: 'destructive',
        title: 'Erro na inicialização do Nexo',
        description: 'Verifique suas credenciais e tente novamente.',
      });
    }
  };

  // Initialize Nexo with session token (for embedded mode)
  const initializeNexoWithSessionToken = () => {
    if (!window.Nexo || !sessionToken) return;
    
    try {
      setIsInitializing(true);
      
      // Initialize Nexo with session token for embedded mode
      // Sempre usando o tema 'nimbus'
      window.Nexo.init({
        sessionToken: sessionToken,
        storeId: embeddedStoreId || userId,
        theme: 'nimbus'
      });
      
      console.log('Nexo initialized with session token in embedded mode');
      toast({
        title: 'Nexo inicializado (modo embarcado)',
        description: 'Integração com Nuvemshop está pronta para uso no admin.',
      });
      
      setIsInitializing(false);
    } catch (error) {
      console.error('Error initializing Nexo with session token:', error);
      setNexoError(error instanceof Error ? error : new Error('Error initializing Nexo with session token'));
      setIsInitializing(false);
      
      toast({
        variant: 'destructive',
        title: 'Erro na inicialização do Nexo (modo embarcado)',
        description: 'Não foi possível inicializar com o token de sessão.',
      });
    }
  };

  // Function to retry loading the SDK
  const retryLoading = () => {
    // Don't retry if we've reached max retries or if there's a certificate error
    if (retryCount >= MAX_RETRIES || hasCertificateError) {
      console.log('❌ Não é possível tentar novamente - limite atingido ou erro de certificado');
      return;
    }
    
    setNexoError(null);
    setIsNexoLoaded(false);
    
    // Remove the existing script if any
    const existingScript = document.getElementById('nexo-sdk');
    if (existingScript) {
      document.body.removeChild(existingScript);
    }
    
    // Try loading again
    loadNexoScript();
  };

  // Load the SDK on mount
  useEffect(() => {
    loadNexoScript();
  }, []);

  // Handle authentication changes
  useEffect(() => {
    // If Nexo is loaded and we have appropriate auth credentials, initialize it
    if (isNexoLoaded) {
      if (isEmbedded && sessionToken) {
        // For embedded mode, use session token
        initializeNexoWithSessionToken();
      } else if (accessToken && userId) {
        // For external access, use OAuth
        initializeNexoWithOAuth();
      }
    }
  }, [accessToken, userId, isNexoLoaded, isEmbedded, sessionToken]);

  return (
    <NexoContext.Provider value={{ 
      nexo, 
      isNexoLoaded, 
      nexoError, 
      isInitializing,
      retryLoading,
      isEmbedded,
      hasCertificateError
    }}>
      {children}
    </NexoContext.Provider>
  );
};

export default NexoProvider;
