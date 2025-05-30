
import { create } from 'zustand';
import { EditorBlock, Description } from '@/types/editor';
import { generateBlockHtml } from '@/utils/htmlGenerators';

interface EditorState {
  blocks: EditorBlock[];
  selectedBlockId: string | null;
  description: Description | null;
  
  // Actions
  addBlock: (block: EditorBlock) => void;
  updateBlock: (id: string, updates: Partial<EditorBlock>) => void;
  removeBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  duplicateBlock: (id: string) => void;
  
  // Description actions
  setDescription: (description: Description) => void;
  updateDescription: (updates: Partial<Description>) => void;
  
  // Output actions
  getHtmlOutput: (productTitle?: string) => string;
  getPlainTextOutput: () => string;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  blocks: [],
  selectedBlockId: null,
  description: null,
  
  addBlock: (block) => set((state) => ({
    blocks: [...state.blocks, block]
  })),
  
  updateBlock: (id, updates) => set((state) => ({
    blocks: state.blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    )
  })),
  
  removeBlock: (id) => set((state) => ({
    blocks: state.blocks.filter(block => block.id !== id),
    selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId
  })),
  
  selectBlock: (id) => set({ selectedBlockId: id }),
  
  reorderBlocks: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.blocks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { blocks: result };
  }),
  
  duplicateBlock: (id) => set((state) => {
    const blockToDuplicate = state.blocks.find(block => block.id === id);
    if (!blockToDuplicate) return state;
    
    const duplicatedBlock = {
      ...blockToDuplicate,
      id: `${blockToDuplicate.id}-copy-${Date.now()}`
    };
    
    const blockIndex = state.blocks.findIndex(block => block.id === id);
    const newBlocks = [...state.blocks];
    newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);
    
    return { blocks: newBlocks };
  }),
  
  setDescription: (description) => set({ description }),
  
  updateDescription: (updates) => set((state) => ({
    description: state.description 
      ? { ...state.description, ...updates }
      : null
  })),
  
  getHtmlOutput: (productTitle?: string) => {
    const { blocks, description } = get();
    
    if (!description) {
      return '<p>Nenhuma descrição ativa</p>';
    }
    
    // Use the provided product title or fall back to description name
    const title = productTitle || description.name || 'Produto';
    
    // Generate HTML for all blocks
    const blocksHtml = blocks
      .map(block => generateBlockHtml(block))
      .filter(html => html.trim() !== '')
      .join('\n\n');
    
    if (!blocksHtml.trim()) {
      return `<h1>${title}</h1>\n<p>Descrição em branco</p>`;
    }
    
    return blocksHtml;
  },
  
  getPlainTextOutput: () => {
    const { blocks, description } = get();
    
    if (!description) {
      return 'Nenhuma descrição ativa';
    }
    
    // Extract plain text from all blocks
    const blocksText = blocks
      .map(block => {
        // Extract text content from each block type
        if (block.type === 'text') {
          const heading = (block as any).heading || '';
          const content = (block as any).content || '';
          // Remove HTML tags for plain text
          const plainContent = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
          return heading ? `${heading}\n${plainContent}` : plainContent;
        }
        // Add other block types as needed
        return '';
      })
      .filter(text => text.trim() !== '')
      .join('\n\n');
    
    return blocksText || 'Descrição em branco';
  }
}));
