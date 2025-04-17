
import React, { useState, useEffect } from 'react';
import { NuvemshopProduct } from '../types';
import { useEditorStore } from '@/store/editor';
import { useToast } from '@/hooks/use-toast';
import { useNuvemshopProducts } from '../hooks/useNuvemshopProducts';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw, ExternalLink } from 'lucide-react';
import { parseHtmlToBlocks } from '@/utils/htmlParsers';
import { ProductCategory } from '@/types/editor';

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

  // Determine product category from Nuvemshop product
  const determineCategory = (product: NuvemshopProduct): ProductCategory => {
    // Default category
    let category: ProductCategory = 'other';
    
    // If product has tags, try to determine the category
    if (product.tags) {
      const tagString = typeof product.tags === 'string' ? product.tags.toLowerCase() : '';
      
      if (tagString.includes('supplement')) return 'supplements';
      if (tagString.includes('clothing') || tagString.includes('apparel')) return 'clothing';
      if (tagString.includes('accessory') || tagString.includes('accessories')) return 'accessories';
      if (tagString.includes('shoe')) return 'shoes';
      if (tagString.includes('electronic')) return 'electronics';
      if (tagString.includes('health')) return 'health';
      if (tagString.includes('beauty') || tagString.includes('cosmetic')) return 'beauty';
      if (tagString.includes('fashion')) return 'fashion';
      if (tagString.includes('haute') || tagString.includes('couture')) return 'haute-couture';
      if (tagString.includes('home') || tagString.includes('decor')) return 'home-decor';
      if (tagString.includes('fitness')) return 'fitness';
      if (tagString.includes('beverage')) return 'beverages';
      if (tagString.includes('purifier')) return 'water-purifiers';
    }
    
    return category;
  };

  // Parse product HTML description and convert to our block format
  const loadProductDescription = (product: NuvemshopProduct) => {
    try {
      const productName = typeof product.name === 'string' 
        ? product.name
        : (product.name?.pt || 'Novo Produto');
      
      // First create a basic description with the product name
      createNewDescription(`Descrição: ${productName}`);
      
      // Check if the product has an existing description to load
      if (product.description) {
        // Get product description as HTML string
        const htmlDescription = typeof product.description === 'string'
          ? product.description
          : (product.description.pt || '');
          
        if (htmlDescription.trim()) {
          try {
            console.log('Parsing HTML description:', htmlDescription);
            
            // Use our new parseHtmlToBlocks function to convert HTML to block format
            const blocks = parseHtmlToBlocks(htmlDescription);
            
            // Determine the product category
            const category = determineCategory(product);
            
            // Create a description object with the parsed blocks
            const parsedDescription = {
              id: description?.id || 'imported-' + Date.now(),
              name: `Descrição: ${productName}`,
              category, // Add the determined category
              blocks: blocks,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
            
            // Load the parsed description into the editor
            loadDescription(parsedDescription);
            
            toast({
              title: 'Descrição carregada',
              description: 'A descrição existente do produto foi carregada para edição.',
            });
          } catch (parseError) {
            console.error('Error parsing HTML description:', parseError);
            toast({
              variant: 'destructive',
              title: 'Erro ao carregar descrição',
              description: 'Não foi possível converter a descrição HTML existente.',
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
      console.error('Error loading product description:', error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar a descrição do produto.',
      });
    }
  };

  // When product changes, load its description
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
