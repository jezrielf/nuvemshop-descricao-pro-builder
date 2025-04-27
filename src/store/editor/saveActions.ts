
import { ProductDescription } from '@/types/editor';
import { EditorState } from './types';
import { useAuth } from '@/contexts/AuthContext';

export const createSaveActions = (get: () => EditorState, set: any) => {
  let authContext: ReturnType<typeof useAuth> | null = null;

  const setAuthContext = (context: ReturnType<typeof useAuth>) => {
    authContext = context;
    if (context && context.user && context.profile) {
      set({ user: { 
        id: context.user.id,
        name: context.profile?.nome || context.user.email?.split('@')[0] || 'Usuário',
        email: context.user.email || ''
      }});
    } else {
      set({ user: null });
    }
  };

  const getStorageKey = (userId: string | number | undefined | null): string => {
    if (!userId) return 'savedDescriptions_anonymous';
    return `savedDescriptions_${String(userId)}`;
  };

  const migratePreviousDescriptions = (userId: string | null, allDescriptions: ProductDescription[]) => {
    // List of possible keys to check
    const possibleKeys = [
      getStorageKey(userId),
      `savedDescriptions_${JSON.stringify(userId)}`,
      'savedDescriptions_anonymous'
    ];

    // Check all possible keys for existing descriptions
    for (const key of possibleKeys) {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        try {
          const oldDescriptions = JSON.parse(savedData) as ProductDescription[];
          if (Array.isArray(oldDescriptions) && oldDescriptions.length > 0) {
            oldDescriptions.forEach(oldDesc => {
              if (!allDescriptions.some(d => d.id === oldDesc.id)) {
                allDescriptions.push(oldDesc);
              }
            });
          }
        } catch (err) {
          console.error(`Error parsing data from ${key}:`, err);
        }
      }
    }

    return allDescriptions;
  };

  return {
    setAuthContext,
    
    saveCurrentDescription: () => {
      const description = get().description;
      if (!description || !authContext) return false;

      try {
        // Check premium status or description count
        if (!authContext.isPremium() && !authContext.canCreateMoreDescriptions()) {
          console.log('User cannot save more descriptions');
          return false;
        }

        // Update timestamps
        const updatedDescription = {
          ...description,
          updatedAt: new Date().toISOString()
        };

        // Get user ID and storage key
        const userId = authContext.user?.id;
        const storageKey = getStorageKey(userId);

        // Get existing descriptions and update/add new one
        let savedDescriptions = get().savedDescriptions;
        const existingIndex = savedDescriptions.findIndex(d => d.id === description.id);
        
        if (existingIndex >= 0) {
          savedDescriptions[existingIndex] = updatedDescription;
        } else {
          savedDescriptions = [...savedDescriptions, updatedDescription];
        }

        // Save to localStorage with consistent key
        localStorage.setItem(storageKey, JSON.stringify(savedDescriptions));
        
        // Update state
        set({ 
          savedDescriptions,
          description: updatedDescription
        });

        console.log(`Saved description successfully to ${storageKey}`);
        return true;
      } catch (error) {
        console.error('Error saving description:', error);
        return false;
      }
    },

    loadSavedDescriptions: () => {
      if (!authContext) {
        console.warn('Auth context not available');
        return;
      }

      try {
        const userId = authContext.user?.id;
        const primaryKey = getStorageKey(userId);
        
        console.log(`Loading descriptions for user ${userId} from ${primaryKey}`);
        
        let descriptions: ProductDescription[] = [];
        
        // Load from primary storage
        const savedData = localStorage.getItem(primaryKey);
        if (savedData) {
          try {
            descriptions = JSON.parse(savedData);
            if (!Array.isArray(descriptions)) {
              descriptions = [];
            }
          } catch (err) {
            console.error('Error parsing saved descriptions:', err);
            descriptions = [];
          }
        }
        
        // Migrate descriptions from other possible storage locations
        descriptions = migratePreviousDescriptions(userId, descriptions);
        
        // Save consolidated descriptions to primary key
        if (descriptions.length > 0) {
          localStorage.setItem(primaryKey, JSON.stringify(descriptions));
        }
        
        set({ savedDescriptions: descriptions });
        console.log(`Loaded ${descriptions.length} descriptions`);
        
        return descriptions;
      } catch (error) {
        console.error('Error loading descriptions:', error);
        return [];
      }
    },
    
    getSavedDescriptions: () => get().savedDescriptions
  };
};
