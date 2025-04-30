
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNuvemshopAuth } from './hooks/useNuvemshopAuth';

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
}

const NexoContext = createContext<NexoContextType>({
  nexo: null,
  isNexoLoaded: false,
  nexoError: null
});

export const useNexo = () => useContext(NexoContext);

export const NexoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nexo, setNexo] = useState<any | null>(null);
  const [isNexoLoaded, setIsNexoLoaded] = useState(false);
  const [nexoError, setNexoError] = useState<Error | null>(null);
  const { accessToken, userId } = useNuvemshopAuth();

  useEffect(() => {
    // Load Nexo SDK via script tag
    const loadNexoScript = () => {
      try {
        // Check if script already exists
        if (document.getElementById('nexo-sdk')) return;

        const script = document.createElement('script');
        script.id = 'nexo-sdk';
        script.src = 'https://storefronts.nuvemshop.com.br/nexo/nexo.js';
        script.async = true;
        script.onload = () => {
          console.log('Nexo SDK loaded successfully');
          if (window.Nexo) {
            setNexo(window.Nexo);
            setIsNexoLoaded(true);
            
            // Initialize Nexo if we have authentication
            if (accessToken && userId) {
              initializeNexo();
            }
          }
        };
        script.onerror = (error) => {
          console.error('Failed to load Nexo SDK:', error);
          setNexoError(new Error('Failed to load Nexo SDK'));
        };
        
        document.body.appendChild(script);
      } catch (error) {
        console.error('Error loading Nexo SDK:', error);
        setNexoError(error instanceof Error ? error : new Error('Unknown error loading Nexo SDK'));
      }
    };

    const initializeNexo = () => {
      if (!window.Nexo) return;
      
      try {
        // Initialize Nexo with authentication information
        window.Nexo.init({
          token: accessToken,
          storeId: userId
        });
        
        console.log('Nexo initialized with credentials');
      } catch (error) {
        console.error('Error initializing Nexo:', error);
        setNexoError(error instanceof Error ? error : new Error('Error initializing Nexo'));
      }
    };

    loadNexoScript();
  }, [accessToken, userId]);

  return (
    <NexoContext.Provider value={{ nexo, isNexoLoaded, nexoError }}>
      {children}
    </NexoContext.Provider>
  );
};

export default NexoProvider;
