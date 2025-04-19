
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definição dos tipos para o Nexo
interface NexoAppInfo {
  id: string;
  name: string;
}

interface NexoStoreInfo {
  id: number;
  name: string;
  url: string;
}

interface NexoUserInfo {
  id: number;
  name: string;
  email: string;
}

interface NexoContext {
  app: NexoAppInfo | null;
  store: NexoStoreInfo | null;
  user: NexoUserInfo | null;
  accessToken: string | null;
  isNexoEnabled: boolean;
  isLoading: boolean;
  error: string | null;
}

// Criando o contexto
const NexoContext = createContext<NexoContext>({
  app: null,
  store: null,
  user: null,
  accessToken: null,
  isNexoEnabled: false,
  isLoading: true,
  error: null
});

// Hook personalizado para acessar o contexto
export const useNexo = () => useContext(NexoContext);

interface NexoProviderProps {
  children: ReactNode;
}

// Componente Provider para o Nexo
export const NexoProvider: React.FC<NexoProviderProps> = ({ children }) => {
  const [app, setApp] = useState<NexoAppInfo | null>(null);
  const [store, setStore] = useState<NexoStoreInfo | null>(null);
  const [user, setUser] = useState<NexoUserInfo | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isNexoEnabled, setIsNexoEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para verificar se estamos executando dentro do Nexo
  const checkIfNexoEnvironment = () => {
    return (
      typeof window !== 'undefined' && 
      window.location.href.includes('mystore.nuvemshop.com.br') || 
      window.location.href.includes('nimbus-app')
    );
  };

  useEffect(() => {
    const initializeNexo = async () => {
      try {
        setIsLoading(true);
        
        // Verificar se estamos em ambiente Nexo
        const isNexoEnv = checkIfNexoEnvironment();
        setIsNexoEnabled(isNexoEnv);
        
        if (!isNexoEnv) {
          // Não estamos no ambiente Nexo, então finalizamos carregamento
          setIsLoading(false);
          return;
        }

        // Importar a SDK do Nexo dinamicamente
        const Nexo = await import('@tiendanube/nexo/sdk');
        
        // Inicializar o cliente Nexo
        const nexoClient = await Nexo.initialize();
        
        // Obter informações do app, loja e usuário
        const appData = await nexoClient.app.getInfo();
        const storeData = await nexoClient.store.getInfo();
        const userData = await nexoClient.user.getInfo();
        const token = await nexoClient.auth.getAccessToken();
        
        // Atualizar o estado
        setApp(appData);
        setStore(storeData);
        setUser(userData);
        setAccessToken(token);
        
      } catch (err) {
        console.error('Erro ao inicializar Nexo:', err);
        setError('Falha ao inicializar integração com o painel Nuvemshop');
      } finally {
        setIsLoading(false);
      }
    };

    initializeNexo();
  }, []);

  const value = {
    app,
    store,
    user,
    accessToken,
    isNexoEnabled,
    isLoading,
    error
  };

  return (
    <NexoContext.Provider value={value}>
      {children}
    </NexoContext.Provider>
  );
};
