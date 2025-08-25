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
    
    saveCurrentDescription: (isNewDescription: boolean = true) => {
      const description = get().description;
      if (!description) return false;
      
      try {
        // Use fallback if auth context not available yet
        const { user } = get();
        const currentUser = authContext?.user || user;
        
        // Check limits only for NEW descriptions
        if (isNewDescription && authContext && !authContext.isPremium() && !authContext.canCreateMoreDescriptions()) {
          return false;
        }
        
        // Increment description count only for NEW descriptions for free users
        if (isNewDescription && authContext && !authContext.isPremium()) {
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
        
        // Save to localStorage with fallback user handling
        const storageKey = currentUser ? `savedDescriptions_${currentUser.id}` : 'savedDescriptions_anonymous';
        try {
          localStorage.setItem(storageKey, JSON.stringify(savedDescriptions));
          console.log(`Description saved to ${storageKey}, total: ${savedDescriptions.length}`);
        } catch (storageError) {
          console.error('Error saving to localStorage:', storageError);
          return false;
        }
        
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
          console.log('Auth context not available for loading descriptions, using fallback');
          // Fallback to load from anonymous storage or user ID from store
          const { user } = get();
          const userId = user?.id;
          const fallbackKey = userId ? `savedDescriptions_${userId}` : 'savedDescriptions_anonymous';
          const fallbackSaved = localStorage.getItem(fallbackKey);
          
          if (fallbackSaved) {
            try {
              const parsedDescriptions = JSON.parse(fallbackSaved) as ProductDescription[];
              set({ savedDescriptions: parsedDescriptions });
              console.log(`Loaded ${parsedDescriptions.length} descriptions from fallback storage`);
            } catch (e) {
              console.error('Error parsing saved descriptions from fallback storage:', e);
              set({ savedDescriptions: [] });
            }
          }
          return;
        }
        
        // Get all saved descriptions for the current user
        const storageKey = authContext.user ? `savedDescriptions_${authContext.user.id}` : 'savedDescriptions_anonymous';
        const saved = localStorage.getItem(storageKey);
        
        console.log(`Loading descriptions from storage key: ${storageKey}`);
        
        if (saved) {
          try {
            const parsedDescriptions = JSON.parse(saved) as ProductDescription[];
            console.log(`Found ${parsedDescriptions.length} saved descriptions`);
            set({ savedDescriptions: parsedDescriptions });
          } catch (e) {
            console.error('Error parsing saved descriptions:', e);
            set({ savedDescriptions: [] });
          }
        } else {
          console.log('No saved descriptions found in storage');
          set({ savedDescriptions: [] });
        }
      } catch (error) {
        console.error('Error loading saved descriptions:', error);
        set({ savedDescriptions: [] });
      }
    },
    
    getSavedDescriptions: () => {
      return get().savedDescriptions;
    }
  };
};
