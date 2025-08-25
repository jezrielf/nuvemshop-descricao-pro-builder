import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { Template, ProductCategory } from '@/types/editor';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { parseHtmlToBlocks } from '@/utils/htmlParsers';
import { useToast } from '@/hooks/use-toast';

interface ProductImportTabProps {
  onImport: (template: Template) => void;
  isImporting: boolean;
}

export const ProductImportTab: React.FC<ProductImportTabProps> = ({ onImport, isImporting }) => {
  const [productId, setProductId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('other');
  const { products, loadingProducts: loading } = useNuvemshopProducts();
  const { toast } = useToast();

  const handleImport = () => {
    if (!productId) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione um produto',
        variant: 'destructive'
      });
      return;
    }

    const product = products.find(p => String(p.id) === productId);
    if (!product) {
      toast({
        title: 'Erro',
        description: 'Produto não encontrado',
        variant: 'destructive'
      });
      return;
    }

    try {
      const description = typeof product.description === 'string' ? product.description : product.description?.pt || '';
      const blocks = parseHtmlToBlocks(description);
      
      const productName = typeof product.name === 'string' ? product.name : product.name?.pt || 'Produto';
      const template: Template = {
        id: crypto.randomUUID(),
        name: `Template - ${productName}`,
        category: selectedCategory,
        blocks
      };

      onImport(template);
      
      toast({
        title: 'Template importado',
        description: 'Produto convertido em template com sucesso'
      });
    } catch (error) {
      console.error('Error importing product:', error);
      toast({
        title: 'Erro na importação',
        description: 'Não foi possível converter o produto em template',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando produtos...</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Nenhum produto encontrado. Conecte sua loja Nuvemshop primeiro.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="product-select">Produto</Label>
        <Select value={productId} onValueChange={setProductId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={String(product.id)}>
                {typeof product.name === 'string' ? product.name : product.name?.pt || `Produto ${product.id}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          A descrição do produto será convertida em blocos
        </p>
      </div>

      <div>
        <Label htmlFor="category-select">Categoria do Template</Label>
        <Select value={selectedCategory} onValueChange={(value: ProductCategory) => setSelectedCategory(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="supplements">Suplementos</SelectItem>
            <SelectItem value="clothing">Roupas</SelectItem>
            <SelectItem value="accessories">Acessórios</SelectItem>
            <SelectItem value="shoes">Calçados</SelectItem>
            <SelectItem value="electronics">Eletrônicos</SelectItem>
            <SelectItem value="energy">Energia</SelectItem>
            <SelectItem value="casa-decoracao">Casa e Decoração</SelectItem>
            <SelectItem value="health">Saúde</SelectItem>
            <SelectItem value="luxury">Luxo</SelectItem>
            <SelectItem value="adult">Adulto</SelectItem>
            <SelectItem value="other">Outros</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleImport}
        disabled={!productId || isImporting}
        className="w-full"
      >
        {isImporting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Importando...
          </>
        ) : (
          'Importar do Produto'
        )}
      </Button>
    </div>
  );
};