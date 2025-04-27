
import { ProductDescription } from '@/types/editor';
import { EditorState } from './types';
import { useAuth } from '@/contexts/AuthContext';

export const createSaveActions = (get: () => EditorState, set: any) => {
  // We'll store the auth context reference globally
  let authContext: ReturnType<typeof useAuth> | null = null;

  // Function to set the auth context from components
  const setAuthContext = (context: ReturnType<typeof useAuth>) => {
    authContext = context;
    
    // Update user information in the store with proper formatting
    if (context && context.user) {
      set({ user: { 
        id: context.user.id,
        name: context.user.nome || 'Usuário',
        email: context.user.email || ''
      }});
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
        
        // Get proper user ID for storage key
        const userId = authContext.user?.id;
        const userIdString = userId ? String(userId) : 'anonymous';
        const storageKey = `savedDescriptions_${userIdString}`;
        
        // For backward compatibility, also check the old format
        const oldStorageKey = `savedDescriptions_${JSON.stringify(userId)}`;
        
        // Try to migrate descriptions from old format if they exist
        try {
          const oldSaved = localStorage.getItem(oldStorageKey);
          if (oldSaved) {
            const oldDescriptions = JSON.parse(oldSaved) as ProductDescription[];
            if (Array.isArray(oldDescriptions) && oldDescriptions.length > 0) {
              console.log(`Migrating ${oldDescriptions.length} descriptions from old format`);
              
              // Combine old and new descriptions, ensuring no duplicates
              const allDescriptions = [...savedDescriptions];
              
              for (const oldDesc of oldDescriptions) {
                if (!allDescriptions.some(d => d.id === oldDesc.id)) {
                  allDescriptions.push(oldDesc);
                }
              }
              
              // Update state and storage
              savedDescriptions = allDescriptions;
              localStorage.setItem(storageKey, JSON.stringify(allDescriptions));
              localStorage.removeItem(oldStorageKey); // Remove old format
            }
          }
        } catch (migrationError) {
          console.error('Error during description migration:', migrationError);
          // Continue with saving even if migration failed
        }
        
        // Save to localStorage
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
        
        const userId = authContext.user?.id;
        const userIdString = userId ? String(userId) : 'anonymous';
        
        // Try multiple storage keys for backward compatibility
        const storageKeys = [
          `savedDescriptions_${userIdString}`,
          `savedDescriptions_${JSON.stringify(userId)}`,
          'savedDescriptions_anonymous'
        ];
        
        let allDescriptions: ProductDescription[] = [];
        
        for (const key of storageKeys) {
          const saved = localStorage.getItem(key);
          if (saved) {
            try {
              const parsedDescriptions = JSON.parse(saved) as ProductDescription[];
              if (Array.isArray(parsedDescriptions)) {
                // Add only descriptions that aren't already in the list
                for (const desc of parsedDescriptions) {
                  if (!allDescriptions.some(d => d.id === desc.id)) {
                    allDescriptions.push(desc);
                  }
                }
              }
            } catch (parseError) {
              console.error(`Error parsing saved descriptions from key ${key}:`, parseError);
            }
          }
        }
        
        // If descriptions were found, consolidate them to the primary storage key
        if (allDescriptions.length > 0) {
          const primaryKey = `savedDescriptions_${userIdString}`;
          localStorage.setItem(primaryKey, JSON.stringify(allDescriptions));
          
          // Clean up old storage formats
          for (const key of storageKeys) {
            if (key !== primaryKey) {
              localStorage.removeItem(key);
            }
          }
        }
        
        set({ savedDescriptions: allDescriptions });
      } catch (error) {
        console.error('Error loading saved descriptions:', error);
      }
    },
    
    getSavedDescriptions: () => {
      return get().savedDescriptions;
    }
  };
};
