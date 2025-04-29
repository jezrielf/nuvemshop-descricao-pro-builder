
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNuvemshopProducts } from './useNuvemshopProducts';
import { NuvemshopProduct } from '../types';

export const useProductDescriptionSaver = (accessToken?: string, userId?: string | number) => {
  const [isSaving, setIsSaving] = useState(false);
  const { description, getHtmlOutput } = useEditorStore();
  const { updateProductDescription } = useNuvemshopProducts(accessToken, userId);
  const { toast } = useToast();

  const handleSaveToNuvemshop = async (product: NuvemshopProduct) => {
    if (!product || !description) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'É necessário ter uma descrição para salvar.',
      });
      return false;
    }

    try {
      setIsSaving(true);
      // Get product title from the selected product
      const productTitle = product.name && typeof product.name === 'object' && product.name.pt 
        ? product.name.pt 
        : (typeof product.name === 'string' ? product.name : '');
      
      // Generate HTML with product title as H1
      const htmlOutput = getHtmlOutput(productTitle);
      
      const success = await updateProductDescription(product.id, htmlOutput);
      
      if (success) {
        toast({
          title: 'Descrição salva',
          description: 'A descrição do produto foi atualizada na Nuvemshop com sucesso!',
        });
      }
      return success;
    } catch (error) {
      console.error('Erro ao salvar na Nuvemshop:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar a descrição na Nuvemshop.',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isSaving,
    handleSaveToNuvemshop
  };
};
