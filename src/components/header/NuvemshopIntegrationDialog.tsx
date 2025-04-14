
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { 
  CopyCheck, ExternalLink, InfoIcon, ShoppingBag, 
  Store, Check, Upload, Package, Search, Loader2, 
  RefreshCw, AlertTriangle 
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  getNuvemshopAuthUrl, 
  getConnectedStores, 
  fetchStoreProducts, 
  updateProductDescription,
  type NuvemshopStore,
  type NuvemshopProduct
} from '@/services/nuvemshopService';
import { useAuth } from '@/contexts/AuthContext';

interface NuvemshopIntegrationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NuvemshopIntegrationDialog: React.FC<NuvemshopIntegrationDialogProps> = ({ 
  isOpen, 
  onOpenChange
}) => {
  const { getHtmlOutput } = useEditorStore();
  const { toast } = useToast();
  const { isPremium, isBusiness } = useAuth();
  
  const [activeTab, setActiveTab] = useState('manual');
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState<NuvemshopStore[]>([]);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [products, setProducts] = useState<NuvemshopProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConnectingStore, setIsConnectingStore] = useState(false);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  const canUseFullIntegration = isPremium() || isBusiness();
  
  // Load user's connected stores when dialog opens
  useEffect(() => {
    if (isOpen && canUseFullIntegration && activeTab === 'api') {
      loadStores();
    }
  }, [isOpen, canUseFullIntegration, activeTab]);

  // Load products when store is selected
  useEffect(() => {
    if (selectedStore && canUseFullIntegration) {
      loadProducts();
    }
  }, [selectedStore]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Load stores when switching to API tab
    if (value === 'api' && canUseFullIntegration) {
      loadStores();
    }
  };
  
  // Load connected stores
  const loadStores = async () => {
    try {
      setLoading(true);
      const storesData = await getConnectedStores();
      setStores(storesData);
      
      // Auto-select the first store if available
      if (storesData.length > 0 && !selectedStore) {
        setSelectedStore(storesData[0].id);
      }
    } catch (error) {
      console.error('Error loading stores:', error);
      toast({
        title: 'Erro ao carregar lojas',
        description: 'Não foi possível carregar suas lojas Nuvemshop.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Load products for selected store
  const loadProducts = async () => {
    if (!selectedStore) return;
    
    try {
      setIsFetchingProducts(true);
      const productsData = await fetchStoreProducts(selectedStore);
      setProducts(productsData);
      setSelectedProduct(null); // Reset product selection
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: 'Erro ao carregar produtos',
        description: 'Não foi possível carregar os produtos da loja selecionada.',
        variant: 'destructive',
      });
    } finally {
      setIsFetchingProducts(false);
    }
  };
  
  // Connect new store
  const connectStore = async () => {
    try {
      setIsConnectingStore(true);
      const authUrl = await getNuvemshopAuthUrl();
      window.open(authUrl, '_blank');
      
      // Show toast with instructions
      toast({
        title: 'Conectando à Nuvemshop',
        description: 'Uma nova aba foi aberta. Autorize o acesso e retorne a esta página após concluir.',
      });
    } catch (error) {
      console.error('Error connecting store:', error);
      toast({
        title: 'Erro ao conectar loja',
        description: 'Não foi possível iniciar o processo de conexão com a Nuvemshop.',
        variant: 'destructive',
      });
    } finally {
      setIsConnectingStore(false);
    }
  };
  
  // Update product description
  const updateProduct = async () => {
    if (!selectedStore || !selectedProduct) {
      toast({
        title: 'Selecione uma loja e um produto',
        description: 'É necessário selecionar uma loja e um produto para atualizar a descrição.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsUpdating(true);
      const htmlOutput = getHtmlOutput();
      const success = await updateProductDescription(selectedStore, selectedProduct, htmlOutput);
      
      if (success) {
        toast({
          title: 'Descrição atualizada com sucesso',
          description: 'A descrição do produto foi atualizada na Nuvemshop.',
        });
      } else {
        throw new Error('Falha ao atualizar descrição');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: 'Erro ao atualizar produto',
        description: 'Não foi possível atualizar a descrição do produto na Nuvemshop.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Filter products by search term
  const filteredProducts = products.filter(
    product => product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle copy HTML to clipboard
  const handleCopyHtml = () => {
    const htmlOutput = getHtmlOutput();
    navigator.clipboard.writeText(htmlOutput);
    toast({
      title: "HTML copiado!",
      description: "O código HTML foi copiado para a área de transferência.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
            Integração com Nuvemshop
          </DialogTitle>
          <DialogDescription>
            Exporte sua descrição de produto diretamente para a Nuvemshop ou copie o código HTML.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="manual" value={activeTab} onValueChange={handleTabChange} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Exportação Manual</TabsTrigger>
            <TabsTrigger value="api" disabled={!canUseFullIntegration}>Integração com API</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4 mt-4">
            <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Copie o código HTML e cole na descrição do seu produto na Nuvemshop manualmente.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-4">
              <Button
                variant="default"
                className="w-full"
                onClick={handleCopyHtml}
              >
                <CopyCheck className="mr-2 h-4 w-4" />
                Copiar HTML para Área de Transferência
              </Button>
              
              <div className="flex justify-center mt-2">
                <a 
                  href="https://www.nuvemshop.com.br/admin/produtos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 flex items-center hover:underline"
                >
                  Abrir painel da Nuvemshop <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4 mt-4">
            {canUseFullIntegration ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <Store className="h-4 w-4 mr-2" />
                        Lojas Conectadas
                      </CardTitle>
                      <CardDescription>
                        Selecione uma loja ou conecte uma nova
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading ? (
                        <div className="flex justify-center py-4">
                          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                        </div>
                      ) : (
                        <>
                          {stores.length > 0 ? (
                            <div className="space-y-4">
                              <Select 
                                value={selectedStore?.toString()} 
                                onValueChange={(value) => setSelectedStore(parseInt(value))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione uma loja" />
                                </SelectTrigger>
                                <SelectContent>
                                  {stores.map((store) => (
                                    <SelectItem key={store.id} value={store.id.toString()}>
                                      {store.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <div className="text-xs text-gray-500">
                                {selectedStore && (
                                  <div className="flex items-center">
                                    <Check className="h-3 w-3 text-green-500 mr-1" />
                                    Loja conectada
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-2">
                              <p className="text-sm text-gray-500 mb-4">
                                Nenhuma loja conectada
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={connectStore}
                        disabled={isConnectingStore}
                      >
                        {isConnectingStore ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Store className="h-4 w-4 mr-2" />
                        )}
                        {stores.length > 0 ? "Conectar Nova Loja" : "Conectar Loja"}
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">
                        <Package className="h-4 w-4 mr-2" />
                        Produtos
                      </CardTitle>
                      <CardDescription>
                        Selecione um produto para atualizar a descrição
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedStore ? (
                        isFetchingProducts ? (
                          <div className="flex justify-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="relative">
                              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                              <Input
                                placeholder="Buscar produtos"
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </div>
                            
                            <ScrollArea className="h-40">
                              {filteredProducts.length > 0 ? (
                                <div className="space-y-2">
                                  {filteredProducts.map((product) => (
                                    <div
                                      key={product.id}
                                      className={`p-2 rounded cursor-pointer flex items-center ${
                                        selectedProduct === product.id
                                          ? 'bg-blue-100 border border-blue-300'
                                          : 'hover:bg-gray-100 border border-transparent'
                                      }`}
                                      onClick={() => setSelectedProduct(product.id)}
                                    >
                                      {product.images && product.images.length > 0 ? (
                                        <img
                                          src={product.images[0].src}
                                          alt={product.name}
                                          className="w-8 h-8 object-cover rounded mr-2"
                                        />
                                      ) : (
                                        <div className="w-8 h-8 bg-gray-200 rounded mr-2 flex items-center justify-center">
                                          <Package className="h-4 w-4 text-gray-400" />
                                        </div>
                                      )}
                                      <span className="text-sm truncate">{product.name}</span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-4">
                                  <p className="text-sm text-gray-500">
                                    {products.length > 0
                                      ? 'Nenhum produto encontrado'
                                      : 'Nenhum produto disponível'}
                                  </p>
                                </div>
                              )}
                            </ScrollArea>
                          </div>
                        )
                      ) : (
                        <div className="flex flex-col items-center justify-center py-4 text-center">
                          <AlertTriangle className="h-8 w-8 text-yellow-500 mb-2" />
                          <p className="text-sm text-gray-600">
                            Selecione uma loja para ver os produtos
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={loadProducts}
                        disabled={!selectedStore || isFetchingProducts}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Atualizar Lista
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <Button
                  variant="default"
                  className="w-full"
                  disabled={!selectedStore || !selectedProduct || isUpdating}
                  onClick={updateProduct}
                >
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4 mr-2" />
                  )}
                  {isUpdating ? "Atualizando..." : "Atualizar Descrição no Produto"}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  Ao conectar sua loja, você autoriza Descrição Pro a acessar seus produtos na Nuvemshop.
                </p>
              </>
            ) : (
              <Alert variant="default" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                <InfoIcon className="h-4 w-4" />
                <AlertDescription>
                  A integração com a API da Nuvemshop está disponível apenas para assinantes dos planos Premium e Empresarial.{' '}
                  <a href="/plans" className="underline font-medium">Fazer upgrade</a>
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NuvemshopIntegrationDialog;
