
import { useState, useCallback } from 'react';
import { NuvemshopProduct, NuvemshopProductUpdatePayload } from '../types';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

export const useNuvemshopProducts = (accessToken?: string, userId?: string | number) => {
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const { toast } = useToast();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Reset products
  const resetProducts = useCallback(() => {
    setProducts([]);
  }, []);

  // Fetch products from Nuvemshop
  const fetchProducts = useCallback(async (page: number = 1, perPage: number = 50) => {
    if (!accessToken || !userId) {
      setProductError('Access token or user ID not available');
      return [];
    }

    try {
      setLoadingProducts(true);
      setProductError(null);

      const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
        body: { accessToken, userId, page, perPage }
      });

      if (error) {
        console.error('Error fetching Nuvemshop products:', error);
        setProductError(error.message);
        toast({
          variant: 'destructive',
          title: 'Erro ao buscar produtos',
          description: error.message,
        });
        return [];
      }

      if (Array.isArray(data)) {
        console.log(`Loaded ${data.length} products from Nuvemshop`);
        setProducts(data);
        return data;
      } else {
        console.error('Unexpected response format:', data);
        setProductError('Formato de resposta inesperado');
        toast({
          variant: 'destructive',
          title: 'Erro ao buscar produtos',
          description: 'Formato de resposta inesperado da API',
        });
        return [];
      }
    } catch (err) {
      console.error('Error in fetchProducts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setProductError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Erro ao buscar produtos',
        description: errorMessage,
      });
      return [];
    } finally {
      setLoadingProducts(false);
    }
  }, [accessToken, userId, supabase.functions, toast]);

  // Update product description in Nuvemshop
  const updateProductDescription = useCallback(async (productId: number, description: string) => {
    if (!accessToken || !userId) {
      setProductError('Access token or user ID not available');
      return false;
    }

    try {
      console.log(`Updating description for product ID: ${productId}`);
      
      const { data, error } = await supabase.functions.invoke('nuvemshop-update-product', {
        body: { 
          accessToken, 
          userId, 
          productId, 
          description 
        }
      });

      if (error) {
        console.error('Error updating product description:', error);
        toast({
          variant: 'destructive',
          title: 'Erro ao atualizar descrição',
          description: error.message,
        });
        return false;
      }

      console.log('Product description updated successfully:', data);
      
      // Update the local product data if available
      setProducts(prevProducts => 
        prevProducts.map(product => 
          product.id === productId 
            ? { ...product, description: { pt: description } } 
            : product
        )
      );
      
      return true;
    } catch (err) {
      console.error('Error in updateProductDescription:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar descrição',
        description: errorMessage,
      });
      return false;
    }
  }, [accessToken, userId, supabase.functions, toast]);

  return {
    products,
    loadingProducts,
    productError,
    fetchProducts,
    resetProducts,
    updateProductDescription
  };
};
