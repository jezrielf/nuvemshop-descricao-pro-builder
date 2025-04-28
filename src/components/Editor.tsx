
import React, { useEffect } from 'react';
import { useEditor } from './editor/hooks/useEditor';
import EmptyState from './editor/EmptyState';
import EditorContent from './editor/EditorContent';
import AddBlock from './AddBlock';
import { useNuvemshopAuth } from '@/components/Nuvemshop/hooks/useNuvemshopAuth';

interface EditorProps {
  selectedProduct?: any; // Add prop for selected product
}

const Editor: React.FC<EditorProps> = ({ selectedProduct }) => {
  const {
    description,
    isPremiumUser,
    isBusinessUser,
    handleDragEnd,
    handleUpdateImage,
    handleStartNewDescription
  } = useEditor();
  
  // Log in development environment
  if (process.env.NODE_ENV === 'development') {
    console.log("Editor component - isPremium:", isPremiumUser);
    console.log("Editor component - isBusiness:", isBusinessUser);
    console.log("Editor component - has description:", !!description);
    console.log("Editor component - blocks count:", description?.blocks?.length || 0);
  }

  if (!description) {
    return (
      <EmptyState
        isPremiumUser={isPremiumUser}
        isBusinessUser={isBusinessUser}
        onStartNewDescription={handleStartNewDescription}
      />
    );
  }

  if (description && description.blocks.length === 0) {
    return (
      <div className="h-full flex flex-col p-2">
        <div className="text-center my-2">
          <h2 className="text-xs font-medium mb-1">Nova Descrição: {description.name}</h2>
          <p className="text-[10px] text-gray-500 mb-2">
            Adicione blocos para construir sua descrição de produto
          </p>
        </div>
        <AddBlock />
      </div>
    );
  }

  return (
    <EditorContent
      description={description}
      isPremiumUser={isPremiumUser}
      isBusinessUser={isBusinessUser}
      onDragEnd={handleDragEnd}
      onUpdateImage={handleUpdateImage}
      selectedProduct={selectedProduct}
    />
  );
};

export default Editor;
