
import { ProductDescription } from '@/types/editor';
import { EditorState } from './types';
import { useAuth } from '@/contexts/AuthContext';
import { DescriptionsService } from '@/services/descriptionsService';

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

  // Migration helper: moves localStorage data to Supabase
  const migrateLocalStorageToSupabase = async (userId: string) => {
    try {
      const localKeys = [`savedDescriptions_${userId}`, 'savedDescriptions_anonymous'];
      const allLocalDescriptions: ProductDescription[] = [];

      // Collect descriptions from all possible local storage keys
      for (const key of localKeys) {
        const saved = localStorage.getItem(key);
        if (saved) {
          try {
            const descriptions = JSON.parse(saved) as ProductDescription[];
            allLocalDescriptions.push(...descriptions);
          } catch (e) {
            console.error(`Error parsing localStorage key ${key}:`, e);
          }
        }
      }

      if (allLocalDescriptions.length > 0) {
        console.log(`Migrating ${allLocalDescriptions.length} descriptions to Supabase...`);
        
        const success = await DescriptionsService.batchUpsert(allLocalDescriptions);
        
        if (success) {
          // Clear localStorage after successful migration
          localKeys.forEach(key => localStorage.removeItem(key));
          console.log('Migration completed successfully');
        } else {
          console.warn('Migration failed, keeping localStorage data');
        }
      }
    } catch (error) {
      console.error('Error during migration:', error);
    }
  };

  return {
    // Add the setter function for auth context
    setAuthContext,
    
    saveCurrentDescription: async (isNewDescription: boolean = true): Promise<boolean> => {
      const description = get().description;
      if (!description) return false;
      
      try {
        // Check if auth context is available
        if (!authContext) {
          console.warn('Auth context not available for saving description');
          return false;
        }
        
        // Check limits only for NEW descriptions
        if (isNewDescription && !authContext.isPremium() && !authContext.canCreateMoreDescriptions()) {
          return false;
        }
        
        // Increment description count only for NEW descriptions for free users
        if (isNewDescription && !authContext.isPremium()) {
          authContext.incrementDescriptionCount();
        }
        
        // Update the timestamp
        const updatedDescription = {
          ...description,
          updatedAt: new Date().toISOString()
        };
        
        // Save to Supabase if user is authenticated
        if (authContext.user) {
          const success = await DescriptionsService.upsert(updatedDescription);
          
          if (success) {
            // Update local state
            const savedDescriptions = await DescriptionsService.list();
            set({ 
              savedDescriptions,
              description: updatedDescription
            });
            return true;
          } else {
            console.error('Failed to save description to Supabase');
            return false;
          }
        } else {
          // Fallback: save to localStorage for anonymous users
          let savedDescriptions = get().savedDescriptions;
          
          const existingIndex = savedDescriptions.findIndex(d => d.id === description.id);
          if (existingIndex >= 0) {
            savedDescriptions[existingIndex] = updatedDescription;
          } else {
            savedDescriptions = [...savedDescriptions, updatedDescription];
          }
          
          localStorage.setItem('savedDescriptions_anonymous', JSON.stringify(savedDescriptions));
          
          set({ 
            savedDescriptions,
            description: updatedDescription
          });
          
          return true;
        }
      } catch (error) {
        console.error('Error saving description:', error);
        return false;
      }
    },
    
    loadSavedDescriptions: async (): Promise<void> => {
      try {
        // Check if auth context is available and user is authenticated
        if (authContext && authContext.user) {
          console.log('Loading descriptions from Supabase for authenticated user');
          
          // First, attempt migration from localStorage
          await migrateLocalStorageToSupabase(authContext.user.id);
          
          // Load from Supabase
          const descriptions = await DescriptionsService.list();
          set({ savedDescriptions: descriptions });
          console.log(`Loaded ${descriptions.length} descriptions from Supabase`);
        } else {
          // Fallback to localStorage for anonymous users
          console.log('Loading descriptions from localStorage for anonymous user');
          const saved = localStorage.getItem('savedDescriptions_anonymous');
          
          if (saved) {
            try {
              const parsedDescriptions = JSON.parse(saved) as ProductDescription[];
              set({ savedDescriptions: parsedDescriptions });
              console.log(`Loaded ${parsedDescriptions.length} descriptions from localStorage`);
            } catch (e) {
              console.error('Error parsing saved descriptions from localStorage:', e);
              set({ savedDescriptions: [] });
            }
          } else {
            set({ savedDescriptions: [] });
          }
        }
      } catch (error) {
        console.error('Error loading saved descriptions:', error);
        set({ savedDescriptions: [] });
      }
    },
    
    deleteSavedDescription: async (descriptionId: string): Promise<boolean> => {
      try {
        if (authContext && authContext.user) {
          // Delete from Supabase
          const success = await DescriptionsService.delete(descriptionId);
          
          if (success) {
            // Reload descriptions after deletion
            const descriptions = await DescriptionsService.list();
            set({ savedDescriptions: descriptions });
            return true;
          } else {
            console.error('Failed to delete description from Supabase');
            return false;
          }
        } else {
          // Delete from localStorage for anonymous users
          const saved = localStorage.getItem('savedDescriptions_anonymous');
          if (saved) {
            const descriptions = JSON.parse(saved) as ProductDescription[];
            const updatedDescriptions = descriptions.filter(d => d.id !== descriptionId);
            localStorage.setItem('savedDescriptions_anonymous', JSON.stringify(updatedDescriptions));
            set({ savedDescriptions: updatedDescriptions });
          }
          return true;
        }
      } catch (error) {
        console.error('Error deleting saved description:', error);
        return false;
      }
    },
    
    getSavedDescriptions: () => {
      return get().savedDescriptions;
    }
  };
};
