
import { ProductDescription } from '@/types/editor';
import { EditorState } from './types';
import { useAuth } from '@/contexts/AuthContext';

export const createSaveActions = (get: () => EditorState, set: any) => {
  // We'll store the auth context reference globally
  let authContext: ReturnType<typeof useAuth> | null = null;

  // Function to set the auth context from components
  const setAuthContext = (context: ReturnType<typeof useAuth>) => {
    authContext = context;
    
    // Update user information in the store
    if (context && context.user) {
      set({ user: { id: context.user.id } });
    } else {
      set({ user: null });
    }
  };

  return {
    // Add the setter function for auth context
    setAuthContext,
    
    saveCurrentDescription: () => {
      const description = get().description;
      if (!description) return false;
      
      try {
        // Check if auth context is available
        if (!authContext) {
          console.warn('Auth context not available for saving description');
          return false;
        }
        
        // Check if user is premium/business or has saved less than 3 descriptions
        if (!authContext.isPremium() && !authContext.canCreateMoreDescriptions()) {
          return false;
        }
        
        // Increment description count for free users
        if (!authContext.isPremium()) {
          authContext.incrementDescriptionCount();
        }
        
        // Update the timestamp
        const updatedDescription = {
          ...description,
          updatedAt: new Date().toISOString()
        };
        
        // Get existing saved descriptions
        let savedDescriptions = get().savedDescriptions;
        
        // Check if this description already exists, if so update it
        const existingIndex = savedDescriptions.findIndex(d => d.id === description.id);
        if (existingIndex >= 0) {
          savedDescriptions[existingIndex] = updatedDescription;
        } else {
          savedDescriptions = [...savedDescriptions, updatedDescription];
        }
        
        // Save to localStorage
        const storageKey = authContext.user ? `savedDescriptions_${authContext.user.id}` : 'savedDescriptions_anonymous';
        localStorage.setItem(storageKey, JSON.stringify(savedDescriptions));
        
        // Update state
        set({ 
          savedDescriptions,
          description: updatedDescription
        });
        
        return true;
      } catch (error) {
        console.error('Error saving description:', error);
        return false;
      }
    },
    
    loadSavedDescriptions: () => {
      try {
        // Check if auth context is available
        if (!authContext) {
          console.warn('Auth context not available for loading descriptions');
          return;
        }
        
        // Only premium/business users can load saved descriptions
        if (!authContext.isPremium()) {
          set({ savedDescriptions: [] });
          return;
        }
        
        const storageKey = authContext.user ? `savedDescriptions_${authContext.user.id}` : 'savedDescriptions_anonymous';
        const saved = localStorage.getItem(storageKey);
        
        if (saved) {
          const parsedDescriptions = JSON.parse(saved) as ProductDescription[];
          set({ savedDescriptions: parsedDescriptions });
        }
      } catch (error) {
        console.error('Error loading saved descriptions:', error);
      }
    },
    
    getSavedDescriptions: () => {
      return get().savedDescriptions;
    }
  };
};
