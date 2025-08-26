
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNuvemshopProducts } from './useNuvemshopProducts';
import { NuvemshopProduct } from '../types';

export const useProductDescriptionSaver = (accessToken?: string, userId?: string | number) => {
  const [isSaving, setIsSaving] = useState(false);
  const { description, getHtmlOutput } = useEditorStore();
  const { updateProductDescription, validateCredentials } = useNuvemshopProducts(accessToken, userId);
  const { toast } = useToast();

  const handleSaveToNuvemshop = async (product: NuvemshopProduct, validateFirst: boolean = true) => {
    console.log(`🔄 handleSaveToNuvemshop chamado para produto ${product.id}`);
    
    if (!product || !description) {
      const errorMsg = 'Produto ou descrição não fornecidos';
      console.error('❌', errorMsg);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'É necessário ter uma descrição para salvar.',
      });
      return false;
    }

    try {
      setIsSaving(true);
      console.log(`📝 Iniciando salvamento para produto ${product.id}`, { validateFirst });

      // Validate credentials first if requested
      if (validateFirst && accessToken && userId) {
        console.log('🔐 Validando credenciais...');
        const validation = await validateCredentials();
        
        if (!validation.ok) {
          console.error('❌ Validação falhou:', validation);
          
          if (validation.kind === 'AUTH_INVALID') {
            const errorMsg = 'Token de acesso expirado';
            console.error('🔑', errorMsg);
            toast({
              variant: 'destructive',
              title: 'Token Expirado',
              description: 'Seu token de acesso expirou. Reconecte sua loja para continuar.',
            });
            throw new Error('AUTH_INVALID');
          } else {
            const errorMsg = validation.message || 'Erro na validação';
            console.error('⚠️', errorMsg);
            toast({
              variant: 'destructive',
              title: 'Erro de Validação',
              description: errorMsg,
            });
            throw new Error('VALIDATION_ERROR');
          }
        }
        console.log('✅ Credenciais válidas');
      }
      
      // Get product title from the selected product
      const productTitle = product.name && typeof product.name === 'object' && product.name.pt 
        ? product.name.pt 
        : (typeof product.name === 'string' ? product.name : '');
      
      console.log(`📄 Gerando HTML para produto: "${productTitle}"`);
      
      // Generate HTML with product title
      const htmlOutput = getHtmlOutput(productTitle);
      console.log(`📝 HTML gerado (${htmlOutput.length} caracteres)`);
      
      console.log(`🚀 Enviando para Nuvemshop - Produto ${product.id}`);
      const success = await updateProductDescription(product.id, htmlOutput);
      
      if (success) {
        console.log(`✅ Produto ${product.id} salvo com sucesso`);
        toast({
          title: 'Descrição salva',
          description: 'A descrição do produto foi atualizada na Nuvemshop com sucesso!',
        });
        return true;
      } else {
        console.error(`❌ Falha ao salvar produto ${product.id}`);
        return false;
      }
      
    } catch (error) {
      console.error(`💥 Erro ao salvar produto ${product.id}:`, error);
      
      // Re-throw specific errors for proper handling upstream
      if (error instanceof Error) {
        if (error.message.includes('AUTH_INVALID')) {
          console.error('🔑 Erro de autenticação detectado');
          throw new Error('AUTH_INVALID');
        } else if (error.message.includes('RATE_LIMIT')) {
          console.error('⏰ Rate limit detectado');
          throw new Error('RATE_LIMIT');
        } else if (error.message.includes('VALIDATION_ERROR')) {
          console.error('📋 Erro de validação detectado');
          throw new Error('VALIDATION_ERROR');
        }
      }
      
      // For unknown errors, show toast but don't re-throw in batch mode
      if (validateFirst) {
        toast({
          variant: 'destructive',
          title: 'Erro ao salvar',
          description: 'Não foi possível salvar a descrição na Nuvemshop.',
        });
      }
      
      throw error;
    } finally {
      setIsSaving(false);
      console.log(`🏁 Salvamento finalizado para produto ${product.id}`);
    }
  };

  return {
    isSaving,
    handleSaveToNuvemshop
  };
};
