
import { Block, BlockType, ColumnLayout } from '@/types/editor';
import { EditorState } from './types';
import { v4 as uuidv4 } from 'uuid';
import { deepClone } from '@/utils/deepClone';

export const createBlockActions = (get: () => EditorState, set: any) => ({
  addBlock: (blockData: Partial<Block> & { type: BlockType, title: string, columns: ColumnLayout, visible: boolean }) => {
    if (!get().description) return;
    
    // Ensure the block has all required properties with proper defaults
    const blockWithDefaults = {
      id: uuidv4(),
      style: {},
      visible: true,
      columns: 'full' as ColumnLayout,
      ...blockData
    };
    
    // Ensure the block is properly typed and deeply cloned
    const block = deepClone(blockWithDefaults) as Block;
    
    console.log('Adding block to store:', block);
    
    set((state: EditorState) => {
      if (!state.description) return state;
      
      return {
        ...state,
        selectedBlockId: block.id,
        description: {
          ...state.description,
          blocks: [...state.description.blocks, block],
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  updateBlock: (id: string, updates: Partial<Block>) => {
    if (!get().description) return;
    
    set((state: EditorState) => {
      if (!state.description) return state;
      
      // Create a deep copy of the current blocks to prevent reference sharing
      const currentBlocks = deepClone(state.description.blocks);
      
      // Update the specific block with deep cloned updates
      const updatedBlocks = currentBlocks.map((block) => {
        if (block.id === id) {
          // Deep clone both the block and updates to ensure no reference sharing
          const clonedBlock = deepClone(block);
          const clonedUpdates = deepClone(updates);
          
          // Ensure style exists
          if (!clonedBlock.style) {
            clonedBlock.style = {};
          }
          
          // For blocks with array properties, ensure proper deep cloning
          const mergedBlock = { ...clonedBlock, ...clonedUpdates };
          
          // Special handling for nested array properties to prevent reference sharing
          // Use type-safe property access with 'in' operator
          if ('questions' in clonedUpdates && clonedUpdates.questions && Array.isArray(clonedUpdates.questions)) {
            mergedBlock.questions = deepClone(clonedUpdates.questions);
          }
          if ('benefits' in clonedUpdates && clonedUpdates.benefits && Array.isArray(clonedUpdates.benefits)) {
            mergedBlock.benefits = deepClone(clonedUpdates.benefits);
          }
          if ('features' in clonedUpdates && clonedUpdates.features && Array.isArray(clonedUpdates.features)) {
            mergedBlock.features = deepClone(clonedUpdates.features);
          }
          if ('specs' in clonedUpdates && clonedUpdates.specs && Array.isArray(clonedUpdates.specs)) {
            mergedBlock.specs = deepClone(clonedUpdates.specs);
          }
          if ('images' in clonedUpdates && clonedUpdates.images && Array.isArray(clonedUpdates.images)) {
            mergedBlock.images = deepClone(clonedUpdates.images);
          }
          
          return mergedBlock as Block;
        }
        return block;
      });
      
      return {
        ...state,
        description: {
          ...state.description,
          blocks: updatedBlocks,
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  duplicateBlock: (id: string) => {
    if (!get().description) return;
    
    const blockToDuplicate = get().description.blocks.find((block) => block.id === id);
    if (!blockToDuplicate) return;
    
    // Create a deep copy to prevent reference issues
    const blockCopy = deepClone(blockToDuplicate);
    blockCopy.id = uuidv4();
    
    // Ensure style exists
    if (!blockCopy.style) {
      blockCopy.style = {};
    }
    
    // Ensure unique IDs for all nested items using type-safe access
    if ('questions' in blockCopy && blockCopy.questions && Array.isArray(blockCopy.questions)) {
      blockCopy.questions = blockCopy.questions.map((q: any) => ({ ...q, id: uuidv4() }));
    }
    if ('benefits' in blockCopy && blockCopy.benefits && Array.isArray(blockCopy.benefits)) {
      blockCopy.benefits = blockCopy.benefits.map((b: any) => ({ ...b, id: uuidv4() }));
    }
    if ('features' in blockCopy && blockCopy.features && Array.isArray(blockCopy.features)) {
      blockCopy.features = blockCopy.features.map((f: any) => ({ ...f, id: uuidv4() }));
    }
    if ('specs' in blockCopy && blockCopy.specs && Array.isArray(blockCopy.specs)) {
      blockCopy.specs = blockCopy.specs.map((s: any) => ({ ...s, id: uuidv4() }));
    }
    if ('images' in blockCopy && blockCopy.images && Array.isArray(blockCopy.images)) {
      blockCopy.images = blockCopy.images.map((i: any) => ({ ...i, id: uuidv4() }));
    }
    
    // Ensure the blockCopy is properly typed as Block
    const typedBlockCopy = blockCopy as Block;
    
    set((state: EditorState) => {
      if (!state.description) return state;
      
      return {
        ...state,
        selectedBlockId: typedBlockCopy.id,
        description: {
          ...state.description,
          blocks: [...state.description.blocks, typedBlockCopy],
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  removeBlock: (id: string) => {
    if (!get().description) return;
    
    set((state: EditorState) => {
      if (!state.description) return state;
      
      return {
        ...state,
        selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
        description: {
          ...state.description,
          blocks: state.description.blocks.filter((block) => block.id !== id),
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  moveBlockUp: (id: string) => {
    if (!get().description) return;
    
    set((state: EditorState) => {
      if (!state.description) return state;
      
      const blocks = [...state.description.blocks];
      const index = blocks.findIndex((block) => block.id === id);
      if (index <= 0) return state;
      
      const temp = blocks[index];
      blocks[index] = blocks[index - 1];
      blocks[index - 1] = temp;
      
      return {
        ...state,
        description: {
          ...state.description,
          blocks,
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  moveBlockDown: (id: string) => {
    if (!get().description) return;
    
    set((state: EditorState) => {
      if (!state.description) return state;
      
      const blocks = [...state.description.blocks];
      const index = blocks.findIndex((block) => block.id === id);
      if (index === -1 || index === blocks.length - 1) return state;
      
      const temp = blocks[index];
      blocks[index] = blocks[index + 1];
      blocks[index + 1] = temp;
      
      return {
        ...state,
        description: {
          ...state.description,
          blocks,
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  reorderBlocks: (fromIndex: number, toIndex: number) => {
    if (!get().description) return;
    
    set((state: EditorState) => {
      if (!state.description) return state;
      
      const blocks = [...state.description.blocks];
      const [removed] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, removed);
      
      return {
        ...state,
        description: {
          ...state.description,
          blocks,
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  selectBlock: (id: string | null) => {
    set({ 
      selectedBlockId: id,
      focusedBlockId: id
    });
  },

  focusBlock: (id: string | null) => {
    set({ focusedBlockId: id });
  }
});
