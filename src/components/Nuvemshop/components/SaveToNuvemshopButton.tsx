
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw, Check, Lock } from 'lucide-react';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { useProductDescriptionSaver } from '../hooks/useProductDescriptionSaver';
import { NuvemshopProduct } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNimbusUI } from '../NimbusProvider';
import { NimbusButton } from '../NimbusProvider';
import { useUsageQuota } from '@/hooks/useUsageQuota';
import { QuotaLimitDialog } from '@/components/usage/QuotaLimitDialog';
import { useAuth } from '@/contexts/AuthContext';

interface SaveToNuvemshopButtonProps {
  product: NuvemshopProduct;
  onSaveSuccess?: () => void;
}

export const SaveToNuvemshopButton: React.FC<SaveToNuvemshopButtonProps> = ({ 
  product,
  onSaveSuccess
}) => {
  const { toast } = useToast();
  const { description } = useEditorStore();
  const { accessToken, userId } = useNuvemshopAuth();
  const { isSaving, handleSaveToNuvemshop } = useProductDescriptionSaver(accessToken, userId);
  const { useNimbusUI: isNimbusUIActive } = useNimbusUI();
  const { user } = useAuth();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showQuotaDialog, setShowQuotaDialog] = useState(false);
  
  // Usage quota hook for distinct products
  const { count, remaining, reached, isUnlimited, logProductUpdate } = useUsageQuota('nuvemshop_saves');
  
  // Extract product name for display purposes
  const productName = product.name && typeof product.name === 'object' && product.name.pt 
    ? product.name.pt 
    : (typeof product.name === 'string' ? product.name : 'produto');
  
  const handleSave = async () => {
    if (!description) {
      toast({
        variant: 'destructive',
        title: 'Nenhuma descrição',
        description: 'É necessário ter uma descrição ativa para salvar na Nuvemshop.'
      });
      return;
    }
    
    // Check quota limit for non-unlimited users
    if (!isUnlimited && reached && !!user) {
      setShowQuotaDialog(true);
      return;
    }
    
    try {
      const success = await handleSaveToNuvemshop(product);
      
      if (success) {
        // Log product update (only counts if it's a new product for this user)
        if (!isUnlimited && !!user) {
          const updateResult = await logProductUpdate(product.id, product.store_id || 0);
          if (!updateResult.success) {
            console.error('Failed to log product update');
          }
          // If reached limit after this update, show dialog
          if (updateResult.wasNew && count + 1 >= 3) {
            // Small delay to let the user see the success state
            setTimeout(() => {
              toast({
                title: 'Limite atingido!',
                description: 'Você atingiu o limite de 3 produtos gratuitos. Assine para atualizar produtos ilimitados.',
                variant: 'default'
              });
            }, 1000);
          }
        }
        
        // Show success state briefly
        setSaveSuccess(true);
        
        // Call success callback if provided
        if (onSaveSuccess) {
          onSaveSuccess();
        }
        
        // Reset success state after delay
        setTimeout(() => {
          setSaveSuccess(false);
        }, 2000);
      }
    } catch (error) {
      // Error handling is already done in handleSaveToNuvemshop
      console.error('Save error:', error);
    }
  };
  
  // Show success state
  if (saveSuccess) {
    if (isNimbusUIActive) {
      return (
        <NimbusButton 
          variant="primary" 
          size="small" 
          className="ml-2 bg-green-600 text-white"
          disabled={true}
        >
          <Check className="h-4 w-4 mr-2" />
          Salvo com sucesso
        </NimbusButton>
      );
    }
    
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-2 bg-green-50 text-green-700 border-green-300"
        disabled={true}
      >
        <Check className="h-4 w-4 mr-2" />
        Salvo com sucesso
      </Button>
    );
  }
  
  // Determine if button should be disabled
  const isDisabled = isSaving || !description || (!isUnlimited && reached && !!user);
  
  // Normal button state
  if (isNimbusUIActive) {
    return (
      <>
        <NimbusButton 
          variant={isSaving ? "secondary" : "primary"} 
          size="small" 
          onClick={handleSave}
          disabled={isDisabled}
          className="ml-2"
        >
          {isSaving ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : isDisabled && !isUnlimited && reached ? (
            <Lock className="h-4 w-4 mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {isSaving ? 'Salvando...' : 'Salvar na Nuvemshop'}
          {!isUnlimited && !!user && (
            <span className="ml-1 text-xs opacity-75">({remaining}/3)</span>
          )}
        </NimbusButton>
        
        <QuotaLimitDialog
          open={showQuotaDialog}
          onOpenChange={setShowQuotaDialog}
          count={count}
          limit={3}
        />
      </>
    );
  }
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleSave}
        disabled={isDisabled}
        className="ml-2"
        title={`Salvar descrição para: ${productName}`}
      >
        {isSaving ? (
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        ) : isDisabled && !isUnlimited && reached ? (
          <Lock className="h-4 w-4 mr-2" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        {isSaving ? 'Salvando...' : 'Salvar na Nuvemshop'}
        {!isUnlimited && !!user && (
          <span className="ml-1 text-xs opacity-75">({remaining}/3)</span>
        )}
      </Button>
      
      <QuotaLimitDialog
        open={showQuotaDialog}
        onOpenChange={setShowQuotaDialog}
        count={count}
        limit={3}
      />
    </>
  );
};

export default SaveToNuvemshopButton;
