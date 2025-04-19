
import { ProductDescription, Template } from '@/types/editor';
import { EditorState } from './types';
import { v4 as uuidv4 } from 'uuid';

export const createDescriptionActions = (get: () => EditorState, set: any) => ({
  createNewDescription: (name: string) => {
    set({
      description: {
        id: uuidv4(),
        name,
        blocks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      selectedBlockId: null,
    });
  },

  loadDescription: (description: ProductDescription) => {
    set({
      description,
      selectedBlockId: null,
    });
  },

  loadTemplate: (template: Template) => {
    if (!get().description) return;
    
    // Create a proper typed copy of each block
    const updatedBlocks = template.blocks.map(templateBlock => {
      // Create a deep copy with a new ID
      const blockCopy = JSON.parse(JSON.stringify(templateBlock));
      blockCopy.id = uuidv4();
      
      // Ensure the block is properly typed based on its type property
      return blockCopy;
    });
    
    // Update the state with properly typed blocks
    set((state: EditorState) => {
      if (!state.description) return state;
      
      return {
        ...state,
        selectedBlockId: null,
        description: {
          ...state.description,
          blocks: updatedBlocks,
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },
});
