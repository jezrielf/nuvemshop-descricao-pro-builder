import React, { useEffect } from 'react';
import { useEditor } from './editor/hooks/useEditor';
import EmptyState from './editor/EmptyState';
import EditorContent from './editor/EditorContent';
import AddBlock from './AddBlock';

const Editor: React.FC = () => {
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

  // Show empty state if no description exists
  if (!description) {
    return (
      <EmptyState
        isPremiumUser={isPremiumUser}
        isBusinessUser={isBusinessUser}
        onStartNewDescription={handleStartNewDescription}
      />
    );
  }

  // Description exists but has no blocks - show the AddBlock component directly
  if (description && description.blocks.length === 0) {
    return (
      <div className="h-full flex flex-col p-4">
        <div className="text-center my-4">
          <h2 className="text-base font-medium mb-1">Nova Descrição: {description.name}</h2>
          <p className="text-gray-500 text-xs mb-4">
            Adicione blocos para construir sua descrição de produto
          </p>
        </div>
        <AddBlock />
      </div>
    );
  }

  // Otherwise show the full editor content
  return (
    <EditorContent
      description={description}
      isPremiumUser={isPremiumUser}
      isBusinessUser={isBusinessUser}
      onDragEnd={handleDragEnd}
      onUpdateImage={handleUpdateImage}
    />
  );
};

export default Editor;
