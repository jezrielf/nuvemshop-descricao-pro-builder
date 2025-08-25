
import { useState, useCallback } from 'react';
import { NuvemshopProduct, NuvemshopProductUpdatePayload } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useNuvemshopProducts = (storeId?: string) => {
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const { toast } = useToast();

  // Reset products
  const resetProducts = useCallback(() => {
    setProducts([]);
    setCurrentPage(1);
    setTotalPages(1);
    setTotalProducts(0);
  }, []);

  // Handle pagination
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProducts(nextPage);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchProducts(prevPage);
    }
  }, [currentPage]);

  // Fetch products from Nuvemshop via secure Edge Function
  const fetchProducts = useCallback(async (page: number = 1, perPage: number = 200) => {
    if (!storeId) {
      setProductError('Store ID not available');
      return [];
    }

    try {
      setLoadingProducts(true);
      setProductError(null);
      setCurrentPage(page);

      // Get current session for authorization
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase.functions.invoke('nuvemshop-api', {
        body: { 
          action: 'get_products',
          storeId: storeId,
          page, 
          perPage 
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
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
        
        // Estimate total pages based on product count
        const estimatedTotal = data.length === perPage ? perPage * 2 : data.length;
        setTotalProducts(estimatedTotal);
        setTotalPages(Math.ceil(estimatedTotal / perPage));
        
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
  }, [storeId, toast]);

  // Update product description via secure Edge Function
  const updateProductDescription = useCallback(async (productId: number, description: string) => {
    if (!storeId) {
      setProductError('Store ID not available');
      return false;
    }

    try {
      console.log(`Updating description for product ID: ${productId}`);
      setUpdatingProduct(true);
      
      // Get current session for authorization
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('User not authenticated');
      }
      
      const { data, error } = await supabase.functions.invoke('nuvemshop-api', {
        body: { 
          action: 'update_product',
          storeId: storeId,
          body: {
            productId, 
            description 
          }
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
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
      
      toast({
        title: 'Descrição atualizada',
        description: 'A descrição do produto foi atualizada com sucesso!',
      });
      
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
    } finally {
      setUpdatingProduct(false);
    }
  }, [storeId, toast]);

  return {
    products,
    loadingProducts,
    productError,
    updatingProduct,
    currentPage,
    totalPages,
    totalProducts,
    fetchProducts,
    resetProducts,
    updateProductDescription,
    handleNextPage,
    handlePrevPage
  };
};
