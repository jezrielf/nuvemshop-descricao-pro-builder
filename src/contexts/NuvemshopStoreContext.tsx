import React, { createContext, useContext, ReactNode } from 'react';
import { useSecureStores } from '@/hooks/useSecureStores';

interface NuvemshopStoreContextValue {
  activeStoreId: string | null;
  stores: Array<{
    id: string;
    name: string;
    user_id: string;
    store_id: number;
    connected_at: string;
    platform: string;
    url: string;
    scope?: string;
  }>;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const NuvemshopStoreContext = createContext<NuvemshopStoreContextValue | undefined>(undefined);

interface NuvemshopStoreProviderProps {
  children: ReactNode;
}

export const NuvemshopStoreProvider: React.FC<NuvemshopStoreProviderProps> = ({ children }) => {
  const { stores, isLoading, error, refetch } = useSecureStores();
  
  // Get the first connected store as the active store
  // In a full implementation, you might allow users to select which store to use
  const activeStoreId = stores.length > 0 ? stores[0].id : null;

  const value: NuvemshopStoreContextValue = {
    activeStoreId,
    stores,
    isLoading,
    error,
    refetch,
  };

  return (
    <NuvemshopStoreContext.Provider value={value}>
      {children}
    </NuvemshopStoreContext.Provider>
  );
};

export const useNuvemshopStore = (): NuvemshopStoreContextValue => {
  const context = useContext(NuvemshopStoreContext);
  if (context === undefined) {
    throw new Error('useNuvemshopStore must be used within a NuvemshopStoreProvider');
  }
  return context;
};