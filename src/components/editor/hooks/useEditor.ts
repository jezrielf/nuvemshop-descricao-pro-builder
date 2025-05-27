
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

export const useEditor = () => {
  const { description, reorderBlocks, updateBlock, createNewDescription } = useEditorStore();
  const { isPremium, isBusiness } = useAuth();
  const navigate = useNavigate();
  
  const isPremiumUser = isPremium();
  const isBusinessUser = isBusiness();
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    
    if (fromIndex === toIndex) return;
    
    reorderBlocks(fromIndex, toIndex);
  };
  
  const handleStartNewDescription = () => {
    console.log('Starting new description...');
    
    try {
      // Generate a name with date and time for uniqueness
      const descriptionName = 'Nova Descrição ' + new Date().toLocaleTimeString();
      
      // Call the store function with logging for debugging
      console.log('Creating new description with name:', descriptionName);
      const result = createNewDescription(descriptionName);
      console.log('Description creation result:', result);
      
      // Display success message to user
      toast({
        title: "Nova descrição criada",
        description: "Adicione blocos para construir sua descrição de produto",
      });
      
      // Force navigation to editor page to ensure UI updates
      if (window.location.pathname !== '/editor') {
        navigate('/editor');
      }
    } catch (error) {
      console.error('Error creating new description:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível criar nova descrição",
      });
    }
  };
  
  const handleUpdateImage = (blockId: string, imageType: string, newImageUrl: string) => {
    if (description) {
      const block = description.blocks.find(b => b.id === blockId);
      if (block) {
        updateBlock(blockId, {
          ...block,
          [imageType]: newImageUrl
        });
      }
    }
  };

  return {
    description,
    isPremiumUser,
    isBusinessUser,
    handleDragEnd,
    handleUpdateImage,
    handleStartNewDescription,
  };
};
