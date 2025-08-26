import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Package, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { NuvemshopProduct } from '../types';
import { useToast } from '@/hooks/use-toast';

interface MultipleProductSelectionProps {
  products: NuvemshopProduct[];
  isOpen: boolean;
  onClose: () => void;
  onApplyToProducts: (productIds: number[], onStatusChange?: (productId: number, status: 'pending' | 'success' | 'error', message?: string) => void) => Promise<void>;
  onReconnect?: () => void;
  description?: string;
  getHtmlOutput?: () => string;
}

interface ProductUpdateStatus {
  id: number;
  status: 'pending' | 'success' | 'error';
  message?: string;
}

const MultipleProductSelection: React.FC<MultipleProductSelectionProps> = ({
  products,
  isOpen,
  onClose,
  onApplyToProducts,
  onReconnect,
  description,
  getHtmlOutput
}) => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatuses, setUpdateStatuses] = useState<ProductUpdateStatus[]>([]);
  const [progress, setProgress] = useState(0);
  const [authInvalid, setAuthInvalid] = useState(false);
  const { toast } = useToast();
  
  // Reset dialog state when opening
  useEffect(() => {
    if (isOpen) {
      resetDialogState();
    }
  }, [isOpen]);

  const handleProductToggle = (productId: number) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const resetDialogState = () => {
    setSelectedProducts([]);
    setUpdateStatuses([]);
    setProgress(0);
    setIsUpdating(false);
    setAuthInvalid(false);
  };

  const handleClose = () => {
    resetDialogState();
    onClose();
  };

  const handleApplyDescriptions = async () => {
    if (selectedProducts.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Nenhum produto selecionado',
        description: 'Selecione pelo menos um produto para aplicar a descrição.',
      });
      return;
    }

    if (!description && !getHtmlOutput?.()) {
      toast({
        variant: 'destructive',
        title: 'Nenhuma descrição disponível',
        description: 'Crie uma descrição no editor antes de aplicar aos produtos.',
      });
      return;
    }

    const confirmed = window.confirm(
      `Tem certeza que deseja aplicar a descrição atual a ${selectedProducts.length} produto(s)? Esta ação irá sobrescrever as descrições existentes.`
    );

    if (!confirmed) return;

    console.log('Iniciando aplicação em múltiplos produtos:', selectedProducts);
    
    setIsUpdating(true);
    setProgress(0);
    
    // Initialize status for all selected products
    const initialStatuses = selectedProducts.map(id => ({ id, status: 'pending' as const }));
    setUpdateStatuses(initialStatuses);

    try {
      console.log('Chamando onApplyToProducts com IDs:', selectedProducts);
      
      // Real-time status callback to track individual product progress
      const handleStatusChange = (productId: number, status: 'pending' | 'success' | 'error', message?: string) => {
        setUpdateStatuses(prev => {
          const updated = [...prev];
          const index = updated.findIndex(s => s.id === productId);
          if (index >= 0) {
            updated[index] = { id: productId, status, message };
          } else {
            updated.push({ id: productId, status, message });
          }
          return updated;
        });
        
        // Update progress based on completed items (success or error)
        setUpdateStatuses(currentStatuses => {
          const completedCount = currentStatuses.filter(s => s.status === 'success' || s.status === 'error').length;
          const progressPercent = Math.round((completedCount / selectedProducts.length) * 100);
          setProgress(progressPercent);
          return currentStatuses;
        });
      };
      
      // Call the parent function to handle the updates with status tracking
      await onApplyToProducts(selectedProducts, handleStatusChange);
      
      console.log('onApplyToProducts executado com sucesso');
      
      // Check final status to determine if we should show success or partial success
      const finalStatuses = updateStatuses.filter(s => selectedProducts.includes(s.id));
      const successCount = finalStatuses.filter(s => s.status === 'success').length;
      const errorCount = finalStatuses.filter(s => s.status === 'error').length;
      
      setProgress(100);
      
      if (successCount === selectedProducts.length) {
        toast({
          title: 'Sucesso',
          description: `Descrições aplicadas a ${selectedProducts.length} produto(s) com sucesso!`,
        });
        
        // Close dialog after success with a small delay to show the success state
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else if (successCount > 0) {
        toast({
          title: 'Processamento Parcial',
          description: `${successCount} de ${selectedProducts.length} produtos atualizados com sucesso.`,
          variant: 'default',
        });
        
        // Keep dialog open to show results
        setIsUpdating(false);
      } else {
        // All failed - this should be handled in the catch block
        throw new Error('Nenhum produto foi atualizado com sucesso');
      }
      
    } catch (error) {
      console.error('Erro ao aplicar descrições:', error);
      
      // Check if it's an auth error
      const isAuthError = error instanceof Error && 
        (error.message.includes('AUTH_INVALID') || error.message.includes('Token Expirado'));
      
      if (isAuthError) {
        // Mark all as error with auth message
        const errorStatuses = selectedProducts.map(id => ({ 
          id, 
          status: 'error' as const,
          message: 'Token expirado - reconecte sua loja'
        }));
        setUpdateStatuses(errorStatuses);
        setAuthInvalid(true);
        
        toast({
          variant: 'destructive',
          title: 'Token Expirado',
          description: 'Sua sessão com a Nuvemshop expirou. Reconecte a loja para continuar.',
        });
      } else {
        // Mark all as error
        const errorStatuses = selectedProducts.map(id => ({ 
          id, 
          status: 'error' as const,
          message: error instanceof Error ? error.message : 'Erro ao atualizar descrição'
        }));
        setUpdateStatuses(errorStatuses);
        
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: error instanceof Error ? error.message : 'Ocorreu um erro ao aplicar as descrições. Tente novamente.',
        });
      }
      
      // Reset updating state but keep the dialog open to show errors
      setIsUpdating(false);
    }
  };

  const getProductName = (product: NuvemshopProduct) => {
    return typeof product.name === 'string' 
      ? product.name 
      : (product.name?.pt || 'Produto sem nome');
  };

  const getProductStatus = (productId: number) => {
    return updateStatuses.find(status => status.id === productId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Aplicar Descrição a Múltiplos Produtos
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Auth invalid alert */}
          {authInvalid && onReconnect && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Sua sessão com a Nuvemshop expirou.</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onReconnect();
                    handleClose();
                  }}
                >
                  Reconectar loja
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Progress bar when updating */}
          {isUpdating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Atualizando produtos...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {/* Select all button */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              disabled={isUpdating}
            >
              {selectedProducts.length === products.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </Button>
            <Badge variant="outline">
              {selectedProducts.length} de {products.length} selecionados
            </Badge>
          </div>
          
          {/* Product list */}
          <div className="space-y-2 max-h-96 overflow-y-auto border rounded-md p-2">
            {products.map((product) => {
              const status = getProductStatus(product.id);
              
              return (
                <div 
                  key={product.id} 
                  className="flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50"
                >
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => handleProductToggle(product.id)}
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
                      <div className="text-sm text-gray-500">
                        SKU: {product.sku}
                      </div>
                    )}
                    
                    {status?.message && (
                      <div className={`text-sm ${status.status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                        {status.message}
                      </div>
                    )}
                  </div>
                  
                  {/* Status indicator */}
                  {status && (
                    <div className="flex items-center gap-1">
                      {status.status === 'pending' && (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      )}
                      {status.status === 'success' && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                      {status.status === 'error' && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={isUpdating}
            >
              {isUpdating ? 'Cancelar' : 'Fechar'}
            </Button>
            <Button 
              onClick={handleApplyDescriptions}
              disabled={selectedProducts.length === 0 || isUpdating || (!description && !getHtmlOutput?.()) || authInvalid}
            >
              {authInvalid ? (
                'Reconecte para continuar'
              ) : isUpdating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Aplicando...
                </>
              ) : (
                `Aplicar a ${selectedProducts.length} produto(s)`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleProductSelection;
