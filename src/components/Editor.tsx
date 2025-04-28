
import React from 'react';
import { useEditor } from './editor/hooks/useEditor';
import EmptyState from './editor/EmptyState';
import EditorContent from './editor/EditorContent';

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

  // Show empty state if no blocks exist
  if (!description?.blocks?.length) {
    return (
      <EmptyState
        isPremiumUser={isPremiumUser}
        isBusinessUser={isBusinessUser}
        onStartNewDescription={handleStartNewDescription}
      />
    );
  }

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
