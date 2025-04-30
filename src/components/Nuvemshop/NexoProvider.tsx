
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNuvemshopAuth } from './hooks/useNuvemshopAuth';
import { useNimbusUI } from './NimbusProvider';
import { useToast } from '@/hooks/use-toast';

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
}

const NexoContext = createContext<NexoContextType>({
  nexo: null,
  isNexoLoaded: false,
  nexoError: null,
  isInitializing: false,
  retryLoading: () => {}
});

export const useNexo = () => useContext(NexoContext);

export const NexoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nexo, setNexo] = useState<any | null>(null);
  const [isNexoLoaded, setIsNexoLoaded] = useState(false);
  const [nexoError, setNexoError] = useState<Error | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { accessToken, userId } = useNuvemshopAuth();
  const { useNimbusUI: isNimbusUIActive } = useNimbusUI();
  const { toast } = useToast();
  
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 3000; // 3 seconds

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
          
          // Initialize Nexo if we have authentication
          if (accessToken && userId) {
            initializeNexo();
          }
        }
        setIsInitializing(false);
      };
      script.onerror = (error) => {
        console.error('Failed to load Nexo SDK:', error);
        setNexoError(new Error('Failed to load Nexo SDK'));
        setIsInitializing(false);
        
        // Auto-retry logic with exponential backoff
        if (retryCount < MAX_RETRIES) {
          toast({
            title: 'Problemas ao carregar Nexo SDK',
            description: `Tentando novamente em ${RETRY_DELAY/1000} segundos...`,
          });
          
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            retryLoading();
          }, RETRY_DELAY);
        }
      };
      
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error loading Nexo SDK:', error);
      setNexoError(error instanceof Error ? error : new Error('Unknown error loading Nexo SDK'));
      setIsInitializing(false);
    }
  };

  const initializeNexo = () => {
    if (!window.Nexo) return;
    
    try {
      setIsInitializing(true);
      
      // Initialize Nexo with authentication information and theme preference
      window.Nexo.init({
        token: accessToken,
        storeId: userId,
        theme: isNimbusUIActive ? 'nimbus' : 'default'
      });
      
      console.log('Nexo initialized with credentials');
      toast({
        title: 'Nexo inicializado',
        description: 'Integração com Nuvemshop está pronta para uso.',
      });
      
      setIsInitializing(false);
    } catch (error) {
      console.error('Error initializing Nexo:', error);
      setNexoError(error instanceof Error ? error : new Error('Error initializing Nexo'));
      setIsInitializing(false);
      
      // Show error to user
      toast({
        variant: 'destructive',
        title: 'Erro na inicialização do Nexo',
        description: 'Verifique suas credenciais e tente novamente.',
      });
    }
  };

  // Function to retry loading the SDK
  const retryLoading = () => {
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

  // Handle authentication and theme changes
  useEffect(() => {
    // If Nexo is loaded and we have auth credentials, initialize it
    if (isNexoLoaded && accessToken && userId) {
      initializeNexo();
    }
  }, [accessToken, userId, isNimbusUIActive, isNexoLoaded]);

  return (
    <NexoContext.Provider value={{ 
      nexo, 
      isNexoLoaded, 
      nexoError, 
      isInitializing,
      retryLoading 
    }}>
      {children}
    </NexoContext.Provider>
  );
};

export default NexoProvider;
