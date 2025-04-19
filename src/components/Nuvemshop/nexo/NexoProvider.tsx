
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
  const [initAttempt, setInitAttempt] = useState(0);
  const maxInitAttempts = 3;

  // Função para verificar se estamos executando dentro do Nexo
  const checkIfNexoEnvironment = () => {
    const url = window.location.href.toLowerCase();
    
    // Verificar vários padrões de URL que podem indicar ambiente Nexo
    return (
      typeof window !== 'undefined' && 
      (url.includes('mystore.nuvemshop.com.br') || 
       url.includes('mystore.tiendanube.com') ||
       url.includes('lojavirtualnuvem.com.br') ||
       url.includes('admin/v2/apps/17194') ||
       url.includes('admin/apps/17194') ||
       url.includes('nimbus-app'))
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
          console.log("Não estamos em ambiente Nexo. Pulando inicialização do SDK.");
          // Não estamos no ambiente Nexo, então finalizamos carregamento
          setIsLoading(false);
          return;
        }

        // Verificamos se o objeto Nexo está disponível no escopo global (window)
        if (typeof window !== 'undefined' && 'Nexo' in window) {
          console.log(`Tentativa ${initAttempt + 1}/${maxInitAttempts} de inicializar Nexo...`);
          
          try {
            // @ts-ignore - O tipo global Nexo não está definido no TypeScript
            const nexoClient = await window.Nexo.initialize();
            
            try {
              // Obter informações do app, loja e usuário
              const appData = await nexoClient.app.getInfo();
              const storeData = await nexoClient.store.getInfo();
              const userData = await nexoClient.user.getInfo();
              const token = await nexoClient.auth.getAccessToken();
              
              console.log('Nexo inicializado com sucesso:', { app: appData, store: storeData });
              
              // Atualizar o estado
              setApp(appData);
              setStore(storeData);
              setUser(userData);
              setAccessToken(token);
              setError(null);
            } catch (nexoError) {
              console.error('Erro ao obter dados do Nexo:', nexoError);
              setError('Não foi possível obter informações da loja no painel Nuvemshop. Verifique suas permissões.');
            }
          } catch (initError) {
            console.error('Erro ao inicializar cliente Nexo:', initError);
            setError('Falha ao inicializar o cliente Nexo. Tente recarregar a página.');
            
            // Tenta novamente se ainda não atingiu o limite de tentativas
            if (initAttempt < maxInitAttempts - 1) {
              setTimeout(() => {
                setInitAttempt(prev => prev + 1);
              }, 2000);
            }
          }
        } else {
          console.log('Nexo SDK não disponível globalmente ou ainda não carregado.');
          
          if (initAttempt < maxInitAttempts - 1) {
            // Se estamos em ambiente Nexo mas o SDK ainda não foi carregado, tenta novamente
            setTimeout(() => {
              setInitAttempt(prev => prev + 1);
            }, 3000);
          } else {
            setError('SDK do Nexo não disponível após várias tentativas. Verifique se a aplicação está sendo executada dentro do painel Nuvemshop.');
          }
        }
      } catch (err) {
        console.error('Erro ao inicializar Nexo:', err);
        setError('Falha ao inicializar integração com o painel Nuvemshop. Tente recarregar a página.');
      } finally {
        if (initAttempt >= maxInitAttempts - 1 || !checkIfNexoEnvironment()) {
          setIsLoading(false);
        }
      }
    };

    initializeNexo();
  }, [initAttempt]);

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
