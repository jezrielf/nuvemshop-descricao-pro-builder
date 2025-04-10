
import { ProductDescription } from '@/types/editor';
import { EditorState } from './types';
import { useAuth } from '@/contexts/AuthContext';

export const createSaveActions = (get: () => EditorState, set: any) => {
  // Helper to get auth context - need to create this outside component because
  // we can't use hooks directly in zustand actions
  const getAuth = () => {
    // This is a bit of a hack but we need to access auth context
    const authModule = require('@/contexts/AuthContext');
    const context = authModule.useAuth();
    return context;
  };

  return {
    saveCurrentDescription: () => {
      const description = get().description;
      if (!description) return false;
      
      try {
        const auth = getAuth();
        
        // Check if user is premium or has saved less than 3 descriptions
        if (!auth.isPremium() && !auth.canCreateMoreDescriptions()) {
          return false;
        }
        
        // Increment description count for free users
        if (!auth.isPremium()) {
          auth.incrementDescriptionCount();
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
        const storageKey = auth.user ? `savedDescriptions_${auth.user.id}` : 'savedDescriptions_anonymous';
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
        const auth = getAuth();
        const storageKey = auth.user ? `savedDescriptions_${auth.user.id}` : 'savedDescriptions_anonymous';
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
