import { useState, useCallback } from 'react';
import { NuvemshopProduct, NuvemshopProductUpdatePayload } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useNuvemshopProducts = (accessToken?: string, userId?: string | number) => {
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const [allProgress, setAllProgress] = useState({ loaded: 0, total: 0 });
  const { toast } = useToast();

  const resetProducts = () => {
    setProducts([]);
    setError(null);
    setCurrentPage(1);
    setTotalProducts(0);
    setTotalPages(0);
    setHasNext(false);
    setHasPrev(false);
    setLoadingProducts(false);
    setLoadingAll(false);
    setAllProgress({ loaded: 0, total: 0 });
  };

  // Handle pagination
  const handleNextPage = () => {
    if (hasNext) {
      const nextPage = currentPage + 1;
      fetchProducts(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (hasPrev) {
      const prevPage = currentPage - 1;
      fetchProducts(prevPage);
    }
  };

  const fetchProducts = async (page: number, perPage: number = 200) => {
    if (!accessToken || !userId) {
      console.log('No access token or user ID available');
      return;
    }

    setLoadingProducts(true);
    setError(null);
    
    try {
      console.log(`Fetching page ${page} with ${perPage} products per page`);
      
      const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
        body: {
          accessToken,
          userId,
          page,
          perPage
        }
      });

      if (error) {
        console.error('Error calling edge function:', error);
        throw new Error(`Edge function error: ${error.message}`);
      }

      if (data.error) {
        console.error('API Error:', data.error, data.details);
        
        // Special handling for rate limit
        if (data.details?.includes('429') || data.error.includes('rate limit')) {
          toast({
            title: "Limite de requisições atingido",
            description: "Aguarde um momento e tente novamente...",
            variant: "destructive",
          });
        }
        
        throw new Error(`API Error: ${data.error}`);
      }

      console.log('Received products data:', {
        items: data.items?.length || 0,
        page: data.page,
        total: data.total,
        totalPages: data.totalPages,
        hasNext: data.hasNext,
        hasPrev: data.hasPrev,
        links: data.links
      });

      // Update state with the new format
      setProducts(data.items || []);
      setCurrentPage(data.page || page);
      setTotalProducts(data.total || 0);
      setTotalPages(data.totalPages || 0);
      setHasNext(data.hasNext || false);
      setHasPrev(data.hasPrev || false);

      console.log('Updated state:', {
        productsCount: data.items?.length || 0,
        currentPage: data.page || page,
        totalProducts: data.total || 0,
        totalPages: data.totalPages || 0,
        hasNext: data.hasNext,
        hasPrev: data.hasPrev
      });

    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      toast({
        title: "Erro ao carregar produtos",
        description: err instanceof Error ? err.message : 'Erro desconhecido',
        variant: "destructive",
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  // Update product description in Nuvemshop
  const updateProductDescription = async (productId: number, description: string) => {
    if (!accessToken || !userId) {
      setError('Access token or user ID not available');
      return false;
    }

    try {
      console.log(`Updating description for product ID: ${productId}`);
      setUpdatingProduct(true);
      
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
  };

  // Function to load all products by iterating through pages with progress tracking
  const fetchAllProducts = async () => {
    if (!accessToken || !userId || loadingAll) {
      return;
    }

    setLoadingAll(true);
    setError(null);

    try {
      let allProducts: NuvemshopProduct[] = [];
      let currentFetchPage = 1;
      let hasMorePages = true;
      let retryCount = 0;
      const maxRetries = 3;
      let backoffDelay = 1000; // Start with 1 second

      console.log('Starting to load all products...');

      // Initialize progress tracking
      setAllProgress({ loaded: 0, total: totalProducts || 0 });

      while (hasMorePages) {
        console.log(`Fetching page ${currentFetchPage} for all products`);
        
        try {
          const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
            body: {
              accessToken,
              userId,
              page: currentFetchPage,
              perPage: 200 // Use maximum per page for efficiency
            }
          });

          if (error) {
            throw new Error(`Edge function error: ${error.message}`);
          }

          if (data.error) {
            // Handle rate limiting with exponential backoff
            if (data.details?.includes('429') || data.error.includes('rate limit')) {
              if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Rate limited. Retrying in ${backoffDelay}ms... (${retryCount}/${maxRetries})`);
                toast({
                  title: "Limite de requisições atingido",
                  description: `Tentando novamente em ${backoffDelay/1000}s...`,
                });
                await new Promise(resolve => setTimeout(resolve, backoffDelay));
                backoffDelay *= 2; // Exponential backoff
                continue;
              }
            }
            throw new Error(`API Error: ${data.error}`);
          }

          // Reset retry count on success
          retryCount = 0;
          backoffDelay = 1000;

          const pageProducts = data.items || [];
          allProducts = [...allProducts, ...pageProducts];
          
          // Update progress
          setAllProgress({ 
            loaded: allProducts.length, 
            total: data.total || totalProducts || allProducts.length 
          });
          
          console.log(`Loaded ${pageProducts.length} products from page ${currentFetchPage}. Total so far: ${allProducts.length}`);

          // Check if there are more pages
          hasMorePages = data.hasNext && currentFetchPage < data.totalPages;
          
          if (hasMorePages) {
            currentFetchPage++;
            // Add delay between requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        } catch (pageError) {
          if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Error on page ${currentFetchPage}. Retrying... (${retryCount}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, backoffDelay));
            backoffDelay *= 2;
            continue;
          } else {
            throw pageError;
          }
        }
      }

      console.log(`Finished loading all products. Total: ${allProducts.length}`);
      
      // Update the products state with all loaded products
      setProducts(allProducts);
      setCurrentPage(1); // Reset to first page since we're showing all
      setTotalProducts(allProducts.length);
      setHasNext(false);
      setHasPrev(false);
      
      toast({
        title: "Produtos carregados com sucesso",
        description: `Carregados ${allProducts.length} produtos no total`,
      });

    } catch (err) {
      console.error('Error loading all products:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      toast({
        title: "Erro ao carregar todos os produtos",
        description: err instanceof Error ? err.message : 'Erro desconhecido',
        variant: "destructive",
      });
    } finally {
      setLoadingAll(false);
      setAllProgress({ loaded: 0, total: 0 });
    }
  };

  // Alias for backward compatibility
  const loadAllProducts = fetchAllProducts;

  return {
    products,
    loadingProducts,
    updatingProduct,
    error,
    currentPage,
    totalProducts,
    totalPages,
    hasNext,
    hasPrev,
    fetchProducts,
    updateProductDescription,
    handleNextPage,
    handlePrevPage,
    resetProducts,
    fetchAllProducts,
    loadAllProducts, // alias
    loadingAll,
    loadingAllProducts: loadingAll, // alias for backward compatibility
    allProgress
  };
};