
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, RefreshCw, Check } from 'lucide-react';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { useProductDescriptionSaver } from '../hooks/useProductDescriptionSaver';
import { NuvemshopProduct } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';
import { useNimbusUI } from '../NimbusProvider';
import { NimbusButton } from '../NimbusProvider';

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
  const [saveSuccess, setSaveSuccess] = useState(false);
  
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
    
    const success = await handleSaveToNuvemshop(product);
    
    if (success) {
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
  
  // Normal button state
  if (isNimbusUIActive) {
    return (
      <NimbusButton 
        variant={isSaving ? "secondary" : "primary"} 
        size="small" 
        onClick={handleSave}
        disabled={isSaving || !description}
        className="ml-2"
      >
        {isSaving ? (
          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        {isSaving ? 'Salvando...' : 'Salvar na Nuvemshop'}
      </NimbusButton>
    );
  }
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleSave}
      disabled={isSaving || !description}
      className="ml-2"
      title={`Salvar descrição para: ${productName}`}
    >
      {isSaving ? (
        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Save className="h-4 w-4 mr-2" />
      )}
      {isSaving ? 'Salvando...' : 'Salvar na Nuvemshop'}
    </Button>
  );
};

export default SaveToNuvemshopButton;
