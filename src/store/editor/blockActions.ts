
import { Block, BlockType, ColumnLayout } from '@/types/editor';
import { EditorState } from './types';
import { v4 as uuidv4 } from 'uuid';

export const createBlockActions = (get: () => EditorState, set: any) => ({
  addBlock: (blockData: Partial<Block> & { type: BlockType, title: string, columns: ColumnLayout, visible: boolean }) => {
    if (!get().description) return;
    
    // Ensure the block is properly typed
    const block = { ...blockData, id: uuidv4() } as Block;
    
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
      
      // Create a new array with the updated block
      const updatedBlocks = state.description.blocks.map((block) => {
        if (block.id === id) {
          return { ...block, ...updates } as Block;
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
    const blockCopy = JSON.parse(JSON.stringify(blockToDuplicate));
    blockCopy.id = uuidv4();
    
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
    set({ selectedBlockId: id });
  }
});
