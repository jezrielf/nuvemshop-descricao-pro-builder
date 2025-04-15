
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

const HtmlOutputDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'copy' | 'update'>('copy');
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState<number[]>([]);
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
          <DialogTitle>Código HTML para Nuvemshop</DialogTitle>
          <DialogDescription>
            Copie este código HTML ou atualize diretamente os produtos na sua loja Nuvemshop.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'copy' | 'update')} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="copy">Copiar HTML</TabsTrigger>
            <TabsTrigger value="update">Atualizar Produtos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="copy" className="space-y-4">
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
          
          <TabsContent value="update" className="space-y-4">
            <Alert variant="default">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Selecione a loja e os produtos que você deseja atualizar com esta descrição.
                A atualização será feita diretamente na Nuvemshop.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <h3 className="text-sm font-medium">Loja Nuvemshop:</h3>
                </div>
                <div className="flex-grow">
                  <StoreSelector onSelect={handleStoreSelect} value={selectedStoreId || undefined} />
                </div>
                <div className="flex-shrink-0">
                  <NuvemshopConnect />
                </div>
              </div>
              
              {selectedStoreId ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Selecione os produtos para atualizar:</h3>
                  <div className="border rounded-md p-4">
                    <MultiProductSelector 
                      storeId={selectedStoreId} 
                      selectedProductIds={selectedProductIds}
                      onProductToggle={handleProductSelect}
                      updatedProductIds={updateSuccess}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="default" 
                      className="flex items-center"
                      onClick={updateNuvemshopProducts}
                      disabled={isUpdating || selectedProductIds.length === 0}
                    >
                      {isUpdating ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          Atualizando...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Atualizar Produtos ({selectedProductIds.length})
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Selecione uma loja para ver os produtos disponíveis
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

interface MultiProductSelectorProps {
  storeId: number;
  selectedProductIds: number[];
  onProductToggle: (productId: number) => void;
  updatedProductIds: number[];
}

const MultiProductSelector: React.FC<MultiProductSelectorProps> = ({ 
  storeId, 
  selectedProductIds, 
  onProductToggle,
  updatedProductIds
}) => {
  const { useQuery } = require('@tanstack/react-query');
  const { toast } = useToast();
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['nuvemshop-products', storeId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.functions.invoke('nuvemshop-products', {
          body: { storeId }
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
    enabled: !!storeId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin text-xl">⟳</div>
        <span className="ml-2">Carregando produtos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-destructive">
        Erro ao carregar produtos. Tente novamente.
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        Nenhum produto encontrado nesta loja
      </div>
    );
  }

  return (
    <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
      {products.map((product: any) => (
        <div 
          key={product.id} 
          className={`flex items-center p-2 border rounded-md cursor-pointer hover:bg-muted transition-colors ${
            selectedProductIds.includes(product.id) ? 'bg-primary/10 border-primary/30' : ''
          }`}
          onClick={() => onProductToggle(product.id)}
        >
          <div className="flex-shrink-0 mr-2">
            <input 
              type="checkbox"
              checked={selectedProductIds.includes(product.id)}
              onChange={() => {}}
              className="h-4 w-4"
            />
          </div>
          <div className="flex-grow">
            <div className="font-medium">{product.name}</div>
            <div className="text-xs text-muted-foreground">ID: {product.id}</div>
          </div>
          {updatedProductIds.includes(product.id) && (
            <div className="flex-shrink-0 text-green-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HtmlOutputDialog;
