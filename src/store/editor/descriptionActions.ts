
import { ProductDescription, Template } from '@/types/editor';
import { EditorState } from './types';
import { v4 as uuidv4 } from 'uuid';

export const createDescriptionActions = (get: () => EditorState, set: any) => ({
  createNewDescription: (name: string) => {
    // Log for debugging
    console.log('Creating new description in store:', name);
    
    // Create a new description with proper initialization
    set({
      description: {
        id: uuidv4(),
        name,
        blocks: [], // Initialize with empty blocks array
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      selectedBlockId: null,
      focusedBlockId: null,
    });
    
    return true; // Return success value for error handling
  },

  loadDescription: (description: ProductDescription) => {
    console.log('Loading description:', description.name, description.id);
    set({
      description,
      selectedBlockId: null,
      focusedBlockId: null,
    });
  },

  updateDescription: (updatedDescription: ProductDescription) => {
    console.log('Updating description:', updatedDescription.id);
    set({
      description: updatedDescription,
    });
  },

  loadTemplate: (template: Template) => {
    const currentDescription = get().description;
    console.log('Loading template with current description:', currentDescription?.id);
    
    // If no description exists, create a temporary one
    if (!currentDescription) {
      const tempDescription = {
        id: uuidv4(),
        name: 'Nova Descrição',  // This will be required to be changed when saving
        blocks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set({ description: tempDescription });
      console.log('Created temporary description:', tempDescription.id);
    }
    
    // Create a proper typed copy of each block
    const updatedBlocks = template.blocks.map(templateBlock => {
      const blockCopy = JSON.parse(JSON.stringify(templateBlock));
      blockCopy.id = uuidv4();
      return blockCopy;
    });
    
    // Update the state with properly typed blocks
    set((state: EditorState) => {
      const description = state.description || {};
      return {
        ...state,
        selectedBlockId: null,
        focusedBlockId: null,
        description: {
          ...description,
          blocks: updatedBlocks,
          updatedAt: new Date().toISOString(),
        }
      };
    });
    
    console.log('Template loaded with blocks:', updatedBlocks.length);
  },
});
