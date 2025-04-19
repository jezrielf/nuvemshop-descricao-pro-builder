
import React, { useState, useEffect } from 'react';
import { NuvemshopProduct } from '../types';
import { useEditorStore } from '@/store/editor';
import { useToast } from '@/hooks/use-toast';
import { useNuvemshopProducts } from '../hooks/useNuvemshopProducts';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw } from 'lucide-react';
import { parseHtmlToBlocks } from '@/utils/htmlParsers';

interface ProductEditorControllerProps {
  className?: string;
  product: NuvemshopProduct;
}

const ProductEditorController: React.FC<ProductEditorControllerProps> = ({ 
  className,
  product
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const { accessToken, userId } = useNuvemshopAuth();
  const { updateProductDescription } = useNuvemshopProducts(accessToken, userId);
  const { toast } = useToast();
  const { description, getHtmlOutput, createNewDescription, loadDescription } = useEditorStore();
  const [hasCustomBlocks, setHasCustomBlocks] = useState(false);

  // Função para detectar se a descrição HTML contém estrutura de blocos personalizada
  const detectCustomBlocks = (html: string): boolean => {
    // Procura por comentários ou atributos que indicam blocos personalizados
    return html.includes('data-block-type') || 
           html.includes('<!-- BLOCK:') || 
           html.includes('class="nuvemshop-product-description"');
  };

  // Carrega a descrição do produto
  const loadProductDescription = (product: NuvemshopProduct) => {
    try {
      const productName = typeof product.name === 'string' 
        ? product.name
        : (product.name?.pt || 'Novo Produto');
      
      // Primeiro cria uma descrição básica com o nome do produto
      createNewDescription(`Descrição: ${productName}`);
      
      // Verifica se o produto tem uma descrição existente para carregar
      if (product.description) {
        const htmlDescription = typeof product.description === 'string'
          ? product.description
          : (product.description.pt || '');
          
        if (htmlDescription.trim()) {
          try {
            console.log('Analisando descrição HTML:', htmlDescription);
            
            // Verifica se a descrição tem blocos personalizados
            const hasCustom = detectCustomBlocks(htmlDescription);
            setHasCustomBlocks(hasCustom);
            
            // Converte HTML em blocos
            const blocks = parseHtmlToBlocks(htmlDescription);
            
            // Cria um objeto de descrição com os blocos analisados
            const parsedDescription = {
              id: description?.id || 'imported-' + Date.now(),
              name: `Descrição: ${productName}`,
              blocks: blocks,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            // Carrega a descrição analisada no editor
            loadDescription(parsedDescription);
            
            toast({
              title: hasCustom ? 'Descrição personalizada carregada' : 'Descrição convertida em blocos',
              description: hasCustom 
                ? 'A descrição personalizada anterior foi restaurada.'
                : 'A descrição do produto foi convertida em blocos editáveis.',
            });
          } catch (parseError) {
            console.error('Erro ao analisar descrição HTML:', parseError);
            toast({
              variant: 'destructive',
              title: 'Erro ao carregar descrição',
              description: 'Não foi possível converter a descrição HTML.',
            });
          }
        }
      } else {
        toast({
          title: 'Nova descrição criada',
          description: 'Este produto não tinha uma descrição. Criamos uma nova para você editar.',
        });
      }
    } catch (error) {
      console.error('Erro ao carregar descrição do produto:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar a descrição do produto.',
      });
    }
  };

  // Quando o produto muda, carrega sua descrição
  useEffect(() => {
    if (product) {
      loadProductDescription(product);
    }
  }, [product]);

  const handleSaveToNuvemshop = async () => {
    if (!product || !description) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'É necessário ter uma descrição para salvar.',
      });
      return;
    }

    try {
      setIsSaving(true);
      
      // Obtém o HTML do editor
      const htmlOutput = getHtmlOutput();
      
      // Atualiza a descrição do produto na Nuvemshop
      const success = await updateProductDescription(product.id, htmlOutput);
      
      if (success) {
        setHasCustomBlocks(true); // Marca que agora temos blocos personalizados
        toast({
          title: 'Descrição salva',
          description: 'A descrição do produto foi atualizada na Nuvemshop com sucesso!',
        });
      }
    } catch (error) {
      console.error('Erro ao salvar na Nuvemshop:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar a descrição na Nuvemshop.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const productName = typeof product.name === 'string'
    ? product.name
    : (product.name?.pt || 'Produto');

  return (
    <div className={`flex items-center justify-between p-2 bg-green-50 border-b border-green-100 ${className}`}>
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="bg-white">
          Produto da Nuvemshop
        </Badge>
        <span className="font-medium truncate max-w-[200px]">{productName}</span>
        {hasCustomBlocks && (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Descrição personalizada
          </Badge>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          disabled={isSaving || !description}
          onClick={handleSaveToNuvemshop}
        >
          {isSaving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Salvar na Nuvemshop
        </Button>
      </div>
    </div>
  );
};

export default ProductEditorController;

