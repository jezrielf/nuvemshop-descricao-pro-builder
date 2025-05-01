
import { useState, useEffect, useCallback } from 'react';
import { NuvemshopProduct } from '@/components/Nuvemshop/types';
import { analyzeProductSEO, ProductSEOResult } from '@/components/SEO/utils/productSeoUtils';
import { useToast } from '@/hooks/use-toast';

export interface ProductWithSEO extends NuvemshopProduct {
  seoAnalysis: ProductSEOResult | null;
  isAnalyzing: boolean;
}

export const useProductsSEOAnalysis = (products: NuvemshopProduct[]) => {
  const [productsWithSEO, setProductsWithSEO] = useState<ProductWithSEO[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedProduct, setSelectedProduct] = useState<ProductWithSEO | null>(null);
  const { toast } = useToast();
  
  // Initialize products with SEO structure
  useEffect(() => {
    if (products.length > 0) {
      const initialProductsWithSEO = products.map(product => ({
        ...product,
        seoAnalysis: null,
        isAnalyzing: false
      }));
      setProductsWithSEO(initialProductsWithSEO);
    }
  }, [products]);

  // Sort products by SEO score
  const sortedProducts = [...productsWithSEO].sort((a, b) => {
    const scoreA = a.seoAnalysis?.score || 0;
    const scoreB = b.seoAnalysis?.score || 0;
    
    return sortOrder === 'desc' ? scoreB - scoreA : scoreA - scoreB;
  });

  // Toggle sort order
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  }, []);

  // Analyze a single product
  const analyzeProduct = useCallback(async (product: ProductWithSEO) => {
    // Prevent re-analyzing if already has analysis
    if (product.isAnalyzing) return;

    // Update state to show analyzing
    setProductsWithSEO(prev => 
      prev.map(p => p.id === product.id ? { ...p, isAnalyzing: true } : p)
    );

    try {
      // Small delay to ensure UI updates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Perform analysis
      const analysis = analyzeProductSEO(product);
      
      // Update product with analysis
      setProductsWithSEO(prev => 
        prev.map(p => p.id === product.id ? { 
          ...p, 
          seoAnalysis: analysis, 
          isAnalyzing: false 
        } : p)
      );
      
      return analysis;
    } catch (error) {
      console.error('Error analyzing product:', error);
      toast({
        title: "Erro na análise",
        description: "Ocorreu um erro ao analisar o produto.",
        variant: "destructive"
      });
      
      // Reset analyzing state
      setProductsWithSEO(prev => 
        prev.map(p => p.id === product.id ? { ...p, isAnalyzing: false } : p)
      );
      return null;
    }
  }, [toast]);

  // Analyze all products
  const analyzeAllProducts = useCallback(() => {
    productsWithSEO.forEach(product => {
      if (!product.seoAnalysis && !product.isAnalyzing) {
        analyzeProduct(product);
      }
    });
  }, [productsWithSEO, analyzeProduct]);

  // Get analysis result for a specific product
  const getProductAnalysis = useCallback((productId: number) => {
    const product = productsWithSEO.find(p => p.id === productId);
    return product?.seoAnalysis || null;
  }, [productsWithSEO]);

  return {
    productsWithSEO,
    sortedProducts,
    sortOrder,
    selectedProduct,
    setSelectedProduct,
    toggleSortOrder,
    analyzeProduct,
    analyzeAllProducts,
    getProductAnalysis
  };
};
