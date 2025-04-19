
// Helper functions for Nexo SDK

// Define types for Nexo responses
export interface NexoStoreInfo {
  id: string;
  name: string;
  url: string;
  country: string;
  language: string;
  currency: string;
}

export interface NexoNavigateSyncResponse {
  path: string;
  replace?: boolean;
}

// Helper functions for Nexo SDK
export const connect = async (nexoClient: any, timeout: number = 3000): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Set timeout for connection attempt
      const timeoutId = setTimeout(() => {
        reject(new Error('Tempo limite excedido ao conectar com o Nexo'));
      }, timeout);

      // Attempt to subscribe to a test action to verify connection
      const unsubscribe = nexoClient.subscribe('app/store/info', () => {
        clearTimeout(timeoutId);
        unsubscribe();
        resolve();
      });

      // Trigger a test action to verify connection
      nexoClient.publish('app/store/info', {});
    } catch (error) {
      reject(error);
    }
  });
};

export const iAmReady = (nexoClient: any): void => {
  try {
    nexoClient.publish('app/ready', {});
    console.log('Aplicativo Nexo pronto');
  } catch (error) {
    console.error('Erro ao notificar que o app está pronto:', error);
  }
};

export const getStoreInfo = async (nexoClient: any): Promise<NexoStoreInfo> => {
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = nexoClient.subscribe('app/store/info', (data: NexoStoreInfo) => {
        unsubscribe();
        resolve(data);
      });

      nexoClient.publish('app/store/info', {});
    } catch (error) {
      reject(error);
    }
  });
};

export const navigateExit = (nexoClient: any): void => {
  try {
    nexoClient.publish('app/navigate/exit', {});
  } catch (error) {
    console.error('Erro ao navegar para a saída:', error);
  }
};

export const syncPathname = (nexoClient: any, pathname: string): void => {
  try {
    nexoClient.publish('app/navigate/sync', { pathname });
  } catch (error) {
    console.error('Erro ao sincronizar pathname:', error);
  }
};

export const getSessionToken = async (nexoClient: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const unsubscribe = nexoClient.subscribe('app/auth/sessionToken', (data: { token: string }) => {
        unsubscribe();
        resolve(data.token);
      });

      nexoClient.publish('app/auth/sessionToken', {});
    } catch (error) {
      reject(error);
    }
  });
};
