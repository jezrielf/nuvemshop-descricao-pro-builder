
import React, { useState, useEffect } from 'react';
import { NuvemshopProduct } from '../types';
import { useEditorStore } from '@/store/editor';
import { useToast } from '@/hooks/use-toast';
import { useNuvemshopProducts } from '../hooks/useNuvemshopProducts';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw, ExternalLink } from 'lucide-react';

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
  const { description, getHtmlOutput, createNewDescription } = useEditorStore();

  // When product changes, create a new description with the product name
  useEffect(() => {
    if (product) {
      const productName = typeof product.name === 'string' 
        ? product.name
        : (product.name?.pt || 'Novo Produto');
        
      createNewDescription(`Descrição: ${productName}`);
      
      toast({
        title: 'Produto selecionado',
        description: `Editando descrição para: ${productName}`,
      });
    }
  }, [product, createNewDescription]);

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
      
      // Get HTML output from the editor
      const htmlOutput = getHtmlOutput();
      
      // Update product description in Nuvemshop
      const success = await updateProductDescription(product.id, htmlOutput);
      
      if (success) {
        toast({
          title: 'Descrição salva',
          description: 'A descrição do produto foi atualizada na Nuvemshop com sucesso!',
        });
      }
    } catch (error) {
      console.error('Error saving to Nuvemshop:', error);
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
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-white">
          Produto da Nuvemshop
        </Badge>
        <span className="font-medium truncate max-w-[200px]">{productName}</span>
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
