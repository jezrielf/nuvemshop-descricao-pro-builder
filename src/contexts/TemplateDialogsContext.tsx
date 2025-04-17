
import React, { createContext, useContext } from 'react';
import { Template } from '@/types/editor';
import { useTemplateDialogs } from '@/hooks/templates/useTemplateDialogs';

// Define the context type
type TemplateDialogsContextType = ReturnType<typeof useTemplateDialogs>;

// Create the context with an empty default value
const TemplateDialogsContext = createContext<TemplateDialogsContextType | undefined>(undefined);

// Provider component
export const TemplateDialogsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dialogState = useTemplateDialogs();
  
  return (
    <TemplateDialogsContext.Provider value={dialogState}>
      {children}
    </TemplateDialogsContext.Provider>
  );
};

// Hook for consuming the context
export const useTemplateDialogsContext = (): TemplateDialogsContextType => {
  const context = useContext(TemplateDialogsContext);
  
  if (context === undefined) {
    throw new Error('useTemplateDialogsContext must be used within a TemplateDialogsProvider');
  }
  
  return context;
};
