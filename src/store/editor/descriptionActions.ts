
import { ProductDescription, Template } from '@/types/editor';
import { EditorState } from './types';
import { v4 as uuidv4 } from 'uuid';
import { parseTemplateBlocks } from '@/utils/blockConverter';

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
    
    try {
      console.log('Loading template:', template.name);
      
      // Create a deep copy of the template blocks
      const templateBlocksCopy = JSON.parse(JSON.stringify(template.blocks));
      
      // Parse and validate each block, ensuring it has all required properties
      const validatedBlocks = parseTemplateBlocks(templateBlocksCopy).map(block => {
        // Generate new IDs for each block to avoid conflicts
        return {
          ...block,
          id: uuidv4()
        };
      });
      
      console.log('Validated blocks:', validatedBlocks);
      
      // Update the state with properly validated blocks
      set((state: EditorState) => {
        if (!state.description) return state;
        
        return {
          ...state,
          selectedBlockId: null,
          description: {
            ...state.description,
            blocks: validatedBlocks,
            updatedAt: new Date().toISOString(),
          }
        };
      });
    } catch (error) {
      console.error('Error loading template:', error);
    }
  },
});
