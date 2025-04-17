
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
      
      // Create a deep copy of the template blocks with a try-catch for extra safety
      let templateBlocksCopy;
      try {
        templateBlocksCopy = JSON.parse(JSON.stringify(template.blocks));
      } catch (error) {
        console.error('Error creating deep copy of template blocks:', error);
        templateBlocksCopy = [];
      }
      
      // Early return if no valid blocks
      if (!templateBlocksCopy || !Array.isArray(templateBlocksCopy) || templateBlocksCopy.length === 0) {
        console.warn('No valid template blocks to load');
        return;
      }
      
      // Parse and validate each block, ensuring it has all required properties
      // Wrap in try-catch to catch any parsing errors
      let validatedBlocks = [];
      try {
        validatedBlocks = parseTemplateBlocks(templateBlocksCopy).map(block => {
          // Generate new IDs for each block to avoid conflicts
          return {
            ...block,
            id: uuidv4()
          };
        });
      } catch (error) {
        console.error('Error parsing template blocks:', error);
        validatedBlocks = [];
      }
      
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
