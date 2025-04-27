
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

  // Helper for consistent storage key generation
  const getStorageKey = (userId: string | number | undefined | null): string => {
    if (!userId) return 'savedDescriptions_anonymous';
    
    // Always convert to string and ensure consistent format
    return `savedDescriptions_${String(userId)}`;
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
        const primaryKey = getStorageKey(userId);
        
        // Log for debugging
        console.log(`Saving descriptions for user ID: ${userId} using key: ${primaryKey}`);
        
        // For backward compatibility, check multiple formats
        const possibleKeys = [
          primaryKey,
          `savedDescriptions_${JSON.stringify(userId)}`,
          'savedDescriptions_anonymous'
        ];
        
        // Try to migrate descriptions from old format if they exist
        try {
          // Check all possible keys for existing descriptions
          let allDescriptions = [...savedDescriptions];
          let migratedCount = 0;
          
          for (const key of possibleKeys) {
            if (key === primaryKey) continue; // Skip primary key as we'll save to it later
            
            const oldSaved = localStorage.getItem(key);
            if (oldSaved) {
              try {
                const oldDescriptions = JSON.parse(oldSaved) as ProductDescription[];
                if (Array.isArray(oldDescriptions) && oldDescriptions.length > 0) {
                  console.log(`Migrating ${oldDescriptions.length} descriptions from key: ${key}`);
                  
                  // Combine without duplicates
                  for (const oldDesc of oldDescriptions) {
                    if (!allDescriptions.some(d => d.id === oldDesc.id)) {
                      allDescriptions.push(oldDesc);
                      migratedCount++;
                    }
                  }
                  
                  // Remove old format after migration
                  localStorage.removeItem(key);
                }
              } catch (parseError) {
                console.error(`Error parsing descriptions from key ${key}:`, parseError);
              }
            }
          }
          
          if (migratedCount > 0) {
            console.log(`Successfully migrated ${migratedCount} descriptions to primary key: ${primaryKey}`);
            savedDescriptions = allDescriptions;
          }
        } catch (migrationError) {
          console.error('Error during description migration:', migrationError);
          // Continue with saving even if migration failed
        }
        
        // Save to localStorage with consistent key
        localStorage.setItem(primaryKey, JSON.stringify(savedDescriptions));
        
        // Update state
        set({ 
          savedDescriptions,
          description: updatedDescription
        });
        
        console.log(`Saved ${savedDescriptions.length} descriptions successfully`);
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
        
        // Get user ID and generate consistent key
        const userId = authContext.user?.id;
        const primaryKey = getStorageKey(userId);
        
        console.log(`Loading descriptions for user ID: ${userId} using key: ${primaryKey}`);
        
        // Try multiple storage keys for backward compatibility
        const possibleKeys = [
          primaryKey,
          `savedDescriptions_${JSON.stringify(userId)}`,
          'savedDescriptions_anonymous'
        ];
        
        let allDescriptions: ProductDescription[] = [];
        let foundDescriptions = false;
        
        for (const key of possibleKeys) {
          const saved = localStorage.getItem(key);
          if (saved) {
            try {
              const parsedDescriptions = JSON.parse(saved) as ProductDescription[];
              if (Array.isArray(parsedDescriptions)) {
                foundDescriptions = true;
                console.log(`Found ${parsedDescriptions.length} descriptions in key: ${key}`);
                
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
          console.log(`Consolidating ${allDescriptions.length} descriptions to primary key: ${primaryKey}`);
          localStorage.setItem(primaryKey, JSON.stringify(allDescriptions));
          
          // Clean up old storage formats
          for (const key of possibleKeys) {
            if (key !== primaryKey) {
              localStorage.removeItem(key);
            }
          }
        }
        
        // Set the descriptions in the store
        set({ savedDescriptions: allDescriptions });
        
        console.log(`Loaded ${allDescriptions.length} descriptions successfully`);
        
        return allDescriptions;
      } catch (error) {
        console.error('Error loading saved descriptions:', error);
        return [];
      }
    },
    
    getSavedDescriptions: () => {
      return get().savedDescriptions;
    }
  };
};
