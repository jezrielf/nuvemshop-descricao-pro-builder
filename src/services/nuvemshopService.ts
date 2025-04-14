
import { supabase } from '@/integrations/supabase/client';

export interface NuvemshopStore {
  id: number;
  name: string;
  url: string;
  accessToken: string;
  connectedAt: Date;
}

export interface NuvemshopProduct {
  id: number;
  name: string;
  description: string | null;
  handle: string;
  images: { id: number; src: string }[];
}

// Get authentication URL for Nuvemshop OAuth
export const getNuvemshopAuthUrl = async (): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('nuvemshop-auth-url', {
      body: {},
    });

    if (error) throw error;
    return data.authUrl;
  } catch (error) {
    console.error('Error getting Nuvemshop auth URL:', error);
    throw error;
  }
};

// Validate OAuth callback and get access token
export const handleNuvemshopCallback = async (code: string): Promise<NuvemshopStore> => {
  try {
    const { data, error } = await supabase.functions.invoke('nuvemshop-callback', {
      body: { code },
    });

    if (error) throw error;
    return data.store;
  } catch (error) {
    console.error('Error handling Nuvemshop callback:', error);
    throw error;
  }
};

// Get connected stores for the current user
export const getConnectedStores = async (): Promise<NuvemshopStore[]> => {
  try {
    // Use the rpc method to access tables that are not in the TypeScript types yet
    const { data, error } = await supabase.rpc('get_nuvemshop_stores');
    
    if (error) throw error;
    
    if (!data) return [];
    
    // Map the raw data to our interface format
    return data.map((store: any) => ({
      id: store.store_id,
      name: store.name,
      url: store.url,
      accessToken: store.access_token,
      connectedAt: new Date(store.connected_at),
    }));
  } catch (error) {
    console.error('Error getting connected stores:', error);
    return [];
  }
};

// Fetch products from a Nuvemshop store
export const fetchStoreProducts = async (storeId: number): Promise<NuvemshopProduct[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
      body: { storeId },
    });

    if (error) throw error;
    return data.products;
  } catch (error) {
    console.error('Error fetching Nuvemshop products:', error);
    return [];
  }
};

// Update a product description in Nuvemshop
export const updateProductDescription = async (
  storeId: number, 
  productId: number, 
  description: string
): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('nuvemshop-update-product', {
      body: { 
        storeId,
        productId,
        description,
      },
    });

    if (error) throw error;
    return data.success;
  } catch (error) {
    console.error('Error updating Nuvemshop product:', error);
    return false;
  }
};
