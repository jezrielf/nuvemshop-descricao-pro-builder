import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NuvemshopProduct } from '../types';

export function useNuvemshopProducts(accessToken: string | null, userId: string | null) {
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [perPage, setPerPage] = useState(200);
  const [totalPages, setTotalPages] = useState(1);
  
  const { toast } = useToast();

  const fetchProducts = async (page = 1) => {
    if (!accessToken || !userId) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Você precisa conectar sua loja primeiro.',
      });
      return;
    }
    
    try {
      setLoadingProducts(true);
      setCurrentPage(page);
      
      const { data, error: functionError } = await supabase.functions.invoke('nuvemshop-products', {
        body: { 
          accessToken, 
          userId,
          page,
          perPage
        },
      });
      
      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error(`Function error: ${functionError.message}`);
      }
      
      if (data.error) {
        console.error('API error:', data.error);
        throw new Error(data.error);
      }
      
      console.log('Products fetched:', data);
      
      // Process the fetched products
      const productsArray = Array.isArray(data) ? data : [];
      setProducts(productsArray);
      
      // Estimate total pages based on products returned
      // If we received less than perPage, we're likely on the last page
      if (productsArray.length < perPage) {
        setTotalProducts((page - 1) * perPage + productsArray.length);
        setTotalPages(page);
      } else {
        // Otherwise, estimate there's at least one more page
        setTotalProducts(page * perPage + 1);
        setTotalPages(page + 1);
      }
      
      toast({
        title: 'Produtos carregados',
        description: `${productsArray.length} produtos foram carregados da sua loja (página ${page}).`,
      });
    } catch (err: any) {
      console.error('Error fetching products:', err);
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar produtos',
        description: err.message,
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
    }
  };

  return {
    products,
    loadingProducts,
    currentPage,
    totalProducts,
    perPage,
    totalPages,
    fetchProducts,
    handleNextPage,
    handlePrevPage,
    resetProducts: () => {
      setProducts([]);
      setCurrentPage(1);
      setTotalProducts(0);
    }
  };
}
