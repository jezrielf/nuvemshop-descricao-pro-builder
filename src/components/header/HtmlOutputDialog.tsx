import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Copy, AlertCircle, Upload, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NuvemshopConnect } from '@/components/nuvemshop/NuvemshopConnect';
import { StoreSelector } from '@/components/nuvemshop/StoreSelector';
import { ProductSelector } from '@/components/nuvemshop/ProductSelector';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { ProductList } from '@/components/nuvemshop/ProductList';

const HtmlOutputDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'copy' | 'update'>('copy');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess<number[]>([]);
  const { getHtmlOutput } = useEditorStore();
  const { toast } = useToast();
  
  const htmlOutput = getHtmlOutput();
  
  const copyHtmlToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "HTML copiado!",
      description: "O código HTML foi copiado para a área de transferência.",
    });
  };

  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId);
    setSelectedProductIds([]);
    setUpdateSuccess([]);
  };

  const handleProductSelect = (productId: number) => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(prev => prev.filter(id => id !== productId));
    } else {
      setSelectedProductIds(prev => [...prev, productId]);
    }
    // Reset success state when selection changes
    setUpdateSuccess([]);
  };

  const updateNuvemshopProducts = async () => {
    if (!selectedStoreId || selectedProductIds.length === 0) {
      toast({
        title: "Nenhum produto selecionado",
        description: "Selecione pelo menos um produto para atualizar.",
        variant: "destructive"
      });
      return;
    }

    setIsUpdating(true);
    
    try {
      const updatedProducts = [];
      
      // Atualizar cada produto selecionado
      for (const productId of selectedProductIds) {
        const { data, error } = await supabase.functions.invoke('nuvemshop-update-product', {
          body: {
            storeId: selectedStoreId,
            productId,
            description: htmlOutput
          }
        });
        
        if (error) {
          console.error(`Erro ao atualizar produto ${productId}:`, error);
          toast({
            title: "Erro na atualização",
            description: `Não foi possível atualizar o produto ${productId}.`,
            variant: "destructive"
          });
        } else {
          updatedProducts.push(productId);
          setUpdateSuccess(prev => [...prev, productId]);
        }
      }
      
      if (updatedProducts.length > 0) {
        toast({
          title: "Produtos atualizados!",
          description: `${updatedProducts.length} produtos foram atualizados com sucesso.`,
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar produtos:', error);
      toast({
        title: "Erro na atualização",
        description: "Ocorreu um erro ao atualizar os produtos.",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Add new state for products view
  const [viewType, setViewType] = useState<'html' | 'products'>('html');

  const { useQuery } = require('@tanstack/react-query');
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['nuvemshop-products', selectedStoreId],
    queryFn: async () => {
      try {
        if (!selectedStoreId) return [];
        const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
          body: { storeId: selectedStoreId }
        });
        
        if (error) throw error;
        return data?.products || [];
      } catch (err) {
        console.error('Error fetching products:', err);
        toast({
          title: "Erro ao carregar produtos",
          description: "Não foi possível carregar os produtos da loja selecionada.",
          variant: "destructive",
        });
        throw err;
      }
    },
    enabled: !!selectedStoreId,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Ver HTML
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Visualização do Produto na Nuvemshop</DialogTitle>
          <DialogDescription>
            Visualize o HTML da descrição ou os produtos da sua loja.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'html' | 'products')} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html">
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Este HTML é 100% compatível com a Nuvemshop, usando apenas HTML e CSS inline (sem JavaScript).
                Cole o código completo sem alterações ou recortes para evitar tags HTML não fechadas.
              </AlertDescription>
            </Alert>
            
            <div className="relative">
              <Textarea
                className="min-h-[300px] font-mono text-xs"
                readOnly
                value={htmlOutput}
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-2"
                onClick={copyHtmlToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="space-y-4">
              <Alert variant="default">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Visualize todos os produtos disponíveis na sua loja Nuvemshop.
                </AlertDescription>
              </Alert>
              
              <div className="flex items-center gap-4 mb-4">
                <StoreSelector onSelect={handleStoreSelect} value={selectedStoreId || undefined} />
                <NuvemshopConnect />
              </div>
              
              {selectedStoreId && (
                <ProductList products={products || []} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default HtmlOutputDialog;
