
import { useState } from 'react';
import { NuvemshopProduct } from '../types';
import { useEditorStore } from '@/store/editor';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { parseHtmlToBlocks } from '@/utils/htmlParsers';

export const useProductDescriptionLoader = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [conversionError, setConversionError] = useState(false);
  const { description, createNewDescription, loadDescription } = useEditorStore();
  const { toast } = useToast();

  const loadProductDescription = async (product: NuvemshopProduct) => {
    try {
      setIsImporting(true);
      setConversionError(false);
      
      const productName = typeof product.name === 'string' 
        ? product.name
        : (product.name?.pt || 'Novo Produto');
      
      createNewDescription(`Descrição: ${productName}`);
      
      if (product.description) {
        const htmlDescription = typeof product.description === 'string'
          ? product.description
          : (product.description.pt || '');
          
        if (htmlDescription.trim()) {
          try {
            console.log('Analisando descrição HTML:', htmlDescription);
            
            let blocks = [];
            try {
              blocks = parseHtmlToBlocks(htmlDescription);
              blocks = blocks.map(block => {
                if (block.type === 'text' && (!block.heading || block.heading === 'Título do Texto')) {
                  return {
                    ...block,
                    heading: productName
                  };
                }
                return block;
              });
              
              console.log('Blocos analisados:', blocks);
            } catch (parseErr) {
              console.error('Erro interno ao analisar blocos:', parseErr);
              const fallbackBlock = createBasicTextBlock(htmlDescription, productName);
              blocks = [fallbackBlock];
            }
            
            if (blocks.length === 0) {
              const fallbackBlock = createBasicTextBlock(htmlDescription, productName);
              blocks = [fallbackBlock];
            }
            
            const parsedDescription = {
              id: description?.id || 'imported-' + Date.now(),
              name: `Descrição: ${productName}`,
              blocks: blocks,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            loadDescription(parsedDescription);
            
            toast({
              title: 'Descrição convertida em blocos',
              description: 'A descrição do produto foi convertida em blocos editáveis.',
            });
          } catch (parseError) {
            console.error('Erro ao analisar descrição HTML:', parseError);
            setConversionError(true);
            
            const fallbackDescription = {
              id: 'error-' + Date.now(),
              name: `Descrição: ${productName}`,
              blocks: [createBasicTextBlock(htmlDescription, productName)],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            loadDescription(fallbackDescription);
            
            toast({
              variant: 'destructive',
              title: 'Erro ao converter descrição',
              description: 'Criamos um bloco de texto básico com o conteúdo original.',
            });
          }
        }
      } else {
        const newDescription = {
          id: 'new-' + Date.now(),
          name: `Descrição: ${productName}`,
          blocks: [createBasicTextBlock('<p>Adicione aqui a descrição do seu produto.</p>', productName)],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        loadDescription(newDescription);
        
        toast({
          title: 'Nova descrição criada',
          description: 'Este produto não tinha uma descrição. Criamos uma nova para você editar.',
        });
      }
    } catch (error) {
      console.error('Erro ao carregar descrição do produto:', error);
      setConversionError(true);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar a descrição do produto.',
      });
    } finally {
      setIsImporting(false);
    }
  };

  const createBasicTextBlock = (content: string, title: string) => ({
    id: uuidv4(),
    type: 'text' as const,
    title: 'Conteúdo Importado',
    heading: title,
    content: content.includes('<') ? content : `<p>${content}</p>`,
    visible: true,
    columns: 'full' as const,
    style: {}
  });

  return {
    isImporting,
    conversionError,
    setConversionError,
    loadProductDescription
  };
};
