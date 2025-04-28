
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditorStore } from '@/store/editor';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

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
    createNewDescription('Nova Descrição ' + new Date().toLocaleTimeString());
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
