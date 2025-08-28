import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Package, CheckCircle2, XCircle, AlertCircle, Search, Download, Play, Pause, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NuvemshopProduct } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useBulkProductProcessor } from '../hooks/useBulkProductProcessor';

interface BulkProductManagerProps {
  products: NuvemshopProduct[];
  isOpen: boolean;
  onClose: () => void;
  onApplyToProducts: (productIds: number[], onStatusChange?: (productId: number, status: 'pending' | 'success' | 'error', message?: string) => void) => Promise<void>;
  onReconnect?: () => void;
  description?: string;
  getHtmlOutput?: () => string;
}

interface ProductListItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    products: NuvemshopProduct[];
    selectedProducts: Set<number>;
    onToggle: (id: number) => void;
    getProductName: (product: NuvemshopProduct) => string;
    getProductStatus: (id: number) => { status: 'pending' | 'success' | 'error'; message?: string; } | undefined;
    isUpdating: boolean;
  };
}

const ProductListItem: React.FC<ProductListItemProps> = ({ index, style, data }) => {
  const { products, selectedProducts, onToggle, getProductName, getProductStatus, isUpdating } = data;
  const product = products[index];
  const status = getProductStatus(product.id);

  return (
    <div style={style} className="px-2">
      <div className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors">
        <Checkbox
          checked={selectedProducts.has(product.id)}
          onCheckedChange={() => onToggle(product.id)}
          disabled={isUpdating}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium truncate">
              {getProductName(product)}
            </span>
            <Badge variant="outline" className="text-xs">
              ID: {product.id}
            </Badge>
          </div>
          
          {product.sku && (
            <div className="text-sm text-muted-foreground">
              SKU: {product.sku}
            </div>
          )}
          
          {status?.message && (
            <div className={`text-sm ${status.status === 'error' ? 'text-destructive' : 'text-green-600'}`}>
              {status.message}
            </div>
          )}
        </div>
        
        {status && (
          <div className="flex items-center gap-1">
            {status.status === 'pending' && (
              <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            )}
            {status.status === 'success' && (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
            {status.status === 'error' && (
              <XCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BulkProductManager: React.FC<BulkProductManagerProps> = ({
  products,
  isOpen,
  onClose,
  onApplyToProducts,
  onReconnect,
  description,
  getHtmlOutput
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [concurrencyLimit, setConcurrencyLimit] = useState(3);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { toast } = useToast();
  
  const {
    isProcessing,
    isPaused,
    progress,
    queue,
    statusMap,
    stats,
    togglePause,
    retry,
    reset,
    exportResults,
    startProcessing
  } = useBulkProductProcessor({
    onApplyToProducts,
    concurrencyLimit
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and memoize products
  const filteredProducts = useMemo(() => {
    if (!debouncedSearch.trim()) return products;
    
    const query = debouncedSearch.toLowerCase();
    return products.filter(product => {
      const name = getProductName(product).toLowerCase();
      const sku = product.sku?.toLowerCase() || '';
      const id = product.id.toString();
      
      return name.includes(query) || sku.includes(query) || id.includes(query);
    });
  }, [products, debouncedSearch]);

  const getProductName = (product: NuvemshopProduct) => {
    return typeof product.name === 'string' 
      ? product.name 
      : (product.name?.pt || 'Produto sem nome');
  };

  const getProductStatus = (productId: number) => {
    return statusMap.get(productId);
  };

  const handleProductToggle = useCallback((productId: number) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  }, []);

  const handleSelectFiltered = useCallback(() => {
    const filteredIds = new Set(filteredProducts.map(p => p.id));
    const allFilteredSelected = filteredProducts.every(p => selectedProducts.has(p.id));
    
    if (allFilteredSelected) {
      setSelectedProducts(prev => {
        const newSet = new Set(prev);
        filteredIds.forEach(id => newSet.delete(id));
        return newSet;
      });
    } else {
      setSelectedProducts(prev => new Set([...prev, ...filteredIds]));
    }
  }, [filteredProducts, selectedProducts]);

  const handleStartProcessing = async () => {
    if (selectedProducts.size === 0) {
      toast({
        variant: 'destructive',
        title: 'Nenhum produto selecionado',
        description: 'Selecione pelo menos um produto para atualizar.',
      });
      return;
    }

    if (!description && !getHtmlOutput?.()) {
      toast({
        variant: 'destructive',
        title: 'Descrição necessária',
        description: 'É necessário ter uma descrição para aplicar aos produtos.',
      });
      return;
    }

    const confirmed = window.confirm(
      `Processar ${selectedProducts.size} produto(s)?\n\nConcorrência: ${concurrencyLimit} produtos simultâneos\nTempo estimado: ${Math.ceil(selectedProducts.size / concurrencyLimit * 2)} segundos`
    );

    if (!confirmed) return;

    await startProcessing(Array.from(selectedProducts));
  };

  const handleClose = () => {
    if (isProcessing && !window.confirm('Há um processamento em andamento. Deseja realmente fechar?')) {
      return;
    }
    reset();
    setSelectedProducts(new Set());
    setSearchQuery('');
    onClose();
  };

  const selectedCount = selectedProducts.size;
  const filteredSelectedCount = filteredProducts.filter(p => selectedProducts.has(p.id)).length;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Gerenciador de Produtos em Massa
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Processing Controls */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Controles de Processamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Concurrency Settings */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Concorrência:</label>
                <Select 
                  value={concurrencyLimit.toString()} 
                  onValueChange={(value) => setConcurrencyLimit(Number(value))}
                  disabled={isProcessing}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">produtos simultâneos</span>
              </div>

              {/* Progress and Stats */}
              {(isProcessing || stats.completed > 0) && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progresso: {stats.completed}/{stats.total}</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  
                  <div className="flex gap-4 text-sm">
                    <Badge variant="outline" className="text-green-600">
                      Sucessos: {stats.success}
                    </Badge>
                    <Badge variant="outline" className="text-destructive">
                      Erros: {stats.errors}
                    </Badge>
                    <Badge variant="outline">
                      Pendentes: {stats.pending}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  onClick={handleStartProcessing}
                  disabled={selectedCount === 0 || isProcessing}
                  className="flex-1"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Processar {selectedCount} produto(s)
                </Button>
                
                {isProcessing && (
                  <Button onClick={togglePause} variant="outline">
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>
                )}
                
                {stats.errors > 0 && !isProcessing && (
                  <Button onClick={retry} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Tentar Novamente
                  </Button>
                )}
                
                {stats.completed > 0 && (
                  <Button onClick={exportResults} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Search and Selection */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar produtos por nome, SKU ou ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isProcessing}
                className="pl-10"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleSelectFiltered}
                disabled={isProcessing || filteredProducts.length === 0}
              >
                {filteredSelectedCount === filteredProducts.length && filteredProducts.length > 0
                  ? 'Desmarcar Filtrados' 
                  : 'Selecionar Filtrados'}
              </Button>
              
              <div className="flex items-center gap-2">
                {debouncedSearch && (
                  <Badge variant="secondary">
                    {filteredProducts.length} encontrados
                  </Badge>
                )}
                <Badge variant="outline">
                  {selectedCount} de {products.length} selecionados
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Virtualized Product List */}
          <div className="flex-1 border rounded-md overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                {debouncedSearch ? 'Nenhum produto encontrado para a pesquisa.' : 'Nenhum produto disponível.'}
              </div>
            ) : (
              <List
                height={400}
                width="100%"
                itemCount={filteredProducts.length}
                itemSize={80}
                itemData={{
                  products: filteredProducts,
                  selectedProducts,
                  onToggle: handleProductToggle,
                  getProductName,
                  getProductStatus,
                  isUpdating: isProcessing
                }}
              >
                {ProductListItem}
              </List>
            )}
          </div>
          
          {/* Footer Actions */}
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleClose}
            >
              {isProcessing ? 'Cancelar' : 'Fechar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkProductManager;