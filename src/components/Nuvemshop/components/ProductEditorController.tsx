
import React, { useState, useEffect } from 'react';
import { NuvemshopProduct } from '../types';
import { useEditorStore } from '@/store/editor';
import { useToast } from '@/hooks/use-toast';
import { useNuvemshopProducts } from '../hooks/useNuvemshopProducts';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw, AlertTriangle } from 'lucide-react';
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
  const [isImporting, setIsImporting] = useState(false);
  const [conversionError, setConversionError] = useState(false);
  const { accessToken, userId } = useNuvemshopAuth();
  const { updateProductDescription } = useNuvemshopProducts(accessToken, userId);
  const { toast } = useToast();
  const { description, getHtmlOutput, createNewDescription, loadDescription } = useEditorStore();
  const [hasCustomBlocks, setHasCustomBlocks] = useState(false);

  // Rastreamento local de produtos já personalizados
  const [customizedProducts, setCustomizedProducts] = useState<Record<number, boolean>>(() => {
    // Recupera do localStorage se disponível
    const saved = localStorage.getItem('customizedProducts');
    return saved ? JSON.parse(saved) : {};
  });

  // Função para detectar se a descrição HTML contém estrutura de blocos personalizada
  const detectCustomBlocks = (html: string): boolean => {
    // Procura por comentários ou atributos que indicam blocos personalizados
    return html.includes('data-block-type') || 
           html.includes('<!-- BLOCK:') || 
           html.includes('class="nuvemshop-product-description"');
  };

  // Salva o estado de produtos personalizados no localStorage
  useEffect(() => {
    localStorage.setItem('customizedProducts', JSON.stringify(customizedProducts));
  }, [customizedProducts]);

  // Verifica se o produto atual já está marcado como personalizado
  useEffect(() => {
    if (product && product.id) {
      setHasCustomBlocks(!!customizedProducts[product.id]);
    }
  }, [product, customizedProducts]);

  // Carrega a descrição do produto
  const loadProductDescription = async (product: NuvemshopProduct) => {
    try {
      setIsImporting(true);
      setConversionError(false);
      
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
            
            // Verifica se a descrição tem blocos personalizados ou se o produto está marcado como personalizado
            const isAlreadyCustomized = detectCustomBlocks(htmlDescription) || customizedProducts[product.id];
            setHasCustomBlocks(isAlreadyCustomized);
            
            // Se for um produto personalizado, atualize o registro
            if (isAlreadyCustomized && !customizedProducts[product.id]) {
              setCustomizedProducts(prev => ({
                ...prev,
                [product.id]: true
              }));
            }
            
            // Converte HTML em blocos
            const blocks = parseHtmlToBlocks(htmlDescription);
            
            if (blocks.length === 0) {
              throw new Error('Nenhum bloco pôde ser extraído do HTML');
            }
            
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
              title: isAlreadyCustomized ? 'Descrição personalizada carregada' : 'Descrição convertida em blocos',
              description: isAlreadyCustomized 
                ? 'A descrição personalizada anterior foi restaurada.'
                : 'A descrição do produto foi convertida em blocos editáveis.',
            });
          } catch (parseError) {
            console.error('Erro ao analisar descrição HTML:', parseError);
            setConversionError(true);
            toast({
              variant: 'destructive',
              title: 'Erro ao converter descrição',
              description: 'Não foi possível converter a descrição HTML em blocos editáveis.',
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
        // Marca que este produto agora tem uma descrição personalizada
        setCustomizedProducts(prev => ({
          ...prev,
          [product.id]: true
        }));
        
        setHasCustomBlocks(true);
        
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

  const handleRefreshDescription = () => {
    if (product) {
      loadProductDescription(product);
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
        {conversionError && (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Problema na conversão
          </Badge>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {conversionError && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefreshDescription}
            disabled={isImporting}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isImporting ? 'animate-spin' : ''}`} />
            Tentar novamente
          </Button>
        )}
        
        <Button
          size="sm"
          variant="outline"
          disabled={isSaving || !description || isImporting}
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
