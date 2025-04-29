
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useNuvemshopAuth } from '../hooks/useNuvemshopAuth';
import { useProductDescriptionSaver } from '../hooks/useProductDescriptionSaver';
import { NuvemshopProduct } from '../types';
import { useToast } from '@/hooks/use-toast';
import { useEditorStore } from '@/store/editor';

interface SaveToNuvemshopButtonProps {
  product: NuvemshopProduct;
}

const SaveToNuvemshopButton: React.FC<SaveToNuvemshopButtonProps> = ({ product }) => {
  const { toast } = useToast();
  const { description } = useEditorStore();
  const { accessToken, userId } = useNuvemshopAuth();
  const { isSaving, handleSaveToNuvemshop } = useProductDescriptionSaver(accessToken, userId);
  
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
    
    await handleSaveToNuvemshop(product);
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleSave}
      disabled={isSaving || !description}
      className="ml-2"
      title={`Salvar descrição para: ${productName}`}
    >
      <Save className="h-4 w-4 mr-2" />
      {isSaving ? 'Salvando...' : 'Salvar na Nuvemshop'}
    </Button>
  );
};

export default SaveToNuvemshopButton;
