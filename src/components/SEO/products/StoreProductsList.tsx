
import React, { useEffect } from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Edit, LineChart, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNuvemshopProducts } from '@/components/Nuvemshop/hooks/useNuvemshopProducts';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';
import { useEditorStore } from '@/store/editor';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ProductAnalysisDialog } from './components/ProductAnalysisDialog';
import { useProductsSEOAnalysis } from './hooks/useProductsSEOAnalysis';
import { useNuvemshopStore } from '@/contexts/NuvemshopStoreContext';

const StoreProductsList: React.FC = () => {
  const navigate = useNavigate();
  const { loadDescription } = useEditorStore();
  const { activeStoreId } = useNuvemshopStore();
  
  const {
    products,
    loadingProducts,
    fetchProducts,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage
  } = useNuvemshopProducts(activeStoreId);

  const {
    sortedProducts,
    sortOrder,
    selectedProduct,
    setSelectedProduct,
    toggleSortOrder,
    analyzeProduct,
    analyzeAllProducts
  } = useProductsSEOAnalysis(products);

  // Fetch products on mount
  useEffect(() => {
    if (activeStoreId && !products.length) {
      fetchProducts();
    }
  }, [activeStoreId, fetchProducts, products.length]);

  // Handle edit product
  const handleEditProduct = (product: any) => {
    // Create a simple placeholder description to edit
    const productName = typeof product.name === 'string' 
      ? product.name 
      : (product.name?.pt || 'Produto');
      
    const newDescription = {
      id: `product-${product.id}`,
      name: productName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      blocks: [
        {
          id: "content-block",
          type: "text",
          title: "Conteúdo",
          content: typeof product.description === 'string' 
            ? product.description 
            : (product.description?.pt || ""),
          visible: true
        }
      ]
    };
    
    loadDescription(newDescription);
    navigate('/editor');
  };

  // Handle view detailed analysis
  const handleViewAnalysis = (product: any) => {
    setSelectedProduct(product);
    
    // If not analyzed yet, analyze now
    if (!product.seoAnalysis) {
      analyzeProduct(product);
    }
  };

  // Main render
  if (!activeStoreId) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground mb-4">
          Você precisa conectar sua conta Nuvemshop para ver os produtos da sua loja.
        </p>
        <Button onClick={() => navigate('/nuvemshop-connect')}>
          Conectar Nuvemshop
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CardHeader className="px-0 py-2">
          <CardTitle>Produtos da Loja</CardTitle>
        </CardHeader>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleSortOrder}
          >
            Score {sortOrder === 'desc' ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={analyzeAllProducts} 
            disabled={loadingProducts || sortedProducts.every(p => p.seoAnalysis || p.isAnalyzing)}
          >
            Analisar Todos
          </Button>
        </div>
      </div>

      {loadingProducts ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Carregando produtos...</p>
        </div>
      ) : (
        <>
          <ScrollArea className="h-[500px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Nome do Produto</TableHead>
                  <TableHead>Score SEO</TableHead>
                  <TableHead className="hidden md:table-cell">Palavras-chave</TableHead>
                  <TableHead className="hidden md:table-cell">Palavras</TableHead>
                  <TableHead className="hidden lg:table-cell">Última Atualização</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Nenhum produto encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedProducts.map((product) => {
                    // Safely extract the product name
                    const productName = typeof product.name === 'string' 
                      ? product.name 
                      : (product.name?.pt || 'Produto');
                      
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{productName}</TableCell>
                        <TableCell>
                          {product.isAnalyzing ? (
                            <div className="flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              <span>Analisando...</span>
                            </div>
                          ) : product.seoAnalysis ? (
                            <Badge variant={
                              product.seoAnalysis.score >= 80 ? "default" : 
                              product.seoAnalysis.score >= 60 ? "outline" :
                              "secondary"
                            }>
                              {product.seoAnalysis.score}/100
                            </Badge>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => analyzeProduct(product)}
                            >
                              Analisar
                            </Button>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.seoAnalysis ? (
                            <div className="flex flex-wrap gap-1">
                              {product.seoAnalysis.keywords.slice(0, 2).map((keyword, idx) => (
                                <Badge key={idx} variant="outline">
                                  {keyword.keyword}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {product.seoAnalysis ? (
                            product.seoAnalysis.wordCount
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {product.seoAnalysis ? (
                            formatDistanceToNow(new Date(), {
                              addSuffix: true,
                              locale: ptBR
                            })
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewAnalysis(product)}
                            >
                              <LineChart className="h-4 w-4 mr-2" />
                              Analisar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </ScrollArea>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button 
                variant="outline" 
                onClick={handlePrevPage}
                disabled={currentPage === 1 || loadingProducts}
              >
                Anterior
              </Button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <Button 
                variant="outline" 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || loadingProducts}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      )}

      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <ProductAnalysisDialog 
            product={selectedProduct} 
            onEditProduct={handleEditProduct} 
          />
        </Dialog>
      )}
    </div>
  );
};

export default StoreProductsList;
