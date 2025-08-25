import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, Package, CheckCircle2, XCircle } from 'lucide-react';
import { NuvemshopProduct } from '../types';
import { useToast } from '@/hooks/use-toast';

interface MultipleProductSelectionProps {
  products: NuvemshopProduct[];
  isOpen: boolean;
  onClose: () => void;
  onApplyToProducts: (productIds: number[]) => Promise<void>;
  onReconnect?: () => void;
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
  onReconnect
}) => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatuses, setUpdateStatuses] = useState<ProductUpdateStatus[]>([]);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

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
      
      // Call the parent function to handle the updates
      await onApplyToProducts(selectedProducts);
      
      console.log('onApplyToProducts executado com sucesso');
      
      // Mark all as successful if no error was thrown
      const successStatuses = selectedProducts.map(id => ({ 
        id, 
        status: 'success' as const,
        message: 'Descrição atualizada com sucesso'
      }));
      setUpdateStatuses(successStatuses);
      setProgress(100);
      
      toast({
        title: 'Sucesso',
        description: `Descrições aplicadas a ${selectedProducts.length} produto(s) com sucesso!`,
      });
      
      // Close dialog after success with a small delay to show the success state
      setTimeout(() => {
        handleClose();
      }, 1500);
      
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
        
        toast({
          variant: 'destructive',
          title: 'Token Expirado',
          description: onReconnect 
            ? 'Seu token de acesso expirou. Clique em "Reconectar Loja" para continuar.'
            : 'Seu token de acesso expirou. Reconecte sua loja para continuar.',
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
              disabled={selectedProducts.length === 0 || isUpdating}
            >
              {isUpdating ? (
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
