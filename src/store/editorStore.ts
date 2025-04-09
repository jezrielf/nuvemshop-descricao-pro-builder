
import { create } from 'zustand';
import { Block, ProductDescription, Template, HeroBlock, TextBlock, BlockType, FeaturesBlock } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

interface EditorState {
  description: ProductDescription | null;
  selectedBlockId: string | null;
  availableTemplates: Template[];
  
  // Actions
  createNewDescription: (name: string) => void;
  loadDescription: (description: ProductDescription) => void;
  loadTemplate: (template: Template) => void;
  addBlock: (block: Partial<Block> & { type: BlockType, title: string, columns: number, visible: boolean }) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  duplicateBlock: (id: string) => void;
  removeBlock: (id: string) => void;
  moveBlockUp: (id: string) => void;
  moveBlockDown: (id: string) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  selectBlock: (id: string | null) => void;
  getHtmlOutput: () => string;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  description: null,
  selectedBlockId: null,
  availableTemplates: [],

  createNewDescription: (name) => {
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

  loadDescription: (description) => {
    set({
      description,
      selectedBlockId: null,
    });
  },

  loadTemplate: (template) => {
    if (!get().description) return;
    
    // Create a new array to store the properly typed blocks
    const updatedBlocks: Block[] = template.blocks.map(templateBlock => {
      // Create a deep copy with a new ID
      const blockCopy = JSON.parse(JSON.stringify(templateBlock));
      blockCopy.id = uuidv4();
      
      // Ensure the type is correctly maintained and the block is properly typed
      return blockCopy as Block;
    });
    
    // Update the state with properly typed blocks
    set(state => {
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

  addBlock: (blockData) => {
    if (!get().description) return;
    
    const block = { ...blockData, id: uuidv4() } as Block;
    
    set(state => {
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

  updateBlock: (id, updates) => {
    if (!get().description) return;
    
    set(state => {
      if (!state.description) return state;
      
      return {
        ...state,
        description: {
          ...state.description,
          blocks: state.description.blocks.map((block) =>
            block.id === id ? { ...block, ...updates } : block
          ),
          updatedAt: new Date().toISOString(),
        }
      };
    });
  },

  duplicateBlock: (id) => {
    if (!get().description) return;
    
    const blockToDuplicate = get().description.blocks.find((block) => block.id === id);
    if (!blockToDuplicate) return;
    
    // Create a deep copy to prevent reference issues
    const blockCopy = JSON.parse(JSON.stringify(blockToDuplicate));
    blockCopy.id = uuidv4();
    
    // Ensure the blockCopy is typed correctly as Block
    const typedBlockCopy = blockCopy as Block;
    
    set(state => {
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

  removeBlock: (id) => {
    if (!get().description) return;
    
    set(state => {
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

  moveBlockUp: (id) => {
    if (!get().description) return;
    
    const blocks = [...get().description.blocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index <= 0) return;
    
    const temp = blocks[index];
    blocks[index] = blocks[index - 1];
    blocks[index - 1] = temp;
    
    set(state => {
      if (!state.description) return state;
      
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

  moveBlockDown: (id) => {
    if (!get().description) return;
    
    const blocks = [...get().description.blocks];
    const index = blocks.findIndex((block) => block.id === id);
    if (index === -1 || index === blocks.length - 1) return;
    
    const temp = blocks[index];
    blocks[index] = blocks[index + 1];
    blocks[index + 1] = temp;
    
    set(state => {
      if (!state.description) return state;
      
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

  reorderBlocks: (fromIndex, toIndex) => {
    if (!get().description) return;
    
    const blocks = [...get().description.blocks];
    const [removed] = blocks.splice(fromIndex, 1);
    blocks.splice(toIndex, 0, removed);
    
    set(state => {
      if (!state.description) return state;
      
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

  selectBlock: (id) => {
    set({ selectedBlockId: id });
  },

  getHtmlOutput: () => {
    if (!get().description || !get().description.blocks.length) {
      return '';
    }

    // This is a simplified version of HTML conversion
    // In a more complete version, each block type would have its own renderer
    const blocksHtml = get().description.blocks
      .filter(block => block.visible)
      .map(block => {
        switch(block.type) {
          case 'hero':
            const heroBlock = block as HeroBlock;
            return `
              <div style="width:100%;padding:30px;text-align:center;background-color:#f5f5f5;margin-bottom:20px;">
                <h1 style="font-size:28px;font-weight:bold;margin-bottom:10px;">${heroBlock.heading}</h1>
                <p style="font-size:16px;margin-bottom:20px;">${heroBlock.subheading}</p>
                ${heroBlock.buttonText ? `<a href="${heroBlock.buttonUrl || '#'}" style="display:inline-block;padding:10px 20px;background-color:#2563EB;color:white;text-decoration:none;border-radius:4px;">${heroBlock.buttonText}</a>` : ''}
              </div>
            `;
          case 'text':
            const textBlock = block as TextBlock;
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <div style="font-size:16px;line-height:1.6;">${textBlock.content}</div>
              </div>
            `;
          case 'features':
            const featuresBlock = block as FeaturesBlock;
            const featuresHtml = featuresBlock.features.map(feature => `
              <div style="flex:1;padding:15px;min-width:${100/block.columns}%;">
                <h3 style="font-size:18px;font-weight:bold;margin-bottom:10px;">${feature.title}</h3>
                <p style="font-size:14px;">${feature.description}</p>
              </div>
            `).join('');
            
            return `
              <div style="width:100%;padding:20px;margin-bottom:20px;">
                <h2 style="font-size:24px;font-weight:bold;margin-bottom:20px;text-align:center;">${featuresBlock.heading}</h2>
                <div style="display:flex;flex-wrap:wrap;">${featuresHtml}</div>
              </div>
            `;
          // Adicione mais casos para outros tipos de blocos conforme necessário
          default:
            return `<div style="padding:20px;margin-bottom:20px;border:1px dashed #ccc;">Bloco do tipo ${block.type}</div>`;
        }
      }).join('');

    return blocksHtml;
  },
}));
